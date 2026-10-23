"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle, ChevronDown, ChevronUp, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

const faqs = [
  {
    q: "Berapa lama proses top up game di REVO.id?",
    a: "Proses top up di REVO.id diproses secara serba otomatis oleh sistem dalam hitungan 1–5 detik setelah pembayaran Anda terkonfirmasi oleh payment gateway.",
  },
  {
    q: "Metode pembayaran apa saja yang tersedia?",
    a: "Kami mendukung berbagai metode pembayaran populer seperti QRIS (All Payment), DANA, GoPay, OVO, ShopeePay, serta Transfer Bank Virtual Account.",
  },
  {
    q: "Bagaimana jika pesanan saya belum masuk?",
    a: "Harap tunggu hingga 3-5 menit. Jika item belum masuk, Anda dapat menghubungi Customer Service WhatsApp kami dengan menyertakan Nomor Transaksi (ID TRX) untuk penanganan instan.",
  },
  {
    q: "Apakah saya perlu mendaftar akun untuk membeli?",
    a: "Tidak wajib! Anda bisa melakukan pembelian langsung sebagai Guest. Namun, mendaftar akun memberikan Anda akses ke riwayat transaksi dan poin reward.",
  },
  {
    q: "Apakah layanan di REVO.id resmi dan legal?",
    a: "100% Resmi dan Legal. Semua item game dan pulsa diproses melalui distributor resmi terpercaya sehingga akun Anda terjamin aman dari banned.",
  },
];

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(search.toLowerCase()) ||
      item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-4xl mx-auto px-4 py-10">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#00A3FF]/20 text-[#00A3FF] border border-[#00A3FF]/40 mb-3">
              <HelpCircle className="w-3.5 h-3.5" /> FAQ Center
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-white">
              Pusat Bantuan & Pertanyaan Umum
            </h1>
            <p className="text-xs text-[#94A3B8] mt-2">
              Temukan jawaban cepat untuk pertanyaan seputar transaksi dan layanan REVO.id
            </p>

            {/* SEARCH */}
            <div className="relative max-w-md mx-auto mt-6">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-3" />
              <input
                type="text"
                placeholder="Cari pertanyaan kamu di sini..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-[#1E293B] border border-[#334155] rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF]"
              />
            </div>
          </div>

          {/* ACCORDION FAQ */}
          <div className="flex flex-col gap-3">
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-bold text-xs md:text-sm text-white hover:text-[#00A3FF]"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-[#00A3FF] shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#94A3B8] shrink-0" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 text-xs text-[#94A3B8] border-t border-[#334155]/50 pt-3 leading-relaxed">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* STILL NEED HELP */}
          <div className="bg-gradient-to-r from-[#1E293B] via-slate-800 to-[#1E293B] border border-[#334155] rounded-2xl p-6 text-center mt-10">
            <h3 className="text-sm font-bold text-white">Belum menemukan jawaban?</h3>
            <p className="text-xs text-[#94A3B8] mt-1 mb-4">
              Tim Customer Service kami siap membantu transaksi Anda 24 jam non-stop.
            </p>
            <Link
              href="/support/contact"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <MessageCircle className="w-4 h-4" /> Chat CS WhatsApp Sekarang
            </Link>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}