import React, { useState, useEffect, useCallback } from 'react';
import { AdminOrder, User, AdminProduct, AdminOrderStatus, AdminProductFormData, AdminVariantFormData, AdminProductVariant, AdminVoucher, AdminVoucherFormData, AdminCoinAccount, AdminCoinLedgerEntry, AdminCoinAdjustFormData, AdminUser, AdminBanner, AdminBannerFormData, AdminFeatureFlag, AdminPaymentChannel, AdminWebhook, AdminCSTicket, ReconciliationRun, WebhookLog, WebhookJob, PaymentCategory } from '../../types.ts';
import Sidebar from './Sidebar.tsx';
import Topbar from './Topbar.tsx';
import Dashboard from './Dashboard.tsx';
import ProductsPage from './ProductsPage.tsx';
import OrdersPage from './OrdersPage.tsx';
import OrderDetailDrawer from './OrderDetailDrawer.tsx';
import ProductDetailDrawer from './ProductDetailDrawer.tsx';
import ProductEditModal from './ProductEditModal.tsx';
import VariantEditModal from './VariantEditModal.tsx';
import ConfirmationModal from './ConfirmationModal.tsx';
import OrderStatusModal from './OrderStatusModal.tsx';
import RefundModal from './RefundModal.tsx';
import VouchersPage from './VouchersPage.tsx';
import VoucherEditModal from './VoucherEditModal.tsx';
import CoinsPage from './CoinsPage.tsx';
import CoinLedgerDrawer from './CoinLedgerDrawer.tsx';
import CoinAdjustModal from './CoinAdjustModal.tsx';
import UsersPage from './UsersPage.tsx';
import UserDetailDrawer from './UserDetailDrawer.tsx';
import CmsPage from './CmsPage.tsx';
import BannerEditModal from './BannerEditModal.tsx';
import PaymentsPage from './PaymentsPage.tsx';
import FeatureFlagsPage from './FeatureFlagsPage.tsx';
import IntegrationsPage from './IntegrationsPage.tsx';
import ReportsPage from './ReportsPage.tsx';
import SettingsPage from './SettingsPage.tsx';
import RoleEditModal from './RoleEditModal.tsx';
import CsPage from './CsPage.tsx';
import CsTicketDetailDrawer from './CsTicketDetailDrawer.tsx';
import { SpinnerIcon } from '../icons/index.tsx';
import ReconciliationDetailModal from './ReconciliationDetailModal.tsx';


interface AdminPageProps {
    user: User;
    onNavigateHome: () => void;
    showToast: (message: string, type: 'success' | 'error') => void;
    reconciliationRuns: ReconciliationRun[];
    webhookLogs: WebhookLog[];
    webhookJobs: WebhookJob[];
    onWebhookJobAction: (jobId: string, action: 'reprocess' | 'discard') => void;
    paymentCategories: PaymentCategory[];
    onToggleChannelStatus: (methodId: string) => void;
}

const AdminPage: React.FC<AdminPageProps> = ({ user, onNavigateHome, showToast, reconciliationRuns, webhookLogs, webhookJobs, onWebhookJobAction, paymentCategories, onToggleChannelStatus }) => {
    // --- GENERIC STATE ---
    const [activePage, setActivePage] = useState('dashboard');
    const [isSidebarCollapsed, setSidebarCollapsed] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // --- DATA STATE ---
    const [products, setProducts] = useState<AdminProduct[]>([]);
    const [orders, setOrders] = useState<AdminOrder[]>([]);
    const [vouchers, setVouchers] = useState<AdminVoucher[]>([]);
    const [coinAccounts, setCoinAccounts] = useState<AdminCoinAccount[]>([]);
    const [coinLedgers, setCoinLedgers] = useState<Record<string, AdminCoinLedgerEntry[]>>({});
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [banners, setBanners] = useState<AdminBanner[]>([]);
    const [featureFlags, setFeatureFlags] = useState<AdminFeatureFlag[]>([]);
    const [paymentChannels, setPaymentChannels] = useState<AdminPaymentChannel[]>([]);
    const [csTickets, setCsTickets] = useState<AdminCSTicket[]>([]);

    // --- DETAIL DRAWERS STATE ---
    const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
    const [selectedProduct, setSelectedProduct] = useState<AdminProduct | null>(null);
    const [selectedUserForLedger, setSelectedUserForLedger] = useState<AdminCoinAccount | null>(null);
    const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);
    const [selectedTicket, setSelectedTicket] = useState<AdminCSTicket | null>(null);

    // --- MODALS STATE ---
    const [modalState, setModalState] = useState<{
        productEdit?: AdminProduct | 'new';
        variantEdit?: { variant: AdminProductVariant | 'new'; product: AdminProduct };
        confirmation?: { title: string; message: string; onConfirm: () => void };
        orderStatus?: AdminOrder;
        orderRefund?: AdminOrder;
        voucherEdit?: AdminVoucher | 'new';
        coinAdjust?: AdminCoinAccount;
        bannerEdit?: AdminBanner | 'new';
        roleEdit?: AdminUser;
        reconciliationDetail?: ReconciliationRun;
    }>({});

    const closeModal = () => setModalState({});
    
    // --- DATA FETCHING ---
    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [productsRes, ordersRes, vouchersRes, usersRes, coinsRes, bannersRes, flagsRes, channelsRes, ticketsRes] = await Promise.all([
                fetch('/api/admin/products').catch(e => null),
                fetch('/api/admin/orders').catch(e => null),
                fetch('/api/admin/vouchers').catch(e => null),
                fetch('/api/admin/users').catch(e => null),
                fetch('/api/admin/coins/accounts').catch(e => null),
                fetch('/api/admin/banners').catch(e => null),
                fetch('/api/admin/feature-flags').catch(e => null),
                fetch('/api/admin/payment-channels').catch(e => null),
                fetch('/api/admin/cs-tickets').catch(e => null),
            ]);

            if (productsRes?.ok) setProducts(await productsRes.json());
            if (ordersRes?.ok) setOrders(await ordersRes.json());
            if (vouchersRes?.ok) setVouchers(await vouchersRes.json());
            if (usersRes?.ok) setUsers(await usersRes.json());
            if (coinsRes?.ok) setCoinAccounts((await coinsRes.json()).items);
            if (bannersRes?.ok) setBanners(await bannersRes.json());
            if (flagsRes?.ok) setFeatureFlags(await flagsRes.json());
            if (channelsRes?.ok) setPaymentChannels(await channelsRes.json());
            if (ticketsRes?.ok) setCsTickets(await ticketsRes.json());

        } catch (error) {
            console.error("Failed to fetch admin data:", error);
            showToast('Failed to load some admin data. Using mock fallbacks.', 'error');
        } finally {
            setIsLoading(false);
        }
    }, [showToast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    // --- API HANDLER ---
    const handleApiCall = async (
        endpoint: string,
        method: 'POST' | 'PATCH' | 'DELETE',
        body: any,
        successMessage: string,
        errorMessage: string
    ) => {
        try {
            const res = await fetch(endpoint, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });
            if (!res.ok) {
                const errorData = await res.json().catch(() => ({ error: 'Request failed' }));
                throw new Error(errorData.error || 'API request failed');
            }
            showToast(successMessage, 'success');
            fetchData();
            return true;
        } catch (error: any) {
            showToast(`${errorMessage}: ${error.message}`, 'error');
            return false;
        } finally {
            closeModal();
        }
    };
    
    // --- PRODUCT CRUD ---
    const handleSaveProduct = (data: AdminProductFormData) => {
        const isNew = modalState.productEdit === 'new';
        const endpoint = isNew ? '/api/admin/products' : `/api/admin/products/${(modalState.productEdit as AdminProduct).id}`;
        const method = isNew ? 'POST' : 'PATCH';
        handleApiCall(endpoint, method, data, `Product "${data.name}" saved.`, 'Failed to save product');
    };
    
    const handleDeleteProduct = (product: AdminProduct) => {
        handleApiCall(`/api/admin/products/${product.id}`, 'DELETE', null, `Product "${product.name}" deleted.`, 'Failed to delete product')
            .then(() => setSelectedProduct(null));
    };

    const handleSaveVariant = (data: AdminVariantFormData) => {
        const { product, variant } = modalState.variantEdit!;
        const isNew = variant === 'new';
        const endpoint = isNew ? `/api/admin/products/${product.id}/variants` : `/api/admin/products/variants/${(variant as AdminProductVariant).id}`;
        const method = isNew ? 'POST' : 'PATCH';
        handleApiCall(endpoint, method, data, `Variant "${data.label}" saved.`, 'Failed to save variant');
    };

    const handleDeleteVariant = (productId: string, variantId: string) => {
        handleApiCall(`/api/admin/products/variants/${variantId}`, 'DELETE', null, `Variant deleted.`, 'Failed to delete variant');
    };
    
    // --- ORDER ACTIONS ---
    const handleUpdateOrderStatus = (order: AdminOrder, newStatus: AdminOrderStatus) => {
        handleApiCall(`/api/admin/orders/${order.order.id}/status`, 'PATCH', { status: newStatus }, `Order status updated to ${newStatus}.`, 'Failed to update order status')
            .then(success => {
                if(success) setSelectedOrder(prev => prev ? { ...prev, order: {...prev.order, status: newStatus}} : null);
            });
    };

    const handleRefundOrder = (order: AdminOrder, amount: number, reason: string) => {
         handleApiCall(`/api/admin/orders/${order.order.id}/refund`, 'POST', { amount_idr: amount, reason }, `Refund for order ${order.order.id} processed.`, 'Failed to process refund')
            .then(success => {
                if (success) setSelectedOrder(null);
            });
    };

    const handleResendNotification = (orderId: string, channel: 'email' | 'wa') => {
        handleApiCall(`/api/admin/orders/${orderId}/resend`, 'POST', { channel }, `Resend via ${channel} for ${orderId} queued.`, 'Failed to resend notification');
    };
    
    // --- VOUCHER CRUD ---
    const handleSaveVoucher = (data: AdminVoucherFormData) => {
        const isNew = modalState.voucherEdit === 'new';
        const endpoint = isNew ? '/api/admin/vouchers' : `/api/admin/vouchers/${(modalState.voucherEdit as AdminVoucher).id}`;
        const method = isNew ? 'POST' : 'PATCH';
        const payload = {...data, quota: data.quota === undefined ? null : data.quota };
        handleApiCall(endpoint, method, payload, `Voucher "${data.code}" saved.`, 'Failed to save voucher');
    };

    const handleDeleteVoucher = (voucher: AdminVoucher) => {
        handleApiCall(`/api/admin/vouchers/${voucher.id}`, 'DELETE', null, `Voucher "${voucher.code}" deleted.`, 'Failed to delete voucher');
    };

    // --- COINS ACTIONS ---
    const handleSaveCoinAdjustment = (user: AdminCoinAccount, data: AdminCoinAdjustFormData) => {
        handleApiCall('/api/admin/coins/adjust', 'POST', { user_id: user.user_id, ...data }, `${data.amount_nx} coins ${data.type}ed for ${user.email}.`, 'Failed to adjust balance');
    };
    
    const handleViewLedger = async (user: AdminCoinAccount) => {
        setSelectedUserForLedger(user);
        try {
            const res = await fetch(`/api/admin/coins/ledger?user_id=${user.user_id}`);
            if(!res.ok) throw new Error('API request failed');
            const data = await res.json();
            setCoinLedgers(prev => ({...prev, [user.user_id]: data.items || [] }));
        } catch(e) {
            showToast('Could not fetch ledger.', 'error');
            setCoinLedgers(prev => ({...prev, [user.user_id]: [] }));
        }
    };

    // --- USER ACTIONS ---
    const handleUpdateUser = (updatedUser: AdminUser) => {
        handleApiCall(`/api/admin/users/${updatedUser.id}`, 'PATCH', { roles: updatedUser.roles, status: updatedUser.status }, `User ${updatedUser.email} has been updated.`, 'Failed to update user')
            .then(success => {
                if (success) setSelectedUser(null);
            });
    };

    const handleSaveUserRoles = (user: AdminUser, newRoles: string[]) => {
        handleApiCall(`/api/admin/users/${user.id}`, 'PATCH', { roles: newRoles }, `Roles for ${user.email} have been updated.`, 'Failed to update roles');
    };

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-full">
                    <SpinnerIcon className="w-12 h-12 text-white" />
                </div>
            )
        }
        
        switch (activePage) {
            case 'dashboard': return <Dashboard />;
            case 'products': return <ProductsPage 
                products={products}
                onProductSelect={setSelectedProduct}
                onAddProduct={() => setModalState({ productEdit: 'new' })}
                onDeleteProduct={(p) => setModalState({ confirmation: { title: 'Delete Product', message: `Delete "${p.name}"? This cannot be undone.`, onConfirm: () => handleDeleteProduct(p) }})}
            />;
            case 'orders': return <OrdersPage orders={orders} onOrderSelect={setSelectedOrder} />;
            case 'vouchers': return <VouchersPage 
                vouchers={vouchers} 
                onAddVoucher={() => setModalState({ voucherEdit: 'new' })}
                onEditVoucher={(v) => setModalState({ voucherEdit: v })}
                onDeleteVoucher={(v) => setModalState({ confirmation: { title: 'Delete Voucher', message: `Delete voucher "${v.code}"?`, onConfirm: () => handleDeleteVoucher(v) }})}
            />;
            case 'coins': return <CoinsPage 
                accounts={coinAccounts}
                onAdjust={(acc) => setModalState({ coinAdjust: acc })}
                onViewLedger={handleViewLedger}
            />;
            case 'users': return <UsersPage users={users} onUserSelect={setSelectedUser} />;
            case 'cs': return <CsPage tickets={csTickets} onTicketSelect={setSelectedTicket} />;
            case 'cms': return <CmsPage banners={banners} onAddBanner={() => setModalState({ bannerEdit: 'new' })} onEditBanner={(b) => setModalState({ bannerEdit: b })} onDeleteBanner={(b) => setModalState({ confirmation: { title: 'Delete Banner', message: 'Are you sure?', onConfirm: () => {} } })} />;
            case 'payments': return <PaymentsPage orders={orders} reconciliationRuns={reconciliationRuns} onViewReconciliation={(run) => setModalState({ reconciliationDetail: run })} showToast={showToast} />;
            case 'flags': return <FeatureFlagsPage flags={featureFlags} onToggle={() => {}} />;
            case 'integrations': return <IntegrationsPage paymentCategories={paymentCategories} webhooks={webhookLogs} webhookJobs={webhookJobs} onToggleChannel={onToggleChannelStatus} onWebhookJobAction={onWebhookJobAction} />;
            case 'reports': return <ReportsPage onExport={() => {}} />;
            case 'settings': return <SettingsPage users={users} onEditUserRoles={(user) => setModalState({ roleEdit: user })} />;
            default: return <div className="text-white">Page: {activePage}</div>;
        }
    };

    return (
        <div className="flex h-screen bg-[#0B0F12] text-white font-sans" style={{fontFamily: "'Inter', sans-serif"}}>
            <Sidebar activePage={activePage} onNavigate={setActivePage} isCollapsed={isSidebarCollapsed} onToggle={() => setSidebarCollapsed(prev => !prev)} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <Topbar user={user} activePage={activePage} onNavigateHome={onNavigateHome} />
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#101826] p-6 lg:p-8 relative">
                    {renderContent()}
                </main>
            </div>
            
            {/* Drawers */}
            <OrderDetailDrawer order={selectedOrder} onClose={() => setSelectedOrder(null)} onUpdateStatus={() => setModalState({ orderStatus: selectedOrder! })} onRefund={() => setModalState({ orderRefund: selectedOrder! })} onResend={(channel) => setModalState({ confirmation: { title: `Resend ${channel}`, message: `Resend notification to ${selectedOrder?.order.buyer_email}?`, onConfirm: () => handleResendNotification(selectedOrder!.order.id, channel) }})} />
            <ProductDetailDrawer product={selectedProduct} onClose={() => setSelectedProduct(null)} onEditProduct={() => setModalState({ productEdit: selectedProduct! })} onAddVariant={() => setModalState({ variantEdit: { product: selectedProduct!, variant: 'new' }})} onEditVariant={(v) => setModalState({ variantEdit: { product: selectedProduct!, variant: v }})} onDeleteVariant={(v) => setModalState({ confirmation: { title: 'Delete Variant', message: `Delete variant "${v.label}"?`, onConfirm: () => handleDeleteVariant(selectedProduct!.id, v.id) }})} />
            <CoinLedgerDrawer user={selectedUserForLedger} ledger={coinLedgers[selectedUserForLedger?.user_id || ''] || []} onClose={() => setSelectedUserForLedger(null)} />
            <UserDetailDrawer user={selectedUser} onClose={() => setSelectedUser(null)} onUpdateUser={handleUpdateUser} />
            <CsTicketDetailDrawer ticket={selectedTicket} onClose={() => setSelectedTicket(null)} onUpdateTicket={() => {}} agentName={user.name || 'Admin'} />


            {/* Modals */}
            {modalState.productEdit && <ProductEditModal product={modalState.productEdit} onSave={handleSaveProduct} onClose={closeModal} />}
            {modalState.variantEdit && <VariantEditModal variant={modalState.variantEdit.variant} onSave={handleSaveVariant} onClose={closeModal} />}
            {modalState.orderStatus && <OrderStatusModal order={modalState.orderStatus} onSave={handleUpdateOrderStatus} onClose={closeModal} />}
            {modalState.orderRefund && <RefundModal order={modalState.orderRefund} onConfirm={handleRefundOrder} onClose={closeModal} />}
            {modalState.voucherEdit && <VoucherEditModal voucher={modalState.voucherEdit} onSave={handleSaveVoucher} onClose={closeModal} />}
            {modalState.coinAdjust && <CoinAdjustModal user={modalState.coinAdjust} onSave={handleSaveCoinAdjustment} onClose={closeModal} />}
            {modalState.bannerEdit && <BannerEditModal banner={modalState.bannerEdit} onSave={() => {}} onClose={closeModal} />}
            {modalState.roleEdit && <RoleEditModal user={modalState.roleEdit} onSave={handleSaveUserRoles} onClose={closeModal} />}
            {modalState.reconciliationDetail && <ReconciliationDetailModal run={modalState.reconciliationDetail} onClose={closeModal} />}
            {modalState.confirmation && <ConfirmationModal {...modalState.confirmation} onClose={closeModal} />}
        </div>
    );
};

export default AdminPage;
