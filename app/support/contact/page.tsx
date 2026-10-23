"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MessageCircle, Send, Clock, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function ContactCSPage() {
  const [trxId, setTrxId] = useState("");
  const [message, setMessage] = useState("");

  const handleSendWA = (e: React.FormEvent) => {
    e.preventDefault();
    const adminNumber = "6281234567890"; // Ganti dengan nomor WhatsApp CS kamu
    const text = `Halo Admin REVO.id,\nSaya butuh bantuan kendala transaksi:\n- ID TRX: ${trxId || "-"}\n- Pesan: ${message}`;
    const url = `https://wa.me/${adminNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white font-sans flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-3xl mx-auto px-4 py-10">
          <div className="bg-[#1E293B] border border-[#334155] rounded-3xl p-6 md:p-10 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                <MessageCircle className="w-8 h-8" />
              </div>
              <h1 className="text-2xl md:text-3xl font-black text-white">
                Customer Support WhatsApp
              </h1>
              <p className="text-xs text-[#94A3B8] mt-1">
                Layanan bantuan cepat tanggap 24/7 siap melayani kendala top up Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              <div className="bg-[#0B0F17] border border-[#334155] p-4 rounded-2xl flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#00A3FF]" />
                <div>
                  <h4 className="text-xs font-bold text-white">Jam Operasional</h4>
                  <p className="text-[11px] text-[#94A3B8]">24 Jam / 7 Hari Non-Stop</p>
                </div>
              </div>

              <div className="bg-[#0B0F17] border border-[#334155] p-4 rounded-2xl flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <h4 className="text-xs font-bold text-white">Respon Cepat</h4>
                  <p className="text-[11px] text-[#94A3B8]">Estimasi balasan ~1 menit</p>
                </div>
              </div>
            </div>

            {/* FORM CHAT WA DIRECT */}
            <form onSubmit={handleSendWA} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-1.5">
                  Nomor ID Transaksi / Invoice (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: TRX-20261012-001"
                  value={trxId}
                  onChange={(e) => setTrxId(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#94A3B8] block mb-1.5">
                  Detail Kendala / Pesan
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tuliskan kendala Anda, misalnya: Top up MLBB belum masuk padahal sudah bayar..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-white placeholder-[#94A3B8] focus:outline-none focus:border-[#00A3FF]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl transition-all shadow-lg shadow-emerald-500/20 flex items-center justify-center gap-2 mt-2"
              >
                <Send className="w-4 h-4" /> Kirim Pesan ke WhatsApp CS
              </button>
            </form>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}