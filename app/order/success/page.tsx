"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import { CheckCircle2, Clock, XCircle, ArrowLeft, Copy, Check, Loader2 } from "lucide-react";

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const invoice = searchParams.get("invoice");

  const [loading, setLoading] = useState(true);
  const [transaction, setTransaction] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Fungsi fetch data transaksi dengan polling otomatis jika status masih processing
  useEffect(() => {
    if (!invoice) {
      setLoading(false);
      return;
    }

    const fetchTransaction = async () => {
      try {
        const res = await fetch(`/api/transactions/search?key=${invoice}`);
        const resJson = await res.json();
        if (resJson.success && resJson.data) {
          setTransaction(resJson.data);
          
          // Jika status pengiriman masih PROCESSING, lanjut polling setiap 3 detik
          if (resJson.data.deliveryStatus === "PROCESSING") {
            return true; // indikator masih processing
          }
        }
      } catch (err) {
        console.error("Gagal memuat detail transaksi:", err);
      } finally {
        setLoading(false);
      }
      return false;
    };

    fetchTransaction().then((isProcessing) => {
      if (isProcessing) {
        const interval = setInterval(async () => {
          const res = await fetch(`/api/transactions/search?key=${invoice}`);
          const resJson = await res.json();
          if (resJson.success && resJson.data) {
            setTransaction(resJson.data);
            if (resJson.data.deliveryStatus !== "PROCESSING") {
              clearInterval(interval); // Berhenti polling kalau sudah success/gagal
            }
          }
        }, 3000);

        return () => clearInterval(interval);
      }
    });
  }, [invoice]);

  const handleCopy = () => {
    if (invoice) {
      navigator.clipboard.writeText(invoice);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div
      className="min-h-screen text-white pb-16 flex flex-col justify-between"
      style={{
        backgroundColor: "var(--color-bg-main, #0B0F17)",
        color: "var(--color-text-main, #FFFFFF)",
      }}
    >
      <div>
        <Navbar />

        <div className="max-w-xl mx-auto px-4 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold hover:underline mb-6"
            style={{ color: "var(--color-primary, #00A3FF)" }}
          >
            <ArrowLeft className="w-4 h-4" /> Kembali ke Beranda
          </Link>

          <div
            className="border rounded-2xl p-6 md:p-8 shadow-2xl relative transition-colors duration-300 text-center"
            style={{
              backgroundColor: "var(--color-bg-card, #1E293B)",
              borderColor: "var(--color-border, #334155)",
            }}
          >
            {loading ? (
              <div className="py-16 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
                <p className="text-xs text-slate-400">Memuat status pesanan...</p>
              </div>
            ) : !transaction ? (
              <div className="py-10">
                <XCircle className="w-16 h-16 text-rose-500 mx-auto mb-3" />
                <h2 className="text-lg font-black text-white">Transaksi Tidak Ditemukan</h2>
                <p className="text-xs text-slate-400 mt-1">
                  Nomor invoice <span className="font-mono text-white">{invoice}</span> tidak terdaftar.
                </p>
                <div className="mt-6">
                  <Link
                    href="/cek-transaksi"
                    className="inline-block px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl transition"
                  >
                    Cek Transaksi Manual
                  </Link>
                </div>
              </div>
            ) : (
              <div>
                {/* ICON STATUS BERDASARKAN DELIVERY STATUS */}
                {transaction.deliveryStatus === "SUCCESS" ? (
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center mb-4 animate-bounce">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center mb-4">
                    <Loader2 className="w-10 h-10 animate-spin" />
                  </div>
                )}

                <h2 className="text-xl font-black text-white">
                  {transaction.deliveryStatus === "SUCCESS"
                    ? "Pesanan Berhasil Dikirim!"
                    : "Sedang Diproses Sistem..."}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {transaction.deliveryStatus === "SUCCESS"
                    ? "Item telah sukses masuk ke akun game kamu."
                    : "Mohon tunggu sebentar, sistem sedang mengirim item ke akunmu."}
                </p>

                {/* KOTAK INVOICE DENGAN FITUR COPY */}
                <div
                  onClick={handleCopy}
                  className="bg-[#0B0F17] border border-[#334155] rounded-xl p-3.5 mt-6 flex items-center justify-between cursor-pointer hover:border-blue-500/50 transition group"
                >
                  <div className="text-left">
                    <span className="text-[10px] text-slate-400 block font-medium">No. Invoice (Klik untuk salin)</span>
                    <span className="text-xs font-mono font-bold text-blue-400">{transaction.merchantRef}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-800 text-slate-300 group-hover:text-white transition">
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </div>
                </div>

                {/* DETAIL INFORMASI PESANAN */}
                <div className="mt-6 border-t border-slate-700/50 pt-4 text-left flex flex-col gap-2.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Produk:</span>
                    <span className="font-bold text-white text-right">{transaction.productName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Tujuan / Akun:</span>
                    <span className="font-mono text-white">{transaction.targetAccount}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Total Pembayaran:</span>
                    <span className="font-black text-emerald-400">Rp {transaction.amount?.toLocaleString("id-ID")}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status Pengiriman:</span>
                    <span className={`font-bold uppercase ${transaction.deliveryStatus === "SUCCESS" ? "text-emerald-400" : "text-amber-400 animate-pulse"}`}>
                      {transaction.deliveryStatus}
                    </span>
                  </div>
                </div>

                {/* TOMBOL AKSI */}
                <div className="w-full grid grid-cols-2 gap-3 mt-8">
                  <Link
                    href="/"
                    className="py-3 text-white font-bold text-xs rounded-xl text-center shadow-md transition-all hover:opacity-90 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary, #00A3FF)" }}
                  >
                    Top Up Lagi
                  </Link>
                  <Link
                    href="/cek-transaksi"
                    className="py-3 border text-white font-bold text-xs rounded-xl text-center transition-all bg-slate-900 border-slate-700 hover:bg-slate-800 flex items-center justify-center"
                  >
                    Cek Pesanan Lain
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen text-white flex items-center justify-center font-bold text-sm bg-[#0B0F17]">
          Memuat status pesanan...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}