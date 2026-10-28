import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Pakai force-dynamic agar laporan CSV selalu menarik data transaksi paling baru dari Neon DB
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET() {
  try {
    const transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });

    // Header Kolom CSV
    let csvContent = "Invoice,Tanggal,Produk,Target Account,Nominal,Status Pembayaran,Status Pengiriman\n";

    // Format Setiap Baris Transaksi
    transactions.forEach((t) => {
      const formattedDate = new Date(t.createdAt).toLocaleString("id-ID");
      csvContent += `"${t.merchantRef}","${formattedDate}","${t.productName}","${t.targetAccount}",${t.amount},"${t.paymentStatus}","${t.deliveryStatus}"\n`;
    });

    return new NextResponse(csvContent, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="laporan-transaksi-abipay.csv"',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}