import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { fetchTripayPrepaidProducts } from "@/lib/tripay";

// Pemetaan presisi sesuai 20 Brand resmi di Homepage Abipay.id
function mapToHomepageBrand(rawCategory: string, rawName: string, rawBrand: string) {
  const text = `${rawCategory} ${rawName} ${rawBrand}`.toUpperCase();

  // 1. GAMES
  if (text.includes("MOBILE LEGEND") || text.includes("MLBB")) {
    return { category: "GAMES", brand: "Mobile Legends" };
  }
  if (text.includes("FREE FIRE") || text.includes("FF")) {
    return { category: "GAMES", brand: "Free Fire" };
  }
  if (text.includes("VALORANT")) {
    return { category: "GAMES", brand: "Valorant" };
  }
  if (text.includes("PUBG")) {
    return { category: "GAMES", brand: "PUBG Mobile" };
  }
  if (text.includes("GENSHIN")) {
    return { category: "GAMES", brand: "Genshin Impact" };
  }
  if (text.includes("STAR RAIL") || text.includes("HONKAI")) {
    return { category: "GAMES", brand: "Honkai: Star Rail" };
  }
  if (text.includes("FC MOBILE") || text.includes("FIFA")) {
    return { category: "GAMES", brand: "EA SPORTS FC Mobile" };
  }
  if (text.includes("HONOR OF KINGS") || text.includes("HOK")) {
    return { category: "GAMES", brand: "Honor of Kings" };
  }

  // 2. PULSA & PLN
  if (text.includes("TELKOMSEL") || text.includes("SYMPATI") || text.includes("AS")) {
    return { category: "PULSA & PLN", brand: "Telkomsel" };
  }
  if (text.includes("XL")) {
    return { category: "PULSA & PLN", brand: "XL Axiata" };
  }
  if (text.includes("TRI") || text.includes("THREE") || text.includes("3")) {
    return { category: "PULSA & PLN", brand: "Tri" };
  }
  if (text.includes("SMARTFREN")) {
    return { category: "PULSA & PLN", brand: "Smartfren" };
  }
  if (text.includes("PLN") || text.includes("TOKEN") || text.includes("LISTRIK")) {
    return { category: "PULSA & PLN", brand: "PLN" };
  }

  // 3. E-WALLET
  if (text.includes("DANA")) {
    return { category: "E-WALLET", brand: "DANA" };
  }
  if (text.includes("OVO")) {
    return { category: "E-WALLET", brand: "OVO" };
  }
  if (text.includes("GOPAY") || text.includes("GOJEK")) {
    return { category: "E-WALLET", brand: "GoPay" };
  }
  if (text.includes("SHOPEE")) {
    return { category: "E-WALLET", brand: "ShopeePay" };
  }

  // 4. VOUCHER DIGITAL
  if (text.includes("ROBLOX")) {
    return { category: "VOUCHER DIGITAL", brand: "Roblox" };
  }
  if (text.includes("STEAM")) {
    return { category: "VOUCHER DIGITAL", brand: "Steam Wallet" };
  }
  if (text.includes("GOOGLE PLAY") || text.includes("GOOGLE")) {
    return { category: "VOUCHER DIGITAL", brand: "Google Play" };
  }

  return {
    category: "LAINNYA",
    brand: rawBrand ? rawBrand.toUpperCase() : "GENERAL",
  };
}

export async function POST() {
  try {
    const products = await fetchTripayPrepaidProducts();

    if (!Array.isArray(products)) {
      return NextResponse.json(
        { success: false, message: "Format data dari Tripay tidak valid" },
        { status: 400 }
      );
    }

    for (const item of products) {
      const code = item.product_id || item.code || item.id;
      const name = item.product_name || item.name;
      const buyPrice = Number(item.price) || 0;
      const rawCategory = item.category_name || item.category || "";
      const rawBrand = item.brand_name || item.brand || "";

      if (!code) continue;

      const { category, brand } = mapToHomepageBrand(String(rawCategory), String(name), String(rawBrand));

      const existingProduct = await prisma.productPrepaid.findUnique({
        where: { code: String(code) },
      });

      const markupPrice = existingProduct ? existingProduct.markupPrice : 500;
      const sellPrice = buyPrice + markupPrice;

      await prisma.productPrepaid.upsert({
        where: { code: String(code) },
        update: {
          name: String(name),
          category: category,
          brand: brand,
          buyPrice: buyPrice,
          sellPrice: sellPrice,
          serverStatus: item.status === 1 || item.status === "1" ? "Tersedia" : "Gangguan",
        },
        create: {
          code: String(code),
          name: String(name),
          category: category,
          brand: brand,
          buyPrice: buyPrice,
          markupPrice: markupPrice,
          sellPrice: sellPrice,
          serverStatus: item.status === 1 || item.status === "1" ? "Tersedia" : "Gangguan",
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: `Berhasil sinkronisasi & memetakan ${products.length} produk ke brand Homepage Abipay.id`,
    });
  } catch (error: any) {
    console.error("Error Sync Products:", error.message);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}