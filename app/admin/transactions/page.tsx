export const dynamic = "force-static";

import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, Clock, Download, AlertTriangle } from "lucide-react";

export default async function AdminTransactionsPage() {
  let transactions: any[] = [];
  let dbError: boolean = false;

  // Bungkus query Prisma dengan try...catch agar build static tidak crash jika DB offline
  try {
    transactions = await prisma.transaction.findMany({
      orderBy: { createdAt: "desc" },
    });
  } catch (error) {
    console.error("Gagal mengambil data transaksi saat build static:", error);
    dbError = true;
    transactions = []; // Fallback array kosong agar halaman tetap berhasil di-render ke HTML statis
  }

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
          <span className="bg-slate-900 border border-slate-800 text-xs px-4 py-2 rounded-xl font-mono text-slate-300">
            Total: <strong className="text-white">{transactions.length}</strong> Trx
          </span>

          <a
            href="/api/transactions/export"
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" /> Export CSV
          </a>
        </div>
      </div>

      {/* Warning Alert jika DB bermasalah atau saat mode static */}
      {dbError && (
        <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 p-4 rounded-xl text-xs flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
          <div>
            <strong>Pemberitahuan Database:</strong> Gagal terhubung ke database. Pastikan <code>DATABASE_URL</code> sudah terkonfigurasi dengan benar.
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
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-500">
                    {dbError ? "Menunggu koneksi database..." : "Belum ada data transaksi yang masuk."}
                  </td>
                </tr>
              ) : (
                transactions.map((trx) => (
                  <tr key={trx.id} className="hover:bg-slate-800/40 transition">
                    <td className="p-4 font-mono font-bold text-blue-400">{trx.merchantRef}</td>
                    <td className="p-4 text-slate-400">
                      {new Date(trx.createdAt).toLocaleString("id-ID", {
                        dateStyle: "short",
                        timeStyle: "short",
                      })}
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
                        {trx.deliveryStatus}
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