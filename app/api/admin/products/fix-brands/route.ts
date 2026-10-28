export const dynamic = 'force-static';
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const products = await prisma.productPrepaid.findMany();

    for (const item of products) {
      const text = `${item.name} ${item.category}`.toUpperCase();
      let newBrand = "GENERAL";
      let newCategory = item.category;

      // 1. GAMES
      if (text.includes("MOBILE LEGEND") || text.includes("MLBB")) {
        newBrand = "Mobile Legends";
        newCategory = "GAMES";
      } else if (text.includes("FREE FIRE") || text.includes("FF")) {
        newBrand = "Free Fire";
        newCategory = "GAMES";
      } else if (text.includes("VALORANT")) {
        newBrand = "Valorant";
        newCategory = "GAMES";
      } else if (text.includes("PUBG")) {
        newBrand = "PUBG Mobile";
        newCategory = "GAMES";
      } else if (text.includes("GENSHIN")) {
        newBrand = "Genshin Impact";
        newCategory = "GAMES";
      } else if (text.includes("STAR RAIL") || text.includes("HONKAI")) {
        newBrand = "Honkai: Star Rail";
        newCategory = "GAMES";
      } else if (text.includes("FC MOBILE") || text.includes("FIFA")) {
        newBrand = "EA SPORTS FC Mobile";
        newCategory = "GAMES";
      } else if (text.includes("HONOR OF KINGS") || text.includes("HOK")) {
        newBrand = "Honor of Kings";
        newCategory = "GAMES";
      }

      // 2. PULSA & PLN
      else if (text.includes("TELKOMSEL") || text.includes("SYMPATI") || text.includes("AS")) {
        newBrand = "Telkomsel";
        newCategory = "PULSA & PLN";
      } else if (text.includes("XL") || text.includes("AXIS")) {
        newBrand = "XL Axiata";
        newCategory = "PULSA & PLN";
      } else if (text.includes("TRI") || text.includes("THREE") || text.includes("3") || text.includes("INDOSAT")) {
        newBrand = "Tri";
        newCategory = "PULSA & PLN";
      } else if (text.includes("SMARTFREN")) {
        newBrand = "Smartfren";
        newCategory = "PULSA & PLN";
      } else if (text.includes("PLN") || text.includes("TOKEN") || text.includes("LISTRIK")) {
        newBrand = "PLN";
        newCategory = "PULSA & PLN";
      }

      // 3. E-WALLET
      else if (text.includes("DANA")) {
        newBrand = "DANA";
        newCategory = "E-WALLET";
      } else if (text.includes("OVO")) {
        newBrand = "OVO";
        newCategory = "E-WALLET";
      } else if (text.includes("GOPAY") || text.includes("GOJEK")) {
        newBrand = "GoPay";
        newCategory = "E-WALLET";
      } else if (text.includes("SHOPEE")) {
        newBrand = "ShopeePay";
        newCategory = "E-WALLET";
      }

      // 4. VOUCHER DIGITAL
      else if (text.includes("ROBLOX")) {
        newBrand = "Roblox";
        newCategory = "VOUCHER DIGITAL";
      } else if (text.includes("STEAM")) {
        newBrand = "Steam Wallet";
        newCategory = "VOUCHER DIGITAL";
      } else if (text.includes("GOOGLE PLAY") || text.includes("GOOGLE")) {
        newBrand = "Google Play";
        newCategory = "VOUCHER DIGITAL";
      }

      // Perbarui data lokal di database SQLite
      await prisma.productPrepaid.update({
        where: { id: item.id },
        data: {
          brand: newBrand,
          category: newCategory,
        },
      });
    }

    return NextResponse.json({
      success: true,
      message: "Berhasil update brand dummy ke brand resmi Homepage!",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}