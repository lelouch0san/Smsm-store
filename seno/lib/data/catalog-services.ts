import type { ProductTypeStatus } from './product-types'

export type CatalogServiceType = 'social-media' | 'subscription' | 'digital-currency' | 'withdrawal' | 'other'
export type CatalogService = {
  id: string
  nameAr: string
  nameEn: string
  slug: string
  type: CatalogServiceType
  descriptionAr: string
  descriptionEn: string
  status: ProductTypeStatus
  sortOrder: number
  productTypeId: string
  supportsPackages: boolean
  requiresCustomerInput: boolean
  configurationSchema: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

let catalogServices: CatalogService[] = [{ id: 'service-instagram-followers', nameAr: 'متابعين إنستغرام', nameEn: 'Instagram Followers', slug: 'instagram-followers', type: 'social-media', descriptionAr: 'خدمة نمو الحسابات على إنستغرام', descriptionEn: 'Instagram growth service', status: 'active', sortOrder: 1, productTypeId: 'product-type-7', supportsPackages: true, requiresCustomerInput: true, configurationSchema: {}, createdAt: '2026-01-01T00:00:00.000Z', updatedAt: '2026-01-01T00:00:00.000Z' }]
export const serviceTypeLabels: Record<CatalogServiceType, string> = { 'social-media': 'خدمة سوشيال ميديا', subscription: 'خدمة اشتراكات', 'digital-currency': 'خدمة عملات رقمية', withdrawal: 'خدمة سحب', other: 'خدمة رقمية أخرى' }
export const serviceStatusLabels: Record<ProductTypeStatus, string> = { active: 'نشط', inactive: 'غير نشط', archived: 'مؤرشف' }
export function getCatalogServices(options?: { includeArchived?: boolean }) { return catalogServices.filter((item) => options?.includeArchived || item.status !== 'archived').sort((a, b) => a.sortOrder - b.sortOrder) }
export function saveCatalogService(input: Omit<CatalogService, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }) { const timestamp = new Date().toISOString(); const existing = input.id ? catalogServices.find((item) => item.id === input.id) : undefined; const item = { ...input, id: input.id || `service-${Date.now()}`, createdAt: existing?.createdAt || timestamp, updatedAt: timestamp }; catalogServices = existing ? catalogServices.map((current) => current.id === item.id ? item : current) : [...catalogServices, item]; return item }
export function archiveCatalogService(id: string) { const service = catalogServices.find((item) => item.id === id); return service ? saveCatalogService({ ...service, id, status: 'archived' }) : undefined }
