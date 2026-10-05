import type { LucideIcon } from 'lucide-react'
import {
  Bell, Boxes, BriefcaseBusiness, CircleDollarSign, ClipboardList, Coins, CreditCard, FileBarChart,
  FileCog, Gauge, Gift, LayoutDashboard, Megaphone, Package, PanelsTopLeft, ScrollText, Settings2,
  ShieldCheck, ShoppingBag, Tags, Ticket, UserRound, Users, WalletCards, Banknote, BadgeDollarSign,
} from 'lucide-react'

export type AdminNavItem = { label: string; href: string; icon: LucideIcon; disabled?: boolean }
export type AdminNavGroup = { label: string; items: AdminNavItem[] }

export const adminNavigation: AdminNavGroup[] = [
  { label: 'الرئيسية', items: [{ label: 'لوحة التحكم', href: '/admin', icon: LayoutDashboard }] },
  { label: 'المتجر', items: [
    { label: 'إدارة الرئيسية', href: '/admin/home', icon: PanelsTopLeft },
    { label: 'البنرات', href: '/admin/banners', icon: Megaphone },
    { label: 'الأقسام', href: '/admin/categories', icon: Boxes },
    { label: 'المنتجات', href: '/admin/products', icon: Package },
    { label: 'الباقات', href: '/admin/packages', icon: Tags },
  ] },
  { label: 'الخدمات', items: [
    { label: 'أنواع المنتجات', href: '/admin/product-types', icon: ShoppingBag },
    { label: 'خدمات السوشيال', href: '/admin/social-services', icon: Users, disabled: true },
    { label: 'الاشتراكات', href: '/admin/subscriptions', icon: Ticket, disabled: true },
    { label: 'العملات الرقمية', href: '/admin/currencies', icon: Coins, disabled: true },
    { label: 'خدمات السحب', href: '/admin/withdrawal-services', icon: Banknote, disabled: true },
    { label: 'كتالوج الخدمات', href: '/admin/services', icon: BriefcaseBusiness },
  ] },
  { label: 'الطلبات', items: [
    { label: 'جميع الطلبات', href: '/admin/orders', icon: ClipboardList, disabled: true },
    { label: 'قيد المراجعة', href: '/admin/orders/review', icon: ScrollText, disabled: true },
    { label: 'قيد التنفيذ', href: '/admin/orders/processing', icon: Gauge, disabled: true },
    { label: 'مكتملة', href: '/admin/orders/completed', icon: ShieldCheck, disabled: true },
    { label: 'مرفوضة / فاشلة', href: '/admin/orders/failed', icon: FileCog, disabled: true },
  ] },
  { label: 'العملاء', items: [
    { label: 'العملاء', href: '/admin/customers', icon: UserRound, disabled: true },
    { label: 'شرائح العملاء', href: '/admin/customer-segments', icon: Users, disabled: true },
  ] },
  { label: 'المحفظة والمالية', items: [
    { label: 'المحفظة', href: '/admin/wallet', icon: WalletCards, disabled: true },
    { label: 'طلبات الإيداع', href: '/admin/deposits', icon: CircleDollarSign, disabled: true },
    { label: 'معاملات المحفظة', href: '/admin/wallet/transactions', icon: CreditCard, disabled: true },
    { label: 'أكواد سينو', href: '/admin/seno-codes', icon: Gift, disabled: true },
  ] },
  { label: 'المدفوعات', items: [
    { label: 'طرق الدفع', href: '/admin/payment-methods', icon: CreditCard, disabled: true },
    { label: 'حسابات الدفع', href: '/admin/payment-accounts', icon: BadgeDollarSign, disabled: true },
    { label: 'معاملات الدفع', href: '/admin/payment-transactions', icon: FileBarChart, disabled: true },
  ] },
  { label: 'السحب', items: [
    { label: 'طلبات السحب', href: '/admin/withdrawals', icon: Banknote, disabled: true },
    { label: 'طرق السحب', href: '/admin/withdrawal-methods', icon: WalletCards, disabled: true },
    { label: 'معاملات السحب', href: '/admin/withdrawal-transactions', icon: FileBarChart, disabled: true },
  ] },
  { label: 'التسويق', items: [
    { label: 'العروض', href: '/admin/offers', icon: Gift, disabled: true },
    { label: 'كوبونات الخصم', href: '/admin/coupons', icon: Ticket, disabled: true },
    { label: 'الحملات', href: '/admin/campaigns', icon: Megaphone, disabled: true },
  ] },
  { label: 'الإشعارات', items: [
    { label: 'مركز الإشعارات', href: '/admin/notifications', icon: Bell, disabled: true },
    { label: 'قوالب الإشعارات', href: '/admin/notification-templates', icon: ScrollText, disabled: true },
  ] },
  { label: 'التقارير', items: [
    { label: 'المبيعات', href: '/admin/reports/sales', icon: FileBarChart, disabled: true },
    { label: 'الطلبات', href: '/admin/reports/orders', icon: ClipboardList, disabled: true },
    { label: 'المنتجات', href: '/admin/reports/products', icon: Package, disabled: true },
    { label: 'العملاء', href: '/admin/reports/customers', icon: Users, disabled: true },
    { label: 'الأرباح', href: '/admin/reports/profit', icon: CircleDollarSign, disabled: true },
  ] },
  { label: 'الإدارة', items: [
    { label: 'المستخدمون الإداريون', href: '/admin/admin-users', icon: UserRound, disabled: true },
    { label: 'الأدوار والصلاحيات', href: '/admin/roles', icon: ShieldCheck, disabled: true },
    { label: 'سجل العمليات', href: '/admin/audit-logs', icon: ScrollText, disabled: true },
  ] },
  { label: 'الإعدادات', items: [
    { label: 'إعدادات المتجر', href: '/admin/settings/store', icon: Settings2, disabled: true },
    { label: 'إعدادات الطلبات', href: '/admin/settings/orders', icon: ClipboardList, disabled: true },
    { label: 'إعدادات الدفع', href: '/admin/settings/payments', icon: CreditCard, disabled: true },
    { label: 'إعدادات المحفظة', href: '/admin/settings/wallet', icon: WalletCards, disabled: true },
    { label: 'إعدادات السحب', href: '/admin/settings/withdrawals', icon: Banknote, disabled: true },
    { label: 'الإشعارات', href: '/admin/settings/notifications', icon: Bell, disabled: true },
    { label: 'الأمان', href: '/admin/settings/security', icon: ShieldCheck, disabled: true },
    { label: 'التكاملات', href: '/admin/settings/integrations', icon: Settings2, disabled: true },
  ] },
]

export const adminNotifications = [
  { title: 'طلب جديد يحتاج للمراجعة', detail: 'منذ 5 دقائق', tone: 'gold' },
  { title: 'تم استلام طلب شحن', detail: 'منذ 18 دقيقة', tone: 'green' },
  { title: 'طلب سحب جديد', detail: 'منذ 32 دقيقة', tone: 'red' },
  { title: 'تنبيه بخصوص منتج غير متوفر', detail: 'منذ ساعة', tone: 'muted' },
] as const

export const adminProfile = { name: 'أحمد محمد', role: 'مدير النظام' }
