"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FileText, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#334155]">
              <FileText className="w-7 h-7 text-amber-400" />
              <div>
                <h1 className="text-2xl font-black text-white">Syarat & Ketentuan Layanan</h1>
                <p className="text-xs text-[#94A3B8]">Terakhir diperbarui: Oktober 2026</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-xs text-[#94A3B8] leading-relaxed">
              <section>
                <h3 className="text-sm font-bold text-white mb-2">1. Ketentuan Umum</h3>
                <p>
                  Dengan mengakses dan bertransaksi di REVO.id, Anda dianggap telah membaca, memahami, dan menyetujui seluruh aturan dan ketentuan yang berlaku di platform ini.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-2">2. Ketepatan Data Akun</h3>
                <p>
                  Pembeli bertanggung jawab penuh atas kebenaran Data Akun (User ID, Zone ID, Nomor HP) yang diisikan. REVO.id tidak bertanggung jawab atas kesalahan pengiriman akibat salah input nomor/ID oleh pembeli.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-2">3. Pembayaran & Pengembalian Dana (Refund)</h3>
                <p>
                  Pembayaran yang telah sukses dikonfirmasi oleh Payment Gateway tidak dapat dibatalkan atau dikembalikan secara tunai, kecuali jika terjadi kegagalan sistem permanen dari pihak penyedia layanan.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-2">4. Gangguan Layanan</h3>
                <p>
                  Apabila server game atau operator penerbit sedang mengalami pemeliharaan (maintenance), proses pengisian item mungkin mengalami penundaan hingga server kembali normal.
                </p>
              </section>
            </div>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}