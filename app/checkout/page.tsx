"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  CreditCard,
  QrCode,
  Wallet,
  Building2,
  HelpCircle,
  ArrowRight,
  X,
  CheckCircle2,
  Copy,
  Clock,
  Download,
  Share2,
} from "lucide-react";

const diamondItems = [
  { id: 1, name: "86 Diamonds", price: "Rp 23.500", bonus: "+8 Bonus", isPopular: false },
  { id: 2, name: "172 Diamonds", price: "Rp 46.800", bonus: "+16 Bonus", isPopular: true },
  { id: 3, name: "257 Diamonds", price: "Rp 69.900", bonus: "+23 Bonus", isPopular: false },
  { id: 4, name: "344 Diamonds", price: "Rp 93.500", bonus: "+30 Bonus", isPopular: false },
  { id: 5, name: "429 Diamonds", price: "Rp 116.000", bonus: "+39 Bonus", isPopular: false },
  { id: 6, name: "706 Diamonds", price: "Rp 188.000", bonus: "+64 Bonus", isPopular: true },
];

const paymentMethods = [
  {
    category: "QRIS & Instant Pay",
    items: [
      { id: "qris", name: "QRIS All Payment", icon: QrCode, fee: "Gratis Biaya Admin", badge: "Otomatis" },
    ],
  },
  {
    category: "E-Wallet",
    items: [
      { id: "dana", name: "DANA", icon: Wallet, fee: "+ Rp 1.000", badge: "Instan" },
      { id: "gopay", name: "GoPay", icon: Wallet, fee: "+ Rp 1.000", badge: "Instan" },
      { id: "ovo", name: "OVO", icon: Wallet, fee: "+ Rp 1.000", badge: "Instan" },
    ],
  },
  {
    category: "Virtual Account",
    items: [
      { id: "bca", name: "BCA Virtual Account", icon: Building2, fee: "+ Rp 2.500", badge: "24 Jam" },
      { id: "mandiri", name: "Mandiri Virtual Account", icon: Building2, fee: "+ Rp 2.500", badge: "24 Jam" },
    ],
  },
];

export default function CheckoutPage() {
  const [userId, setUserId] = useState("12345678");
  const [zoneId, setZoneId] = useState("1234");
  const [selectedItem, setSelectedItem] = useState(diamondItems[1]);
  const [selectedPayment, setSelectedPayment] = useState("qris");
  const [whatsapp, setWhatsapp] = useState("081234567890");

  // State Modals
  const [showQrisModal, setShowQrisModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 Menit Countdown

  // Countdown Timer Effect
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
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handlePayNow = () => {
    if (!userId || !zoneId) {
      alert("Harap isi User ID dan Zone ID terlebih dahulu!");
      return;
    }
    setShowQrisModal(true);
  };

  const handleSimulatePaymentSuccess = () => {
    setShowQrisModal(false);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] pb-16">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 pt-6">
        {/* GAME BANNER HEADER */}
        <div className="relative overflow-hidden rounded-2xl bg-[#1E293B] border border-[#334155] p-6 mb-6">
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-900 flex items-center justify-center font-bold text-white text-xl shadow-lg border border-white/10 shrink-0">
              MLBB
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 px-2 py-0.5 rounded-full font-bold">
                  Moonton
                </span>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Proses Instan
                </span>
              </div>
              <h1 className="text-xl md:text-2xl font-black text-white mt-1">Mobile Legends: Bang Bang</h1>
              <p className="text-xs text-[#94A3B8] mt-0.5">Top up Diamond resmi dan terpercaya 24 Jam non-stop</p>
            </div>
          </div>
        </div>

        {/* MAIN CHECKOUT FORM (2 COLUMNS) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT COLUMN: INPUT FORM */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* STEP 1: DATA AKUN */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#00A3FF] text-white font-bold flex items-center justify-center text-xs">
                  1
                </div>
                <h2 className="text-sm md:text-base font-bold text-white">Masukkan Data Akun</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-[#94A3B8] block mb-1.5 font-medium">User ID</label>
                  <input
                    type="text"
                    placeholder="Contoh: 12345678"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs text-[#94A3B8] block mb-1.5 font-medium">Zone ID / Server</label>
                  <input
                    type="text"
                    placeholder="Contoh: 1234"
                    value={zoneId}
                    onChange={(e) => setZoneId(e.target.value)}
                    className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
                  />
                </div>
              </div>
              <p className="text-[11px] text-[#94A3B8] mt-3 flex items-center gap-1">
                <HelpCircle className="w-3.5 h-3.5 text-[#00A3FF]" /> Buka profil game kamu untuk melihat User ID & Zone ID.
              </p>
            </div>

            {/* STEP 2: NOMINAL TOP UP */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#00A3FF] text-white font-bold flex items-center justify-center text-xs">
                  2
                </div>
                <h2 className="text-sm md:text-base font-bold text-white">Pilih Nominal Top Up</h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {diamondItems.map((item) => {
                  const isSelected = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => setSelectedItem(item)}
                      className={`relative p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "bg-[#00A3FF]/10 border-[#00A3FF] shadow-lg shadow-[#00A3FF]/10"
                          : "bg-[#0B0F17] border-[#334155] hover:border-slate-500"
                      }`}
                    >
                      {item.isPopular && (
                        <span className="absolute top-0 right-0 bg-[#FFB800] text-[#0B0F17] text-[9px] font-black px-2 py-0.5 rounded-bl-lg rounded-tr-xl uppercase">
                          Hot
                        </span>
                      )}
                      <p className="text-xs font-bold text-white">{item.name}</p>
                      <p className="text-[10px] text-emerald-400 font-medium mt-0.5">{item.bonus}</p>
                      <p className={`text-xs font-extrabold mt-3 ${isSelected ? "text-[#00A3FF]" : "text-white"}`}>
                        {item.price}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 3: METODE PEMBAYARAN */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#00A3FF] text-white font-bold flex items-center justify-center text-xs">
                  3
                </div>
                <h2 className="text-sm md:text-base font-bold text-white">Pilih Metode Pembayaran</h2>
              </div>

              <div className="flex flex-col gap-5">
                {paymentMethods.map((group) => (
                  <div key={group.category}>
                    <p className="text-xs font-semibold text-[#94A3B8] mb-2">{group.category}</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {group.items.map((pay) => {
                        const Icon = pay.icon;
                        const isSelected = selectedPayment === pay.id;
                        return (
                          <button
                            key={pay.id}
                            onClick={() => setSelectedPayment(pay.id)}
                            className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                              isSelected
                                ? "bg-[#00A3FF]/10 border-[#00A3FF]"
                                : "bg-[#0B0F17] border-[#334155] hover:border-slate-500"
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-slate-800 border border-[#334155] flex items-center justify-center text-[#00A3FF]">
                                <Icon className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-bold text-white">{pay.name}</p>
                                <p className="text-[10px] text-[#94A3B8]">{pay.fee}</p>
                              </div>
                            </div>
                            <span className="text-[9px] bg-[#334155] text-[#94A3B8] px-2 py-0.5 rounded font-medium">
                              {pay.badge}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* STEP 4: KONTAK NO WHATSAPP */}
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 md:p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-7 h-7 rounded-lg bg-[#00A3FF] text-white font-bold flex items-center justify-center text-xs">
                  4
                </div>
                <h2 className="text-sm md:text-base font-bold text-white">Nomor WhatsApp (Bukti Transaksi)</h2>
              </div>

              <input
                type="text"
                placeholder="Contoh: 081234567890"
                value={whatsapp}
                onChange={(e) => setWhatsapp(e.target.value)}
                className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF] transition-all"
              />
            </div>

          </div>

          {/* RIGHT COLUMN: ORDER SUMMARY (STICKY CARD) */}
          <div className="lg:col-span-1">
            <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 md:p-6 sticky top-20 shadow-xl flex flex-col gap-4">
              <h3 className="text-sm font-bold text-white border-b border-[#334155] pb-3">
                Ringkasan Pesanan
              </h3>

              <div className="flex flex-col gap-2.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Game:</span>
                  <span className="font-bold text-white">Mobile Legends</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Data Akun:</span>
                  <span className="font-mono text-white">
                    {userId} ({zoneId})
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Item:</span>
                  <span className="font-bold text-white">{selectedItem.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#94A3B8]">Pembayaran:</span>
                  <span className="font-bold uppercase text-[#00A3FF]">{selectedPayment}</span>
                </div>

                <div className="h-[1px] bg-[#334155] my-1" />

                <div className="flex justify-between items-center text-sm">
                  <span className="font-bold text-white">Total Bayar:</span>
                  <span className="font-black text-base text-[#00A3FF]">{selectedItem.price}</span>
                </div>
              </div>

              <button
                onClick={handlePayNow}
                className="w-full py-3 bg-[#00A3FF] hover:bg-blue-600 text-white font-bold text-xs md:text-sm rounded-xl transition-all shadow-lg shadow-[#00A3FF]/25 flex items-center justify-center gap-2 mt-2"
              >
                Bayar Sekarang <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-[#94A3B8] text-center pt-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> Transaksi Terenkripsi & 100% Aman
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================= */}
      {/* 1. MODAL PEMBAYARAN QRIS */}
      {/* ========================================================= */}
      {showQrisModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1E293B] border border-[#334155] w-full max-w-md rounded-2xl p-6 shadow-2xl relative flex flex-col items-center text-center">
            <button
              onClick={() => setShowQrisModal(false)}
              className="absolute top-4 right-4 text-[#94A3B8] hover:text-white p-1 rounded-lg bg-slate-800 border border-[#334155]"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 px-3 py-1 rounded-full font-bold mb-2">
              Menunggu Pembayaran
            </span>
            <h3 className="text-lg font-black text-white">Scan QRIS Untuk Membayar</h3>
            <p className="text-xs text-[#94A3B8] mt-1">Buka aplikasi GoPay, OVO, DANA, ShopeePay, atau Mobile Banking</p>

            {/* COUNTDOWN TIMER */}
            <div className="flex items-center gap-2 bg-[#0B0F17] border border-[#334155] px-4 py-2 rounded-xl mt-4 mb-4">
              <Clock className="w-4 h-4 text-[#FFB800]" />
              <span className="text-xs text-[#94A3B8]">Batas Waktu:</span>
              <span className="text-sm font-extrabold font-mono text-[#FFB800]">{formatTime(timeLeft)}</span>
            </div>

            {/* QR CODE DISPLAY */}
            <div className="bg-white p-4 rounded-2xl border-4 border-[#00A3FF]/30 shadow-inner my-2">
              {/* Dummy QR Code Pattern */}
              <div className="w-48 h-48 bg-slate-900 rounded-lg p-2 flex flex-col justify-between items-center relative overflow-hidden">
                <div className="w-full flex justify-between">
                  <div className="w-12 h-12 border-4 border-white bg-black"></div>
                  <div className="w-12 h-12 border-4 border-white bg-black"></div>
                </div>
                <div className="text-white text-[10px] font-black tracking-widest bg-black px-2 py-1 rounded border border-white">
                  REVO.ID QRIS
                </div>
                <div className="w-full flex justify-between">
                  <div className="w-12 h-12 border-4 border-white bg-black"></div>
                  <div className="w-8 h-8 bg-white"></div>
                </div>
              </div>
            </div>

            <div className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl p-3 mt-3 flex items-center justify-between text-xs">
              <span className="text-[#94A3B8]">Total Tagihan:</span>
              <span className="font-extrabold text-[#00A3FF] text-base">{selectedItem.price}</span>
            </div>

            {/* ACTION BUTTONS SIMULASI */}
            <div className="w-full flex flex-col gap-2 mt-5">
              <button
                onClick={handleSimulatePaymentSuccess}
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" /> Simulasi Bayar Sekarang
              </button>
              <button
                onClick={() => setShowQrisModal(false)}
                className="w-full py-2.5 bg-[#0B0F17] border border-[#334155] text-[#94A3B8] hover:text-white font-medium text-xs rounded-xl"
              >
                Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* 2. MODAL SUCCESS TRANSAKSI */}
      {/* ========================================================= */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#1E293B] border border-[#334155] w-full max-w-md rounded-2xl p-6 shadow-2xl relative flex flex-col items-center text-center">
            
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/20">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h3 className="text-xl font-black text-white">Pembayaran Berhasil!</h3>
            <p className="text-xs text-[#94A3B8] mt-1">Item Diamond otomatis diproses ke akun kamu dalam hitungan detik.</p>

            {/* INVOICE CARD DETAILS */}
            <div className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl p-4 mt-4 text-left flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between border-b border-[#334155] pb-2">
                <span className="text-[#94A3B8]">No. Invoice:</span>
                <span className="font-mono font-bold text-white flex items-center gap-1">
                  REV-2026101299 <Copy className="w-3 h-3 text-[#00A3FF] cursor-pointer" />
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Game:</span>
                <span className="font-bold text-white">Mobile Legends</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">User ID:</span>
                <span className="font-mono text-white">{userId} ({zoneId})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Item:</span>
                <span className="font-bold text-emerald-400">{selectedItem.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#94A3B8]">Metode Bayar:</span>
                <span className="font-bold uppercase text-white">{selectedPayment}</span>
              </div>
              <div className="flex justify-between border-t border-[#334155] pt-2 font-bold">
                <span className="text-[#94A3B8]">Total Pembayaran:</span>
                <span className="text-[#00A3FF] text-sm">{selectedItem.price}</span>
              </div>
            </div>

            {/* ACTION BUTTONS */}
            <div className="w-full grid grid-cols-2 gap-3 mt-5">
              <Link
                href="/dashboard"
                className="py-3 bg-[#00A3FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl transition-all text-center flex items-center justify-center gap-1.5 shadow-md shadow-[#00A3FF]/20"
              >
                Cek Transaksi
              </Link>
              <Link
                href="/"
                className="py-3 bg-[#0B0F17] border border-[#334155] text-white hover:bg-slate-800 font-bold text-xs rounded-xl transition-all text-center"
              >
                Beli Lagi
              </Link>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}