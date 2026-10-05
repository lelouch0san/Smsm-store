export type DashboardPeriod = 'today' | '7d' | '30d' | 'month' | 'previous-month'

export type DashboardData = {
  summary: { label: string; value: string; change?: string; tone: 'gold' | 'green' | 'red' | 'muted'; icon: string }[]
  sales: { label: string; revenue: number; orders: number }[]
  ordersOverview: { label: string; count: number; tone: 'gold' | 'green' | 'red' | 'muted' }[]
  operations: { label: string; count: number; severity: 'normal' | 'warning' | 'critical'; icon: string }[]
  recentOrders: { id: string; customer: string; product: string; amount: string; status: string; tone: 'gold' | 'green' | 'red' | 'muted'; time: string }[]
  activity: { label: string; detail: string; time: string; icon: string }[]
  topProducts: { name: string; category: string; orders: number; revenue: string; short: string }[]
  categories: { name: string; orders: number; sales: string; share: number }[]
  financial: { label: string; value: string; tone: 'gold' | 'green' | 'red' | 'muted' }[]
  alerts: { label: string; time: string; severity: 'normal' | 'warning' | 'critical'; status: string }[]
}

const base: DashboardData = {
  summary: [
    { label: 'إجمالي المبيعات', value: '125,480 ج.م', change: '+12.5%', tone: 'gold', icon: 'sales' },
    { label: 'الطلبات', value: '1,284', change: '+8.2%', tone: 'green', icon: 'orders' },
    { label: 'العملاء', value: '3,842', change: '+5.6%', tone: 'green', icon: 'customers' },
    { label: 'صافي الأرباح', value: '38,920 ج.م', change: '+10.4%', tone: 'green', icon: 'profit' },
    { label: 'الرصيد المعلّق', value: '8,450 ج.م', change: '-2.1%', tone: 'gold', icon: 'pending' },
    { label: 'طلبات قيد التنفيذ', value: '47', change: '+3.8%', tone: 'red', icon: 'active' },
  ],
  sales: [
    { label: 'السبت', revenue: 38, orders: 28 }, { label: 'الأحد', revenue: 52, orders: 42 },
    { label: 'الإثنين', revenue: 44, orders: 35 }, { label: 'الثلاثاء', revenue: 68, orders: 54 },
    { label: 'الأربعاء', revenue: 58, orders: 48 }, { label: 'الخميس', revenue: 82, orders: 67 },
    { label: 'الجمعة', revenue: 74, orders: 61 },
  ],
  ordersOverview: [
    { label: 'قيد المراجعة', count: 12, tone: 'gold' }, { label: 'قيد التنفيذ', count: 47, tone: 'gold' },
    { label: 'مكتملة', count: 1_184, tone: 'green' }, { label: 'مرفوضة', count: 26, tone: 'red' }, { label: 'ملغاة', count: 15, tone: 'muted' },
  ],
  operations: [
    { label: 'طلبات بحاجة للمراجعة', count: 12, severity: 'warning', icon: 'review' },
    { label: 'طلبات سحب تنتظر المعالجة', count: 5, severity: 'warning', icon: 'withdraw' },
    { label: 'طلبات إيداع تنتظر المراجعة', count: 8, severity: 'normal', icon: 'deposit' },
    { label: 'منتجات منخفضة المخزون', count: 3, severity: 'critical', icon: 'stock' },
    { label: 'عمليات دفع فشلت', count: 2, severity: 'critical', icon: 'payment' },
  ],
  recentOrders: [
    { id: '#SN-10482', customer: 'أحمد محمد', product: 'PUBG UC', amount: '250 ج.م', status: 'قيد التنفيذ', tone: 'gold', time: 'منذ 5 دقائق' },
    { id: '#SN-10481', customer: 'سارة علي', product: 'بطاقة Netflix', amount: '420 ج.م', status: 'مكتمل', tone: 'green', time: 'منذ 12 دقيقة' },
    { id: '#SN-10480', customer: 'محمود حسن', product: 'TikTok Coins', amount: '180 ج.م', status: 'قيد المراجعة', tone: 'gold', time: 'منذ 18 دقيقة' },
    { id: '#SN-10479', customer: 'نور أحمد', product: 'Spotify Premium', amount: '150 ج.م', status: 'مرفوض', tone: 'red', time: 'منذ 26 دقيقة' },
    { id: '#SN-10478', customer: 'عمر خالد', product: 'Free Fire Diamonds', amount: '320 ج.م', status: 'مكتمل', tone: 'green', time: 'منذ 34 دقيقة' },
  ],
  activity: [
    { label: 'تم إنشاء طلب جديد', detail: 'طلب #SN-10482 بقيمة 250 ج.م', time: 'منذ 5 دقائق', icon: 'order' },
    { label: 'تم قبول طلب سحب', detail: 'طلب سحب بقيمة 500 ج.م', time: 'منذ 12 دقيقة', icon: 'withdraw' },
    { label: 'تم شحن محفظة عميل', detail: 'أحمد محمد — 1,000 ج.م', time: 'منذ 21 دقيقة', icon: 'wallet' },
    { label: 'تم تحديث سعر منتج', detail: 'PUBG UC — بواسطة أحمد محمد', time: 'منذ 38 دقيقة', icon: 'edit' },
  ],
  topProducts: [
    { name: 'PUBG UC', category: 'شحن ألعاب', orders: 324, revenue: '18,450 ج.م', short: 'P' },
    { name: 'بطاقات Netflix', category: 'بطاقات هدايا', orders: 218, revenue: '12,860 ج.م', short: 'N' },
    { name: 'TikTok Coins', category: 'تطبيقات', orders: 194, revenue: '9,720 ج.م', short: 'T' },
    { name: 'Free Fire Diamonds', category: 'شحن ألعاب', orders: 176, revenue: '8,940 ج.م', short: 'F' },
  ],
  categories: [
    { name: 'شحن الألعاب', orders: 542, sales: '42,850 ج.م', share: 72 }, { name: 'تطبيقات الدردشة الصوتية', orders: 286, sales: '24,180 ج.م', share: 54 },
    { name: 'بطاقات الهدايا', orders: 218, sales: '18,460 ج.م', share: 41 }, { name: 'الاشتراكات', orders: 142, sales: '15,250 ج.م', share: 34 },
    { name: 'السوشيال ميديا', orders: 96, sales: '12,840 ج.م', share: 27 },
  ],
  financial: [
    { label: 'إجمالي المبيعات', value: '125,480 ج.م', tone: 'gold' }, { label: 'المدفوعات المستلمة', value: '117,030 ج.م', tone: 'green' },
    { label: 'المبالغ المعلقة', value: '8,450 ج.م', tone: 'gold' }, { label: 'طلبات السحب المعلقة', value: '5', tone: 'red' }, { label: 'صافي الأرباح', value: '38,920 ج.م', tone: 'green' },
  ],
  alerts: [
    { label: 'منتج PUBG UC منخفض المخزون', time: 'منذ 14 دقيقة', severity: 'warning', status: 'مفتوح' },
    { label: 'فشل عملية دفع لطلب #SN-10479', time: 'منذ 26 دقيقة', severity: 'critical', status: 'يحتاج مراجعة' },
    { label: 'ارتفاع الطلبات المعلقة عن المعدل', time: 'منذ ساعة', severity: 'normal', status: 'مراقبة' },
  ],
}

export function getDashboardData(period: DashboardPeriod): DashboardData {
  if (period === 'today') return { ...base, summary: base.summary.map(item => ({ ...item, value: item.icon === 'orders' ? '84' : item.icon === 'active' ? '9' : item.value })) }
  if (period === 'previous-month') return { ...base, summary: base.summary.map(item => ({ ...item, change: item.change?.replace('+', '-') })) }
  if (period === 'month') return { ...base, summary: base.summary.map(item => ({ ...item, value: item.icon === 'sales' ? '412,780 ج.م' : item.value })) }
  return base
}

export const dashboardPeriods: { value: DashboardPeriod; label: string }[] = [
  { value: 'today', label: 'اليوم' }, { value: '7d', label: 'آخر 7 أيام' }, { value: '30d', label: 'آخر 30 يوم' }, { value: 'month', label: 'هذا الشهر' }, { value: 'previous-month', label: 'الشهر الماضي' },
]
