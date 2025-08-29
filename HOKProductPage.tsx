import React, { useState } from "react";
import { CheckoutData, PaymentCategory, ProductDetail } from "../types";
import { ChevronLeftIcon, ShareIcon, ChatBubbleLeftEllipsisIcon, StarIcon, ChevronDownIcon } from "./icons";
import { hokProductPageBannerUrl, mlProductPageBannerUrl } from "./ImageAssets";
import { formatDateOnlyShort } from "../src/lib/time";

interface HOKProductPageProps {
  product: ProductDetail;
  paymentCategories: PaymentCategory[];
  onProceedToCheckout: (data: CheckoutData) => void;
  showToast: (message: string, type: "success" | "error") => void;
  onBack: () => void;
}

const APP_NAME = "NexusTOPUP";
const TABBAR_H = 72;

// UID HoK: gunakan angka 6–12 digit (sesuaikan jika kamu punya aturan resmi)
const RE_HOK_UID = /^\d{6,12}$/;

function currency(n: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);
}

export default function HOKProductPage({
  product,
  paymentCategories,
  onProceedToCheckout,
  showToast,
  onBack,
}: HOKProductPageProps) {
  const [tab, setTab] = useState<"trx" | "info">("trx");
  const [uid, setUid] = useState("");
  const [selectedVariantId, setSelectedVariantId] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [promo, setPromo] = useState("");
  const [openCat, setOpenCat] = useState<string>("ewallet");
  const [selectedPayment, setSelPayment] = useState<{ catId?: string; methodId?: string }>({});

  const selectedVariant = React.useMemo(
    () => product.variants.find((d) => d.id === selectedVariantId),
    [selectedVariantId, product.variants]
  );

  const selectedPaymentMethod = React.useMemo(() => {
    if (!selectedPayment.catId || !selectedPayment.methodId) return null;
    const cat = paymentCategories.find((c) => c.id === selectedPayment.catId);
    return cat?.methods.find((m) => m.id === selectedPayment.methodId) || null;
  }, [selectedPayment, paymentCategories]);

  const fee = React.useMemo(() => {
    if (!selectedPaymentMethod) return 0;
    const subtotal = (selectedVariant?.price || 0) * qty;
    return Math.round(
      (selectedPaymentMethod.fee.flat || 0) + (subtotal * (selectedPaymentMethod.fee.percent || 0)) / 100
    );
  }, [selectedPaymentMethod, selectedVariant, qty]);

  const subtotal = (selectedVariant?.price || 0) * qty;
  const grandTotal = Math.max(0, subtotal + fee);

  const isUidValid = RE_HOK_UID.test(uid.trim());
  const isReady = Boolean(isUidValid && selectedVariant && selectedPaymentMethod);

  function validate(): string | null {
    if (!uid.trim()) return "UID wajib diisi.";
    if (!isUidValid) return "UID harus angka 6–12 digit.";
    if (!selectedVariant) return "Pilih nominal terlebih dahulu.";
    if (!selectedPaymentMethod) return "Pilih metode pembayaran.";
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
            uid, 
            server: '', // HOK doesn't need server
            email, 
            wa, 
            promo 
        },
        selectedPaymentMethod: selectedPaymentMethod,
      };
      onProceedToCheckout(checkoutData);
    }
  }

  const bannerSrc = hokProductPageBannerUrl || mlProductPageBannerUrl;

  return (
    <>
      <main className="max-w-screen-md mx-auto px-4 pb-[160px]">
        {/* Hero */}
        <section>
          <div className="w-full aspect-[1920/749] rounded-2xl bg-gradient-to-r from-[#7F1DFF] to-[#38BDF8] overflow-hidden translate-y-[5%]">
            <img src={bannerSrc} alt="Honor of Kings Banner" className="w-full h-full object-cover rounded-2xl" />
          </div>

          <div className="mt-3 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
            <div className="flex gap-3">
              <div className="w-16 h-16 bg-gray-700 rounded-xl overflow-hidden">
                <img src={product.image} alt={product.name || "Honor of Kings"} className="w-full h-full object-cover" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">HONOR OF KINGS</h2>
                <p className="text-gray-400 text-sm">{product.brand || "Level Infinite"}</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 text-sm font-medium text-gray-300">
              <div className="flex items-center gap-2">⚡ Proses Cepat</div>
              <div className="flex items-center gap-2">💬 Chat 24/7</div>
              <div className="flex items-center gap-2">🔒 Pembayaran Aman</div>
            </div>
          </div>
        </section>

        {/* Tabs */}
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => setTab("trx")}
            className={`flex-1 h-10 rounded-full font-semibold ${
              tab === "trx"
                ? "text-white bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)]"
                : "bg-gray-800 border border-gray-700 text-gray-300"
            }`}
          >
            Transaksi
          </button>
          <button
            onClick={() => setTab("info")}
            className={`flex-1 h-10 rounded-full font-semibold ${
              tab === "info"
                ? "text-white bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)]"
                : "bg-gray-800 border border-gray-700 text-gray-300"
            }`}
          >
            Keterangan
          </button>
        </div>

        {tab === "trx" ? (
          <>
            {/* Step 1: UID */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">1 • Masukkan Player ID</h3>
              <div className="mt-3">
                  <label className="text-sm text-gray-400">Player ID</label>
                  <input
                    value={uid}
                    onChange={(e) => setUid(e.target.value.replace(/\D/g, "").slice(0, 12))}
                    onBlur={() => { if (uid && !isUidValid) showToast("Player ID harus angka 6–12 digit.", "error"); }}
                    placeholder="Contoh: 1234567890"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength={12}
                    className="mt-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                  />
                  <p className="text-xs text-gray-400 mt-2">Cara cek UID: buka game → profil/akun → lihat UID (angka).</p>
              </div>
            </section>

            {/* Step 2: Nominal (Tokens/Pass) */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">2 • Pilih Nominal (Tokens / Pass)</h3>
              <div className="mt-3 grid grid-cols-2 gap-3">
                {product.variants.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setSelectedVariantId(d.id)}
                    className={`text-left p-3 rounded-xl border-2 ${
                      selectedVariantId === d.id
                        ? "border-[#7F1DFF] ring-2 ring-[#38BDF8]/40 bg-purple-900/30"
                        : "border-gray-700 bg-gray-700"
                    }`}
                  >
                    <div className="font-semibold text-sm text-white">{d.label}</div>
                    <div className="text-[#38BDF8] font-bold mt-1">{currency(d.price)}</div>
                    {d.strike ? <div className="text-red-500 line-through text-xs">{currency(d.strike)}</div> : null}
                  </button>
                ))}
              </div>
            </section>

            {/* Step 3: Jumlah */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">3 • Masukkan Jumlah Pembelian</h3>
              <div className="mt-3 flex items-center gap-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="h-10 w-10 text-2xl font-light rounded-xl border border-gray-600 bg-gray-700 text-white">−</button>
                <input
                  value={qty}
                  onChange={(e) => setQty(Math.max(1, parseInt((e.target.value || "1").replace(/\D/g, ""), 10) || 1))}
                  type="text"
                  inputMode="numeric"
                  pattern="\d*"
                  className="w-24 h-10 text-center font-bold rounded-xl border border-gray-700 bg-gray-900 text-white outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
                <button onClick={() => setQty((q) => q + 1)} className="h-10 w-10 text-2xl font-light rounded-xl border border-gray-600 bg-gray-700 text-white">＋</button>
              </div>
            </section>

            {/* Step 4: Pembayaran */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">4 • Pilih Pembayaran</h3>
              <div className="mt-2 space-y-2">
                {paymentCategories.map((cat) => (
                  <div key={cat.id} className="border border-gray-700 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpenCat((v) => (v === cat.id ? "" : cat.id))}
                      className="w-full h-12 px-3 text-left font-semibold bg-gray-700/50 text-white flex justify-between items-center"
                    >
                      <span>{cat.name}</span>
                      <ChevronDownIcon className={`w-5 h-5 text-white transition-transform ${openCat === cat.id ? "rotate-180" : ""}`} />
                    </button>
                    {openCat === cat.id && (
                      <div className="p-3">
                        <div className="space-y-2">
                          {cat.methods.map((m) => {
                            const isSelected = selectedPayment.catId === cat.id && selectedPayment.methodId === m.id;
                            const feeText =
                              m.fee.flat > 0 && m.fee.percent > 0
                                ? `${currency(m.fee.flat)} + ${m.fee.percent}%`
                                : m.fee.flat > 0
                                ? currency(m.fee.flat)
                                : m.fee.percent > 0
                                ? `${m.fee.percent}%`
                                : "Gratis";
                            return (
                              <button
                                key={m.id}
                                onClick={() => setSelPayment({ catId: cat.id, methodId: m.id })}
                                className={`w-full flex justify-between items-center p-3 rounded-xl border-2 transition-all ${
                                  isSelected ? "border-[#7F1DFF] bg-purple-900/50" : "border-transparent bg-gray-700 hover:bg-gray-600"
                                }`}
                              >
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

            {/* Step 5: Promo */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">5 • Kode Promo <span className="text-xs font-normal text-red-500">JIKA ADA</span></h3>
              <div className="mt-3 flex gap-2">
                <input
                  value={promo}
                  onChange={(e) => setPromo(e.target.value.toUpperCase())}
                  placeholder="Masukkan Kode Promo"
                  className="flex-1 w-full h-11 rounded-xl border border-gray-700 bg-gray-900 text-white px-3 outline-none focus:ring-2 focus:ring-[#38BDF8]"
                />
              </div>
              <p className="text-xs text-gray-400 mt-2">Kode promo akan divalidasi di checkout.</p>
            </section>

            {/* Step 6: Kontak */}
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">6 • Detail Kontak</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-sm text-gray-400">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@gmail.com"
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
                  <p className="text-xs text-gray-400 mt-2">Isi tanpa angka 0 di depan. Kami hubungi jika ada kendala.</p>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="space-y-4">
            <section className="mt-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white">Deskripsi Honor of Kings</h3>
              <p className="mt-2 text-gray-300">
                Top up Tokens/Pass Honor of Kings cepat, aman, dan resmi di {APP_NAME}. Pilih nominal,
                masukkan Player ID, pilih metode pembayaran, lalu pesan.
              </p>
              <ol className="mt-3 list-decimal list-inside space-y-1 text-gray-300">
                <li>Pilih nominal (Tokens / Pass)</li>
                <li>Masukkan Player ID (6–12 digit angka)</li>
                <li>Tentukan jumlah</li>
                <li>Pilih metode pembayaran</li>
                <li>Isi detail kontak</li>
                <li>Klik Pesan Sekarang dan lakukan pembayaran</li>
              </ol>
            </section>

            {/* Rating & Ulasan */}
            <section className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white text-lg">Rating & Ulasan ({product.reviewsCount.toLocaleString()})</h3>
              <div className="mt-3 flex items-center gap-4">
                <div className="text-center">
                  <p className="text-4xl font-extrabold text-white">
                    {product.rating.toFixed(2)}<span className="text-xl text-gray-400">/5</span>
                  </p>
                  <div className="flex justify-center mt-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} className={`w-5 h-5 ${i < Math.round(product.rating) ? "text-yellow-400" : "text-gray-600"}`} />
                    ))}
                  </div>
                </div>
                <div className="flex-1 space-y-1">
                  {[5, 4, 3, 2, 1].map((star) => (
                    <div key={star} className="flex items-center gap-2">
                      <span className="text-xs text-gray-400 flex items-center">
                        {star}<StarIcon className="w-3 h-3 text-yellow-400 ml-0.5" />
                      </span>
                      <div className="w-full bg-gray-600 rounded-full h-1.5">
                        <div className="bg-yellow-400 h-1.5 rounded-full" style={{ width: `${(star / 5) * 80 + Math.random() * 20}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            
             {/* Ulasan Pembeli */}
            <section className="p-4 bg-gray-800 border border-gray-700 rounded-2xl">
              <h3 className="font-bold text-white text-lg mb-3">Ulasan Pembeli</h3>
              <div className="space-y-4">
                {product.reviews.map((review) => (
                  <div key={review.id} className="flex space-x-3">
                    <img src={review.avatarUrl} alt={review.author} className="w-10 h-10 rounded-full" />
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-bold text-sm text-white">{review.author}</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-3.5 h-3.5 ${i < review.rating ? "text-yellow-400" : "text-gray-600"}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm mt-1 text-gray-300">{review.comment}</p>
                      <p className="text-xs text-gray-500 mt-1">{formatDateOnlyShort(review.date)}</p>
                    </div>
                  </div>
                ))}
              </div>
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
                "Belum ada item produk yang dipilih."
              )}
            </div>
            <button
              onClick={handleOrder}
              disabled={!isReady}
              className="mt-3 w-full h-14 rounded-full text-white font-semibold bg-[linear-gradient(135deg,#7F1DFF,#38BDF8)] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              🛍️ Pesan Sekarang!
            </button>
          </div>
        </div>
      </div>
    </>
  );
}