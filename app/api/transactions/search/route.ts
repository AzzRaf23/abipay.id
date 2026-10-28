import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newTransaction = await prisma.transaction.create({
      data: {
        merchantRef: body.merchantRef || `INV-${Date.now()}`,
        productName: body.productName,
        targetAccount: body.targetAccount,
        amount: Number(body.amount),
        customerPhone: body.customerPhone || "-",
        paymentStatus: body.paymentStatus || "UNPAID",
        deliveryStatus: body.deliveryStatus || "PENDING",
      },
    });

    return NextResponse.json(
      { success: true, data: newTransaction },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Gagal membuat transaksi di Neon DB:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500, headers: corsHeaders }
    );
  }
}