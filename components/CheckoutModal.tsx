"use client";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: {
    merchantRef: string;
    productName: string;
    amount: number;
    targetId: string;
    qrisUrl: string;
    expiredAt: string;
  } | null;
}

export default function CheckoutModal({ isOpen, onClose, data }: CheckoutModalProps) {
  if (!isOpen || !data) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative space-y-4">
        {/* Tombol Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white font-bold text-sm bg-slate-800 w-8 h-8 rounded-full flex items-center justify-center transition"
        >
          ✕
        </button>

        <div>
          <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
            PEMBAYARAN QRIS ABIPAY.ID
          </span>
          <h3 className="text-lg font-bold text-white mt-2">Scan untuk Membayar</h3>
          <p className="text-xs text-slate-400 font-medium">{data.productName}</p>
        </div>

        {/* Gambar QRIS */}
        <div className="bg-white p-3 rounded-2xl inline-block shadow-inner border border-slate-200">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.qrisUrl} alt="QRIS Pembayaran Abipay" className="w-52 h-52 mx-auto object-contain" />
        </div>

        {/* Detail Pembayaran */}
        <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-2 text-left">
          <div className="flex justify-between items-center">
            <span className="text-slate-400">No. Reff / Invoice:</span>
            <span className="font-mono font-bold text-slate-200">{data.merchantRef}</span>
          </div>
          {data.targetId && (
            <div className="flex justify-between items-center">
              <span className="text-slate-400">Tujuan / User ID:</span>
              <span className="font-bold text-blue-400">{data.targetId}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Total Tagihan:</span>
            <span className="font-extrabold text-emerald-400 text-sm">
              Rp {data.amount.toLocaleString("id-ID")}
            </span>
          </div>
          <div className="flex justify-between items-center pt-1 border-t border-slate-900">
            <span className="text-slate-400">Batas Waktu Bayar:</span>
            <span className="font-bold text-rose-400">{data.expiredAt} WIB</span>
          </div>
        </div>

        <p className="text-[10px] text-slate-500 leading-relaxed">
          Bisa di-scan menggunakan DANA, OVO, GoPay, ShopeePay, LinkAja, BCA, Mandiri, BRI, & seluruh aplikasi M-Banking.
        </p>
      </div>
    </div>
  );
}