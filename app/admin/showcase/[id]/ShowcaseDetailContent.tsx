"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Palette } from "lucide-react";
import { applyActiveTheme } from "@/utils/themeHelper";
import { useRouter } from "next/navigation";

export default function ShowcaseDetailContent({ id }: { id: string }) {
  const router = useRouter();

  const mockTemplate = {
    id: id || "template-1",
    title: "Template Multi-Niche Engine",
    subtitle: "PPOB & Top Up Game Storefront",
    description: "Template tampilan interaktif dengan fitur otomatisasi, responsive layout, dan kustomisasi variabel warna.",
    layoutType: "default",
    colorPrimary: "#00A3FF",
    colorBgMain: "#0B0F17",
    colorBgCard: "#1E293B",
    colorAccent: "#38BDF8",
  };

  const handleApplyTheme = () => {
    localStorage.setItem("revo_active_theme", JSON.stringify(mockTemplate));
    applyActiveTheme(mockTemplate);
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-between font-sans">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-10">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 text-xs text-slate-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Showcase
          </Link>

          <div className="border border-slate-800 rounded-3xl p-8 bg-slate-900/60 shadow-2xl">
            <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30">
              PPOB & Top Up Game
            </span>
            <h1 className="text-3xl font-black mt-3">{mockTemplate.title}</h1>
            <p className="text-sm text-slate-400 mt-2">{mockTemplate.description}</p>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400">
                <CheckCircle2 className="w-4 h-4" /> Siap Digunakan
              </div>
              <button
                onClick={handleApplyTheme}
                className="px-6 py-3 rounded-xl bg-blue-600 text-white font-bold text-xs flex items-center gap-2 hover:bg-blue-500 transition-all cursor-pointer shadow-lg"
              >
                <Palette className="w-4 h-4" /> Terapkan Tema & Buka Website
              </button>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}