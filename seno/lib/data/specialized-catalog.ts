export type CatalogRecordStatus = 'active' | 'inactive'
export type SocialPlatform = 'instagram' | 'tiktok' | 'facebook' | 'youtube' | 'x'
export type CatalogSection = 'social' | 'subscriptions' | 'currencies' | 'withdrawals'

export type SpecializedRecord = {
  id: string
  nameAr: string
  nameEn: string
  section: CatalogSection
  type: string
  status: CatalogRecordStatus
  descriptionAr: string
  productTypeId: string
  supportsPackages: boolean
  requiresCustomerInput: boolean
  customerInputSchemaId?: string
  sortOrder: number
  metadata?: Record<string, string>
}

const base = { descriptionAr: '', status: 'active' as const, supportsPackages: true, requiresCustomerInput: true }
let records: SpecializedRecord[] = [
  { ...base, id: 'social-instagram-followers', nameAr: 'متابعين إنستغرام', nameEn: 'Instagram Followers', section: 'social', type: 'instagram', productTypeId: 'product-type-7', sortOrder: 1, metadata: { target: 'رابط الملف الشخصي' } },
  { ...base, id: 'social-tiktok-views', nameAr: 'مشاهدات تيك توك', nameEn: 'TikTok Views', section: 'social', type: 'tiktok', productTypeId: 'product-type-7', sortOrder: 2, metadata: { target: 'رابط الفيديو' } },
  { ...base, id: 'subscription-capcut', nameAr: 'CapCut', nameEn: 'CapCut', section: 'subscriptions', type: 'provider', productTypeId: 'product-type-5', sortOrder: 1, metadata: { plans: 'شهري، 3 أشهر، سنوي' } },
  { ...base, id: 'currency-usdt', nameAr: 'USDT', nameEn: 'USDT', section: 'currencies', type: 'currency', productTypeId: 'product-type-6', sortOrder: 1, metadata: { networks: 'TRC20، BEP20، ERC20' } },
  { ...base, id: 'withdrawal-vodafone', nameAr: 'Vodafone Cash', nameEn: 'Vodafone Cash', section: 'withdrawals', type: 'method', productTypeId: 'product-type-9', sortOrder: 1, supportsPackages: false, metadata: { fields: 'رقم الهاتف، اسم المستلم' } },
]

export const sectionLabels: Record<CatalogSection, string> = { social: 'خدمات السوشيال', subscriptions: 'الاشتراكات', currencies: 'العملات الرقمية', withdrawals: 'خدمات السحب' }
export const socialPlatformLabels: Record<SocialPlatform, string> = { instagram: 'Instagram', tiktok: 'TikTok', facebook: 'Facebook', youtube: 'YouTube', x: 'X / Twitter' }
export function getSpecializedRecords(section: CatalogSection) { return records.filter((record) => record.section === section).sort((a, b) => a.sortOrder - b.sortOrder) }
export function saveSpecializedRecord(input: Omit<SpecializedRecord, 'id'> & { id?: string }) { const id = input.id || `${input.section}-${Date.now()}`; const item = { ...input, id }; records = records.some((record) => record.id === id) ? records.map((record) => record.id === id ? item : record) : [...records, item]; return item }
export function toggleSpecializedRecord(id: string) { const record = records.find((item) => item.id === id); if (!record) return; record.status = record.status === 'active' ? 'inactive' : 'active'; return record }
export function getSpecializedRecord(id: string) { return records.find((record) => record.id === id) }

export type CurrencyNetwork = { id: string; currencyId: string; name: string; status: CatalogRecordStatus }
export const currencyNetworks: CurrencyNetwork[] = [
  { id: 'usdt-trc20', currencyId: 'currency-usdt', name: 'TRC20', status: 'active' },
  { id: 'usdt-bep20', currencyId: 'currency-usdt', name: 'BEP20', status: 'active' },
  { id: 'usdt-erc20', currencyId: 'currency-usdt', name: 'ERC20', status: 'active' },
]

export type WithdrawalMethod = { id: string; nameAr: string; nameEn: string; status: CatalogRecordStatus; minimumAmount: number; maximumAmount: number; fees: string; sortOrder: number }
export const withdrawalMethods: WithdrawalMethod[] = [
  { id: 'vodafone-cash', nameAr: 'Vodafone Cash', nameEn: 'Vodafone Cash', status: 'active', minimumAmount: 50, maximumAmount: 10000, fees: 'حسب الإعدادات', sortOrder: 1 },
  { id: 'instapay', nameAr: 'InstaPay', nameEn: 'InstaPay', status: 'active', minimumAmount: 50, maximumAmount: 25000, fees: 'حسب الإعدادات', sortOrder: 2 },
]

export type SubscriptionPlan = { id: string; providerId: string; nameAr: string; duration: string; status: CatalogRecordStatus }
export const subscriptionPlans: SubscriptionPlan[] = [
  { id: 'capcut-monthly', providerId: 'subscription-capcut', nameAr: 'شهري', duration: '1 شهر', status: 'active' },
  { id: 'capcut-yearly', providerId: 'subscription-capcut', nameAr: 'سنوي', duration: '12 شهر', status: 'active' },
]

export function getCurrencyNetworks(currencyId: string) { return currencyNetworks.filter((network) => network.currencyId === currencyId) }
export function getSubscriptionPlans(providerId: string) { return subscriptionPlans.filter((plan) => plan.providerId === providerId) }
export function getWithdrawalMethods() { return withdrawalMethods }

export const isValidProductTypeReference = (productTypeId: string) => Boolean(productTypeId)
export const isValidCurrencyNetwork = (currencyId: string, networkId: string) => currencyNetworks.some((network) => network.currencyId === currencyId && network.id === networkId)
export const isValidSubscriptionPlan = (providerId: string, planId: string) => subscriptionPlans.some((plan) => plan.providerId === providerId && plan.id === planId)
