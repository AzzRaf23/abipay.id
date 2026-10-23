import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { orderTripayPrepaidProduct } from "@/lib/tripay";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Handling fleksibel untuk nama variabel dari callback GerbangBayar (snake_case / camelCase)
    const merchantRef = body.merchant_ref || body.merchantRef;
    const rawStatus = (body.status || "").toUpperCase();
    const qrisId = body.qr_id || body.qrisTrxId || body.qr_code_id;
    const snNumber = body.sn || body.serial_number;

    if (!merchantRef) {
      return NextResponse.json(
        { success: false, message: "merchant_ref tidak ditemukan pada payload" },
        { status: 400 }
      );
    }

    // Cek apakah status transaksi dari callback menyatakan lunas
    const isPaidStatus =
      rawStatus === "PAID" ||
      rawStatus === "SUCCESS" ||
      rawStatus === "BERHASIL" ||
      rawStatus === "00";

    if (isPaidStatus) {
      // 1. Cari data transaksi di SQLite dev.db
      const trx = await prisma.transaction.findUnique({
        where: { merchantRef: merchantRef },
      });

      if (!trx) {
        return NextResponse.json(
          { success: false, message: "Transaksi tidak ditemukan" },
          { status: 404 }
        );
      }

      // 2. Cegah pemrosesan ganda jika transaksi sudah lunas
      if (trx.paymentStatus === "PAID") {
        return NextResponse.json({
          success: true,
          message: "Transaksi sudah diproses sebelumnya",
        });
      }

      // 3. Update status pembayaran ke PAID dan pengiriman ke PROCESSING
      await prisma.transaction.update({
        where: { merchantRef: merchantRef },
        data: {
          paymentStatus: "PAID",
          deliveryStatus: "PROCESSING",
          qrisTrxId: qrisId || null,
        },
      });

      // 4. Kirim pesanan otomatis ke provider Biller Tripay
      try {
        const tripayRes = await orderTripayPrepaidProduct({
          inquiry: "PLN/GAME/PULSA",
          code: trx.productCode,
          phone: trx.customerPhone,
          target: trx.targetAccount,
          apiTrxId: trx.merchantRef,
        });

        if (tripayRes && tripayRes.success) {
          // Jika order ke Tripay berhasil
          await prisma.transaction.update({
            where: { merchantRef: merchantRef },
            data: {
              tripayTrxId: tripayRes.data?.trx_id || null,
              deliveryStatus: "SUCCESS",
              sn: tripayRes.data?.sn || snNumber || "PROSES OK",
            },
          });
        } else {
          // Jika order ke Tripay gagal/pending dari provider
          await prisma.transaction.update({
            where: { merchantRef: merchantRef },
            data: {
              deliveryStatus: "FAILED",
              sn: tripayRes?.message || "Gagal otomatisasi Biller Tripay",
            },
          });
        }
      } catch (tripayError: any) {
        console.error("Error order Biller Tripay:", tripayError.message);
        await prisma.transaction.update({
          where: { merchantRef: merchantRef },
          data: {
            deliveryStatus: "FAILED",
            sn: tripayError.message || "Error koneksi Tripay",
          },
        });
      }

      return NextResponse.json({
        success: true,
        message: "Pembayaran terverifikasi & pesanan dikirim ke Tripay",
      });
    }

    // Apabila menerima callback dengan status selain PAID/SUCCESS
    return NextResponse.json({
      success: true,
      message: `Callback status [${rawStatus}] diterima`,
    });
  } catch (error: any) {
    console.error("Error Webhook GerbangBayar:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}