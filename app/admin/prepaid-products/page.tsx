"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  RefreshCw,
  Search,
  Zap,
  Tag,
  CheckCircle2,
  AlertTriangle,
  Loader2,
} from "lucide-react";

const brandsList = [
  "SEMUA",
  "Mobile Legends",
  "Free Fire",
  "Valorant",
  "PUBG Mobile",
  "Genshin Impact",
  "Honkai: Star Rail",
  "EA SPORTS FC Mobile",
  "Honor of Kings",
  "Roblox",
  "Telkomsel",
];

export default function PrepaidProductsAdminPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [syncing, setSyncing] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedBrand, setSelectedBrand] = useState<string>("SEMUA");
  const [bulkMarkup, setBulkMarkup] = useState<string>("500");
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [editMarkupValue, setEditMarkupValue] = useState<string>("");

  // Fetch daftar produk dari backend
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/prepaid-products");
      const result = await res.json();
      if (result.success && Array.isArray(result.data)) {
        setProducts(result.data);
      } else if (Array.isArray(result)) {
        setProducts(result);
      }
    } catch (err) {
      console.error("Gagal mengambil data produk:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Force Update & Mapping Sync ke Provider / Database
  const handleForceSync = async () => {
    setSyncing(true);
    try {
      const res = await fetch("/api/admin/prepaid-products/sync", {
        method: "POST",
      });
      const result = await res.json();
      if (result.success) {
        alert("Berhasil memperbarui & memetakan seluruh produk PPOB!");
        fetchProducts();
      } else {
        alert(result.message || "Gagal melakukan sync produk.");
      }
    } catch (err) {
      console.error("Error force sync:", err);
      alert("Terjadi kesalahan koneksi saat sync.");
    } finally {
      setSyncing(false);
    }
  };

  // Terapkan Bulk Markup ke Semua Produk
  const handleApplyBulkMarkup = async () => {
    const markupNum = Number(bulkMarkup);
    if (isNaN(markupNum) || markupNum < 0) {
      alert("Masukkan angka markup yang valid!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/admin/prepaid-products/bulk-markup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markup: markupNum }),
      });
      const result = await res.json();
      if (result.success) {
        alert(`Markup Rp ${markupNum.toLocaleString("id-ID")} berhasil diterapkan ke SEMUA produk!`);
        fetchProducts();
      } else {
        alert(result.message || "Gagal menerapkan bulk markup.");
      }
    } catch (err) {
      console.error("Error bulk markup:", err);
      alert("Gagal memperbarui markup secara massal.");
    } finally {
      setLoading(false);
    }
  };

  // Simpan Single Markup Per Produk
  const handleSaveSingleMarkup = async (code: string) => {
    const newMarkup = Number(editMarkupValue);
    if (isNaN(newMarkup) || newMarkup < 0) {
      alert("Masukkan markup yang valid!");
      return;
    }

    try {
      const res = await fetch("/api/admin/prepaid-products/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, markup: newMarkup }),
      });
      const result = await res.json();
      if (result.success) {
        setEditingCode(null);
        fetchProducts();
      } else {
        alert(result.message || "Gagal mengupdate markup.");
      }
    } catch (err) {
      console.error("Error single markup update:", err);
    }
  };

  // Filter Produk berdasarkan Brand & Keyword Pencarian
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.name?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesBrand =
      selectedBrand === "SEMUA" ||
      (p.brand && p.brand.toLowerCase() === selectedBrand.toLowerCase());

    return matchesSearch && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#0B0F17] text-white p-6 md:p-10 space-y-6">
      {/* HEADER SECTION */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xl">
        <div>
          <Link
            href="/admin/transactions"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#00A3FF] hover:underline mb-2"
          >
            <ArrowLeft className="w-4 h-4" /> Kelola Transaksi
          </Link>
          <h1 className="text-2xl font-black text-white flex items-center gap-2">
            Abipay.id — Kelola Produk PPOB
          </h1>
          <p className="text-xs text-[#94A3B8] mt-1">
            Atur harga jual & sinkronkan produk Tripay dengan 20 Brand Homepage
          </p>
        </div>

        <button
          onClick={handleForceSync}
          disabled={syncing}
          className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-5 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-lg shadow-blue-600/20 cursor-pointer disabled:opacity-50 shrink-0"
        >
          {syncing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Syncing Database...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" /> Force Update & Mapping
            </>
          )}
        </button>
      </div>

      {/* FILTER & BULK MARKUP CONTROL */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl p-5 grid grid-cols-1 md:grid-cols-3 gap-4 shadow-lg">
        {/* CARI PRODUK */}
        <div>
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
            CARI PRODUK
          </label>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-[#94A3B8]" />
            <input
              type="text"
              placeholder="Cari kode atau nama..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl pl-9 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#00A3FF]"
            />
          </div>
        </div>

        {/* BULK MARKUP */}
        <div className="md:col-span-2">
          <label className="block text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] mb-1.5">
            BULK MARKUP (RP)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              value={bulkMarkup}
              onChange={(e) => setBulkMarkup(e.target.value)}
              className="w-full bg-[#0B0F17] border border-[#334155] rounded-xl px-4 py-2.5 text-xs text-emerald-400 font-bold focus:outline-none focus:border-[#00A3FF]"
            />
            <button
              onClick={handleApplyBulkMarkup}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition cursor-pointer shrink-0"
            >
              Terapkan Markup (SEMUA)
            </button>
          </div>
        </div>
      </div>

      {/* BRAND CATEGORY TABS */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {brandsList.map((brand) => {
          const isActive = selectedBrand === brand;
          return (
            <button
              key={brand}
              onClick={() => setSelectedBrand(brand)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#00A3FF] text-white shadow-md shadow-[#00A3FF]/20"
                  : "bg-[#1E293B] border border-[#334155] text-[#94A3B8] hover:text-white"
              }`}
            >
              {brand}
            </button>
          );
        })}
      </div>

      {/* TABLE PRODUK PPOB */}
      <div className="bg-[#1E293B] border border-[#334155] rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#94A3B8]">
            <thead className="bg-[#0B0F17] text-[#94A3B8] uppercase font-semibold text-[10px] tracking-wider border-b border-[#334155]">
              <tr>
                <th className="p-4">KODE</th>
                <th className="p-4">NAMA PRODUK</th>
                <th className="p-4">BRAND (HOMEPAGE)</th>
                <th className="p-4">KATEGORI</th>
                <th className="p-4">HARGA MODAL</th>
                <th className="p-4">MARKUP</th>
                <th className="p-4">HARGA JUAL</th>
                <th className="p-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#334155]/60 font-medium">
              {loading ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#94A3B8] animate-pulse">
                    Memuat daftar produk PPOB...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-[#94A3B8]">
                    Tidak ada produk PPOB yang ditemukan.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => {
                  const modalPrice = Number(p.price || p.priceModal || 0);
                  const markup = Number(p.markup || 0);
                  const sellingPrice = modalPrice + markup;

                  return (
                    <tr key={p.code} className="hover:bg-[#0B0F17]/40 transition">
                      <td className="p-4 font-mono font-bold text-white">{p.code}</td>
                      <td className="p-4 font-bold text-white">{p.name}</td>
                      <td className="p-4 text-[#00A3FF] font-bold">{p.brand || "-"}</td>
                      <td className="p-4 uppercase text-[10px] tracking-wider">{p.category || "GAME"}</td>
                      <td className="p-4 font-mono text-white">
                        Rp {modalPrice.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4 font-mono text-emerald-400 font-bold">
                        {editingCode === p.code ? (
                          <div className="flex items-center gap-1">
                            <input
                              type="number"
                              value={editMarkupValue}
                              onChange={(e) => setEditMarkupValue(e.target.value)}
                              className="w-20 bg-[#0B0F17] border border-[#00A3FF] rounded p-1 text-xs text-white"
                            />
                            <button
                              onClick={() => handleSaveSingleMarkup(p.code)}
                              className="bg-emerald-600 text-white px-2 py-1 rounded text-[10px]"
                            >
                              OK
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => {
                              setEditingCode(p.code);
                              setEditMarkupValue(String(markup));
                            }}
                            className="cursor-pointer hover:underline"
                            title="Klik untuk ubah markup"
                          >
                            +Rp {markup.toLocaleString("id-ID")}
                          </span>
                        )}
                      </td>
                      <td className="p-4 font-mono font-black text-white">
                        Rp {sellingPrice.toLocaleString("id-ID")}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                          Tersedia
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}