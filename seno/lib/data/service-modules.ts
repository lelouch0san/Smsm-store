import type { CustomerInputSchema } from '@/lib/data/customer-input-schema'

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
  customerInputSchema: CustomerInputSchema
  sortOrder: number
}

const schema = (id: string, fields: CustomerInputSchema['fields']): CustomerInputSchema => ({ id, fields, updatedAt: new Date().toISOString() })
const field = (id: string, fieldName: string, labelAr: string, labelEn: string, type: CustomerInputSchema['fields'][number]['type'], required = true, sortOrder = 1, options?: { labelAr: string; labelEn: string; value: string }[]) => ({ id, fieldName, labelAr, labelEn, type, required, enabled: true, placeholder: '', description: '', defaultValue: '', sortOrder, options })

const records: Record<ServiceModuleKind, ServiceModuleRecord[]> = {
  social: [
    { id: 'social-instagram-followers', nameAr: 'متابعين إنستغرام', nameEn: 'Instagram Followers', detailAr: 'خدمة زيادة المتابعين', status: 'active', productTypeSlug: 'social-media-services', supportsPackages: true, requiresCustomerInput: true, customerInputSchema: schema('schema-instagram-followers', [field('field-profile-url', 'profile_url', 'رابط الملف الشخصي', 'Profile URL', 'url')]), sortOrder: 1 },
    { id: 'social-tiktok-views', nameAr: 'مشاهدات تيك توك', nameEn: 'TikTok Views', detailAr: 'خدمة مشاهدات الفيديو', status: 'active', productTypeSlug: 'social-media-services', supportsPackages: true, requiresCustomerInput: true, customerInputSchema: schema('schema-tiktok-views', [field('field-video-url', 'video_url', 'رابط الفيديو', 'Video URL', 'url')]), sortOrder: 2 },
  ],
  subscriptions: [
    { id: 'subscription-capcut', nameAr: 'CapCut', nameEn: 'CapCut', detailAr: 'خطط اشتراك متعددة المدد', status: 'active', productTypeSlug: 'subscriptions', supportsPackages: true, requiresCustomerInput: true, customerInputSchema: schema('schema-capcut', [field('field-account-email', 'account_email', 'البريد الإلكتروني للحساب', 'Account Email', 'email')]), sortOrder: 1 },
    { id: 'subscription-netflix', nameAr: 'Netflix', nameEn: 'Netflix', detailAr: 'اشتراكات ترفيهية', status: 'active', productTypeSlug: 'subscriptions', supportsPackages: true, customerInputSchema: schema('schema-netflix', []), requiresCustomerInput: false, sortOrder: 2 },
  ],
  currencies: [
    { id: 'currency-usdt', nameAr: 'USDT', nameEn: 'USDT', detailAr: 'شبكات متعددة للتحويل', status: 'active', productTypeSlug: 'digital-currency', supportsPackages: true, requiresCustomerInput: true, customerInputSchema: schema('schema-usdt', [field('field-network', 'network', 'الشبكة', 'Network', 'select', true, 1, [{ labelAr: 'TRC20', labelEn: 'TRC20', value: 'trc20' }, { labelAr: 'BEP20', labelEn: 'BEP20', value: 'bep20' }, { labelAr: 'ERC20', labelEn: 'ERC20', value: 'erc20' }]), field('field-wallet-address', 'wallet_address', 'عنوان المحفظة', 'Wallet Address', 'text', true, 2)]), sortOrder: 1 },
    { id: 'currency-btc', nameAr: 'Bitcoin', nameEn: 'Bitcoin', detailAr: 'تحويلات Bitcoin', status: 'active', productTypeSlug: 'digital-currency', supportsPackages: true, requiresCustomerInput: true, customerInputSchema: schema('schema-btc', [field('field-btc-wallet', 'wallet_address', 'عنوان المحفظة', 'Wallet Address', 'text')]), sortOrder: 2 },
  ],
  withdrawals: [
    { id: 'withdraw-vodafone', nameAr: 'Vodafone Cash', nameEn: 'Vodafone Cash', detailAr: 'سحب إلى محفظة Vodafone Cash', status: 'active', productTypeSlug: 'withdrawal-services', supportsPackages: false, requiresCustomerInput: true, customerInputSchema: schema('schema-vodafone', [field('field-phone', 'phone_number', 'رقم الهاتف', 'Phone Number', 'phone'), field('field-account-name', 'account_name', 'اسم المستفيد', 'Account Name', 'text', true, 2)]), sortOrder: 1 },
    { id: 'withdraw-instapay', nameAr: 'InstaPay', nameEn: 'InstaPay', detailAr: 'سحب عبر InstaPay', status: 'active', productTypeSlug: 'withdrawal-services', supportsPackages: false, requiresCustomerInput: true, customerInputSchema: schema('schema-instapay', [field('field-instapay-address', 'instapay_address', 'عنوان InstaPay', 'InstaPay Address', 'text'), field('field-instapay-name', 'account_name', 'اسم المستفيد', 'Account Name', 'text', false, 2)]), sortOrder: 2 },
  ],
}

export function getServiceModuleRecords(kind: ServiceModuleKind) { return records[kind].slice().sort((a, b) => a.sortOrder - b.sortOrder) }
export function saveServiceModuleRecord(kind: ServiceModuleKind, record: ServiceModuleRecord) { records[kind] = records[kind].some((item) => item.id === record.id) ? records[kind].map((item) => item.id === record.id ? record : item) : [...records[kind], { ...record, id: record.id || `${kind}-${Date.now()}` }]; return record }
export const serviceModuleMeta: Record<ServiceModuleKind, { title: string; description: string; addLabel: string }> = {
  social: { title: 'خدمات السوشيال', description: 'إدارة خدمات ومنصات السوشيال مع متطلبات العميل', addLabel: 'إضافة خدمة سوشيال' },
  subscriptions: { title: 'الاشتراكات', description: 'إدارة مقدمي الاشتراكات والخطط المرتبطة بالمنتجات', addLabel: 'إضافة اشتراك' },
  currencies: { title: 'العملات الرقمية', description: 'إدارة العملات والشبكات وخيارات المبالغ', addLabel: 'إضافة عملة' },
  withdrawals: { title: 'خدمات السحب', description: 'إدارة طرق السحب ومتطلبات بيانات المستفيد', addLabel: 'إضافة طريقة سحب' },
}

export function createEmptyServiceSchema(id = `schema-${Date.now()}`): CustomerInputSchema { return schema(id, []) }
export function createEmptyServiceRecord(kind: ServiceModuleKind, sortOrder: number): ServiceModuleRecord { return { id: '', nameAr: '', nameEn: '', detailAr: '', status: 'active', productTypeSlug: kind === 'social' ? 'social-media-services' : kind === 'subscriptions' ? 'subscriptions' : kind === 'currencies' ? 'digital-currency' : 'withdrawal-services', supportsPackages: kind !== 'withdrawals', requiresCustomerInput: false, customerInputSchema: createEmptyServiceSchema(), sortOrder } }

export type { CustomerInputSchema }
export { schema as createServiceInputSchema }
export function serviceFields(record: ServiceModuleRecord) { return record.customerInputSchema.fields.filter((item) => item.enabled !== false) }
export function replaceServiceInputSchema(record: ServiceModuleRecord, customerInputSchema: CustomerInputSchema): ServiceModuleRecord { return { ...record, customerInputSchema, requiresCustomerInput: customerInputSchema.fields.some((field) => field.enabled !== false) } }
export function serviceInputSummary(record: ServiceModuleRecord) { return serviceFields(record).map((item) => item.labelAr).join('، ') }
export function getServiceInputSchema(record: ServiceModuleRecord) { return record.customerInputSchema }
export function setServiceInputSchema(record: ServiceModuleRecord, customerInputSchema: CustomerInputSchema) { return replaceServiceInputSchema(record, customerInputSchema) }
export function isServiceConfigured(record: ServiceModuleRecord) { return !record.requiresCustomerInput || serviceFields(record).length > 0 }
export function getServiceModuleKinds() { return Object.keys(serviceModuleMeta) as ServiceModuleKind[] }
export function cloneServiceRecord(record: ServiceModuleRecord): ServiceModuleRecord { return structuredClone(record) }
export function getServiceModuleRecord(kind: ServiceModuleKind, id: string) { return getServiceModuleRecords(kind).find((item) => item.id === id) }
export function deleteServiceModuleRecord(kind: ServiceModuleKind, id: string) { records[kind] = records[kind].filter((item) => item.id !== id) }
export function toggleServiceModuleStatus(kind: ServiceModuleKind, id: string) { const record = getServiceModuleRecord(kind, id); if (!record) return; record.status = record.status === 'active' ? 'inactive' : 'active'; return record }
export function getServiceModuleRecordCount(kind: ServiceModuleKind) { return records[kind].length }
export function resetServiceModuleData() { return records }
export function updateServiceModuleSchema(kind: ServiceModuleKind, id: string, customerInputSchema: CustomerInputSchema) { const record = getServiceModuleRecord(kind, id); if (!record) return; return saveServiceModuleRecord(kind, replaceServiceInputSchema(record, customerInputSchema)) }
export function getConfiguredFieldCount(record: ServiceModuleRecord) { return serviceFields(record).length }
export function getRequiredFieldCount(record: ServiceModuleRecord) { return serviceFields(record).filter((field) => field.required).length }
export function getOptionalFieldCount(record: ServiceModuleRecord) { return serviceFields(record).filter((field) => !field.required).length }
export function hasSelectField(record: ServiceModuleRecord) { return serviceFields(record).some((field) => field.type === 'select') }
export function getServiceModuleLabel(kind: ServiceModuleKind) { return serviceModuleMeta[kind].title }
export function getServiceModuleDescription(kind: ServiceModuleKind) { return serviceModuleMeta[kind].description }
export function getServiceModuleAddLabel(kind: ServiceModuleKind) { return serviceModuleMeta[kind].addLabel }
export function getServiceModuleSortOrder(kind: ServiceModuleKind) { return getServiceModuleRecords(kind).map((item) => item.sortOrder) }
export function saveServiceInputSchema(kind: ServiceModuleKind, record: ServiceModuleRecord, customerInputSchema: CustomerInputSchema) { return saveServiceModuleRecord(kind, replaceServiceInputSchema(record, customerInputSchema)) }
export function getServiceModuleData() { return records }
export function getServiceModuleRecordById(id: string) { return getServiceModuleKinds().flatMap((kind) => getServiceModuleRecords(kind).map((record) => ({ kind, record }))).find(({ record }) => record.id === id) }
export function updateServiceModuleRecord(kind: ServiceModuleKind, id: string, patch: Partial<ServiceModuleRecord>) { const record = getServiceModuleRecord(kind, id); if (!record) return; return saveServiceModuleRecord(kind, { ...record, ...patch }) }
export function getActiveServiceModuleRecords(kind: ServiceModuleKind) { return getServiceModuleRecords(kind).filter((record) => record.status === 'active') }
export function getServiceModuleInputFields(kind: ServiceModuleKind) { return getServiceModuleRecords(kind).flatMap((record) => serviceFields(record)) }
export function getServiceModuleSchema(kind: ServiceModuleKind, id: string) { return getServiceModuleRecord(kind, id)?.customerInputSchema }
export function updateServiceModuleInputSchema(kind: ServiceModuleKind, id: string, schemaValue: CustomerInputSchema) { return updateServiceModuleSchema(kind, id, schemaValue) }
export function getServiceModuleInputPreview(record: ServiceModuleRecord) { return serviceFields(record).map(({ labelAr, type, required }) => ({ labelAr, type, required })) }
export function isCustomerInputRequired(record: ServiceModuleRecord) { return record.requiresCustomerInput }
export function setCustomerInputRequired(record: ServiceModuleRecord, enabled: boolean) { return { ...record, requiresCustomerInput: enabled } }
export function getServiceModuleRecordNames(kind: ServiceModuleKind) { return getServiceModuleRecords(kind).map(({ nameAr }) => nameAr) }
export function getServiceModuleRecordSlugs(kind: ServiceModuleKind) { return getServiceModuleRecords(kind).map(({ id }) => id) }
export function hasDuplicateServiceModuleId(kind: ServiceModuleKind, id: string) { return getServiceModuleRecords(kind).filter((record) => record.id === id).length > 1 }
