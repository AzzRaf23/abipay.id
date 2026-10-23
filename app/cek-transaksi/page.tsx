"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, CheckCircle2, Clock, PackageCheck, AlertCircle } from "lucide-react";

export default function CekTransaksiPage() {
  const [searchKey, setSearchKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [trxData, setTrxData] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchKey.trim()) return;

    setLoading(true);
    setErrorMsg("");
    setTrxData(null);

    try {
      const res = await fetch(`/api/transactions/search?key=${encodeURIComponent(searchKey.trim())}`);
      const result = await res.json();

      if (result.success && result.data) {
        setTrxData(result.data);
      } else {
        setErrorMsg(result.message || "Transaksi tidak ditemukan. Periksa kembali Invoice / No. HP Anda.");
      }
    } catch (err) {
      setErrorMsg("Gagal terhubung ke server. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white flex flex-col justify-between">
      <div>
        <Navbar />

        <div className="max-w-3xl mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h1 className="text-2xl md:text-3xl font-black text-white">Lacak Pesanan Kamu</h1>
            <p className="text-xs text-slate-400 mt-2">
              Masukkan Kode Invoice (contoh: ABI-1729...) atau Nomor HP saat bertransaksi.
            </p>
          </div>

          {/* Form Pencarian */}
          <form onSubmit={handleSearch} className="flex gap-2 mb-8">
            <input
              type="text"
              placeholder="Masukkan No. Invoice / No. HP..."
              value={searchKey}
              onChange={(e) => setSearchKey(e.target.value)}
              className="flex-1 bg-[#1E293B] border border-slate-700 rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl text-xs flex items-center gap-2 transition disabled:opacity-50"
            >
              {loading ? "Mencari..." : <><Search className="w-4 h-4" /> Cari</>}
            </button>
          </form>

          {/* Pesan Error */}
          {errorMsg && (
            <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Hasil Pencarian Detail Transaksi */}
          {trxData && (
            <div className="bg-[#1E293B] border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-4">
              <div className="flex justify-between items-center border-b border-slate-700 pb-4">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-mono">Invoice</span>
                  <span className="text-sm font-black text-blue-400 font-mono">{trxData.merchantRef}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block uppercase">Tanggal</span>
                  <span className="text-xs text-slate-300 font-medium">
                    {new Date(trxData.createdAt).toLocaleString("id-ID")}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Produk:</span>
                  <span className="font-bold text-white">{trxData.productName}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tujuan Account:</span>
                  <span className="font-mono text-white">{trxData.targetAccount}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Total Pembayaran:</span>
                  <span className="font-bold text-emerald-400">Rp {trxData.amount?.toLocaleString("id-ID")}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Status Pembayaran:</span>
                  {trxData.paymentStatus === "PAID" ? (
                    <span className="inline-flex items-center gap-1 text-emerald-400 font-bold mt-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> LUNAS
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-amber-400 font-bold mt-1">
                      <Clock className="w-3.5 h-3.5" /> BELUM DIBAYAR
                    </span>
                  )}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4 flex justify-between items-center">
                <span className="text-xs text-slate-400">Status Pengiriman Item:</span>
                <span className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase flex items-center gap-1">
                  <PackageCheck className="w-3 h-3" /> {trxData.deliveryStatus}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}