import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { code, markup } = body;

    if (!code || markup === undefined) {
      return NextResponse.json(
        { success: false, message: "Kode dan nilai markup wajib diisi!" },
        { status: 400 }
      );
    }

    const markupNum = Number(markup);
    if (isNaN(markupNum) || markupNum < 0) {
      return NextResponse.json(
        { success: false, message: "Nilai markup tidak valid!" },
        { status: 400 }
      );
    }

    // Ambil data produk untuk mendapatkan harga modal (buyPrice)
    const product = await prisma.productPrepaid.findUnique({
      where: { code },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan di database!" },
        { status: 404 }
      );
    }

    const buyPrice = Number(product.buyPrice);
    const newSellPrice = buyPrice + markupNum;

    // Update markupPrice dan hitung ulang sellPrice
    const updatedProduct = await prisma.productPrepaid.update({
      where: { code },
      data: {
        markupPrice: markupNum,
        sellPrice: newSellPrice,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Markup berhasil diperbarui!",
      data: updatedProduct,
    });
  } catch (error: any) {
    console.error("Error updating single markup:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}