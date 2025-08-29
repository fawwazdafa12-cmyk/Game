
export interface Product {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  discount?: number;
}

export interface NewsArticle {
  id: number;
  title: string;
  imageUrl: string;
}

export interface FlashSaleProduct {
  id: number;
  name: string;
  category: string;
  imageUrl: string;
  originalPrice: number;
  price: number;
  discount: number;
  stock: number;
  remaining: number;
}

export type PromoType = 'flash' | 'voucher' | 'cashback' | 'coins' | 'event';

export interface Promo {
  id: number;
  title: string;
  description: string;
  image: string;
  type: PromoType;
  endAt: string;
  discountPct?: number;
}

export type TransactionStatus = 'Berhasil' | 'Diproses' | 'Menunggu Bayar' | 'Dibatalkan';

export interface Transaction {
  id: string;
  productName: string;
  gameAccountId: string;
  paymentMethod: string;
  dateTime: string;
  total: number;
  status: TransactionStatus;
}

export interface PaymentDetails {
    channel: string;
    code: string;
    qrImage?: string;
    expireAt: string;
}

export interface DeliveryDetails {
    type: ProductType;
    nickname: string;
    uid: string;
    server: string;
    notes?: string;
}

export interface VoucherDetails {
    code: string;
    pin?: string;
    serial?: string;
}

export interface ActivityLog {
    label: string;
    timestamp: string;
}

export interface TransactionDetail extends Transaction {
    rincianBiaya: {
        hargaProduk: number;
        biayaAdmin: number;
        diskon: number;
        total: number;
    };
    productDetails: {
        imageUrl: string;
        name: string;
        item: string;
        quantity: number;
    };
    paymentDetails: PaymentDetails;
    deliveryDetails: DeliveryDetails;
    voucherDetails?: VoucherDetails;
    activityLogs: ActivityLog[];
    coinsUsed?: number;
    coinsEarned?: number;
}

export interface Mission {
    id: number;
    title: string;
    description: string;
    reward: string;
    progress: number;
    isComplete: boolean;
}

export interface CoinBalance {
    available: number;
    pending: number;
}

export interface CoinTransaction {
    id: number;
    type: 'credit' | 'debit';
    amount: number;
    reason: string;
    date: string;
    status: 'Tersedia' | 'Pending';
}

export interface CoinPackage {
    id: number;
    amount: number;
    price: number;
    label?: 'Populer' | 'Best Value';
}

export interface PaymentMethod {
    id: string;
    name: string;
    icon: React.FC<{ className?: string }>;
    fee: {
        flat: number;
        percent: number;
    };
    eta: string;
    status: 'online' | 'degraded' | 'down' | 'maintenance' | 'auto_disabled';
    recommended?: boolean;
    provider: string;
    priority: number;
    successRate: number; // 0-100
    avgLatencyMs: number;
}

export interface PaymentCategory {
    id: string;
    name: string;
    methods: PaymentMethod[];
}

// --- Tipe Baru untuk Halaman Detail Produk ---
export interface ProductVariant {
  id: number;
  label: string; // e.g., "100 Diamonds"
  price: number;
  bestValue?: boolean;
  strike?: number;
  discPct?: number;
  instant?: boolean;
}

export type ProductType = 'topup_uid' | 'voucher_code' | 'pulsa';

export interface FormField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'select' | 'email';
  inputMode?: 'numeric' | 'text' | 'email';
  required: boolean;
  placeholder?: string;
  helper?: string;
  options?: readonly string[];
  validationRegex?: string;
  validationMessage?: string;
  sanitizer?: (value: string) => string;
}

export interface ProductReview {
  id: number;
  author: string;
  avatarUrl: string;
  rating: number; // 1-5
  comment: string;
  date: string;
}

export interface ProductPolicy {
    processingTime: string; // "1-5 Menit"
    refund: string; // "Tersedia Sesuai S&K"
    operationHours: string; // "24 Jam"
}

export type ProductStatus = 'available' | 'maintenance' | 'comingSoon' | 'regionLocked' | 'noVariant';

export interface DescriptionTab {
    title: string;
    content: string;
    steps: string[];
}

export interface ProductDetail {
  id: number;
  name: string;
  image: string;
  bannerUrl?: string;
  category: string;
  brand: string;
  rating: number;
  reviewsCount: number;
  variants: ProductVariant[];
  type: ProductType;
  fields: FormField[];
  policy: ProductPolicy;
  reviews: ProductReview[];
  relatedProducts: Product[];
  coinsToEarn: number;
  descriptionTab?: DescriptionTab;
  active?: boolean;
  status?: ProductStatus;
}

export interface CheckoutData {
  product: ProductDetail;
  variant: ProductVariant;
  formValues: Record<string, string>;
  quantity: number;
  selectedPaymentMethod?: PaymentMethod;
}

export interface PendingPaymentData {
  orderId: string;
  total: number;
  paymentMethod: PaymentMethod;
  expireAt: string;
  productName: string;
  productImage: string;
  qrCodeUrl?: string;
  vaNumber?: string;
  ewalletPhoneNumber?: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  isStreaming?: boolean;
}

export interface User {
  isLoggedIn: boolean;
  roles: string[];
  name?: string;
  email?: string;
  id?: string;
}

export interface UserSession {
  id: string;
  device: string; // e.g., "Chrome on Windows"
  location: string; // e.g., "Jakarta, Indonesia"
  ip: string;
  lastActive: string;
  isCurrent: boolean;
}


// --- ADMIN TYPES ---

export type AdminOrderStatus = 'pending' | 'awaiting_payment' | 'paid' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';

export interface AdminOrder {
  order: {
    id: string;
    status: AdminOrderStatus;
    total_idr: number;
    buyer_email: string;
    buyer_phone?: string;
    channel: string;
    created_at: string;
    expires_at?: string;
  };
  items: AdminOrderItem[];
  payments: AdminPayment[];
}

export interface AdminOrderItem {
  id: string;
  product: string;
  variant_id: string;
  qty: number;
  unit_price_idr: number;
  total_price_idr: number;
}

export interface AdminPayment {
  id: string;
  channel: string;
  status: string;
  amount_idr: number;
  fee_idr: number;
  created_at: string;
  paid_at?: string;
  provider?: string;
  external_id?: string;
}

export interface AdminProductVariant {
  id: string;
  product_id: string;
  label: string;
  price_idr: number;
  strike_idr?: number | null;
  discount_pct?: number | null;
  instant_delivery: boolean;
  region?: string | null;
  active: boolean;
}

export interface AdminProduct {
  id: string;
  slug: string;
  name: string;
  type: string;
  brand: string | null;
  active: boolean;
  maintenance: boolean;
  variants: AdminProductVariant[];
  imageUrl: string;
}


export interface AdminProductFormData {
  name: string;
  slug: string;
  brand: string;
  type: string;
  active: boolean;
  maintenance: boolean;
}

export interface AdminVariantFormData {
  label: string;
  price_idr: number;
  strike_idr?: number;
  active: boolean;
}

export type AdminOrderActionPayload = 
  | { type: 'change_status'; newStatus: AdminOrderStatus }
  | { type: 'refund'; amount: number; reason: string }
  | { type: 'resend_notification'; channel: 'email' | 'wa' };

export interface AdminVoucher {
    id: string;
    code: string;
    vtype: 'amount' | 'percent';
    value: number;
    min_spend_idr: number;
    start_at: string | null;
    end_at: string | null;
    quota: number | null;
    active: boolean;
    created_at: string;
}

export interface AdminVoucherFormData {
    code: string;
    vtype: 'amount' | 'percent';
    value: number;
    min_spend_idr: number;
    start_at: string;
    end_at: string;
    quota?: number;
    active: boolean;
}

export interface AdminCoinAccount {
    user_id: string;
    email: string;
    name?: string | null;
    available_nx: number;
    pending_nx: number;
}

export interface AdminCoinLedgerEntry {
    id: string;
    user_id: string;
    order_id?: string | null;
    etype: 'credit' | 'debit' | 'expire' | 'revoke';
    amount_nx: number;
    status: 'pending' | 'available' | 'expired' | 'reversed';
    description?: string | null;
    created_at: string;
}

export interface AdminCoinAdjustFormData {
    amount_nx: number;
    type: 'credit' | 'debit';
    description: string;
}

export interface AdminUser {
    id: string;
    email: string;
    name?: string | null;
    roles: string[];
    status: 'active' | 'banned';
    created_at: string;
    last_seen?: string | null;
}

export interface AdminBanner {
    id: string;
    imageUrl: string;
    linkUrl: string;
    position: string;
    startDate: string | null;
    endDate: string | null;
    active: boolean;
}

export interface AdminBannerFormData {
    imageUrl: string;
    linkUrl: string;
    position: string;
    startDate: string;
    endDate: string;
    active: boolean;
}

// FIX: Add missing type definition for report form data.
export interface AdminReportFormData {
    startDate: string;
    endDate: string;
    status: string;
    userId?: string;
}

export interface AdminFeatureFlag {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
}

export interface AdminPaymentChannel {
    id: string;
    name: string;
    fee: string;
    minMax: string;
    status: 'active' | 'inactive' | 'maintenance';
}

export interface AdminWebhook {
    id: string;
    url: string;
    status: 'healthy' | 'unhealthy' | 'pending';
    lastCalled: string;
}

export interface TicketMessage {
    id: string;
    sender: 'user' | 'agent';
    agentName?: string;
    text: string;
    timestamp: string;
}

export interface AdminCSTicket {
    id: string;
    subject: string;
    userEmail: string;
    userName: string;
    orderId?: string;
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    priority: 'low' | 'medium' | 'high';
    lastUpdate: string;
    createdAt: string;
    messages: TicketMessage[];
}

export interface ReconciliationMismatch {
  id: string;
  type: 'missing_local' | 'missing_remote' | 'amount_diff';
  orderId: string;
  externalId: string;
  localAmount: number | null;
  remoteAmount: number | null;
  status: 'unresolved' | 'resolved';
}

export interface ReconciliationRun {
  id: string;
  runDate: string;
  provider: 'Midtrans' | 'Xendit';
  okCount: number;
  mismatchCount: number;
  amountDiff: number;
  status: 'completed' | 'failed';
  mismatches: ReconciliationMismatch[];
}

export interface WebhookLog {
  id: string;
  provider: string;
  external_id: string | null;
  signature_ok: boolean;
  received_at: string;
  processed_at: string | null;
  status: 'processed' | 'failed' | 'pending';
}

export type WebhookJobStatus = 'pending' | 'processing' | 'done' | 'failed' | 'dlq';

export interface WebhookJob {
  id: string;
  provider: string;
  external_id: string;
  event_id: string | null;
  payload: Record<string, any>;
  attempt: number;
  next_run_at: string;
  status: WebhookJobStatus;
  last_error: string | null;
}

export type Page = 'home' | 'account' | 'transactions' | 'transactionDetail' | 'promo' | 'hadiahku' | 'coins' | 'topupCoins' | 'checkout' | 'productDetail' | 'paymentInstruction' | 'admin' | 'accessDenied';