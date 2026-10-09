import type { LucideIcon } from 'lucide-react'
import {
  Activity as ActivityIcon, Bell, Boxes, BriefcaseBusiness, CircleDollarSign, ClipboardList, Coins, CreditCard, FileBarChart,
  FileCog, Gauge, Gift, LayoutDashboard, Megaphone, Package, PanelsTopLeft, ScrollText, Settings2,
  ShieldCheck, ShoppingBag, Tags, Ticket, UserRound, Users, WalletCards, Banknote, BadgeDollarSign, RotateCcw,
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
    { label: 'خدمات السوشيال', href: '/admin/social-services', icon: Users },
    { label: 'الاشتراكات', href: '/admin/subscriptions', icon: Ticket },
    { label: 'العملات الرقمية', href: '/admin/digital-currencies', icon: Coins },
    { label: 'خدمات السحب', href: '/admin/withdrawal-services', icon: Banknote },
    { label: 'كتالوج الخدمات', href: '/admin/services', icon: BriefcaseBusiness },
  ] },
  { label: 'الطلبات', items: [
    { label: 'جميع الطلبات', href: '/admin/orders', icon: ClipboardList },
    { label: 'قيد المراجعة', href: '/admin/orders/review', icon: ScrollText },
    { label: 'قيد التنفيذ', href: '/admin/orders/processing', icon: Gauge },
    { label: 'مكتملة', href: '/admin/orders/completed', icon: ShieldCheck },
    { label: 'مرفوضة / فاشلة', href: '/admin/orders/failed', icon: FileCog },
    { label: 'الملغاة', href: '/admin/orders/cancelled', icon: FileCog },
    { label: 'المستردة', href: '/admin/orders/refunded', icon: RotateCcw },
    { label: 'طابور التنفيذ', href: '/admin/orders/queue', icon: Gauge },
    { label: 'مزودو التنفيذ', href: '/admin/orders/providers', icon: BriefcaseBusiness },
    { label: 'قواعد التنفيذ والحالات', href: '/admin/orders/rules', icon: FileCog },
  ] },
  { label: 'العملاء', items: [
    { label: 'العملاء', href: '/admin/customers', icon: UserRound },
    { label: 'شرائح العملاء', href: '/admin/customer-segments', icon: Users },
    { label: 'القيود والحظر', href: '/admin/customer-restrictions', icon: ShieldCheck },
    { label: 'ملاحظات العملاء', href: '/admin/customer-notes', icon: ScrollText },
    { label: 'نشاط العملاء', href: '/admin/customer-activity', icon: ActivityIcon },
  ] },
  { label: 'المحفظة والمالية', items: [
    { label: 'المحفظة', href: '/admin/wallet', icon: WalletCards },
    { label: 'طلبات الإيداع', href: '/admin/deposits', icon: CircleDollarSign },
    { label: 'معاملات المحفظة', href: '/admin/wallet/transactions', icon: CreditCard },
    { label: 'أكواد سينو', href: '/admin/seno-codes', icon: Gift },
  ] },
  { label: 'المدفوعات', items: [
    { label: 'طرق الدفع', href: '/admin/payment-methods', icon: CreditCard },
    { label: 'حسابات الدفع', href: '/admin/payment-accounts', icon: BadgeDollarSign },
    { label: 'معاملات الدفع', href: '/admin/payment-transactions', icon: FileBarChart },
  ] },
  { label: 'السحب', items: [
    { label: 'طلبات السحب', href: '/admin/withdrawal-requests', icon: Banknote },
    { label: 'طرق السحب', href: '/admin/withdrawal-methods', icon: WalletCards },
    { label: 'معاملات السحب', href: '/admin/withdrawal-transactions', icon: FileBarChart },
  ] },
  { label: 'التسويق', items: [
    { label: 'العروض', href: '/admin/offers', icon: Gift },
    { label: 'كوبونات الخصم', href: '/admin/coupons', icon: Ticket },
    { label: 'الحملات', href: '/admin/campaigns', icon: Megaphone },
  ] },
  { label: 'الإشعارات', items: [
    { label: 'مركز الإشعارات', href: '/admin/notifications', icon: Bell, disabled: true },
    { label: 'قوالب الإشعارات', href: '/admin/notification-templates', icon: ScrollText, disabled: true },
  ] },
  { label: 'التقارير', items: [
    { label: 'المبيعات', href: '/admin/reports/sales', icon: FileBarChart },
    { label: 'الطلبات', href: '/admin/reports/orders', icon: ClipboardList },
    { label: 'المنتجات', href: '/admin/reports/products', icon: Package },
    { label: 'العملاء', href: '/admin/reports/customers', icon: Users },
    { label: 'الأرباح', href: '/admin/reports/profits', icon: CircleDollarSign },
  ] },
  { label: 'الإدارة', items: [
    { label: 'المستخدمون الإداريون', href: '/admin/admin-users', icon: UserRound },
    { label: 'الأدوار والصلاحيات', href: '/admin/roles-permissions', icon: ShieldCheck },
    { label: 'سجل العمليات', href: '/admin/audit-logs', icon: ScrollText },
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
