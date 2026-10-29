import React, { Suspense } from "react";
import ShowcaseDetailContent from "./ShowcaseDetailContent";
import { showcaseTemplates } from "@/data/showcaseTemplates";

// Generate static params untuk 100 template showcase
export async function generateStaticParams() {
  return showcaseTemplates.map((template) => ({
    id: template.id.toString(),
  }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function DynamicShowcasePage({ params }: PageProps) {
  const resolvedParams = await params;
  const id = resolvedParams?.id || "1";

  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0B0F17] text-white flex items-center justify-center font-bold text-sm">
          Memuat template showcase...
        </div>
      }
    >
      <ShowcaseDetailContent id={id} />
    </Suspense>
  );
}