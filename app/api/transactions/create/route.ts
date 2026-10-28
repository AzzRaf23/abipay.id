import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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

    const merchantRef = body.merchantRef || `INV-${Date.now()}`;
    const productName = body.productName || "Top Up Game";
    const productCode = body.productCode || body.productSlug || "MLBB-DIAMOND";
    const targetAccount = body.targetAccount || body.userId || "-";
    const customerPhone = body.customerPhone || "-";
    const amount = Number(body.amount) || 0;
    const paymentStatus = body.paymentStatus || "PAID";
    const deliveryStatus = body.deliveryStatus || "PROCESSING";

    const newTransaction = await prisma.transaction.create({
      data: {
        merchantRef,
        productName,
        productCode,
        targetAccount,
        customerPhone,
        amount,
        paymentStatus,
        deliveryStatus,
      },
    });

    return NextResponse.json(
      { success: true, data: newTransaction },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error create transaction:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal memproses transaksi" },
      { status: 500, headers: corsHeaders }
    );
  }
}