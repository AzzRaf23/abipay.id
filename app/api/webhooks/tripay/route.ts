import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { api_trxid, status, serial_number, message } = body;

    if (!api_trxid) {
      return NextResponse.json({ success: false, message: "Invalid payload" }, { status: 400 });
    }

    let trxStatus = "PENDING";
    if (status === 1 || status === "1" || status === "SUCCESS") {
      trxStatus = "SUCCESS";
    } else if (status === 2 || status === "2" || status === "FAILED") {
      trxStatus = "FAILED";
    }

    console.log(`[ABIPAY WEBHOOK] Callback diterima TRX: ${api_trxid}, Status: ${trxStatus}`);

    return NextResponse.json({ success: true, message: "Callback Abipay.id berhasil diproses" });
  } catch (error: any) {
    console.error("[ABIPAY WEBHOOK] Error processing callback:", error.message);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}