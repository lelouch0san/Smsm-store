export type ProviderIntegrationType = 'manual' | 'api'
export type ProviderStatus = 'active' | 'inactive' | 'configuration_required' | 'error'
export type ServiceProvider = {
  id: string
  name: string
  code: string
  baseUrl: string
  integrationType: ProviderIntegrationType
  status: ProviderStatus
  description: string
  notes: string
  tokenConfigured: boolean
  lastConnectionCheck?: string
}

let providers: ServiceProvider[] = [
  { id: 'provider-manual', name: 'التنفيذ اليدوي', code: 'MANUAL', baseUrl: '', integrationType: 'manual', status: 'active', description: 'التنفيذ الحالي بواسطة فريق الإدارة.', notes: 'الخيار الافتراضي لكل المنتجات غير المرتبطة.', tokenConfigured: false },
  { id: 'provider-top1store', name: 'Top1Store', code: 'TOP1STORE', baseUrl: 'https://api.top1store.example/v1', integrationType: 'api', status: 'configuration_required', description: 'مزود خدمات رقمي تجريبي للتكامل المستقبلي.', notes: 'الاتصال الحقيقي غير مفعّل في وضع Mock.', tokenConfigured: false, lastConnectionCheck: 'لم يتم التحقق' },
]
export const providerStatusLabels: Record<ProviderStatus, string> = { active: 'نشط', inactive: 'غير نشط', configuration_required: 'يتطلب إعداداً', error: 'خطأ' }
export const providerTypeLabels: Record<ProviderIntegrationType, string> = { manual: 'يدوي', api: 'API' }
export const getServiceProviders = () => providers
export const getServiceProviderById = (id: string) => providers.find((provider) => provider.id === id)
export function saveServiceProvider(input: Omit<ServiceProvider, 'id'> & { id?: string }) { const now = new Date().toISOString(); const next = { ...input, id: input.id || `provider-${Date.now()}`, lastConnectionCheck: input.integrationType === 'api' ? (input.lastConnectionCheck || 'لم يتم التحقق') : undefined }; providers = input.id ? providers.map((item) => item.id === input.id ? next : item) : [...providers, next]; return next }
export function setServiceProviderStatus(id: string, status: ProviderStatus) { const item = getServiceProviderById(id); if (!item) return false; item.status = status; return true }
export function mockConnectionCheck(id: string) { const item = getServiceProviderById(id); if (!item || item.integrationType !== 'api') return false; item.lastConnectionCheck = 'وضع Mock: لم يتم إجراء اتصال خارجي'; item.status = 'configuration_required'; return true }

export type FulfillmentConfig = { method: ProviderIntegrationType; providerId?: string; externalProductId?: string; externalPackageId?: string; mappingStatus: 'not_configured' | 'mapped'; notes?: string }
const mappings: Record<string, FulfillmentConfig> = {}
export const getFulfillmentConfig = (key: string): FulfillmentConfig => mappings[key] || { method: 'manual', mappingStatus: 'not_configured' }
export function saveFulfillmentConfig(key: string, config: FulfillmentConfig) { mappings[key] = config; return config }
