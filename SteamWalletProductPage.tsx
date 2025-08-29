

import React, { useState, useMemo } from "react";
import { CheckoutData, PaymentCategory, ProductDetail } from "../types";
import { ChevronLeftIcon, ShareIcon, ChatBubbleLeftEllipsisIcon, StarIcon, ChevronDownIcon } from "./icons";
import { steamWalletProductPageBannerUrl, mlProductPageBannerUrl } from "./ImageAssets";

interface SteamWalletProductPageProps {
  product: ProductDetail;
  paymentCategories: PaymentCategory[];
  onProceedToCheckout: (data: CheckoutData) => void;
  showToast: (message: string, type: "success" | "error") => void;
  onBack: () => void;
}

const APP_NAME = "NexusTOPUP";
const TABBAR_H = 72;

// Validasi email sederhana (untuk FE)
const RE_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Region/currency (sesuaikan katalogmu)
const REGIONS = [
  { id: "ID", label: "Indonesia (IDR)" },
  { id: "US", label: "United States (USD)" },
  { id: "EU", label: "Europe (EUR)" },
  { id: "SG", label: "Singapore (SGD)" },
] as const;

function currency(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export default function SteamWalletProductPage({
  product,
  paymentCategories,
  onProceedToCheckout,
  showToast,
  onBack,
}: SteamWalletProductPageProps) {
  const [tab, setTab] = useState<"trx" | "info">("trx");

  // Step 1: Penerima + region + persetujuan
  const [recipientEmail, setRecipientEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [region, setRegion] = useState<typeof REGIONS[number]["id"]>("ID");
  const [policyAck, setPolicyAck] = useState(false);

  // Step lainnya
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [promo, setPromo] = useState("");
  const [emailInvoice, setEmailInvoice] = useState(""); // jika kosong, pakai recipientEmail
  const [wa, setWa] = useState("");
  const [openCat, setOpenCat] = useState<string>("ewallet");
  const [selectedPayment, setSelPayment] = useState<{ catId?: string; methodId?: string }>({});

  // Derived
  const selectedVariant = useMemo(
    () => product.variants.find((v) => v.id === selectedVariantId),
    [selectedVariantId, product.variants]
  );

  const selectedPaymentMethod = useMemo(() => {
    if (!selectedPayment.catId || !selectedPayment.methodId) return null;
    const cat = paymentCategories.find((c) => c.id === selectedPayment.catId);
    return cat?.methods.find((m) => m.id === selectedPayment.methodId) || null;
  }, [selectedPayment, paymentCategories]);

  const fee = useMemo(() => {
    if (!selectedPaymentMethod) return 0;
    const subtotal = (selectedVariant?.price || 0) * qty;
    return Math.round(
      (selectedPaymentMethod.fee.flat || 0) +
        (subtotal * (selectedPaymentMethod.fee.percent || 0)) / 100
    );
  }, [selectedPaymentMethod, selectedVariant, qty]);

  const subtotal = (selectedVariant?.price || 0) * qty;
  const grandTotal = Math.max(0, subtotal + fee);

  // Validasi
  const emailOk = RE_EMAIL.test(recipientEmail.trim());
  const emailMatch = recipientEmail.trim().toLowerCase() === confirmEmail.trim().toLowerCase();
  const invoiceEmail = emailInvoice.trim() || recipientEmail.trim();

  const canProceed =
    emailOk &&
    emailMatch &&
    !!region &&
    !!selectedVariant &&
    !!selectedPaymentMethod &&
    policyAck;

  function validate(): string | null {
    if (!recipientEmail.trim()) return "Email penerima wajib diisi.";
    if (!emailOk) return "Format email penerima tidak valid.";
    if (!emailMatch) return "Konfirmasi email tidak sama.";
    if (!region) return "Pilih region terlebih dahulu.";
    if (!selectedVariant) return "Pilih nominal terlebih dahulu.";
    if (!selectedPaymentMethod) return "Pilih metode pembayaran.";
    if (!policyAck) return "Harap centang persetujuan syarat voucher.";
    return null;
  }

  function handleOrder() {
    const err = validate();
    if (err) {
      showToast(err, "error");
      return;
    }
    if (selectedVariant && selectedPaymentMethod) {
      const checkoutData: CheckoutData = {
        product,
        variant: selectedVariant,
        quantity: qty,
        formValues: {
          // Konsisten: uid = email penerima (identifier pengiriman)
          uid: recipientEmail.trim(),
          server: region,             // simpan region/currency
          email: invoiceEmail,        // email invoice (bisa sama dengan penerima)
          wa: wa,                     // no. WhatsApp opsional
          promo: promo.toUpperCase(),
        },
        selectedPaymentMethod: selectedPaymentMethod,
      };
      onProceedToCheckout(checkoutData);
    }
  }

  const bannerSrc = steamWalletProductPageBannerUrl || mlProductPageBannerUrl;

  return (
    <div className="min-h-screen bg-gray-900 pt-16 md:pt-20">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-800 h-16 md:h-20 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-full relative">
          <button onClick={onBack} className="absolute left-4 p-2 rounded-full hover:bg-gray-700" aria-label="Kembali">
            <ChevronLeftIcon className="w-6 h-6 text-white" />
          </button>
          <h1 className="text-lg font-bold text-white text-center w-full truncate px-12">
            {product.name || "STEAM WALLET CODE"}
          </h1>
          <div className="absolute right-4 flex space-x-2">
            <button className="p-2 rounded-full hover:bg-gray-700" aria-label="Bagikan">
              <ShareIcon className="w-6 h-6 text-white" />
            </button>
            <button className="p-2 rounded-full hover:bg-gray-700" aria-label="Bantuan">
              <ChatBubbleLeftEllipsisIcon className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-md mx-auto px-4 pb-[160px]">
        {/* Hero */}
        <section>
          <div className="w-full aspect-[1920/749] rounded-2xl bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] overflow-hidden translate-y-[5%]">
            <img src={bannerSrc} alt="Steam Wallet Code Banner" className="w-full h-full object-cover rounded-2xl" />
          </div>

          {/* Ringkasan */}
          <div className="mt-3 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-700 rounded-xl overflow-hidden">
                <img src={product.image} alt={product.name || "Steam Wallet Code"} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">STEAM WALLET CODE</h2>
                <p className="text-gray-400 text-sm">{product.brand || "Valve"}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">⚡ Kode instan (setelah bayar)</div>
              <div className="flex items-center gap-2">📧 Dikirim ke email</div>
              <div className="flex items-center gap-2">🔒 Pembayaran Aman</div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTab("trx")}
            className={`flex-1 h-10 rounded-full font-semibold ${tab==="trx" ? "text-white bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)]" : "bg-gray-800 border border-gray-700 text-gray-300"}`}
          >
            Transaksi
          </button>
          <button
            onClick={() => setTab("info")}
            className={`flex-1 h-10 rounded-full font-semibold ${tab==="info" ? "text-white bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)]" : "bg-gray-800 border border-gray-700 text-gray-300"}`}
          >
            Keterangan
          </button>
        </div>

        {tab === "trx" ? (
          <>
            {/* Step 1: Email penerima & Region */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">1 • Data Penerima & Region</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400">Email Penerima (wajib)</label>
                  <input
                    value={recipientEmail}
                    onChange={(e) => setRecipientEmail(e.target.value.trim())}
                    onBlur={() => { if (recipientEmail && !emailOk) showToast("Format email tidak valid.", "error"); }}
                    placeholder="email@domain.com"
                    className="mt-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Konfirmasi Email</label>
                  <input
                    value={confirmEmail}
                    onChange={(e) => setConfirmEmail(e.target.value.trim())}
                    placeholder="Ulangi email penerima"
                    className="mt-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                  {!emailMatch && confirmEmail.length > 0 && (
                    <p className="text-xs text-red-400 mt-1">Email tidak sama.</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-gray-400">Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value as typeof REGIONS[number]["id"])}
                    className="mt-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  >
                    {REGIONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                  </select>
                </div>
              </div>
              <div className="mt-3">
                <label className="flex items-start gap-2 text-sm text-gray-300">
                  <input type="checkbox" checked={policyAck} onChange={(e) => setPolicyAck(e.target.checked)} className="mt-1" />
                  <span>
                    Saya paham: Steam Wallet Code hanya bisa ditukar pada akun Steam dengan region/currency yang sama
                    dan bersifat non‑refund setelah kode diterbitkan.
                  </span>
                </label>
              </div>
            </section>
            
            {/* Step 2: Nominal */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">2 • Pilih Nominal</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.variants.map((d) => (
                  <button key={d.id} onClick={() => setSelectedVariantId(d.id)}
                          className={`text-left p-3 rounded-xl border-2 ${selectedVariantId===d.id ? "border-[#7F1DFF] ring-2 ring-[#38BDF8]/40 bg-purple-900/30" : "border-gray-700 bg-gray-700"}`}>
                    <div className="font-semibold text-sm text-white">{d.label}</div>
                    <div className="text-[#38BDF8] font-bold mt-1">{currency(d.price)}</div>
                    {d.strike ? <div className="text-red-500 line-through text-xs">{currency(d.strike)}</div> : null}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Pembayaran */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">3 • Pilih Pembayaran</h3>
              <div className="mt-2 space-y-2">
                {paymentCategories.map((cat) => (
                  <div key={cat.id} className="border border-gray-700 rounded-xl overflow-hidden">
                    <button onClick={() => setOpenCat((v) => (v === cat.id ? "" : cat.id))}
                            className="w-full h-12 px-3 text-left font-semibold bg-gray-700/50 text-white flex justify-between items-center">
                      <span>{cat.name}</span>
                      <ChevronDownIcon className={`w-5 h-5 text-white transition-transform ${openCat === cat.id ? "rotate-180" : ""}`} />
                    </button>
                    {openCat === cat.id && (
                      <div className="p-3">
                        <div className="space-y-2">
                          {cat.methods.map((m) => {
                            const isSelected = selectedPayment.catId === cat.id && selectedPayment.methodId === m.id;
                            const feeText = m.fee.flat > 0 && m.fee.percent > 0 ? `${currency(m.fee.flat)} + ${m.fee.percent}%` : m.fee.flat > 0 ? currency(m.fee.flat) : m.fee.percent > 0 ? `${m.fee.percent}%` : "Gratis";
                            return (
                              <button key={m.id} onClick={() => setSelPayment({ catId: cat.id, methodId: m.id })}
                                className={`w-full flex justify-between items-center p-3 rounded-xl border-2 transition-all ${isSelected ? "border-[#7F1DFF] bg-purple-900/50" : "border-transparent bg-gray-700 hover:bg-gray-600"}`}>
                                <span className="font-semibold text-sm text-white">{m.name}</span>
                                <span className="text-xs font-medium text-gray-400">Biaya: {feeText}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
            
            {/* Step 4: Kontak & Invoice */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">4 • Detail Kontak (Opsional)</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400">Email untuk Invoice</label>
                  <input
                    value={emailInvoice}
                    onChange={(e) => setEmailInvoice(e.target.value.trim())}
                    onBlur={() => { if (emailInvoice && !RE_EMAIL.test(invoiceEmail)) showToast("Format email invoice tidak valid.", "error"); }}
                    placeholder="Kosongkan jika sama"
                    className="mt-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">No. WhatsApp</label>
                  <div className="mt-1 flex gap-2">
                    <div className="h-11 px-3 rounded-xl border border-gray-700 flex items-center bg-gray-800 text-white">+62</div>
                    <input
                      type="text"
                      inputMode="numeric"
                      pattern="\d*"
                      value={wa}
                      onChange={(e) => setWa(e.target.value.replace(/\D/g, "").slice(0, 15))}
                      placeholder="81234567890"
                      className="flex-1 h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                    />
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="space-y-4">
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">Deskripsi Steam Wallet Code</h3>
              <p className="mt-2 text-gray-300">
                Beli voucher Steam Wallet resmi di {APP_NAME}. Kode langsung dikirim ke email dan dapat digunakan untuk
                mengisi saldo Steam Wallet kamu, untuk membeli game, item, dan konten di Steam.
              </p>
              <ul className="mt-3 list-disc list-inside space-y-1 text-gray-300">
                <li>Kode sesuai region/currency (contoh: IDR untuk akun Indonesia).</li>
                <li>Non‑refund setelah kode diterbitkan.</li>
                <li>Gunakan “Redeem a Steam Wallet Code” di aplikasi/website Steam untuk menukarkan.</li>
              </ul>
            </section>
          </div>
        )}
      </main>

      {/* Sticky Panel + CTA */}
      <div className="fixed left-0 right-0" style={{ bottom: TABBAR_H }}>
        <div className="mx-auto max-w-screen-md px-4">
          <div className="rounded-t-2xl bg-gray-800/90 backdrop-blur shadow-[0_-5px_24px_rgba(0,0,0,0.08)] p-3 border-t border-x border-gray-700">
            <div className="text-sm text-gray-400 border border-dashed border-gray-700 rounded-xl p-3">
              {selectedVariant ? (
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span>Item: <b className="text-white">{selectedVariant.label}</b> × {qty}</span>
                  <span>Total: <b className="text-white">{currency(grandTotal)}</b></span>
                </div>
              ) : (
                "Belum ada nominal yang dipilih."
              )}
            </div>
            <button
              onClick={handleOrder}
              disabled={!canProceed}
              className="mt-3 w-full h-14 rounded-full text-white font-semibold bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              🛍️ Pesan Sekarang!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}