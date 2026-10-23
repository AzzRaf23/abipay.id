import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const key = searchParams.get("key");

    if (!key) {
      return NextResponse.json({ success: false, message: "Kata kunci tidak boleh kosong" }, { status: 400 });
    }

    // Cari berdasarkan merchantRef ATAU customerPhone
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
      return NextResponse.json({ success: false, message: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: transaction });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}