import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

function mapToHomepageBrand(rawCategory: string, rawName: string, rawBrand: string, code: string) {
  const text = `${code} ${rawCategory} ${rawName} ${rawBrand}`.toUpperCase();

  // 1. GAMES
  if (text.includes("MOBILE LEGEND") || text.includes("MLBB") || text.startsWith("MLBB-")) {
    return { category: "GAMES", brand: "Mobile Legends" };
  }
  if (text.includes("FREE FIRE") || text.startsWith("FF-")) {
    return { category: "GAMES", brand: "Free Fire" };
  }
  if (text.includes("VALORANT") || text.startsWith("VAL-")) {
    return { category: "GAMES", brand: "Valorant" };
  }
  if (text.includes("PUBG") || text.startsWith("PUBG-")) {
    return { category: "GAMES", brand: "PUBG Mobile" };
  }
  if (text.includes("GENSHIN") || text.startsWith("GENSHIN-")) {
    return { category: "GAMES", brand: "Genshin Impact" };
  }
  if (text.includes("STAR RAIL") || text.includes("HONKAI") || text.startsWith("HSR-")) {
    return { category: "GAMES", brand: "Honkai: Star Rail" };
  }
  if (text.includes("FC MOBILE") || text.includes("FIFA") || text.startsWith("FCM-")) {
    return { category: "GAMES", brand: "EA SPORTS FC Mobile" };
  }
  if (text.includes("HONOR OF KINGS") || text.startsWith("HOK-")) {
    return { category: "GAMES", brand: "Honor of Kings" };
  }

  // 2. PULSA & PLN
  if (text.startsWith("TSEL-") || text.includes("TELKOMSEL")) {
    return { category: "PULSA & PLN", brand: "Telkomsel" };
  }
  if (text.startsWith("XL-") || text.includes("AXIATA")) {
    return { category: "PULSA & PLN", brand: "XL Axiata" };
  }
  if (text.startsWith("TRI-") || text.includes(" THREE ")) {
    return { category: "PULSA & PLN", brand: "Tri" };
  }
  if (text.startsWith("SF-") || text.includes("SMARTFREN")) {
    return { category: "PULSA & PLN", brand: "Smartfren" };
  }
  if (text.startsWith("PLN-") || text.includes("TOKEN") || text.includes("LISTRIK")) {
    return { category: "PULSA & PLN", brand: "PLN" };
  }

  // 3. E-WALLET
  if (text.includes("DANA") || text.startsWith("DANA-")) {
    return { category: "E-WALLET", brand: "DANA" };
  }
  if (text.includes("OVO") || text.startsWith("OVO-")) {
    return { category: "E-WALLET", brand: "OVO" };
  }
  if (text.includes("GOPAY") || text.startsWith("GOPAY-")) {
    return { category: "E-WALLET", brand: "GoPay" };
  }
  if (text.includes("SHOPEE") || text.includes("SPAY") || text.startsWith("SPAY-")) {
    return { category: "E-WALLET", brand: "ShopeePay" };
  }

  // 4. VOUCHER DIGITAL
  if (text.includes("ROBLOX") || text.includes("ROBUX") || text.startsWith("ROBLOX-")) {
    return { category: "VOUCHER DIGITAL", brand: "Roblox" };
  }
  if (text.includes("STEAM") || text.startsWith("STEAM-")) {
    return { category: "VOUCHER DIGITAL", brand: "Steam Wallet" };
  }
  if (text.includes("GOOGLE") || text.includes("GPLAY") || text.startsWith("GPLAY-")) {
    return { category: "VOUCHER DIGITAL", brand: "Google Play" };
  }

  return { category: "LAINNYA", brand: "Lainnya" };
}

export async function GET() {
  try {
    const masterProducts = [
      // 1. MOBILE LEGENDS (15 items)
      { code: "MLBB-WEEKLY", name: "Weekly Diamond Pass", price: 27000 },
      { code: "MLBB-STARLIGHT", name: "Starlight Member", price: 135000 },
      { code: "MLBB-TWILIGHT", name: "Twilight Pass", price: 140000 },
      { code: "MLBB-3", name: "3 Diamonds", price: 1200 },
      { code: "MLBB-12", name: "12 Diamonds", price: 3500 },
      { code: "MLBB-86", name: "86 Diamonds", price: 20000 },
      { code: "MLBB-172", name: "172 Diamonds", price: 40000 },
      { code: "MLBB-257", name: "257 Diamonds", price: 60000 },
      { code: "MLBB-344", name: "344 Diamonds", price: 80000 },
      { code: "MLBB-429", name: "429 Diamonds", price: 100000 },
      { code: "MLBB-706", name: "706 Diamonds", price: 160000 },
      { code: "MLBB-878", name: "878 Diamonds", price: 200000 },
      { code: "MLBB-1412", name: "1412 Diamonds", price: 320000 },
      { code: "MLBB-2195", name: "2195 Diamonds", price: 500000 },
      { code: "MLBB-3688", name: "3688 Diamonds", price: 850000 },

      // 2. FREE FIRE (15 items)
      { code: "FF-WEEKLY", name: "Membership Mingguan", price: 29500 },
      { code: "FF-MONTHLY", name: "Membership Bulanan", price: 148500 },
      { code: "FF-5", name: "5 Diamonds", price: 1000 },
      { code: "FF-12", name: "12 Diamonds", price: 2500 },
      { code: "FF-50", name: "50 Diamonds", price: 8000 },
      { code: "FF-70", name: "70 Diamonds", price: 10000 },
      { code: "FF-140", name: "140 Diamonds", price: 19000 },
      { code: "FF-355", name: "355 Diamonds", price: 48000 },
      { code: "FF-500", name: "500 Diamonds", price: 67000 },
      { code: "FF-720", name: "720 Diamonds", price: 95000 },
      { code: "FF-1000", name: "1000 Diamonds", price: 132000 },
      { code: "FF-1450", name: "1450 Diamonds", price: 190000 },
      { code: "FF-2180", name: "2180 Diamonds", price: 285000 },
      { code: "FF-3640", name: "3640 Diamonds", price: 475000 },
      { code: "FF-7290", name: "7290 Diamonds", price: 950000 },

      // 3. VALORANT (8 items)
      { code: "VAL-125", name: "125 VP", price: 15000 },
      { code: "VAL-420", name: "420 VP", price: 50000 },
      { code: "VAL-700", name: "700 VP", price: 80000 },
      { code: "VAL-1375", name: "1375 VP", price: 150000 },
      { code: "VAL-2400", name: "2400 VP", price: 250000 },
      { code: "VAL-4000", name: "4000 VP", price: 400000 },
      { code: "VAL-8150", name: "8150 VP", price: 800000 },
      { code: "VAL-12500", name: "12500 VP", price: 1200000 },

      // 4. PUBG MOBILE (10 items)
      { code: "PUBG-RP", name: "Royale Pass Pack", price: 150000 },
      { code: "PUBG-30", name: "30 UC", price: 7500 },
      { code: "PUBG-60", name: "60 UC", price: 14500 },
      { code: "PUBG-120", name: "120 UC", price: 29000 },
      { code: "PUBG-325", name: "325 UC", price: 73000 },
      { code: "PUBG-660", name: "660 UC", price: 145000 },
      { code: "PUBG-985", name: "985 UC", price: 218000 },
      { code: "PUBG-1800", name: "1800 UC", price: 365000 },
      { code: "PUBG-3850", name: "3850 UC", price: 730000 },
      { code: "PUBG-8100", name: "8100 UC", price: 1450000 },

      // 5. GENSHIN IMPACT (7 items)
      { code: "GENSHIN-WELKIN", name: "Blessing of the Welkin Moon", price: 79000 },
      { code: "GENSHIN-60", name: "60 Genesis Crystals", price: 16000 },
      { code: "GENSHIN-300", name: "300 Genesis Crystals", price: 79000 },
      { code: "GENSHIN-980", name: "980 Genesis Crystals", price: 239000 },
      { code: "GENSHIN-1980", name: "1980 Genesis Crystals", price: 479000 },
      { code: "GENSHIN-3280", name: "3280 Genesis Crystals", price: 799000 },
      { code: "GENSHIN-6480", name: "6480 Genesis Crystals", price: 1599000 },

      // 6. HONKAI STAR RAIL (7 items)
      { code: "HSR-EXPRESS", name: "Express Supply Pass", price: 79000 },
      { code: "HSR-60", name: "60 Oneiric Shard", price: 16000 },
      { code: "HSR-300", name: "300 Oneiric Shard", price: 79000 },
      { code: "HSR-980", name: "980 Oneiric Shard", price: 239000 },
      { code: "HSR-1980", name: "1980 Oneiric Shard", price: 479000 },
      { code: "HSR-3280", name: "3280 Oneiric Shard", price: 799000 },
      { code: "HSR-6480", name: "6480 Oneiric Shard", price: 1599000 },

      // 7. EA FC MOBILE (8 items)
      { code: "FCM-PASS", name: "FC Pass Regular", price: 79000 },
      { code: "FCM-40", name: "40 FC Points", price: 6500 },
      { code: "FCM-100", name: "100 FC Points", price: 16000 },
      { code: "FCM-520", name: "520 FC Points", price: 79000 },
      { code: "FCM-1070", name: "1070 FC Points", price: 159000 },
      { code: "FCM-2200", name: "2200 FC Points", price: 319000 },
      { code: "FCM-5700", name: "5700 FC Points", price: 799000 },
      { code: "FCM-12000", name: "12000 FC Points", price: 1599000 },

      // 8. HONOR OF KINGS (9 items)
      { code: "HOK-WEEKLY", name: "Weekly Card", price: 16000 },
      { code: "HOK-16", name: "16 Tokens", price: 3200 },
      { code: "HOK-80", name: "80 Tokens", price: 15000 },
      { code: "HOK-240", name: "240 Tokens", price: 45000 },
      { code: "HOK-400", name: "400 Tokens", price: 75000 },
      { code: "HOK-800", name: "800 Tokens", price: 149000 },
      { code: "HOK-1200", name: "1200 Tokens", price: 225000 },
      { code: "HOK-2400", name: "2400 Tokens", price: 449000 },
      { code: "HOK-4000", name: "4000 Tokens", price: 749000 },

      // 9. PULSA TELKOMSEL (9 items)
      { code: "TSEL-5K", name: "Pulsa Telkomsel 5.000", price: 5500 },
      { code: "TSEL-10K", name: "Pulsa Telkomsel 10.000", price: 10500 },
      { code: "TSEL-15K", name: "Pulsa Telkomsel 15.000", price: 15500 },
      { code: "TSEL-20K", name: "Pulsa Telkomsel 20.000", price: 20500 },
      { code: "TSEL-25K", name: "Pulsa Telkomsel 25.000", price: 25500 },
      { code: "TSEL-50K", name: "Pulsa Telkomsel 50.000", price: 50500 },
      { code: "TSEL-75K", name: "Pulsa Telkomsel 75.000", price: 75500 },
      { code: "TSEL-100K", name: "Pulsa Telkomsel 100.000", price: 100500 },
      { code: "TSEL-200K", name: "Pulsa Telkomsel 200.000", price: 199000 },

      // 10. PULSA XL AXIATA (8 items)
      { code: "XL-5K", name: "Pulsa XL 5.000", price: 5500 },
      { code: "XL-10K", name: "Pulsa XL 10.000", price: 10500 },
      { code: "XL-15K", name: "Pulsa XL 15.000", price: 15500 },
      { code: "XL-25K", name: "Pulsa XL 25.000", price: 25500 },
      { code: "XL-50K", name: "Pulsa XL 50.000", price: 50500 },
      { code: "XL-100K", name: "Pulsa XL 100.000", price: 100500 },
      { code: "XL-150K", name: "Pulsa XL 150.000", price: 149000 },
      { code: "XL-200K", name: "Pulsa XL 200.000", price: 198000 },

      // 11. PULSA TRI (8 items)
      { code: "TRI-5K", name: "Pulsa Tri 5.000", price: 5400 },
      { code: "TRI-10K", name: "Pulsa Tri 10.000", price: 10400 },
      { code: "TRI-15K", name: "Pulsa Tri 15.000", price: 15400 },
      { code: "TRI-20K", name: "Pulsa Tri 20.000", price: 20400 },
      { code: "TRI-30K", name: "Pulsa Tri 30.000", price: 30400 },
      { code: "TRI-50K", name: "Pulsa Tri 50.000", price: 50400 },
      { code: "TRI-100K", name: "Pulsa Tri 100.000", price: 100400 },
      { code: "TRI-150K", name: "Pulsa Tri 150.000", price: 149000 },

      // 12. PULSA SMARTFREN (8 items)
      { code: "SF-5K", name: "Pulsa Smartfren 5.000", price: 5400 },
      { code: "SF-10K", name: "Pulsa Smartfren 10.000", price: 10400 },
      { code: "SF-20K", name: "Pulsa Smartfren 20.000", price: 20400 },
      { code: "SF-25K", name: "Pulsa Smartfren 25.000", price: 25400 },
      { code: "SF-50K", name: "Pulsa Smartfren 50.000", price: 50400 },
      { code: "SF-60K", name: "Pulsa Smartfren 60.000", price: 60400 },
      { code: "SF-100K", name: "Pulsa Smartfren 100.000", price: 100400 },
      { code: "SF-150K", name: "Pulsa Smartfren 150.000", price: 149000 },

      // 13. TOKEN PLN (7 items)
      { code: "PLN-20K", name: "Token Listrik PLN 20.000", price: 20500 },
      { code: "PLN-50K", name: "Token Listrik PLN 50.000", price: 50500 },
      { code: "PLN-100K", name: "Token Listrik PLN 100.000", price: 100500 },
      { code: "PLN-200K", name: "Token Listrik PLN 200.000", price: 200500 },
      { code: "PLN-500K", name: "Token Listrik PLN 500.000", price: 500500 },
      { code: "PLN-1M", name: "Token Listrik PLN 1.000.000", price: 1000500 },
      { code: "PLN-2M", name: "Token Listrik PLN 2.000.000", price: 2000500 },

      // 14. E-WALLET DANA (6 items)
      { code: "DANA-10K", name: "Saldo DANA 10.000", price: 11000 },
      { code: "DANA-20K", name: "Saldo DANA 20.000", price: 21000 },
      { code: "DANA-50K", name: "Saldo DANA 50.000", price: 51000 },
      { code: "DANA-100K", name: "Saldo DANA 100.000", price: 101000 },
      { code: "DANA-150K", name: "Saldo DANA 150.000", price: 151000 },
      { code: "DANA-200K", name: "Saldo DANA 200.000", price: 201000 },

      // 15. E-WALLET OVO (6 items)
      { code: "OVO-10K", name: "Saldo OVO 10.000", price: 11000 },
      { code: "OVO-20K", name: "Saldo OVO 20.000", price: 21000 },
      { code: "OVO-50K", name: "Saldo OVO 50.000", price: 51000 },
      { code: "OVO-100K", name: "Saldo OVO 100.000", price: 101000 },
      { code: "OVO-150K", name: "Saldo OVO 150.000", price: 151000 },
      { code: "OVO-200K", name: "Saldo OVO 200.000", price: 201000 },

      // 16. E-WALLET GOPAY (6 items)
      { code: "GOPAY-10K", name: "Saldo GoPay 10.000", price: 11000 },
      { code: "GOPAY-20K", name: "Saldo GoPay 20.000", price: 21000 },
      { code: "GOPAY-50K", name: "Saldo GoPay 50.000", price: 51000 },
      { code: "GOPAY-100K", name: "Saldo GoPay 100.000", price: 101000 },
      { code: "GOPAY-150K", name: "Saldo GoPay 150.000", price: 151000 },
      { code: "GOPAY-200K", name: "Saldo GoPay 200.000", price: 201000 },

      // 17. E-WALLET SHOPEEPAY (6 items)
      { code: "SPAY-10K", name: "Saldo ShopeePay 10.000", price: 11000 },
      { code: "SPAY-20K", name: "Saldo ShopeePay 20.000", price: 21000 },
      { code: "SPAY-50K", name: "Saldo ShopeePay 50.000", price: 51000 },
      { code: "SPAY-100K", name: "Saldo ShopeePay 100.000", price: 101000 },
      { code: "SPAY-150K", name: "Saldo ShopeePay 150.000", price: 151000 },
      { code: "SPAY-200K", name: "Saldo ShopeePay 200.000", price: 201000 },

      // 18. STEAM WALLET (6 items)
      { code: "STEAM-12K", name: "Steam Wallet IDR 12.000", price: 14000 },
      { code: "STEAM-45K", name: "Steam Wallet IDR 45.000", price: 50000 },
      { code: "STEAM-90K", name: "Steam Wallet IDR 90.000", price: 98000 },
      { code: "STEAM-120K", name: "Steam Wallet IDR 120.000", price: 130000 },
      { code: "STEAM-250K", name: "Steam Wallet IDR 250.000", price: 265000 },
      { code: "STEAM-600K", name: "Steam Wallet IDR 600.000", price: 620000 },

      // 19. GOOGLE PLAY (6 items)
      { code: "GPLAY-5K", name: "Google Play Voucher 5.000", price: 6000 },
      { code: "GPLAY-20K", name: "Google Play Voucher 20.000", price: 22000 },
      { code: "GPLAY-50K", name: "Google Play Voucher 50.000", price: 53000 },
      { code: "GPLAY-100K", name: "Google Play Voucher 100.000", price: 105000 },
      { code: "GPLAY-150K", name: "Google Play Voucher 150.000", price: 156000 },
      { code: "GPLAY-300K", name: "Google Play Voucher 300.000", price: 310000 },

      // 20. ROBLOX (5 items)
      { code: "ROBLOX-80", name: "Roblox Gift Card 80 Robux", price: 18000 },
      { code: "ROBLOX-100", name: "Roblox Gift Card 100 Robux", price: 22000 },
      { code: "ROBLOX-200", name: "Roblox Gift Card 200 Robux", price: 42000 },
      { code: "ROBLOX-400", name: "Roblox Gift Card 400 Robux", price: 79000 },
      { code: "ROBLOX-800", name: "Roblox Gift Card 800 Robux", price: 155000 }
    ];

    let successCount = 0;

    for (const item of masterProducts) {
      const { category, brand } = mapToHomepageBrand("", item.name, "", item.code);
      const markupPrice = 500;
      const sellPrice = item.price + markupPrice;

      await prisma.productPrepaid.upsert({
        where: { code: item.code },
        update: {
          name: item.name,
          category,
          brand,
          buyPrice: item.price,
          sellPrice,
          serverStatus: "Tersedia",
        },
        create: {
          code: item.code,
          name: item.name,
          category,
          brand,
          buyPrice: item.price,
          markupPrice,
          sellPrice,
          serverStatus: "Tersedia",
        },
      });
      successCount++;
    }

    return NextResponse.json({
      success: true,
      message: `Database berhasil diperbarui dengan ${successCount} produk dari 20 brand secara lengkap!`,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}