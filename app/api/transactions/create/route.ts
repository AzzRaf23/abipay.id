import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productName, amount, targetAccount, customerPhone } = body;

    // Bersihkan format "Rp 23.500" menjadi angka murni 23500
    const rawAmount = typeof amount === "string" 
      ? parseFloat(amount.replace(/[^0-9]/g, "")) 
      : (amount || 0);

    const merchantRef = `ABI-${Date.now()}`;

    // Simpan data transaksi ke SQLite dev.db
    const newTransaction = await prisma.transaction.create({
      data: {
        merchantRef,
        productCode: "MLBB-TEST",
        productName: productName || "Top Up Game",
        amount: rawAmount,
        targetAccount: targetAccount || "-",
        customerPhone: customerPhone || "08123456789",
        paymentStatus: "PAID",
        deliveryStatus: "SUCCESS",
      },
    });

    return NextResponse.json({ success: true, data: newTransaction });
  } catch (error: any) {
    console.error("Gagal simpan transaksi:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}