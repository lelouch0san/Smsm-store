export type ServiceModuleKind = 'social' | 'subscriptions' | 'currencies' | 'withdrawals'

export type ServiceModuleRecord = {
  id: string
  nameAr: string
  nameEn: string
  detailAr: string
  status: 'active' | 'inactive'
  productTypeSlug: string
  supportsPackages: boolean
  requiresCustomerInput: boolean
  fields: string[]
  sortOrder: number
}

const records: Record<ServiceModuleKind, ServiceModuleRecord[]> = {
  social: [
    { id: 'social-instagram-followers', nameAr: 'متابعين إنستغرام', nameEn: 'Instagram Followers', detailAr: 'خدمة زيادة المتابعين', status: 'active', productTypeSlug: 'social-media-services', supportsPackages: true, requiresCustomerInput: true, fields: ['رابط الملف الشخصي'], sortOrder: 1 },
    { id: 'social-tiktok-views', nameAr: 'مشاهدات تيك توك', nameEn: 'TikTok Views', detailAr: 'خدمة مشاهدات الفيديو', status: 'active', productTypeSlug: 'social-media-services', supportsPackages: true, requiresCustomerInput: true, fields: ['رابط الفيديو'], sortOrder: 2 },
  ],
  subscriptions: [
    { id: 'subscription-capcut', nameAr: 'CapCut', nameEn: 'CapCut', detailAr: 'خطط اشتراك متعددة المدد', status: 'active', productTypeSlug: 'subscriptions', supportsPackages: true, requiresCustomerInput: true, fields: ['البريد الإلكتروني'], sortOrder: 1 },
    { id: 'subscription-netflix', nameAr: 'Netflix', nameEn: 'Netflix', detailAr: 'اشتراكات ترفيهية', status: 'active', productTypeSlug: 'subscriptions', supportsPackages: true, requiresCustomerInput: true, fields: ['بيانات الحساب'], sortOrder: 2 },
  ],
  currencies: [
    { id: 'currency-usdt', nameAr: 'USDT', nameEn: 'USDT', detailAr: 'شبكات TRC20 و BEP20 و ERC20', status: 'active', productTypeSlug: 'digital-currency', supportsPackages: true, requiresCustomerInput: true, fields: ['عنوان المحفظة', 'الشبكة'], sortOrder: 1 },
    { id: 'currency-btc', nameAr: 'Bitcoin', nameEn: 'Bitcoin', detailAr: 'تحويلات Bitcoin', status: 'active', productTypeSlug: 'digital-currency', supportsPackages: true, requiresCustomerInput: true, fields: ['عنوان المحفظة'], sortOrder: 2 },
  ],
  withdrawals: [
    { id: 'withdraw-vodafone', nameAr: 'Vodafone Cash', nameEn: 'Vodafone Cash', detailAr: 'سحب إلى محفظة Vodafone Cash', status: 'active', productTypeSlug: 'withdrawal-services', supportsPackages: false, requiresCustomerInput: true, fields: ['رقم الهاتف', 'اسم المستفيد'], sortOrder: 1 },
    { id: 'withdraw-instapay', nameAr: 'InstaPay', nameEn: 'InstaPay', detailAr: 'سحب عبر InstaPay', status: 'active', productTypeSlug: 'withdrawal-services', supportsPackages: false, requiresCustomerInput: true, fields: ['رقم الحساب', 'اسم المستفيد'], sortOrder: 2 },
  ],
}

export function getServiceModuleRecords(kind: ServiceModuleKind) { return records[kind].slice().sort((a, b) => a.sortOrder - b.sortOrder) }
export function saveServiceModuleRecord(kind: ServiceModuleKind, record: ServiceModuleRecord) { records[kind] = records[kind].some((item) => item.id === record.id) ? records[kind].map((item) => item.id === record.id ? record : item) : [...records[kind], record]; return record }
export const serviceModuleMeta: Record<ServiceModuleKind, { title: string; description: string; addLabel: string }> = {
  social: { title: 'خدمات السوشيال', description: 'إدارة خدمات ومنصات السوشيال مع متطلبات العميل', addLabel: 'إضافة خدمة سوشيال' },
  subscriptions: { title: 'الاشتراكات', description: 'إدارة مقدمي الاشتراكات والخطط المرتبطة بالمنتجات', addLabel: 'إضافة اشتراك' },
  currencies: { title: 'العملات الرقمية', description: 'إدارة العملات والشبكات وخيارات المبالغ', addLabel: 'إضافة عملة' },
  withdrawals: { title: 'خدمات السحب', description: 'إدارة طرق السحب ومتطلبات بيانات المستفيد', addLabel: 'إضافة طريقة سحب' },
}
