"use client";

import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#334155]">
              <ShieldCheck className="w-7 h-7 text-purple-400" />
              <div>
                <h1 className="text-2xl font-black text-white">Kebijakan Privasi</h1>
                <p className="text-xs text-[#94A3B8]">Terakhir diperbarui: Oktober 2026</p>
              </div>
            </div>

            <div className="flex flex-col gap-6 text-xs text-[#94A3B8] leading-relaxed">
              <section>
                <h3 className="text-sm font-bold text-white mb-2">1. Pengumpulan Informasi</h3>
                <p>
                  REVO.id mengumpulkan informasi terbatas seperti Nama, Nomor WhatsApp, dan User ID Game semata-mata untuk keperluan pemrosesan transaksi dan konfirmasi pesanan Anda.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-2">2. Keamanan Data</h3>
                <p>
                  Kami berkomitmen untuk menjaga kerahasiaan data pribadi Anda. Data Anda disimpan secara aman dan tidak akan dijual atau dibagikan kepada pihak ketiga di luar pemrosesan transaksi pembayaran resmi.
                </p>
              </section>

              <section>
                <h3 className="text-sm font-bold text-white mb-2">3. Penggunaan Cookies</h3>
                <p>
                  Kami menggunakan sesi penyimpanan lokal (localStorage) browser untuk menyimpan kredensial login aktif Anda agar memberikan pengalaman bertransaksi yang lebih mulus.
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