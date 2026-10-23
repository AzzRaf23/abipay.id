import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="laporan-transaksi-abipay.csv"',
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}