"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { productsData } from "@/data/products";
import { applyActiveTheme } from "@/utils/themeHelper";
import {
  Zap,
  QrCode,
  Wallet,
  ArrowRight,
  ArrowLeft,
  X,
  CheckCircle2,
  UserCheck,
  Loader2,
} from "lucide-react";

interface CheckoutContentProps {
  slug: string;
}

// ----------------------------------------------------------------------
// HELPER COMPONENT FORM STEPS
// ----------------------------------------------------------------------
interface FormStepsProps {
  layoutType: string;
  product: any;
  userId: string;
  setUserId: (val: string) => void;
  zoneId: string;
  setZoneId: (val: string) => void;
  selectedItem: any;
  setSelectedItem: (item: any) => void;
  selectedPayment: string;
  setSelectedPayment: (pay: string) => void;
  nickname: string;
  checkingNick: boolean;
  onCheckNickname: () => void;
}

function FormSteps({
  layoutType,
  product,
  userId,
  setUserId,
  zoneId,
  setZoneId,
  selectedItem,
  setSelectedItem,
  selectedPayment,
  setSelectedPayment,
  nickname,
  checkingNick,
  onCheckNickname,
}: FormStepsProps) {
  return (
    <div className="flex flex-col gap-6">
      {/* STEP 1: DATA AKUN */}
      <div
        className={`border rounded-2xl p-5 md:p-6 transition-colors duration-300 ${
          layoutType === "amoled-flat" ? "bg-transparent" : ""
        }`}
        style={{
          backgroundColor:
            layoutType === "amoled-flat"
              ? "transparent"
              : "var(--color-bg-card, #1E293B)",
          borderColor: "var(--color-border, #334155)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs"
            style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
          >
            1
          </div>
          <h2 className="text-sm md:text-base font-bold text-white">
            Masukkan Data Akun
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              className="text-xs block mb-1.5 font-medium"
              style={{ color: "var(--color-text-muted, #94A3B8)" }}
            >
              {product.idLabel}
            </label>
            <input
              type="text"
              placeholder={product.placeholderId}
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="w-full border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
              style={{
                backgroundColor: "var(--color-input-bg, #0B0F17)",
                borderColor: "var(--color-border, #334155)",
                color: "var(--color-text-main, #FFFFFF)",
              }}
            />
          </div>

          {product.accountInputType === "game_zone" && (
            <div>
              <label
                className="text-xs block mb-1.5 font-medium"
                style={{ color: "var(--color-text-muted, #94A3B8)" }}
              >
                {product.zoneLabel}
              </label>
              <input
                type="text"
                placeholder={product.placeholderZone}
                value={zoneId}
                onChange={(e) => setZoneId(e.target.value)}
                className="w-full border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                style={{
                  backgroundColor: "var(--color-input-bg, #0B0F17)",
                  borderColor: "var(--color-border, #334155)",
                  color: "var(--color-text-main, #FFFFFF)",
                }}
              />
            </div>
          )}
        </div>

        {/* TOMBOL & BADGE CEK NICKNAME */}
        <div className="flex flex-wrap items-center gap-3 mt-4 pt-3 border-t border-slate-800">
          <button
            type="button"
            onClick={onCheckNickname}
            disabled={checkingNick}
            className="bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-500/30 text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5 disabled:opacity-50 cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            {checkingNick ? "Mengecek ID..." : "Cek Nickname"}
          </button>

          {nickname && (
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>
                Akun: <strong className="text-white">{nickname}</strong>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* STEP 2: NOMINAL PILIHAN */}
      <div
        className={`border rounded-2xl p-5 md:p-6 transition-colors duration-300 ${
          layoutType === "amoled-flat" ? "bg-transparent" : ""
        }`}
        style={{
          backgroundColor:
            layoutType === "amoled-flat"
              ? "transparent"
              : "var(--color-bg-card, #1E293B)",
          borderColor: "var(--color-border, #334155)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs"
            style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
          >
            2
          </div>
          <h2 className="text-sm md:text-base font-bold text-white">
            Pilih Nominal Item
          </h2>
        </div>

        <div
          className={`grid ${
            layoutType === "hero-slider"
              ? "flex overflow-x-auto pb-2 scrollbar-none"
              : "grid-cols-2 sm:grid-cols-3"
          } gap-3`}
        >
          {product.items.map((item: any) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedItem(item)}
                className={`relative p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  layoutType === "hero-slider" ? "min-w-[150px] shrink-0" : ""
                }`}
                style={{
                  backgroundColor: isSelected
                    ? "var(--color-input-bg, #0B0F17)"
                    : "var(--color-bg-card, #1E293B)",
                  borderColor: isSelected
                    ? "var(--color-primary, #00A3FF)"
                    : "var(--color-border, #334155)",
                }}
              >
                {item.isPopular && (
                  <span className="absolute top-0 right-0 bg-[#FFB800] text-[#0B0F17] text-[9px] font-black px-2 py-0.5 rounded-bl-lg rounded-tr-xl uppercase">
                    Hot
                  </span>
                )}
                <p className="text-xs font-bold text-white">{item.name}</p>
                {item.bonus && (
                  <p className="text-[10px] text-emerald-400 font-medium mt-0.5">
                    {item.bonus}
                  </p>
                )}
                <p
                  className="text-xs font-extrabold mt-3"
                  style={{
                    color: isSelected
                      ? "var(--color-primary, #00A3FF)"
                      : "var(--color-text-main, #FFFFFF)",
                  }}
                >
                  {item.price}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* STEP 3: METODE PEMBAYARAN */}
      <div
        className={`border rounded-2xl p-5 md:p-6 transition-colors duration-300 ${
          layoutType === "amoled-flat" ? "bg-transparent" : ""
        }`}
        style={{
          backgroundColor:
            layoutType === "amoled-flat"
              ? "transparent"
              : "var(--color-bg-card, #1E293B)",
          borderColor: "var(--color-border, #334155)",
        }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className="w-7 h-7 rounded-lg text-white font-bold flex items-center justify-center text-xs"
            style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
          >
            3
          </div>
          <h2 className="text-sm md:text-base font-bold text-white">
            Pilih Metode Pembayaran
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setSelectedPayment("qris")}
            className="flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer"
            style={{
              backgroundColor:
                selectedPayment === "qris"
                  ? "var(--color-input-bg, #0B0F17)"
                  : "var(--color-bg-card, #1E293B)",
              borderColor:
                selectedPayment === "qris"
                  ? "var(--color-primary, #00A3FF)"
                  : "var(--color-border, #334155)",
            }}
          >
            <div className="flex items-center gap-3">
              <QrCode
                className="w-6 h-6"
                style={{ color: "var(--color-primary, #00A3FF)" }}
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white">QRIS All Payment</p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--color-text-muted, #94A3B8)" }}
                >
                  Bebas Biaya Admin
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setSelectedPayment("dana")}
            className="flex items-center justify-between p-3.5 rounded-xl border transition-all cursor-pointer"
            style={{
              backgroundColor:
                selectedPayment === "dana"
                  ? "var(--color-input-bg, #0B0F17)"
                  : "var(--color-bg-card, #1E293B)",
              borderColor:
                selectedPayment === "dana"
                  ? "var(--color-primary, #00A3FF)"
                  : "var(--color-border, #334155)",
            }}
          >
            <div className="flex items-center gap-3">
              <Wallet
                className="w-6 h-6"
                style={{ color: "var(--color-primary, #00A3FF)" }}
              />
              <div className="text-left">
                <p className="text-xs font-bold text-white">DANA / GoPay</p>
                <p
                  className="text-[10px]"
                  style={{ color: "var(--color-text-muted, #94A3B8)" }}
                >
                  Instan 24 Jam
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------------------------
// MAIN COMPONENT
// ----------------------------------------------------------------------
export default function CheckoutContent({ slug }: CheckoutContentProps) {
  const product = productsData[slug] || productsData["mlbb"];

  const [userId, setUserId] = useState("");
  const [zoneId, setZoneId] = useState("");
  const [selectedItem, setSelectedItem] = useState(product.items[0]);
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [layoutType, setLayoutType] = useState("default");

  // State Nickname Checker
  const [nickname, setNickname] = useState("");
  const [checkingNick, setCheckingNick] = useState(false);

  // State Modals & QRIS
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);
  const [qrisUrl, setQrisUrl] = useState("");
  const [loadingPay, setLoadingPay] = useState(false);
  const [simulating, setSimulating] = useState(false);
  const [createdInvoice, setCreatedInvoice] = useState("");

  useEffect(() => {
    const activeTheme = applyActiveTheme();
    if (activeTheme?.layoutType) {
      setLayoutType(activeTheme.layoutType);
    }
  }, []);

  useEffect(() => {
    if (product) {
      setSelectedItem(product.items[0]);
    }
  }, [slug]);

  useEffect(() => {
    if (!showQrisModal) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [showQrisModal]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  // Helper untuk membersihkan string harga ke angka murni (misal: "Rp 23.500" -> 23500)
  const parseNumericPrice = (priceStr: string | number): number => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 0;
    return Number(priceStr.replace(/[^0-9]/g, "")) || 0;
  };

  // HANDLER CEK NICKNAME ID GAME
  const handleCheckNickname = async () => {
    if (!userId) {
      alert(`Harap isi ${product.idLabel} terlebih dahulu!`);
      return;
    }

    setCheckingNick(true);
    setNickname("");

    try {
      const res = await fetch("/api/nickname/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          zoneId,
          game: slug,
        }),
      });

      const result = await res.json();

      if (result.success && result.data?.nickname) {
        setNickname(result.data.nickname);
      } else {
        alert(result.message || "ID tidak ditemukan. Periksa kembali ID Akun Anda.");
      }
    } catch (err) {
      alert("Gagal melakukan verifikasi Nickname ID.");
    } finally {
      setCheckingNick(false);
    }
  };

  const handlePayNow = async () => {
    if (!userId) {
      alert(`Harap isi ${product.idLabel} terlebih dahulu!`);
      return;
    }

    setLoadingPay(true);

    try {
      const res = await fetch("/api/checkout/qris", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productName: `${product.title} - ${selectedItem?.name}`,
          amount: parseNumericPrice(selectedItem?.price),
          userId: userId,
          zoneId: zoneId,
          customerPhone: "08123456789",
        }),
      });

      const result = await res.json();

      if (result.success && result.data?.qrisUrl) {
        setQrisUrl(result.data.qrisUrl);
      } else {
        const dummyPayload = `00020101021226680016ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5910ABIPAY.ID6013JAKARTA6304ABCD`;
        setQrisUrl(
          `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
            dummyPayload
          )}`
        );
      }
    } catch (err) {
      const dummyPayload = `00020101021226680016ID.CO.QRIS.WWW01189360091400000000005204581253033605802ID5910ABIPAY.ID6013JAKARTA6304ABCD`;
      setQrisUrl(
        `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(
          dummyPayload
        )}`
      );
    } finally {
      setLoadingPay(false);
      setShowQrisModal(true);
    }
  };

  // HANDLER SIMULASI BAYAR (MENYIMPAN DENGAN SUKSES KE DATABASE POSTGRESQL NEON VIA VERCEL)
  const handleSimulatePayment = async () => {
    setSimulating(true);
    const invoiceNum = `INV-${slug.toUpperCase()}-${Date.now()}`;

    try {
      const numericAmount = parseNumericPrice(selectedItem?.price);

      const res = await fetch("/api/transactions/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          merchantRef: invoiceNum,
          productName: `${product.title} - ${selectedItem?.name}`,
          amount: numericAmount,
          targetAccount: `${userId}${zoneId ? ` (${zoneId})` : ""}`,
          customerPhone: "08123456789",
          paymentStatus: "PAID",
          deliveryStatus: "PROCESSING",
        }),
      });

      const result = await res.json();

      if (result.success || res.ok) {
        setCreatedInvoice(invoiceNum);
        setShowQrisModal(false);
        setShowSuccessModal(true);
      } else {
        alert("Gagal menyimpan transaksi ke Neon DB: " + (result.message || "Error server"));
      }
    } catch (error) {
      console.error("Gagal simpan transaksi ke Vercel/Neon DB:", error);
      alert("Terjadi kesalahan koneksi saat memproses pembayaran.");
    } finally {
      setSimulating(false);
    }
  };

  // HELPER KOMPONEN RINGKASAN PESANAN
  const SummaryBox = () => (
    <div
      className="border rounded-2xl p-5 md:p-6 sticky top-20 shadow-xl flex flex-col gap-4 transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg-card, #1E293B)",
        borderColor: "var(--color-border, #334155)",
      }}
    >
      <h3
        className="text-sm font-bold text-white border-b pb-3"
        style={{ borderColor: "var(--color-border, #334155)" }}
      >
        Ringkasan Pesanan
      </h3>

      <div className="flex flex-col gap-2.5 text-xs">
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted, #94A3B8)" }}>
            Produk:
          </span>
          <span className="font-bold text-white">{product.title}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted, #94A3B8)" }}>
            Data Akun:
          </span>
          <span className="font-mono text-white">
            {userId ? `${userId} ${zoneId ? `(${zoneId})` : ""}` : "Belum diisi"}
          </span>
        </div>
        {nickname && (
          <div className="flex justify-between">
            <span style={{ color: "var(--color-text-muted, #94A3B8)" }}>
              Nickname:
            </span>
            <span className="font-bold text-emerald-400">{nickname}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted, #94A3B8)" }}>
            Item:
          </span>
          <span className="font-bold text-white">{selectedItem?.name}</span>
        </div>
        <div className="flex justify-between">
          <span style={{ color: "var(--color-text-muted, #94A3B8)" }}>
            Pembayaran:
          </span>
          <span
            className="font-bold uppercase"
            style={{ color: "var(--color-primary, #00A3FF)" }}
          >
            {selectedPayment}
          </span>
        </div>

        <div
          className="h-[1px] my-1"
          style={{ backgroundColor: "var(--color-border, #334155)" }}
        />

        <div className="flex justify-between items-center text-sm">
          <span className="font-bold text-white">Total Bayar:</span>
          <span
            className="font-black text-base"
            style={{ color: "var(--color-primary, #00A3FF)" }}
          >
            {selectedItem?.price}
          </span>
        </div>
      </div>

      <button
        onClick={handlePayNow}
        disabled={loadingPay}
        className="w-full py-3 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 mt-2 hover:opacity-90 disabled:opacity-50 cursor-pointer"
        style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
      >
        {loadingPay ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" /> Memproses QRIS...
          </>
        ) : (
          <>
            Bayar Sekarang <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </div>
  );

  return (
    <div
      className="min-h-screen text-white pb-16 flex flex-col justify-between transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg-main, #0B0F17)",
        color: "var(--color-text-main, #FFFFFF)",
      }}
    >
      <div>
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 pt-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold hover:underline mb-4"
            style={{ color: "var(--color-primary, #00A3FF)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Katalog Produk
          </Link>

          {/* DYNAMIC HEADER BANNER WITH PRODUCT LOGO */}
          <div
            className={`relative overflow-hidden rounded-2xl border p-6 mb-6 transition-colors duration-300 ${
              layoutType === "hero-slider"
                ? "bg-gradient-to-r from-slate-900 to-black py-10"
                : ""
            }`}
            style={{
              backgroundColor:
                layoutType === "hero-slider"
                  ? undefined
                  : "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)",
            }}
          >
            <div className="flex items-center gap-4 relative z-10">
              <div
                className={`w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr ${product.bg} flex items-center justify-center p-2 shadow-lg border border-white/10 shrink-0 overflow-hidden relative`}
              >
                <img
                  src={product.logoUrl}
                  alt={product.title}
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                  className="max-w-full max-h-full object-contain filter drop-shadow-md"
                />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[10px] border px-2 py-0.5 rounded-full font-bold"
                    style={{
                      backgroundColor: "var(--color-input-bg, #0B0F17)",
                      color: "var(--color-primary, #00A3FF)",
                      borderColor: "var(--color-border, #334155)",
                    }}
                  >
                    {product.publisher}
                  </span>
                  <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Proses Instan
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-black text-white mt-1">
                  {product.title}
                </h1>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "var(--color-text-muted, #94A3B8)" }}
                >
                  Layanan resmi dan terpercaya 24 Jam non-stop
                </p>
              </div>
            </div>
          </div>

          {/* RENDER DYNAMIC LAYOUT VARIATIONS */}
          {(layoutType === "default" ||
            layoutType === "vip-executive" ||
            layoutType === "amoled-flat" ||
            layoutType === "hero-slider") && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <FormSteps
                  layoutType={layoutType}
                  product={product}
                  userId={userId}
                  setUserId={setUserId}
                  zoneId={zoneId}
                  setZoneId={setZoneId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  nickname={nickname}
                  checkingNick={checkingNick}
                  onCheckNickname={handleCheckNickname}
                />
              </div>
              <div className="lg:col-span-1">
                <SummaryBox />
              </div>
            </div>
          )}

          {layoutType === "minimal-stepper" && (
            <div className="max-w-2xl mx-auto">
              <FormSteps
                layoutType={layoutType}
                product={product}
                userId={userId}
                setUserId={setUserId}
                zoneId={zoneId}
                setZoneId={setZoneId}
                selectedItem={selectedItem}
                setSelectedItem={setSelectedItem}
                selectedPayment={selectedPayment}
                setSelectedPayment={setSelectedPayment}
                nickname={nickname}
                checkingNick={checkingNick}
                onCheckNickname={handleCheckNickname}
              />
              <div className="mt-6">
                <SummaryBox />
              </div>
            </div>
          )}

          {layoutType === "esports-grid" && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-3">
                <FormSteps
                  layoutType={layoutType}
                  product={product}
                  userId={userId}
                  setUserId={setUserId}
                  zoneId={zoneId}
                  setZoneId={setZoneId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  nickname={nickname}
                  checkingNick={checkingNick}
                  onCheckNickname={handleCheckNickname}
                />
              </div>
              <div className="lg:col-span-1">
                <SummaryBox />
              </div>
            </div>
          )}

          {layoutType === "split-banner" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div
                className="lg:col-span-1 border rounded-2xl p-6 flex flex-col justify-between"
                style={{
                  backgroundColor: "var(--color-bg-card)",
                  borderColor: "var(--color-border)",
                }}
              >
                <div>
                  <h2 className="text-lg font-black">{product.title}</h2>
                  <p
                    className="text-xs mt-2"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    Top up instant dengan jaminan garansi 100% resmi.
                  </p>
                  <div className="mt-6 flex flex-col gap-2 text-xs">
                    <span className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Buka 24 Jam
                    </span>
                    <span className="flex items-center gap-2 text-emerald-400">
                      <CheckCircle2 className="w-4 h-4" /> Garansi Refund
                    </span>
                  </div>
                </div>
                <SummaryBox />
              </div>
              <div className="lg:col-span-2">
                <FormSteps
                  layoutType={layoutType}
                  product={product}
                  userId={userId}
                  setUserId={setUserId}
                  zoneId={zoneId}
                  setZoneId={setZoneId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  nickname={nickname}
                  checkingNick={checkingNick}
                  onCheckNickname={handleCheckNickname}
                />
              </div>
            </div>
          )}

          {(layoutType === "reversed-sidebar" ||
            layoutType === "card-grid-history" ||
            layoutType === "cyber-hud") && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-1 order-2 lg:order-1">
                <SummaryBox />
              </div>
              <div className="lg:col-span-2 order-1 lg:order-2">
                <FormSteps
                  layoutType={layoutType}
                  product={product}
                  userId={userId}
                  setUserId={setUserId}
                  zoneId={zoneId}
                  setZoneId={setZoneId}
                  selectedItem={selectedItem}
                  setSelectedItem={setSelectedItem}
                  selectedPayment={selectedPayment}
                  setSelectedPayment={setSelectedPayment}
                  nickname={nickname}
                  checkingNick={checkingNick}
                  onCheckNickname={handleCheckNickname}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* MODAL QRIS */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div
            className="border w-full max-w-md rounded-2xl p-6 text-center relative transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)",
              color: "var(--color-text-main, #FFFFFF)",
            }}
          >
            <button
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 p-1 rounded-lg border cursor-pointer"
              style={{
                backgroundColor: "var(--color-input-bg, #0B0F17)",
                borderColor: "var(--color-border, #334155)",
                color: "var(--color-text-muted, #94A3B8)",
              }}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-black text-white">
              Scan QRIS untuk Pembayaran {product.title}
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-text-muted, #94A3B8)" }}
            >
              Batas Waktu: {formatTime(timeLeft)}
            </p>

            {/* GAMBAR QRIS */}
            <div
              className="bg-white p-3 rounded-2xl w-52 h-52 mx-auto my-4 flex items-center justify-center border-4 shadow-inner overflow-hidden"
              style={{ borderColor: "var(--color-border, #334155)" }}
            >
              {qrisUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={qrisUrl}
                  alt={`QRIS ${product.title}`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="text-xs text-slate-800 font-bold">
                  Memuat Kode QRIS...
                </div>
              )}
            </div>

            <button
              onClick={handleSimulatePayment}
              disabled={simulating}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg mt-2 transition-all disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
            >
              {simulating ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Menyimpan Transaksi...
                </>
              ) : (
                "Simulasi Bayar Sekarang"
              )}
            </button>
          </div>
        </div>
      )}

      {/* MODAL SUCCESS */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div
            className="border w-full max-w-md rounded-2xl p-6 text-center relative transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)",
              color: "var(--color-text-main, #FFFFFF)",
            }}
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-black text-white">
              Pembayaran Berhasil!
            </h3>
            <p
              className="text-xs mt-1"
              style={{ color: "var(--color-text-muted, #94A3B8)" }}
            >
              {selectedItem?.name} berhasil dikirim ke ID {userId}.
            </p>

            <div className="bg-[#0B0F17] border border-[#334155] rounded-xl p-3 mt-4 text-xs font-mono text-blue-400">
              No Invoice: {createdInvoice}
            </div>

            <div className="w-full grid grid-cols-2 gap-3 mt-6">
              <Link
                href="/admin/transactions"
                className="py-3 text-white font-bold text-xs rounded-xl text-center shadow-md transition-all hover:opacity-90"
                style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
              >
                Cek Transaksi
              </Link>
              <Link
                href="/"
                className="py-3 border text-white font-bold text-xs rounded-xl text-center transition-all"
                style={{
                  backgroundColor: "var(--color-input-bg, #0B0F17)",
                  borderColor: "var(--color-border, #334155)",
                }}
              >
                Top Up Lainnya
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}