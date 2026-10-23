import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { category, markupPrice } = body;

    const markup = Number(markupPrice);
    if (isNaN(markup)) {
      return NextResponse.json(
        { success: false, message: "Markup price harus berupa angka" },
        { status: 400 }
      );
    }

    const whereCondition = category === "SEMUA" || !category ? {} : { category };
    const products = await prisma.productPrepaid.findMany({ where: whereCondition });

    for (const prod of products) {
      const newSellPrice = prod.buyPrice + markup;
      await prisma.productPrepaid.update({
        where: { id: prod.id },
        data: {
          markupPrice: markup,
          sellPrice: newSellPrice,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil mengupdate markup ${products.length} produk`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}