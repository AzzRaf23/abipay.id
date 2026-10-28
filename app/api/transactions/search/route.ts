import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Pakai force-dynamic agar Vercel selalu mengambil data terbaru dari database Neon (Real-Time)
export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    // Jika key TIDAK ADA (dipanggil oleh Admin Dashboard): Kembalikan SEMUA transaksi
    if (!key) {
      const allTransactions = await prisma.transaction.findMany({
        orderBy: { createdAt: "desc" },
      });

      return NextResponse.json(
        { success: true, data: allTransactions },
        { headers: corsHeaders }
      );
    }

    // Jika key ADA (dipanggil saat cari invoice / nomor telepon):
    const transaction = await prisma.transaction.findFirst({
      where: {
        OR: [
          { merchantRef: key },
          { customerPhone: key },
        ],
      },
      orderBy: { createdAt: "desc" },
    });

    if (!transaction) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan" },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, data: transaction },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}