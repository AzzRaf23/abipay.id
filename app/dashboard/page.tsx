"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { applyActiveTheme } from "@/utils/themeHelper";
import {
  History,
  Wallet,
  Settings,
  LogOut,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Phone,
} from "lucide-react";

// Mock Data Riwayat Transaksi
const transactionHistory = [
  {
    id: "TRX-20261012-001",
    product: "Mobile Legends",
    item: "172 Diamonds",
    price: "Rp 46.800",
    date: "12 Okt 2026, 11:20 WIB",
    status: "Berhasil",
    payment: "QRIS",
  },
  {
    id: "TRX-20261011-084",
    product: "Free Fire",
    item: "355 Diamonds",
    price: "Rp 48.000",
    date: "11 Okt 2026, 19:45 WIB",
    status: "Berhasil",
    payment: "DANA",
  },
  {
    id: "TRX-20261009-012",
    product: "Pulsa Telkomsel",
    item: "Pulsa Rp 50.000",
    price: "Rp 50.200",
    date: "09 Okt 2026, 08:15 WIB",
    status: "Berhasil",
    payment: "GoPay",
  },
  {
    id: "TRX-20261005-003",
    product: "Valorant Points",
    item: "1000 VP",
    price: "Rp 110.000",
    date: "05 Okt 2026, 14:10 WIB",
    status: "Gagal",
    payment: "QRIS",
  },
];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<"history" | "deposit" | "settings">("history");

  // State Profile Dinamis
  const [name, setName] = useState("User REVO");
  const [phone, setPhone] = useState("081234567890");
  const [depositAmount, setDepositAmount] = useState("");

  // TERAPKAN TEMA & BACA DATA USER DARI LOCALSTORAGE
  useEffect(() => {
    applyActiveTheme();
    const savedName = localStorage.getItem("revo_user_name");
    const savedPhone = localStorage.getItem("revo_user_phone");
    if (savedName) setName(savedName);
    if (savedPhone) setPhone(savedPhone);
  }, []);

  // Handler simpan perubahan profil
  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("revo_user_name", name);
    localStorage.setItem("revo_user_phone", phone);
    alert("Profil berhasil diperbarui!");
  };

  // Inisial untuk Foto Avatar
  const avatarInitials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "UR";

  return (
    <div 
      className="min-h-screen text-white font-sans flex flex-col justify-between transition-colors duration-300"
      style={{
        backgroundColor: "var(--color-bg-main, #0B0F17)",
        color: "var(--color-text-main, #FFFFFF)"
      }}
    >
      <div>
        <Navbar />

        <main className="max-w-7xl mx-auto px-4 pt-8 pb-12">
          {/* USER PROFILE HEADER CARD */}
          <div 
            className="border rounded-3xl p-6 md:p-8 shadow-2xl mb-8 relative overflow-hidden transition-colors duration-300"
            style={{
              backgroundColor: "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)"
            }}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              
              {/* USER INFO */}
              <div className="flex items-center gap-4">
                <div 
                  className="w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center font-black text-2xl md:text-3xl text-white shadow-lg border border-white/20"
                  style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                >
                  {avatarInitials}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl md:text-2xl font-black text-white">{name}</h1>
                    <span className="bg-[#FFB800]/20 text-[#FFB800] border border-[#FFB800]/40 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase">
                      Member VIP
                    </span>
                  </div>
                  <p className="text-xs mt-1 flex items-center gap-1.5" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                    <Phone className="w-3.5 h-3.5" /> {phone}
                  </p>
                </div>
              </div>

              {/* SALDO & ACTION */}
              <div 
                className="flex items-center gap-4 border p-4 rounded-2xl transition-colors"
                style={{
                  backgroundColor: "var(--color-input-bg, #0B0F17)",
                  borderColor: "var(--color-border, #334155)"
                }}
              >
                <div className="pr-4 border-r" style={{ borderColor: "var(--color-border, #334155)" }}>
                  <span className="text-[10px] uppercase font-bold tracking-wider block" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                    Saldo REVO Pay
                  </span>
                  <span className="text-lg md:text-xl font-black" style={{ color: "var(--color-primary, #00A3FF)" }}>
                    Rp 150.000
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab("deposit")}
                  className="text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-all shadow-md flex items-center gap-1.5 whitespace-nowrap hover:opacity-90"
                  style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                >
                  <Wallet className="w-4 h-4" /> Deposit Saldo
                </button>
              </div>

            </div>
          </div>

          {/* STATS SUMMARY GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div 
              className="border p-4 rounded-2xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              <span className="text-[10px] font-bold uppercase" style={{ color: "var(--color-text-muted, #94A3B8)" }}>Total Transaksi</span>
              <p className="text-xl font-black text-white mt-1">24 Transaksi</p>
            </div>
            <div 
              className="border p-4 rounded-2xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              <span className="text-[10px] font-bold uppercase" style={{ color: "var(--color-text-muted, #94A3B8)" }}>Transaksi Sukses</span>
              <p className="text-xl font-black text-emerald-400 mt-1">23 Berhasil</p>
            </div>
            <div 
              className="border p-4 rounded-2xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              <span className="text-[10px] font-bold uppercase" style={{ color: "var(--color-text-muted, #94A3B8)" }}>Total Pengeluaran</span>
              <p className="text-xl font-black mt-1" style={{ color: "var(--color-primary, #00A3FF)" }}>Rp 1.450.000</p>
            </div>
            <div 
              className="border p-4 rounded-2xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              <span className="text-[10px] font-bold uppercase" style={{ color: "var(--color-text-muted, #94A3B8)" }}>Poin Reward</span>
              <p className="text-xl font-black text-[#FFB800] mt-1">450 Poin</p>
            </div>
          </div>

          {/* MAIN TABS CONTENT */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            
            {/* SIDEBAR TABS NAV */}
            <div 
              className="lg:col-span-1 border rounded-3xl p-4 h-fit flex flex-col gap-2 transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              <button
                onClick={() => setActiveTab("history")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left"
                style={{
                  backgroundColor: activeTab === "history" ? "var(--color-primary, #00A3FF)" : "transparent",
                  color: activeTab === "history" ? "#FFFFFF" : "var(--color-text-muted, #94A3B8)"
                }}
              >
                <History className="w-4 h-4" /> Riwayat Transaksi
              </button>

              <button
                onClick={() => setActiveTab("deposit")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left"
                style={{
                  backgroundColor: activeTab === "deposit" ? "var(--color-primary, #00A3FF)" : "transparent",
                  color: activeTab === "deposit" ? "#FFFFFF" : "var(--color-text-muted, #94A3B8)"
                }}
              >
                <Wallet className="w-4 h-4" /> Isi Saldo Deposit
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all text-left"
                style={{
                  backgroundColor: activeTab === "settings" ? "var(--color-primary, #00A3FF)" : "transparent",
                  color: activeTab === "settings" ? "#FFFFFF" : "var(--color-text-muted, #94A3B8)"
                }}
              >
                <Settings className="w-4 h-4" /> Pengaturan Akun
              </button>

              <div className="h-[1px] my-2" style={{ backgroundColor: "var(--color-border, #334155)" }} />

              <button
                onClick={() => {
                  localStorage.removeItem("revo_is_logged_in");
                  localStorage.removeItem("revo_user_name");
                  localStorage.removeItem("revo_user_phone");
                  window.location.href = "/";
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold text-rose-400 hover:bg-rose-500/10 transition-all text-left"
              >
                <LogOut className="w-4 h-4" /> Keluar Akun
              </button>
            </div>

            {/* TAB BODY DISPLAY */}
            <div 
              className="lg:col-span-3 border rounded-3xl p-6 shadow-xl transition-colors duration-300"
              style={{
                backgroundColor: "var(--color-bg-card, #1E293B)",
                borderColor: "var(--color-border, #334155)"
              }}
            >
              
              {/* TAB 1: RIWAYAT TRANSAKSI */}
              {activeTab === "history" && (
                <div>
                  <div className="flex items-center justify-between mb-6 pb-4 border-b" style={{ borderColor: "var(--color-border, #334155)" }}>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <History className="w-5 h-5" style={{ color: "var(--color-primary, #00A3FF)" }} /> Riwayat Transaksi Terakhir
                    </h3>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                      <thead className="uppercase text-[10px] font-bold" style={{ backgroundColor: "var(--color-input-bg, #0B0F17)", color: "var(--color-text-muted, #94A3B8)" }}>
                        <tr>
                          <th className="p-3.5 rounded-l-xl">ID Transaksi</th>
                          <th className="p-3.5">Produk & Item</th>
                          <th className="p-3.5">Nominal</th>
                          <th className="p-3.5">Metode</th>
                          <th className="p-3.5">Tanggal</th>
                          <th className="p-3.5 rounded-r-xl">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y" style={{ borderColor: "var(--color-border, #334155)" }}>
                        {transactionHistory.map((trx) => (
                          <tr key={trx.id} className="hover:opacity-80 transition-opacity">
                            <td className="p-3.5 font-mono text-white font-medium">{trx.id}</td>
                            <td className="p-3.5">
                              <span className="font-bold text-white block">{trx.product}</span>
                              <span className="text-[10px]" style={{ color: "var(--color-text-muted, #94A3B8)" }}>{trx.item}</span>
                            </td>
                            <td className="p-3.5 font-extrabold text-white">{trx.price}</td>
                            <td className="p-3.5 uppercase font-bold" style={{ color: "var(--color-primary, #00A3FF)" }}>{trx.payment}</td>
                            <td className="p-3.5 text-[11px]">{trx.date}</td>
                            <td className="p-3.5">
                              <span
                                className={`px-2.5 py-1 rounded-full text-[10px] font-bold inline-flex items-center gap-1 ${
                                  trx.status === "Berhasil"
                                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                    : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                                }`}
                              >
                                {trx.status === "Berhasil" ? (
                                  <CheckCircle2 className="w-3 h-3" />
                                ) : (
                                  <Clock className="w-3 h-3" />
                                )}
                                {trx.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* TAB 2: DEPOSIT SALDO */}
              {activeTab === "deposit" && (
                <div>
                  <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--color-border, #334155)" }}>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Wallet className="w-5 h-5" style={{ color: "var(--color-primary, #00A3FF)" }} /> Top Up Saldo REVO Pay
                    </h3>
                    <p className="text-xs mt-1" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                      Saldo dapat digunakan untuk transaksi instan tanpa perlu scan QRIS berulang kali.
                    </p>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!depositAmount) {
                        alert("Masukkan nominal deposit!");
                        return;
                      }
                      alert(`Permintaan deposit sebesar Rp ${depositAmount} berhasil dibuat!`);
                    }}
                    className="flex flex-col gap-5 max-w-lg"
                  >
                    <div>
                      <label className="text-xs font-bold block mb-2" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                        Pilih / Masukkan Nominal Deposit
                      </label>
                      <div className="grid grid-cols-3 gap-3 mb-3">
                        {["20000", "50000", "100000", "200000", "500000", "1000000"].map((amt) => (
                          <button
                            key={amt}
                            type="button"
                            onClick={() => setDepositAmount(amt)}
                            className="py-2.5 px-3 rounded-xl border text-xs font-bold transition-all"
                            style={{
                              backgroundColor: depositAmount === amt ? "var(--color-input-bg, #0B0F17)" : "var(--color-bg-card, #1E293B)",
                              borderColor: depositAmount === amt ? "var(--color-primary, #00A3FF)" : "var(--color-border, #334155)",
                              color: depositAmount === amt ? "var(--color-primary, #00A3FF)" : "#FFFFFF"
                            }}
                          >
                            Rp {parseInt(amt).toLocaleString("id-ID")}
                          </button>
                        ))}
                      </div>

                      <input
                        type="number"
                        placeholder="Atau ketik nominal sendiri..."
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        className="w-full border rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-all"
                        style={{
                          backgroundColor: "var(--color-input-bg, #0B0F17)",
                          borderColor: "var(--color-border, #334155)"
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-white font-bold text-xs rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 hover:opacity-90"
                      style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                    >
                      Proses Deposit <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 3: PENGATURAN AKUN */}
              {activeTab === "settings" && (
                <div>
                  <div className="mb-6 pb-4 border-b" style={{ borderColor: "var(--color-border, #334155)" }}>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      <Settings className="w-5 h-5" style={{ color: "var(--color-primary, #00A3FF)" }} /> Pengaturan Akun & Profil
                    </h3>
                  </div>

                  <form onSubmit={handleSaveSettings} className="flex flex-col gap-4 max-w-lg">
                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        style={{
                          backgroundColor: "var(--color-input-bg, #0B0F17)",
                          borderColor: "var(--color-border, #334155)"
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                        Nomor WhatsApp
                      </label>
                      <input
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        style={{
                          backgroundColor: "var(--color-input-bg, #0B0F17)",
                          borderColor: "var(--color-border, #334155)"
                        }}
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold block mb-1.5" style={{ color: "var(--color-text-muted, #94A3B8)" }}>
                        Kata Sandi Baru (Opsional)
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full border rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none transition-all"
                        style={{
                          backgroundColor: "var(--color-input-bg, #0B0F17)",
                          borderColor: "var(--color-border, #334155)"
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 text-white font-bold text-xs rounded-xl transition-all shadow-lg mt-2 hover:opacity-90"
                      style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                    >
                      Simpan Perubahan
                    </button>
                  </form>
                </div>
              )}

            </div>

          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}