import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productCode, productName, amount, targetAccount, customerPhone } = body;

    // Bersihkan format "Rp 23.500" atau angka berformat string menjadi Float murni
    const rawAmount = typeof amount === "string" 
      ? parseFloat(amount.replace(/[^0-9]/g, "")) 
      : (amount || 0);

    // Keamanan jika parsing gagal (NaN)
    const finalAmount = isNaN(rawAmount) ? 0 : rawAmount;

    // Generate Invoice Reference Unik (contoh: ABI-1719823491)
    const merchantRef = `ABI-${Date.now()}`;

    // Simpan data transaksi ke Database Cloud (cPanel MySQL / Neon PostgreSQL)
    const newTransaction = await prisma.transaction.create({
      data: {
        merchantRef,
        productCode: productCode || "GENERAL-ITEM",
        productName: productName || "Top Up Game Digital",
        amount: finalAmount,
        targetAccount: targetAccount || "-",
        customerPhone: customerPhone || "-",
        paymentStatus: "PAID",     // Status simulasi Lunas untuk pengujian awal
        deliveryStatus: "SUCCESS", // Status simulasi Sukses untuk pengujian awal
      },
    });

    return NextResponse.json({ success: true, data: newTransaction });
  } catch (error: any) {
    console.error("Gagal menyimpan transaksi ke database:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: "Gagal memproses transaksi.", 
        error: process.env.NODE_ENV === "development" ? error.message : undefined 
      },
      { status: 500 }
    );
  }
}