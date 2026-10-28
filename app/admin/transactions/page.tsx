"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Download, AlertTriangle, RefreshCw } from "lucide-react";

// Domain Backend Vercel milikmu
const API_BASE_URL = "https://abipay-id-4ic7-bsrdddrhk-lionheart1.vercel.app";

export default function AdminTransactionsPage() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorMsg, setErrorMsg] = useState<string>("");

  const fetchTransactions = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const res = await fetch(`${API_BASE_URL}/api/transactions/search`);
      const result = await res.json();

      if (result.success && Array.isArray(result.data)) {
        setTransactions(result.data);
      } else if (Array.isArray(result)) {
        setTransactions(result);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data transaksi:", err);
      setErrorMsg("Gagal terhubung ke API Vercel.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6 md:p-10 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <Link
            href="/admin/prepaid-products"
            className="inline-flex items-center gap-2 text-xs font-bold text-blue-400 hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Kelola Produk
          </Link>
          <h1 className="text-2xl font-black text-white">Daftar Transaksi Abipay.id</h1>
          <p className="text-xs text-slate-400">
            Monitoring pembayaran & status pengiriman real-time.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchTransactions}
            className="bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs px-3 py-2 rounded-xl flex items-center gap-1.5 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} /> Refresh
          </button>

          <span className="bg-slate-900 border border-slate-800 text-xs px-4 py-2 rounded-xl font-mono text-slate-300">
            Total: <strong className="text-white">{transactions.length}</strong> Trx
          </span>

          <a
            href={`${API_BASE_URL}/api/transactions/export`}
            target="_blank"
            rel="noreferrer"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </a>
        </div>
      </div>

      {errorMsg && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
          <div>
            <strong>Pemberitahuan API:</strong> {errorMsg} (Pastikan database Neon di Vercel sudah aktif).
          </div>
        </div>
      )}

      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="p-4">Reff / Invoice</th>
                <th className="p-4">Tanggal</th>
                <th className="p-4">Produk</th>
                <th className="p-4">Tujuan / Account</th>
                <th className="p-4">Total Bayar</th>
                <th className="p-4">Status Bayar</th>
                <th className="p-4">Status Kirim</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400 animate-pulse">
                    Memuat data transaksi real-time dari database...
                  </td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    Belum ada data transaksi yang masuk.
                  </td>
                </tr>
              ) : (
                transactions.map((trx) => (
                  <tr key={trx.id || trx.merchantRef} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono font-bold text-blue-400">{trx.merchantRef}</td>
                    <td className="p-4 text-slate-400">
                      {trx.createdAt
                        ? new Date(trx.createdAt).toLocaleString("id-ID", {
                            dateStyle: "short",
                            timeStyle: "short",
                          })
                        : "-"}
                    </td>
                    <td className="p-4 font-bold text-white">{trx.productName}</td>
                    <td className="p-4 font-mono text-slate-200">{trx.targetAccount}</td>
                    <td className="p-4 font-bold text-emerald-400">
                      Rp {trx.amount?.toLocaleString("id-ID") ?? 0}
                    </td>
                    <td className="p-4">
                      {trx.paymentStatus === "PAID" ? (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          <CheckCircle2 className="w-3 h-3" /> LUNAS
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          <Clock className="w-3 h-3" /> UNPAID
                        </span>
                      )}
                    </td>
                    <td className="p-4">
                      <span className="inline-flex items-center gap-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {trx.deliveryStatus || "PENDING"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}