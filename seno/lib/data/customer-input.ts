export type CustomerInputFieldType = 'text' | 'number' | 'email' | 'url' | 'select' | 'phone' | 'textarea'

export type CustomerInputOption = { labelAr: string; labelEn?: string; value: string }

export type CustomerInputField = {
  id: string
  fieldName: string
  labelAr: string
  labelEn: string
  type: CustomerInputFieldType
  required: boolean
  placeholder: string
  description: string
  defaultValue: string
  sortOrder: number
  minLength?: number
  maxLength?: number
  min?: number
  max?: number
  pattern?: string
  options: CustomerInputOption[]
}

export type CustomerInputSchema = { id: string; fields: CustomerInputField[] }

export const customerInputFieldTypeLabels: Record<CustomerInputFieldType, string> = {
  text: 'نص', number: 'رقم', email: 'بريد إلكتروني', url: 'رابط', select: 'قائمة اختيار', phone: 'هاتف', textarea: 'نص طويل',
}

export function createCustomerInputField(sortOrder = 1): CustomerInputField {
  return { id: `input-field-${Date.now()}-${sortOrder}`, fieldName: '', labelAr: '', labelEn: '', type: 'text', required: true, placeholder: '', description: '', defaultValue: '', sortOrder, options: [] }
}

export function createCustomerInputSchema(fields: CustomerInputField[] = []): CustomerInputSchema {
  return { id: `input-schema-${Date.now()}`, fields: fields.map((field, index) => ({ ...field, sortOrder: index + 1 })) }
}

export function normalizeCustomerInputSchema(schema?: CustomerInputSchema | null): CustomerInputSchema {
  return schema ? { ...schema, fields: [...schema.fields].sort((a, b) => a.sortOrder - b.sortOrder) } : createCustomerInputSchema()
}

export const validateCustomerInputField = (field: CustomerInputField) => {
  if (!field.labelAr.trim() || !field.fieldName.trim()) return 'يرجى إدخال اسم الحقل بالعربية واسم الحقل البرمجي'
  if (field.type === 'select' && field.options.length === 0) return 'أضف خياراً واحداً على الأقل لقائمة الاختيار'
  return null
}

export const validateCustomerInputSchema = (schema: CustomerInputSchema) => schema.fields.map(validateCustomerInputField).find(Boolean) || null

export const emptyCustomerInputSchema = (): CustomerInputSchema => createCustomerInputSchema()

export const defaultCustomerInputSchema = emptyCustomerInputSchema()

export const cloneCustomerInputSchema = (schema?: CustomerInputSchema | null): CustomerInputSchema => normalizeCustomerInputSchema(schema ? JSON.parse(JSON.stringify(schema)) : undefined)

export const customerInputFieldTypes = Object.keys(customerInputFieldTypeLabels) as CustomerInputFieldType[]

export const customerInputSchemaSummary = (schema?: CustomerInputSchema | null) => `${schema?.fields.length || 0} حقل`

export const customerInputFieldValidationLabels = { minLength: 'الحد الأدنى للطول', maxLength: 'الحد الأقصى للطول', min: 'الحد الأدنى', max: 'الحد الأقصى', pattern: 'نمط التحقق' }

export const customerInputSchemaVersion = 1

export const isCustomerInputSchema = (value: unknown): value is CustomerInputSchema => Boolean(value && typeof value === 'object' && Array.isArray((value as CustomerInputSchema).fields))

export const customerInputSchemaFromFields = (fields: CustomerInputField[]) => createCustomerInputSchema(fields)

export const customerInputFieldTypeOptions = customerInputFieldTypes.map((value) => ({ value, label: customerInputFieldTypeLabels[value] }))

export const schemaFieldSort = (fields: CustomerInputField[]) => fields.map((field, index) => ({ ...field, sortOrder: index + 1 }))

export const schemaFieldIds = (fields: CustomerInputField[]) => fields.map((field) => field.id)

export const schemaHasRequiredFields = (schema?: CustomerInputSchema | null) => Boolean(schema?.fields.some((field) => field.required))

export const schemaUsesSelect = (schema?: CustomerInputSchema | null) => Boolean(schema?.fields.some((field) => field.type === 'select'))

export const schemaIsEmpty = (schema?: CustomerInputSchema | null) => !schema?.fields.length

export const customerInputFieldPlaceholder = (type: CustomerInputFieldType) => type === 'email' ? 'name@example.com' : type === 'url' ? 'https://example.com' : type === 'phone' ? '+20' : ''

export const customerInputSchemaLabel = 'بيانات العميل'

export const customerInputSchemaDescription = 'حدد البيانات التي يجب أن يدخلها العميل عند الشراء'

export const customerInputSchemaInputName = 'customerInputSchema'

export const customerInputSchemaFieldNameHint = 'يستخدم داخلياً للتحقق من الطلب'
