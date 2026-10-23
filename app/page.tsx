"use client";

import React, { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RunningBanner from "@/components/RunningBanner";
import Link from "next/link";
import { productsData } from "@/data/products";
import { applyActiveTheme } from "@/utils/themeHelper";
import {
  Flame,
  Zap,
  ShieldCheck,
  Headphones,
  ArrowRight,
  Gamepad2,
  Smartphone,
  Wallet,
  Gift,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Percent,
  RotateCcw,
  Clock,
  Star,
  Award,
  Terminal,
  TrendingUp,
} from "lucide-react";

const promoBanners = [
  {
    id: 1,
    tag: "Promo Spesial",
    title: "Top Up Game, Pulsa & E-Wallet",
    highlight: "Proses Hitungan Detik!",
    desc: "Layanan top up resmi, otomatis 24 jam non-stop dengan metode pembayaran QRIS, DANA, GoPay, OVO, & Virtual Account.",
    btnText: "Top Up Mobile Legends",
    btnLink: "/order/mlbb",
    badgeIcon: Flame,
    bgGradient: "from-blue-600/20 via-indigo-600/10 to-transparent",
  },
  {
    id: 2,
    tag: "Cashback E-Wallet",
    title: "Bonus Saldo & Extra Cashback",
    highlight: "Hingga 30% All Payment!",
    desc: "Isi saldo DANA, OVO, GoPay, dan ShopeePay tanpa biaya admin. Bebas biaya transaksi via QRIS.",
    btnText: "Isi Saldo E-Wallet",
    btnLink: "/order/topup-dana",
    badgeIcon: Percent,
    bgGradient: "from-emerald-600/20 via-teal-600/10 to-transparent",
  },
  {
    id: 3,
    tag: "Flash Sale PLN & Pulsa",
    title: "Diskon Listrik & Pulsa Murah",
    highlight: "Hemat Setiap Hari!",
    desc: "Beli token PLN prabayar dan isi ulang pulsa semua operator Telkomsel, XL, Tri, & Smartfren paling murah.",
    btnText: "Beli Token PLN",
    btnLink: "/order/pln",
    badgeIcon: Sparkles,
    bgGradient: "from-amber-600/20 via-purple-600/10 to-transparent",
  },
];

export default function MasterGameHomePage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTheme, setActiveTheme] = useState<any>(null);
  const [layoutType, setLayoutType] = useState("default");

  const horizontalScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const theme = applyActiveTheme();
    if (theme) {
      setActiveTheme(theme);
      if (theme.layoutType) setLayoutType(theme.layoutType);
    }
  }, []);

  const handleResetTheme = () => {
    localStorage.removeItem("revo_active_theme");
    setActiveTheme(null);
    setLayoutType("default");
    applyActiveTheme();
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % promoBanners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % promoBanners.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + promoBanners.length) % promoBanners.length);

  const scrollHorizontal = (direction: "left" | "right") => {
    if (horizontalScrollRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      horizontalScrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const productsList = Object.values(productsData);

  const filteredProducts = productsList.filter((p) => {
    const matchesCategory = activeCategory === "all" || p.category === activeCategory;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div
      className="min-h-screen font-sans flex flex-col justify-between transition-colors duration-500 select-none"
      style={{
        backgroundColor: "var(--color-bg-main, #0B0F17)",
        color: "var(--color-text-main, #FFFFFF)",
      }}
    >
      <div>
        <RunningBanner />
        <Navbar />

        {/* NOTIFIKASI TEMPLATE AKTIF */}
        {activeTheme && (
          <div
            className="border-b px-4 py-2 text-xs transition-colors"
            style={{
              backgroundColor: "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)",
            }}
          >
            <div className="flex items-center gap-2 max-w-7xl mx-auto justify-between">
              <span className="flex items-center gap-2" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                🎨 Mode Template Aktif: <strong style={{ color: "var(--color-text-main, #FFFFFF)" }}>{activeTheme.title}</strong>
                <span
                  className="px-2.5 py-0.5 rounded text-[10px] font-black text-white uppercase ml-1 shadow-md"
                  style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                >
                  {activeTheme.badge}
                </span>
              </span>

              <button
                onClick={handleResetTheme}
                className="flex items-center gap-1 font-bold transition-colors hover:text-rose-400 cursor-pointer"
                style={{ color: "var(--color-text-muted, #94A3B8)" }}
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset ke Default
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TEMPLATE 2 (PERSISTENT LEFT SIDEBAR LAYOUT)                               */}
        {/* ========================================================================= */}
        {layoutType === "minimal-stepper" ? (
          <div className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <aside
              className="lg:col-span-1 border rounded-3xl p-6 h-fit sticky top-20 flex flex-col gap-6 shadow-xl"
              style={{
                backgroundColor: "var(--color-bg-card, #172554)",
                borderColor: "var(--color-border, #2563EB)",
              }}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2.5 py-1 rounded bg-amber-400 text-black">
                  LEFT SIDEBAR NAV
                </span>
                <h2 className="text-lg font-black text-white mt-2">Filter Layanan</h2>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5" style={{ color: "var(--color-primary, #2563EB)" }} />
                <input
                  type="text"
                  placeholder="Cari Layanan..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border rounded-xl pl-9 pr-3 py-2 text-xs focus:outline-none"
                  style={{
                    backgroundColor: "var(--color-input-bg, #0A1128)",
                    borderColor: "var(--color-border, #2563EB)",
                    color: "#FFFFFF",
                  }}
                />
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "Semua Produk", icon: Flame },
                  { id: "game", label: "Top Up Game", icon: Gamepad2 },
                  { id: "ppob", label: "Pulsa & PLN", icon: Smartphone },
                  { id: "ewallet", label: "E-Wallet", icon: Wallet },
                  { id: "voucher", label: "Voucher Digital", icon: Gift },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer"
                      style={{
                        backgroundColor: isActive ? "var(--color-primary, #2563EB)" : "var(--color-input-bg, #0A1128)",
                        borderColor: isActive ? "var(--color-primary, #2563EB)" : "var(--color-border, #2563EB)",
                        color: isActive ? "#FFFFFF" : "var(--color-text-muted, #93C5FD)",
                      }}
                    >
                      <Icon className="w-4 h-4" /> {tab.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            <main className="lg:col-span-3">
              <div className="border rounded-3xl p-6 mb-6" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                <h1 className="text-2xl font-black">Katalog Layanan Sapphire</h1>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Proses otomatis dalam hitungan detik 24 Jam.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/order/${item.slug}`}
                    className="border rounded-2xl p-4 flex items-center gap-4 transition-all hover:scale-105 shadow-md"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
                  >
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center p-2 shrink-0`}>
                      <img src={item.logoUrl} alt={item.title} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-xs font-bold text-white truncate">{item.title}</h3>
                      <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{item.publisher}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </main>
          </div>
        ) : layoutType === "reversed-sidebar" ? (
          /* ========================================================================= */
          /* TEMPLATE 7 (REVERSED RIGHT SIDEBAR LAYOUT)                                */
          /* ========================================================================= */
          <div className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-4 gap-6">
            <main className="lg:col-span-3">
              <div className="border rounded-3xl p-6 mb-6" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                <h1 className="text-2xl font-black">Katalog Produk Right-Nav</h1>
                <p className="text-xs mt-1" style={{ color: "var(--color-text-muted)" }}>Layout terbalik dengan sidebar navigasi di sebelah kanan.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {filteredProducts.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/order/${item.slug}`}
                    className="border rounded-2xl p-4 text-center hover:scale-105 transition-transform"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
                  >
                    <img src={item.logoUrl} alt={item.title} className="h-16 mx-auto object-contain mb-2" />
                    <h4 className="text-xs font-bold">{item.title}</h4>
                  </Link>
                ))}
              </div>
            </main>

            <aside
              className="lg:col-span-1 border rounded-3xl p-6 h-fit sticky top-20 flex flex-col gap-6 shadow-xl"
              style={{
                backgroundColor: "var(--color-bg-card, #134E4A)",
                borderColor: "var(--color-border, #14B8A6)",
              }}
            >
              <div>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-teal-400 text-black">
                  RIGHT SIDEBAR NAV
                </span>
                <h2 className="text-lg font-black text-white mt-2">Kategori Utama</h2>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: "all", label: "Semua Produk", icon: Flame },
                  { id: "game", label: "Top Up Game", icon: Gamepad2 },
                  { id: "ppob", label: "Pulsa & PLN", icon: Smartphone },
                  { id: "ewallet", label: "E-Wallet", icon: Wallet },
                  { id: "voucher", label: "Voucher Digital", icon: Gift },
                ].map((tab) => {
                  const Icon = tab.icon;
                  const isActive = activeCategory === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCategory(tab.id)}
                      className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border text-left cursor-pointer"
                      style={{
                        backgroundColor: isActive ? "var(--color-primary, #14B8A6)" : "var(--color-input-bg, #042F2C)",
                        borderColor: isActive ? "var(--color-primary, #14B8A6)" : "var(--color-border, #14B8A6)",
                        color: isActive ? "#FFFFFF" : "var(--color-text-muted, #5EEAD4)",
                      }}
                    >
                      <Icon className="w-4 h-4" /> {tab.label}
                    </button>
                  );
                })}
              </div>
            </aside>
          </div>
        ) : (
          /* ========================================================================= */
          /* DEFAULT & DEDICATED HEROES                                               */
          /* ========================================================================= */
          <>
            {/* TEMPLATE 1: DEFAULT REVO BASELINE HERO SLIDER DENGAN EFEK FULL */}
            {layoutType === "default" && (
              <section className="max-w-7xl mx-auto px-4 pt-6">
                <div
                  className="relative overflow-hidden rounded-3xl border shadow-2xl transition-all duration-500 min-h-[280px] flex items-center"
                  style={{
                    backgroundColor: "var(--color-bg-card, #1E293B)",
                    borderColor: "var(--color-border, #334155)",
                  }}
                >
                  {promoBanners.map((banner, index) => {
                    if (index !== currentSlide) return null;
                    const BadgeIcon = banner.badgeIcon;
                    return (
                      <div key={banner.id} className="p-6 md:p-10 w-full relative z-10 flex flex-col justify-center">
                        {/* BACKDROP GRADIENT EFEK */}
                        <div className={`absolute inset-0 bg-gradient-to-r ${banner.bgGradient} pointer-events-none`} />

                        <div className="max-w-xl flex flex-col gap-3 relative z-10">
                          <span
                            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border w-fit shadow-md animate-pulse"
                            style={{
                              backgroundColor: "var(--color-input-bg, #0B0F17)",
                              color: "var(--color-primary, #00A3FF)",
                              borderColor: "var(--color-primary, #00A3FF)",
                            }}
                          >
                            <BadgeIcon className="w-3.5 h-3.5" /> {banner.tag}
                          </span>
                          <h1 className="text-2xl md:text-4xl font-black leading-tight text-white drop-shadow-md">
                            {banner.title} <span style={{ color: "var(--color-primary, #00A3FF)" }}>{banner.highlight}</span>
                          </h1>
                          <p className="text-xs md:text-sm max-w-lg leading-relaxed" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                            {banner.desc}
                          </p>
                          <div className="pt-2">
                            <Link
                              href={banner.btnLink}
                              className="inline-flex items-center gap-2 text-white font-bold text-xs md:text-sm px-6 py-3 rounded-xl transition-all shadow-xl hover:opacity-90 active:scale-95"
                              style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                            >
                              {banner.btnText} <ArrowRight className="w-4 h-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* NAVIGASI PANAH SLIDER */}
                  <button
                    onClick={prevSlide}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer z-20 border border-white/10"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextSlide}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition-all cursor-pointer z-20 border border-white/10"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>

                  {/* INDICATOR DOTS */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {promoBanners.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentSlide(idx)}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          idx === currentSlide ? "w-6 bg-blue-500" : "w-2 bg-white/40"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {layoutType === "esports-grid" && (
              <section className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 border rounded-3xl p-6 md:p-8 flex flex-col justify-between" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-1 rounded bg-amber-500 text-black">ESPORTS HUD</span>
                    <h1 className="text-2xl md:text-4xl font-black mt-3">POWER YOUR GAMEPLAY</h1>
                  </div>
                  <Link href="/order/mlbb" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-lg w-fit mt-4" style={{ backgroundColor: "var(--color-primary)" }}>
                    Beli MLBB <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="border rounded-3xl p-6 flex flex-col justify-between" style={{ backgroundColor: "var(--color-input-bg)", borderColor: "var(--color-border)" }}>
                  <div>
                    <span className="text-[10px] font-bold text-emerald-400">SERVER STATUS</span>
                    <h3 className="text-base font-black mt-1">Sistem Otomatis 100%</h3>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">● Api Connected</span>
                </div>
              </section>
            )}

            {layoutType === "split-banner" && (
              <section className="max-w-7xl mx-auto px-4 pt-6 grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div className="lg:col-span-2 border-2 rounded-3xl p-6 md:p-8 flex flex-col justify-between" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)" }}>
                  <div>
                    <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded bg-pink-500 text-white">CYBER ARCADE</span>
                    <h1 className="text-3xl font-black text-white mt-2">NEON MATRIX DISCOUNT</h1>
                  </div>
                  <Link href="/order/mlbb" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs text-white shadow-xl w-fit mt-4" style={{ backgroundColor: "var(--color-primary)" }}>
                    Top Up Neon <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                <div className="border-2 rounded-3xl p-6 text-center flex flex-col justify-center" style={{ backgroundColor: "var(--color-input-bg)", borderColor: "var(--color-primary)" }}>
                  <span className="text-[10px] font-black uppercase text-purple-300">PROMO CODE</span>
                  <h2 className="text-2xl font-black text-white mt-1">CYBERVIOLET</h2>
                </div>
              </section>
            )}

            {layoutType === "vip-executive" && (
              <section className="max-w-7xl mx-auto px-4 pt-6">
                <div className="border-2 rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-4" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)" }}>
                  <div>
                    <span className="text-xs font-black uppercase text-amber-400 flex items-center gap-1">
                      <Award className="w-4 h-4" /> VIP PLATINUM MEMBERSHIP
                    </span>
                    <h1 className="text-3xl md:text-4xl font-black mt-1">Layanan Exclusive Top Up</h1>
                  </div>
                  <Link href="/order/mlbb" className="px-6 py-3 rounded-xl font-bold text-xs text-white shadow-xl" style={{ backgroundColor: "var(--color-primary)" }}>
                    Transaksi Prioritas
                  </Link>
                </div>
              </section>
            )}

            {layoutType === "hero-slider" && (
              <section className="max-w-7xl mx-auto px-4 pt-6">
                <div className="border rounded-3xl p-8 md:p-12 flex items-center justify-between" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                  <div>
                    <span className="text-xs font-bold uppercase text-emerald-400">INSTANT DISPATCH</span>
                    <h1 className="text-3xl md:text-5xl font-black mt-2">Platform Top Up #1</h1>
                  </div>
                </div>
              </section>
            )}

            {layoutType === "amoled-flat" && (
              <section className="max-w-7xl mx-auto px-4 pt-10 pb-4 text-left">
                <h1 className="text-4xl md:text-6xl font-black tracking-tight">
                  REVO<span style={{ color: "var(--color-primary)" }}>.ID</span> STORE
                </h1>
                <p className="text-xs mt-2" style={{ color: "var(--color-text-muted)" }}>Layanan PPOB, Pulsa, & Game dengan tampilan AMOLED Flat.</p>
              </section>
            )}

            {/* HERO TEMPLATE 9: LEADERBOARD & SPACING RAPI */}
            {layoutType === "card-grid-history" && (
              <section className="max-w-7xl mx-auto px-4 pt-6">
                <div
                  className="border rounded-3xl p-6 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl"
                  style={{
                    backgroundColor: "var(--color-bg-card, #1E1B4B)",
                    borderColor: "var(--color-primary, #6366F1)",
                  }}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border"
                      style={{
                        backgroundColor: "var(--color-input-bg, #0F172A)",
                        borderColor: "var(--color-primary, #6366F1)",
                        color: "var(--color-primary, #6366F1)",
                      }}
                    >
                      <TrendingUp className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                        TOP BUYER & POPULAR CHOICE
                      </span>
                      <h3 className="text-lg font-black text-white mt-0.5">Produk Terlaris Minggu Ini</h3>
                      <p className="text-xs mt-0.5" style={{ color: "var(--color-text-muted, #A5B4FC)" }}>
                        Mobile Legends, Free Fire, Valorant, DANA & PLN Prabayar
                      </p>
                    </div>
                  </div>

                  <span
                    className="px-4 py-2 rounded-xl text-xs font-extrabold uppercase tracking-wider border shrink-0 text-white shadow-md"
                    style={{
                      backgroundColor: "var(--color-primary, #6366F1)",
                      borderColor: "var(--color-primary, #6366F1)",
                    }}
                  >
                    4.9 / 5.0 Rating CS
                  </span>
                </div>
              </section>
            )}

            {layoutType === "cyber-hud" && (
              <section className="max-w-7xl mx-auto px-4 pt-6">
                <div className="border rounded-2xl p-4 font-mono text-xs flex justify-between items-center" style={{ backgroundColor: "var(--color-input-bg)", borderColor: "var(--color-primary)" }}>
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4" style={{ color: "var(--color-primary)" }} />
                    <span>[SYSTEM OK] - LIVE TRANSACTIONS ACTIVE</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400">ONLINE</span>
                </div>
              </section>
            )}

            {/* KATALOG PRODUK MAIN */}
            <section className="max-w-7xl mx-auto px-4 pt-8 pb-4">
              {/* FILTER CATEGORY */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                  {[
                    { id: "all", label: "Semua Produk", icon: Flame },
                    { id: "game", label: "Top Up Game", icon: Gamepad2 },
                    { id: "ppob", label: "Pulsa & PLN", icon: Smartphone },
                    { id: "ewallet", label: "E-Wallet", icon: Wallet },
                    { id: "voucher", label: "Voucher Digital", icon: Gift },
                  ].map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeCategory === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCategory(tab.id)}
                        className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border cursor-pointer active:scale-95"
                        style={{
                          backgroundColor: isActive ? "var(--color-primary, #00A3FF)" : "var(--color-bg-card, #1E293B)",
                          borderColor: isActive ? "var(--color-primary, #00A3FF)" : "var(--color-border, #334155)",
                          color: isActive ? "#FFFFFF" : "var(--color-text-muted, #94A3B8)",
                        }}
                      >
                        <Icon className="w-4 h-4" /> <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                <div className="relative w-full md:w-64">
                  <Search className="w-4 h-4 absolute left-3.5 top-2.5" style={{ color: "var(--color-text-muted, #94A3B8)" }} />
                  <input
                    type="text"
                    placeholder="Cari Layanan..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full border rounded-xl pl-10 pr-4 py-2 text-xs focus:outline-none"
                    style={{
                      backgroundColor: "var(--color-bg-card, #1E293B)",
                      borderColor: "var(--color-border, #334155)",
                      color: "var(--color-text-main, #FFFFFF)",
                    }}
                  />
                </div>
              </div>

              {/* TEMPLATE 1: DEFAULT 5-COLUMN GRID CARD */}
              {layoutType === "default" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredProducts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/order/${item.slug}`}
                      className="group border rounded-2xl p-3 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                      style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}
                    >
                      <div className={`w-full h-32 rounded-xl bg-gradient-to-br ${item.bg} border border-white/5 flex items-center justify-center p-3 shadow-inner overflow-hidden relative`}>
                        <img src={item.logoUrl} alt={item.title} className="max-w-full max-h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform" />
                      </div>
                      <div className="mt-3">
                        <span className="text-[9px] px-2 py-0.5 rounded-full font-bold border" style={{ backgroundColor: "var(--color-input-bg)", color: "var(--color-primary)", borderColor: "var(--color-border)" }}>
                          {item.tag}
                        </span>
                        <h3 className="text-xs font-bold mt-1.5 truncate">{item.title}</h3>
                        <p className="text-[10px]" style={{ color: "var(--color-text-muted)" }}>{item.publisher}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {layoutType === "esports-grid" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredProducts.map((item) => (
                    <Link key={item.slug} href={`/order/${item.slug}`} className="border-2 rounded-3xl p-4 text-center hover:scale-105 transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                      <img src={item.logoUrl} alt={item.title} className="h-20 mx-auto object-contain mb-2" />
                      <h3 className="text-xs font-black">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              )}

              {layoutType === "split-banner" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {filteredProducts.map((item) => (
                    <Link key={item.slug} href={`/order/${item.slug}`} className="border-2 rounded-2xl p-4 text-center hover:scale-105 transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)" }}>
                      <img src={item.logoUrl} alt={item.title} className="h-24 mx-auto object-contain mb-2" />
                      <h3 className="text-xs font-black text-white">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              )}

              {layoutType === "vip-executive" && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredProducts.map((item) => (
                    <Link key={item.slug} href={`/order/${item.slug}`} className="border-2 rounded-3xl p-5 flex items-center gap-4 hover:scale-[1.02] transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)" }}>
                      <img src={item.logoUrl} alt={item.title} className="h-16 object-contain" />
                      <h3 className="text-base font-black text-white">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              )}

              {layoutType === "hero-slider" && (
                <div className="relative group">
                  <button
                    onClick={() => scrollHorizontal("left")}
                    className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)", color: "#FFFFFF" }}
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <div ref={horizontalScrollRef} className="flex overflow-x-auto gap-4 pb-4 pt-2 scroll-smooth scrollbar-thin">
                    {filteredProducts.map((item) => (
                      <Link key={item.slug} href={`/order/${item.slug}`} className="min-w-[200px] border rounded-2xl p-5 shrink-0 text-center hover:scale-105 transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                        <img src={item.logoUrl} alt={item.title} className="h-20 mx-auto object-contain mb-3" />
                        <h4 className="text-xs font-bold text-white truncate">{item.title}</h4>
                      </Link>
                    ))}
                  </div>

                  <button
                    onClick={() => scrollHorizontal("right")}
                    className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full border shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)", color: "#FFFFFF" }}
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </div>
              )}

              {layoutType === "amoled-flat" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                  {filteredProducts.map((item) => (
                    <Link key={item.slug} href={`/order/${item.slug}`} className="border rounded-2xl p-3 text-center hover:scale-105 transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
                      <img src={item.logoUrl} alt={item.title} className="h-12 mx-auto object-contain mb-1" />
                      <h3 className="text-[11px] font-bold truncate">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              )}

              {/* TEMPLATE 9: APP STORE STYLE CARD DENGAN UKURAN LOGO PRESISI */}
              {layoutType === "card-grid-history" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {filteredProducts.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/order/${item.slug}`}
                      className="border rounded-2xl p-3.5 flex items-center gap-3.5 transition-all hover:scale-[1.02] shadow-md overflow-hidden group"
                      style={{
                        backgroundColor: "var(--color-bg-card, #1E1B4B)",
                        borderColor: "var(--color-border, #312E81)",
                      }}
                    >
                      <div
                        className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${item.bg} flex items-center justify-center p-2.5 shrink-0 border border-white/10 group-hover:scale-105 transition-transform overflow-hidden`}
                      >
                        <img
                          src={item.logoUrl}
                          alt={item.title}
                          className="max-w-full max-h-full object-contain filter drop-shadow-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0 pr-1">
                        <span
                          className="text-[9px] font-bold uppercase px-2 py-0.5 rounded border inline-block mb-1"
                          style={{
                            backgroundColor: "var(--color-input-bg, #0F172A)",
                            color: "var(--color-primary, #6366F1)",
                            borderColor: "var(--color-border, #312E81)",
                          }}
                        >
                          {item.tag}
                        </span>
                        <h3 className="text-xs font-bold text-white truncate leading-tight">{item.title}</h3>
                        <p className="text-[10px] truncate mt-0.5" style={{ color: "var(--color-text-muted, #A5B4FC)" }}>
                          {item.publisher}
                        </p>
                        <div className="flex items-center gap-1 mt-1 text-amber-400 text-[10px] font-bold">
                          <Star className="w-3 h-3 fill-amber-400" /> 4.9 <span className="text-[9px] text-slate-400 font-normal">(1.2k Ulasan)</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              {layoutType === "cyber-hud" && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 font-mono">
                  {filteredProducts.map((item) => (
                    <Link key={item.slug} href={`/order/${item.slug}`} className="border-2 rounded-2xl p-4 text-center hover:scale-105 transition-transform" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-primary)" }}>
                      <span className="text-[9px] text-emerald-400 block">[ONLINE]</span>
                      <img src={item.logoUrl} alt={item.title} className="h-16 mx-auto object-contain my-2" />
                      <h3 className="text-xs font-bold">{item.title}</h3>
                    </Link>
                  ))}
                </div>
              )}
            </section>
          </>
        )}

        {/* KEUNGGULAN FITUR */}
        <section className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border p-4 rounded-2xl flex items-center gap-4" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <Zap className="w-5 h-5" style={{ color: "var(--color-primary)" }} />
            <div>
              <h4 className="text-xs font-bold">Proses Serba Otomatis</h4>
              <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>Pesanan diproses hitungan detik 24/7</p>
            </div>
          </div>

          <div className="border p-4 rounded-2xl flex items-center gap-4" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <div>
              <h4 className="text-xs font-bold">Pembayaran 100% Aman</h4>
              <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>QRIS, E-Wallet, & Virtual Account lengkap</p>
            </div>
          </div>

          <div className="border p-4 rounded-2xl flex items-center gap-4" style={{ backgroundColor: "var(--color-bg-card)", borderColor: "var(--color-border)" }}>
            <Headphones className="w-5 h-5" style={{ color: "var(--color-accent)" }} />
            <div>
              <h4 className="text-xs font-bold">Layanan CS Responsive</h4>
              <p className="text-[11px]" style={{ color: "var(--color-text-muted)" }}>Bantuan siap sedia via WhatsApp</p>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}