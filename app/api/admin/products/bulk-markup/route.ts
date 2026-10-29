import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { markup } = body;

    const markupNum = Number(markup);
    if (isNaN(markupNum) || markupNum < 0) {
      return NextResponse.json(
        { success: false, message: "Nilai markup massal tidak valid!" },
        { status: 400 }
      );
    }

    // Ambil semua produk lalu update markup dan hitung ulang harga jualnya
    const products = await prisma.productPrepaid.findMany();

    for (const p of products) {
      const buyPrice = Number(p.buyPrice);
      await prisma.productPrepaid.update({
        where: { code: p.code },
        data: {
          markupPrice: markupNum,
          sellPrice: buyPrice + markupNum,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Markup massal berhasil diterapkan ke semua produk!`,
    });
  } catch (error: any) {
    console.error("Error bulk markup:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}