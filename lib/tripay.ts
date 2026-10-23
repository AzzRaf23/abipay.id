const TRIPAY_API_KEY = process.env.TRIPAY_API_KEY || "";
const TRIPAY_PRIVATE_KEY = process.env.TRIPAY_PRIVATE_KEY || "";

const TRIPAY_BASE_URL = "https://tripay.id/api/v2"; 

export async function fetchTripayPrepaidProducts() {
  try {
    const response = await fetch(`${TRIPAY_BASE_URL}/pembelian/category`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${TRIPAY_API_KEY}`,
      },
      cache: "no-store",
    });

    const data = await response.json();
    if (!data.success) {
      throw new Error(data.message || "Gagal mengambil data produk dari Tripay");
    }

    return data.data;
  } catch (error: any) {
    console.error("[ABIPAY] Error Fetch Tripay Products:", error.message);
    throw error;
  }
}

export async function orderTripayPrepaidProduct(params: {
  inquiry: string;
  code: string;
  phone: string;
  target: string;
  apiTrxId: string;
}) {
  try {
    const response = await fetch(`${TRIPAY_BASE_URL}/transaksi/pembelian`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TRIPAY_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inquiry: params.inquiry,
        code: params.code,
        phone: params.phone,
        target: params.target,
        api_trxid: params.apiTrxId,
      }),
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error("[ABIPAY] Error Order Tripay:", error.message);
    throw error;
  }
}