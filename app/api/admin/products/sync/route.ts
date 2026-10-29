import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

function mapToHomepageBrand(rawCategory: string, rawName: string, rawBrand: string) {
  const text = `${rawCategory} ${rawName} ${rawBrand}`.toUpperCase();

  if (text.includes("MOBILE LEGEND") || text.includes("MLBB") || text.includes("DIAMOND")) {
    return { category: "GAMES", brand: "Mobile Legends" };
  }
  if (text.includes("FREE FIRE") || text.includes("FF")) {
    return { category: "GAMES", brand: "Free Fire" };
  }
  if (text.includes("VALORANT") || text.includes("VP")) {
    return { category: "GAMES", brand: "Valorant" };
  }
  if (text.includes("PUBG") || text.includes("UC")) {
    return { category: "GAMES", brand: "PUBG Mobile" };
  }
  if (text.includes("GENSHIN") || text.includes("GENESIS") || text.includes("WELKIN")) {
    return { category: "GAMES", brand: "Genshin Impact" };
  }
  if (text.includes("STAR RAIL") || text.includes("HONKAI") || text.includes("ONEIRIC") || text.includes("EXPRESS")) {
    return { category: "GAMES", brand: "Honkai: Star Rail" };
  }
  if (text.includes("FC MOBILE") || text.includes("FIFA") || text.includes("FC PASS") || text.includes("FC POINTS")) {
    return { category: "GAMES", brand: "EA SPORTS FC Mobile" };
  }
  if (text.includes("HONOR OF KINGS") || text.includes("HOK") || text.includes("TOKENS")) {
    return { category: "GAMES", brand: "Honor of Kings" };
  }
  if (text.includes("TELKOMSEL") || text.includes("TSEL")) {
    return { category: "PULSA & PLN", brand: "Telkomsel" };
  }
  if (text.includes("XL") || text.includes("AXIATA")) {
    return { category: "PULSA & PLN", brand: "XL Axiata" };
  }
  if (text.includes("TRI") || text.includes("THREE") || text.includes("3")) {
    return { category: "PULSA & PLN", brand: "Tri" };
  }
  if (text.includes("SMARTFREN") || text.includes("SF")) {
    return { category: "PULSA & PLN", brand: "Smartfren" };
  }
  if (text.includes("PLN") || text.includes("TOKEN") || text.includes("LISTRIK")) {
    return { category: "PULSA & PLN", brand: "PLN" };
  }
  if (text.includes("DANA")) {
    return { category: "E-WALLET", brand: "DANA" };
  }
  if (text.includes("OVO")) {
    return { category: "E-WALLET", brand: "OVO" };
  }
  if (text.includes("GOPAY") || text.includes("GOJEK")) {
    return { category: "E-WALLET", brand: "GoPay" };
  }
  if (text.includes("SHOPEE") || text.includes("SPAY")) {
    return { category: "E-WALLET", brand: "ShopeePay" };
  }
  if (text.includes("ROBLOX") || text.includes("ROBUX")) {
    return { category: "VOUCHER DIGITAL", brand: "Roblox" };
  }
  if (text.includes("STEAM")) {
    return { category: "VOUCHER DIGITAL", brand: "Steam Wallet" };
  }
  if (text.includes("GOOGLE")) {
    return { category: "VOUCHER DIGITAL", brand: "Google Play" };
  }

  return {
    category: "LAINNYA",
    brand: rawBrand ? rawBrand : "GENERAL",
  };
}

export async function POST() {
  try {
    const products = [
      // 1. MOBILE LEGENDS
      { code: "MLBB-WEEKLY", name: "Weekly Diamond Pass", category: "GAMES", brand: "Mobile Legends", price: 27000 },
      { code: "MLBB-STARLIGHT", name: "Starlight Member", category: "GAMES", brand: "Mobile Legends", price: 135000 },
      { code: "MLBB-TWILIGHT", name: "Twilight Pass", category: "GAMES", brand: "Mobile Legends", price: 140000 },
      { code: "MLBB-3", name: "3 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 1200 },
      { code: "MLBB-12", name: "12 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 3500 },
      { code: "MLBB-86", name: "86 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 20000 },
      { code: "MLBB-172", name: "172 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 40000 },
      { code: "MLBB-257", name: "257 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 60000 },
      { code: "MLBB-344", name: "344 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 80000 },
      { code: "MLBB-429", name: "429 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 100000 },
      { code: "MLBB-706", name: "706 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 160000 },
      { code: "MLBB-878", name: "878 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 200000 },
      { code: "MLBB-1412", name: "1412 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 320000 },
      { code: "MLBB-2195", name: "2195 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 500000 },
      { code: "MLBB-3688", name: "3688 Diamonds", category: "GAMES", brand: "Mobile Legends", price: 850000 },

      // 2. FREE FIRE
      { code: "FF-WEEKLY", name: "Membership Mingguan", category: "GAMES", brand: "Free Fire", price: 29500 },
      { code: "FF-MONTHLY", name: "Membership Bulanan", category: "GAMES", brand: "Free Fire", price: 148500 },
      { code: "FF-5", name: "5 Diamonds", category: "GAMES", brand: "Free Fire", price: 1000 },
      { code: "FF-12", name: "12 Diamonds", category: "GAMES", brand: "Free Fire", price: 2500 },
      { code: "FF-50", name: "50 Diamonds", category: "GAMES", brand: "Free Fire", price: 8000 },
      { code: "FF-70", name: "70 Diamonds", category: "GAMES", brand: "Free Fire", price: 10000 },
      { code: "FF-140", name: "140 Diamonds", category: "GAMES", brand: "Free Fire", price: 19000 },
      { code: "FF-355", name: "355 Diamonds", category: "GAMES", brand: "Free Fire", price: 48000 },
      { code: "FF-500", name: "500 Diamonds", category: "GAMES", brand: "Free Fire", price: 67000 },
      { code: "FF-720", name: "720 Diamonds", category: "GAMES", brand: "Free Fire", price: 95000 },
      { code: "FF-1000", name: "1000 Diamonds", category: "GAMES", brand: "Free Fire", price: 132000 },
      { code: "FF-1450", name: "1450 Diamonds", category: "GAMES", brand: "Free Fire", price: 190000 },
      { code: "FF-2180", name: "2180 Diamonds", category: "GAMES", brand: "Free Fire", price: 285000 },
      { code: "FF-3640", name: "3640 Diamonds", category: "GAMES", brand: "Free Fire", price: 475000 },
      { code: "FF-7290", name: "7290 Diamonds", category: "GAMES", brand: "Free Fire", price: 950000 },

      // 3. VALORANT
      { code: "VAL-125", name: "125 VP", category: "GAMES", brand: "Valorant", price: 15000 },
      { code: "VAL-420", name: "420 VP", category: "GAMES", brand: "Valorant", price: 50000 },
      { code: "VAL-700", name: "700 VP", category: "GAMES", brand: "Valorant", price: 80000 },
      { code: "VAL-1375", name: "1375 VP", category: "GAMES", brand: "Valorant", price: 150000 },
      { code: "VAL-2400", name: "2400 VP", category: "GAMES", brand: "Valorant", price: 250000 },
      { code: "VAL-4000", name: "4000 VP", category: "GAMES", brand: "Valorant", price: 400000 },
      { code: "VAL-8150", name: "8150 VP", category: "GAMES", brand: "Valorant", price: 800000 },
      { code: "VAL-12500", name: "12500 VP", category: "GAMES", brand: "Valorant", price: 1200000 },

      // 4. PUBG MOBILE
      { code: "PUBG-RP", name: "Royale Pass Pack", category: "GAMES", brand: "PUBG Mobile", price: 150000 },
      { code: "PUBG-30", name: "30 UC", category: "GAMES", brand: "PUBG Mobile", price: 7500 },
      { code: "PUBG-60", name: "60 UC", category: "GAMES", brand: "PUBG Mobile", price: 14500 },
      { code: "PUBG-120", name: "120 UC", category: "GAMES", brand: "PUBG Mobile", price: 29000 },
      { code: "PUBG-325", name: "325 UC", category: "GAMES", brand: "PUBG Mobile", price: 73000 },
      { code: "PUBG-660", name: "660 UC", category: "GAMES", brand: "PUBG Mobile", price: 145000 },
      { code: "PUBG-985", name: "985 UC", category: "GAMES", brand: "PUBG Mobile", price: 218000 },
      { code: "PUBG-1800", name: "1800 UC", category: "GAMES", brand: "PUBG Mobile", price: 365000 },
      { code: "PUBG-3850", name: "3850 UC", category: "GAMES", brand: "PUBG Mobile", price: 730000 },
      { code: "PUBG-8100", name: "8100 UC", category: "GAMES", brand: "PUBG Mobile", price: 1450000 },

      // 5. GENSHIN IMPACT
      { code: "GENSHIN-WELKIN", name: "Blessing of the Welkin Moon", category: "GAMES", brand: "Genshin Impact", price: 79000 },
      { code: "GENSHIN-60", name: "60 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 16000 },
      { code: "GENSHIN-300", name: "300 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 79000 },
      { code: "GENSHIN-980", name: "980 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 239000 },
      { code: "GENSHIN-1980", name: "1980 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 479000 },
      { code: "GENSHIN-3280", name: "3280 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 799000 },
      { code: "GENSHIN-6480", name: "6480 Genesis Crystals", category: "GAMES", brand: "Genshin Impact", price: 1599000 },

      // 6. HONKAI: STAR RAIL
      { code: "HSR-EXPRESS", name: "Express Supply Pass", category: "GAMES", brand: "Honkai: Star Rail", price: 79000 },
      { code: "HSR-60", name: "60 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 16000 },
      { code: "HSR-300", name: "300 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 79000 },
      { code: "HSR-980", name: "980 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 239000 },
      { code: "HSR-1980", name: "1980 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 479000 },
      { code: "HSR-3280", name: "3280 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 799000 },
      { code: "HSR-6480", name: "6480 Oneiric Shard", category: "GAMES", brand: "Honkai: Star Rail", price: 1599000 },

      // 7. EA SPORTS FC MOBILE
      { code: "FCM-PASS", name: "FC Pass Regular", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 79000 },
      { code: "FCM-40", name: "40 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 6500 },
      { code: "FCM-100", name: "100 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 16000 },
      { code: "FCM-520", name: "520 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 79000 },
      { code: "FCM-1070", name: "1070 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 159000 },
      { code: "FCM-2200", name: "2200 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 319000 },
      { code: "FCM-5700", name: "5700 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 799000 },
      { code: "FCM-12000", name: "12000 FC Points", category: "GAMES", brand: "EA SPORTS FC Mobile", price: 1599000 },

      // 8. HONOR OF KINGS
      { code: "HOK-WEEKLY", name: "Weekly Card", category: "GAMES", brand: "Honor of Kings", price: 16000 },
      { code: "HOK-16", name: "16 Tokens", category: "GAMES", brand: "Honor of Kings", price: 3200 },
      { code: "HOK-80", name: "80 Tokens", category: "GAMES", brand: "Honor of Kings", price: 15000 },
      { code: "HOK-240", name: "240 Tokens", category: "GAMES", brand: "Honor of Kings", price: 45000 },
      { code: "HOK-400", name: "400 Tokens", category: "GAMES", brand: "Honor of Kings", price: 75000 },
      { code: "HOK-800", name: "800 Tokens", category: "GAMES", brand: "Honor of Kings", price: 149000 },
      { code: "HOK-1200", name: "1200 Tokens", category: "GAMES", brand: "Honor of Kings", price: 225000 },
      { code: "HOK-2400", name: "2400 Tokens", category: "GAMES", brand: "Honor of Kings", price: 449000 },
      { code: "HOK-4000", name: "4000 Tokens", category: "GAMES", brand: "Honor of Kings", price: 749000 },

      // 9. PULSA TELKOMSEL
      { code: "TSEL-5K", name: "Pulsa Rp 5.000", category: "PULSA & PLN", brand: "Telkomsel", price: 5000 },
      { code: "TSEL-10K", name: "Pulsa Rp 10.000", category: "PULSA & PLN", brand: "Telkomsel", price: 10000 },
      { code: "TSEL-15K", name: "Pulsa Rp 15.000", category: "PULSA & PLN", brand: "Telkomsel", price: 15000 },
      { code: "TSEL-20K", name: "Pulsa Rp 20.000", category: "PULSA & PLN", brand: "Telkomsel", price: 20000 },
      { code: "TSEL-25K", name: "Pulsa Rp 25.000", category: "PULSA & PLN", brand: "Telkomsel", price: 25000 },
      { code: "TSEL-30K", name: "Pulsa Rp 30.000", category: "PULSA & PLN", brand: "Telkomsel", price: 30000 },
      { code: "TSEL-50K", name: "Pulsa Rp 50.000", category: "PULSA & PLN", brand: "Telkomsel", price: 50000 },
      { code: "TSEL-75K", name: "Pulsa Rp 75.000", category: "PULSA & PLN", brand: "Telkomsel", price: 75000 },
      { code: "TSEL-100K", name: "Pulsa Rp 100.000", category: "PULSA & PLN", brand: "Telkomsel", price: 100000 },

      // 10. PULSA XL AXIATA
      { code: "XL-5K", name: "Pulsa Rp 5.000", category: "PULSA & PLN", brand: "XL Axiata", price: 5000 },
      { code: "XL-10K", name: "Pulsa Rp 10.000", category: "PULSA & PLN", brand: "XL Axiata", price: 10000 },
      { code: "XL-15K", name: "Pulsa Rp 15.000", category: "PULSA & PLN", brand: "XL Axiata", price: 15000 },
      { code: "XL-25K", name: "Pulsa Rp 25.000", category: "PULSA & PLN", brand: "XL Axiata", price: 25000 },

      // 11. PULSA TRI
      { code: "TRI-5K", name: "Pulsa Rp 5.000", category: "PULSA & PLN", brand: "Tri", price: 5000 },
      { code: "TRI-10K", name: "Pulsa Rp 10.000", category: "PULSA & PLN", brand: "Tri", price: 10000 },

      // 12. PULSA SMARTFREN
      { code: "SF-5K", name: "Pulsa Rp 5.000", category: "PULSA & PLN", brand: "Smartfren", price: 5000 },
      { code: "SF-10K", name: "Pulsa Rp 10.000", category: "PULSA & PLN", brand: "Smartfren", price: 10000 },

      // 13. TOKEN PLN
      { code: "PLN-20K", name: "Token Listrik Rp 20.000", category: "PULSA & PLN", brand: "PLN", price: 20000 },

      // 14. TOP UP DANA
      { code: "DANA-10K", name: "Saldo DANA Rp 10.000", category: "E-WALLET", brand: "DANA", price: 10000 },

      // 15. TOP UP OVO
      { code: "OVO-10K", name: "Saldo OVO Rp 10.000", category: "E-WALLET", brand: "OVO", price: 10000 },

      // 16. TOP UP GOPAY
      { code: "GOPAY-10K", name: "Saldo GoPay Rp 10.000", category: "E-WALLET", brand: "GoPay", price: 10000 },

      // 17. TOP UP SHOPEEPAY
      { code: "SPAY-10K", name: "Saldo ShopeePay Rp 10.000", category: "E-WALLET", brand: "ShopeePay", price: 10000 },

      // 18. STEAM WALLET
      { code: "STEAM-12K", name: "Steam IDR 12.000", category: "VOUCHER DIGITAL", brand: "Steam Wallet", price: 12000 },

      // 19. GOOGLE PLAY
      { code: "GPLAY-5K", name: "Google Play Rp 5.000", category: "VOUCHER DIGITAL", brand: "Google Play", price: 5000 },

      // 20. ROBLOX
      { code: "VCHR-ROBLOX-80", name: "Robux 80", category: "VOUCHER DIGITAL", brand: "Roblox", price: 18000 },
      { code: "VCHR-ROBLOX-100", name: "Robux 100", category: "VOUCHER DIGITAL", brand: "Roblox", price: 22000 },
      { code: "VCHR-ROBLOX-200", name: "Robux 200", category: "VOUCHER DIGITAL", brand: "Roblox", price: 42000 },
      { code: "VCHR-ROBLOX-400", name: "Robux 400", category: "VOUCHER DIGITAL", brand: "Roblox", price: 79000 },
      { code: "VCHR-ROBLOX-800", name: "Robux 800", category: "VOUCHER DIGITAL", brand: "Roblox", price: 155000 }
    ];

    let successCount = 0;

    for (const item of products) {
      const code = String(item.code);
      const name = String(item.name);
      const modalPrice = Number(item.price) || 0;
      const rawCategory = String(item.category || "");
      const rawBrand = String(item.brand || "");

      if (!code) continue;

      const { category, brand } = mapToHomepageBrand(rawCategory, name, rawBrand);

      const existingProduct = await prisma.productPrepaid.findUnique({
        where: { code },
      });

      const markup = 500;
      const sellPrice = modalPrice + markup;

      try {
        if (existingProduct) {
          await prisma.productPrepaid.update({
            where: { code },
            data: {
              name,
              category,
              brand,
              buyPrice: modalPrice,
              sellPrice: sellPrice,
              serverStatus: "Tersedia",
            },
          });
        } else {
          await prisma.productPrepaid.create({
            data: {
              code,
              name,
              category,
              brand,
              buyPrice: modalPrice,
              markupPrice: markup,
              sellPrice: sellPrice,
              serverStatus: "Tersedia",
            },
          });
        }
        successCount++;
      } catch (dbErr: any) {
        console.error(`Error saving item ${code}:`, dbErr.message);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: `Berhasil memuat ${successCount} produk ke database!`,
      },
      { headers: corsHeaders }
    );
  } catch (error: any) {
    console.error("Error Sync Products:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Gagal sinkronisasi produk" },
      { status: 500, headers: corsHeaders }
    );
  }
}