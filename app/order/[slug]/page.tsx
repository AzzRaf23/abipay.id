import React, { Suspense } from "react";
import CheckoutContent from "./CheckoutContent";
import { productsData } from "@/data/products";

// 1. Generate Static Params agar Next.js bisa mem-build semua slug produk saat build time
export async function generateStaticParams() {
  return Object.keys(productsData).map((slug) => ({
    slug: slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function DynamicCheckoutPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "mlbb";

  return (
    <Suspense
      fallback={
        <div 
          className="min-h-screen text-white flex items-center justify-center font-bold text-sm"
          style={{ backgroundColor: "var(--color-bg-main, #0B0F17)" }}
        >
          Memuat halaman checkout...
        </div>
      }
    >
      <CheckoutContent slug={slug} />
    </Suspense>
  );
}