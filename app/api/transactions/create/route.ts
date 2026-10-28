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
    const targetAccount = body.targetAccount || body.userId || "-";
    const customerPhone = body.customerPhone || "-";
    const amount = Number(body.amount) || 0;
    const paymentStatus = body.paymentStatus || "PAID";
    const deliveryStatus = body.deliveryStatus || "PROCESSING";

    // 1. Ambil input code yang dikirim dari frontend
    let inputCode = body.productCode || body.productSlug || "MLBB";

    // 2. Cek apakah productCode tersebut terdaftar di database
    let existingProduct = await prisma.productPrepaid.findUnique({
      where: { code: inputCode },
    });

    // 3. Jika belum terdaftar, cari produk lain yang tersedia agar foreign key tidak error
    if (!existingProduct) {
      existingProduct = await prisma.productPrepaid.findFirst();
    }

    // 4. Jika tabel produk di Neon DB masih kosong, buatkan 1 produk default
    let validProductCode = existingProduct?.code;
    if (!validProductCode) {
      const defaultProduct = await prisma.productPrepaid.create({
        data: {
          code: "MLBB",
          name: "Mobile Legends",
          category: "GAME",
          brand: "Moonton",
          type: "TOPUP",
          sellerName: "Abipay",
          price: 20000,
          buyerSkuCode: "MLBB-DIAMOND",
        },
      });
      validProductCode = defaultProduct.code;
    }

    // 5. Simpan Transaksi dengan productCode yang terjamin valid
    const newTransaction = await prisma.transaction.create({
      data: {
        merchantRef,
        productName,
        productCode: validProductCode,
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