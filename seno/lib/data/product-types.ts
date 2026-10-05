export type ProductTypeStatus = 'active' | 'inactive' | 'archived'
export type PricingModel = 'direct' | 'package' | 'quantity' | 'percentage' | 'fixed-denomination'

export type ProductType = {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  descriptionAr: string
  descriptionEn: string
  icon: string
  status: ProductTypeStatus
  sortOrder: number
  supportsPackages: boolean
  requiresCustomerInput: boolean
  pricingModel: PricingModel
  configurationSchema: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

const now = '2026-01-01T00:00:00.000Z'
const seed: Array<Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>> = [
  ['شحن الألعاب', 'Game Top-Up', 'game-top-up', '🎮', true, true, 'package'],
  ['تطبيقات الصوت', 'Voice / Chat Top-Up', 'voice-top-up', '🎧', true, true, 'package'],
  ['البطاقات الرقمية', 'Digital Gift Cards', 'digital-gift-cards', '🎁', true, false, 'package'],
  ['مفاتيح الألعاب', 'Game Keys', 'game-keys', '🗝️', true, false, 'direct'],
  ['الاشتراكات', 'Subscriptions', 'subscriptions', '🔁', true, true, 'package'],
  ['العملات الرقمية', 'Digital Currency', 'digital-currency', '◈', true, true, 'package'],
  ['خدمات السوشيال ميديا', 'Social Media Services', 'social-media-services', '◎', true, true, 'quantity'],
  ['أكواد سينو رصيد', 'Seno Balance Codes', 'seno-balance-codes', '▣', true, false, 'fixed-denomination'],
  ['خدمات السحب', 'Withdrawal Services', 'withdrawal-services', '↗', false, true, 'direct'],
  ['خدمات رقمية أخرى', 'Other Digital Services', 'other-digital-services', '✦', true, true, 'direct'],
].map(([nameAr, nameEn, slug, icon, supportsPackages, requiresCustomerInput, pricingModel], index) => ({ nameAr, nameEn, slug, descriptionAr: '', descriptionEn: '', icon, status: 'active', sortOrder: index + 1, supportsPackages, requiresCustomerInput, pricingModel, configurationSchema: {} } as Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>))

let productTypes: ProductType[] = seed.map((item, index) => ({ ...item, id: `product-type-${index + 1}`, createdAt: now, updatedAt: now }))

export function getProductTypes(options?: { includeArchived?: boolean }) { return productTypes.filter((item) => options?.includeArchived || item.status !== 'archived').sort((a, b) => a.sortOrder - b.sortOrder) }
export function getActiveProductTypes() { return getProductTypes().filter((item) => item.status === 'active') }
export function getProductTypeById(id: string) { return productTypes.find((item) => item.id === id) }
export function saveProductType(input: Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) {
  const timestamp = new Date().toISOString()
  const item = { ...input, id: input.id || `product-type-${Date.now()}`, createdAt: input.id ? (getProductTypeById(input.id)?.createdAt || timestamp) : timestamp, updatedAt: timestamp }
  productTypes = input.id ? productTypes.map((current) => current.id === input.id ? item : current) : [...productTypes, item]
  return item
}
export function archiveProductType(id: string) { return saveProductType({ ...getProductTypeById(id)!, id, status: 'archived' }) }
export const pricingModelLabels: Record<PricingModel, string> = { direct: 'سعر مباشر', package: 'سعر حسب الباقة', quantity: 'حسب الكمية', percentage: 'حسب النسبة', 'fixed-denomination': 'فئة سعر ثابتة' }
export const productTypeStatusLabels: Record<ProductTypeStatus, string> = { active: 'نشط', inactive: 'غير نشط', archived: 'مؤرشف' }
