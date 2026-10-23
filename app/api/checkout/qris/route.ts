import { NextResponse } from "next/server";
import { createGerbangBayarQris } from "@/lib/gerbangbayar";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { productName, amount, userId, zoneId, customerPhone } = body;

    if (!productName || !amount) {
      return NextResponse.json(
        { success: false, message: "Data produk atau nominal tidak valid" },
        { status: 400 }
      );
    }

    const merchantRef = `ABI-${Date.now()}`;

    let qrisUrl = "";

    try {
      // Panggil API GerbangBayar jika kredensial .env sudah terisi
      const gbResponse = await createGerbangBayarQris({
        merchantRef,
        amount: Number(amount),
        customerPhone: customerPhone || "08123456789",
      });

      qrisUrl =
        gbResponse?.qr_content ||
        gbResponse?.qr_image_url ||
        gbResponse?.data?.qr_url ||
        "";
    } catch (err) {
      console.log("[ABIPAY] Menggunakan QRIS Dummy untuk Testing lokal...");
    }

    // Jika API Key belum diisi/error, buat QRIS dummy otomatis
    if (!qrisUrl) {
      const dummyQrPayload = `00020101021226680016ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5910ABIPAY.ID6013JAKARTA6304ABCD`;
      qrisUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(
        dummyQrPayload
      )}`;
    }

    // Format jam expired (+15 Menit)
    const expDate = new Date(Date.now() + 15 * 60 * 1000);
    const expiredAt = expDate.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return NextResponse.json({
      success: true,
      message: "Berhasil membuat transaksi QRIS",
      data: {
        merchantRef,
        productName,
        amount: Number(amount),
        targetId: zoneId ? `${userId} (${zoneId})` : userId,
        qrisUrl,
        expiredAt,
      },
    });
  } catch (error: any) {
    console.error("Error Checkout QRIS:", error.message);
    return NextResponse.json(
      { success: false, message: error.message || "Gagal memproses QRIS" },
      { status: 500 }
    );
  }
}