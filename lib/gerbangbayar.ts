import crypto from "crypto";

const GB_BASE_URL = process.env.GERBANGBAYAR_BASE_URL || "https://developer.gerbangbayar.com";
const CLIENT_ID = process.env.GERBANGBAYAR_CLIENT_ID || "";
const CLIENT_SECRET = process.env.GERBANGBAYAR_CLIENT_SECRET || "";
const API_TOKEN = process.env.GERBANGBAYAR_API_TOKEN || "";
const MERCHANT_ID = process.env.GERBANGBAYAR_MERCHANT_ID || "";

interface CreateQrisParams {
  merchantRef: string;
  amount: number;
  customerName?: string;
  customerPhone: string;
}

// 1. Ambil Bearer Token via OAuth2 (/v1/oauth/token)
export async function getGerbangBayarToken() {
  try {
    const response = await fetch(`${GB_BASE_URL}/v1/oauth/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: "client_credentials",
      }),
    });

    const data = await response.json();
    return data.access_token || data.token;
  } catch (error: any) {
    console.error("[ABIPAY GERBANGBAYAR] Error OAuth Token:", error.message);
    throw error;
  }
}

// 2. Generate QR MPM (QRIS Dinamis) (/v1/service/banking/generate-qr-mpm)
export async function createGerbangBayarQris(params: CreateQrisParams) {
  try {
    const bearerToken = await getGerbangBayarToken();

    // Buat SHA256 Hash dari API Token sesuai spec autentikasi GerbangBayar
    const sha256ApiToken = crypto
      .createHash("sha256")
      .update(API_TOKEN)
      .digest("hex");

    const response = await fetch(`${GB_BASE_URL}/v1/service/banking/generate-qr-mpm`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
        Authentication: sha256ApiToken,
      },
      body: JSON.stringify({
        partner_reference_no: params.merchantRef,
        amount: {
          value: `${params.amount}.00`,
          currency: "IDR",
        },
        merchant_id: MERCHANT_ID,
        customer_name: params.customerName || "Pelanggan Abipay.id",
        customer_phone: params.customerPhone,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("[ABIPAY GERBANGBAYAR] Error Create QRIS:", error.message);
    throw error;
  }
}