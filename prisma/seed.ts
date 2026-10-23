import { PrismaClient } from "@prisma/client";
import { productsData } from "../data/products";

const prisma = new PrismaClient();

async function main() {
  console.log("🚀 Memulai seeding data produk ke SQLite (ProductPrepaid)...");

  for (const slug in productsData) {
    const productGroup = productsData[slug];

    for (const item of productGroup.items) {
      // 1. Ekstrak nominal harga angka dari string misal "Rp 23.500" -> 23500
      const numericPrice = parseFloat(item.price.replace(/[^0-9]/g, ""));

      // 2. Buat kode produk unik (contoh: mlbb-1, ff-2, pulsa-tsel-3)
      const code = `${slug}-${item.id}`;

      // 3. Masukkan / Update ke tabel ProductPrepaid
      await prisma.productPrepaid.upsert({
        where: { code: code },
        update: {
          name: `${productGroup.title} - ${item.name}`,
          category: productGroup.category,
          brand: productGroup.publisher || productGroup.title,
          buyPrice: numericPrice - 300, // Estimasi harga modal
          sellPrice: numericPrice,
          serverStatus: "Tersedia",
        },
        create: {
          code: code,
          name: `${productGroup.title} - ${item.name}`,
          category: productGroup.category,
          brand: productGroup.publisher || productGroup.title,
          buyPrice: numericPrice - 300,
          markupPrice: 300,
          sellPrice: numericPrice,
          serverStatus: "Tersedia",
        },
      });
    }

    console.log(`✅ Berhasil sync brand: ${productGroup.title} (${productGroup.items.length} item)`);
  }

  console.log("🎉 Seeding database SQLite selesai!");
}

main()
  .catch((e) => {
    console.error("❌ Gagal seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });