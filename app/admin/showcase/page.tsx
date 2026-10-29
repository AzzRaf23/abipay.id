"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { applyActiveTheme } from "@/utils/themeHelper";
import { useRouter } from "next/navigation";
import { CheckCircle2, Clock } from "lucide-react";
import { nicheCategories, showcaseTemplates, ShowcaseTemplate } from "@/data/showcaseTemplates";

export default function ShowcasePage() {
  const router = useRouter();
  const [activeThemeId, setActiveThemeId] = useState<string>("template-1");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    const currentTheme = applyActiveTheme();
    if (currentTheme) {
      setActiveThemeId(currentTheme.id);
    }
  }, []);

  const handleApplyTheme = (theme: ShowcaseTemplate) => {
    localStorage.setItem("revo_active_theme", JSON.stringify(theme));
    applyActiveTheme(theme);
    setActiveThemeId(theme.id);
    router.push("/");
  };

  const filteredTemplates = showcaseTemplates.filter((item) => {
    if (selectedCategory === "all") return true;
    return item.nicheCategory === selectedCategory;
  });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-between font-sans select-none">
      <div>
        <Navbar />

        {/* TOP SUB-BAR HEADER */}
        <div className="border-b border-slate-800/80 bg-[#0B0F17]/90 px-4 py-3 text-xs">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <span className="font-mono text-slate-400 text-[11px] uppercase tracking-wider">
              REVO.ID ENGINE / <span className="text-slate-200 font-bold">THE NICHE COLLECTION</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-slate-400 uppercase">MULTI-NICHE ENGINE Frontend Demo</span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600/20 text-blue-400 border border-blue-500/30">
                {showcaseTemplates.length} template aktif
              </span>
            </div>
          </div>
        </div>

        {/* HERO TITLE SECTION */}
        <section className="max-w-7xl mx-auto px-4 pt-10 pb-6">
          <span className="text-xs font-mono text-slate-400 uppercase tracking-widest block mb-2">
            REVO.ID / MULTI-NICHE ENGINE
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight">
            Koleksi Template Engine<span className="text-blue-500">.</span>
          </h1>
          <p className="text-xs md:text-sm text-slate-400 max-w-2xl mt-2 leading-relaxed">
            Pilih kategori dan klik mana saja untuk melihat perubahan warna tema secara live di seluruh halaman situs!
          </p>

          {/* FILTER NICHE PILLS */}
          <div className="flex items-center gap-2 mt-6 overflow-x-auto pb-2 scrollbar-none">
            {nicheCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-blue-600 text-white border-blue-500 shadow-lg shadow-blue-600/30"
                    : "bg-slate-800/60 text-slate-400 border-slate-700/50 hover:text-white hover:bg-slate-800"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="text-xs text-slate-500 font-medium mt-4">
            {filteredTemplates.length} template tersedia di kategori ini
          </p>
        </section>

        {/* GRID SHOWCASE CARD / EMPTY STATE */}
        <section className="max-w-7xl mx-auto px-4 py-4 pb-12">
          {filteredTemplates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTemplates.map((item) => {
                const isSelected = activeThemeId === item.id;
                const isPhysical = item.nicheCategory === "produk-fisik";

                return (
                  <div
                    key={item.id}
                    className={`border rounded-3xl p-5 transition-all duration-300 flex flex-col justify-between ${
                      isSelected
                        ? "border-blue-500 ring-2 ring-blue-500/40 bg-slate-900/90 shadow-2xl shadow-blue-500/10"
                        : "border-slate-800/90 bg-[#121824]/90 hover:border-slate-700 hover:-translate-y-1"
                    }`}
                  >
                    <div>
                      {/* PREVIEW BOX */}
                      <div
                        className={`h-40 rounded-2xl p-4 flex flex-col justify-between relative overflow-hidden bg-gradient-to-br ${item.previewBg} border border-white/10 shadow-inner`}
                      >
                        <div className="flex items-center justify-between z-10">
                          <span
                            className="px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider text-white shadow-md"
                            style={{ backgroundColor: item.primaryColor }}
                          >
                            {item.badge}
                          </span>

                          <div className="flex items-center gap-1.5 bg-black/40 px-2 py-1 rounded-full border border-white/10">
                            {[item.primaryColor, item.accentColor, item.secondaryColor].map((col, idx) => (
                              <span key={idx} className="w-2 h-2 rounded-full" style={{ backgroundColor: col }} />
                            ))}
                          </div>
                        </div>

                        <div className="z-10 mt-auto">
                          <span
                            className={`text-[9px] font-mono font-bold uppercase tracking-widest block mb-0.5 ${
                              isPhysical ? "text-slate-700" : "text-slate-300"
                            }`}
                          >
                            {item.styleTag}
                          </span>
                          <h3
                            className={`text-sm font-black truncate ${
                              isPhysical ? "text-slate-900" : "text-white"
                            }`}
                          >
                            {item.title}
                          </h3>
                        </div>
                      </div>

                      {/* DESKRIPSI & FITUR BULLET LIST */}
                      <div className="mt-4">
                        <p className="text-xs text-slate-400 leading-relaxed min-h-[36px] line-clamp-2">
                          {item.description}
                        </p>

                        <div className="mt-3 flex flex-col gap-1.5 text-[11px] text-slate-300">
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: item.primaryColor }} />
                            <span>Tampilan Optimal Multi-Device</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: item.primaryColor }} />
                            <span>Integrasi Sistem Pembayaran Instant</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ACTION BUTTON FULL WIDTH */}
                    <div className="mt-5 pt-3 border-t border-white/5">
                      <button
                        onClick={() => handleApplyTheme(item)}
                        className={`w-full py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                          isSelected
                            ? "bg-blue-600 text-white shadow-blue-600/30 hover:bg-blue-500"
                            : "bg-blue-600 text-white hover:bg-blue-500 active:scale-95"
                        }`}
                        style={{
                          backgroundColor: isSelected ? undefined : item.primaryColor,
                        }}
                      >
                        {isSelected ? "Tema Sedang Aktif (Terapkan Ulang)" : "Terapkan Tema"}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* EMPTY STATE UNTUK KATEGORI LAIN YANG BELUM DIBUAT */
            <div className="border border-dashed border-slate-800 rounded-3xl p-12 text-center bg-slate-900/30 max-w-2xl mx-auto my-8">
              <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-white">Kategori Ini Dalam Pengembangan</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                Template untuk kategori ini akan segera hadir. Saat ini kamu dapat mencoba variasi template pada kategori <strong className="text-blue-400">PPOB & Top Up Game</strong> dan <strong className="text-blue-400">Produk Fisik</strong>.
              </p>
              <button
                onClick={() => setSelectedCategory("ppob")}
                className="mt-5 px-5 py-2.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-md cursor-pointer"
              >
                Lihat Template PPOB & Game
              </button>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}