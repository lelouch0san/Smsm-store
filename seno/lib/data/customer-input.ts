export type CustomerInputFieldType = 'text' | 'number' | 'email' | 'url' | 'select' | 'phone' | 'textarea'

export type CustomerInputOption = { value: string; labelAr: string; labelEn?: string }
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
  options?: CustomerInputOption[]
}
export type CustomerInputSchema = { id: string; fields: CustomerInputField[] }

export const customerInputFieldLabels: Record<CustomerInputFieldType, string> = {
  text: 'نص', number: 'رقم', email: 'بريد إلكتروني', url: 'رابط', select: 'قائمة اختيار', phone: 'هاتف', textarea: 'نص طويل',
}

export function createCustomerInputSchema(fields: CustomerInputField[] = []): CustomerInputSchema {
  return { id: `schema-${Date.now()}`, fields: fields.map((field, index) => ({ ...field, sortOrder: index + 1 })) }
}

export function createCustomerInputField(sortOrder: number): CustomerInputField {
  return { id: `field-${Date.now()}-${sortOrder}`, fieldName: '', labelAr: '', labelEn: '', type: 'text', required: true, placeholder: '', description: '', defaultValue: '', sortOrder }
}

export function validateCustomerInputField(field: CustomerInputField): string | null {
  if (!field.labelAr.trim() || !field.fieldName.trim()) return 'يرجى إدخال اسم الحقل واسم العرض بالعربية'
  if (field.type === 'select' && (!field.options || field.options.length === 0)) return 'أضف خياراً واحداً على الأقل لقائمة الاختيار'
  return null
}

export const emptyCustomerInputSchema: CustomerInputSchema = { id: '', fields: [] }

export function getCustomerInputSchema(value: unknown): CustomerInputSchema {
  if (!value || typeof value !== 'object') return emptyCustomerInputSchema
  const schema = value as Partial<CustomerInputSchema>
  return { id: schema.id || '', fields: Array.isArray(schema.fields) ? schema.fields : [] }
}

export function validateCustomerInputValues(schema: CustomerInputSchema, values: Record<string, string>) {
  const errors: Record<string, string> = {}
  schema.fields.forEach((field) => {
    const value = values[field.fieldName] || ''
    if (field.required && !value.trim()) errors[field.fieldName] = 'هذا الحقل مطلوب'
    if (value && field.type === 'email' && !/^\S+@\S+\.\S+$/.test(value)) errors[field.fieldName] = 'أدخل بريداً إلكترونياً صحيحاً'
    if (value && field.type === 'url') { try { new URL(value) } catch { errors[field.fieldName] = 'أدخل رابطاً صحيحاً' } }
    if (value && field.minLength && value.length < field.minLength) errors[field.fieldName] = `الحد الأدنى ${field.minLength} أحرف`
    if (value && field.maxLength && value.length > field.maxLength) errors[field.fieldName] = `الحد الأقصى ${field.maxLength} أحرف`
  })
  return errors
}

export const customerInputSchemas: CustomerInputSchema[] = []
export function saveCustomerInputSchema(schema: CustomerInputSchema) {
  const item = { ...schema, id: schema.id || `schema-${Date.now()}` }
  const index = customerInputSchemas.findIndex((current) => current.id === item.id)
  if (index >= 0) customerInputSchemas[index] = item
  else customerInputSchemas.push(item)
  return item
}
export function getCustomerInputSchemaById(id?: string) { return id ? customerInputSchemas.find((schema) => schema.id === id) : undefined }
export function deleteCustomerInputSchemaField(schema: CustomerInputSchema, fieldId: string) { return { ...schema, fields: schema.fields.filter((field) => field.id !== fieldId).map((field, index) => ({ ...field, sortOrder: index + 1 })) } }
export function reorderCustomerInputFields(schema: CustomerInputSchema, from: number, to: number) { const fields = [...schema.fields]; const [field] = fields.splice(from, 1); fields.splice(to, 0, field); return { ...schema, fields: fields.map((item, index) => ({ ...item, sortOrder: index + 1 })) } }

export type { CustomerInputFieldType as CustomerInputType }

export function fieldInputType(type: CustomerInputFieldType) { return type === 'number' ? 'number' : type === 'email' ? 'email' : type === 'url' ? 'url' : type === 'phone' ? 'tel' : 'text' }

export function getFieldValidationAttributes(field: CustomerInputField) { return { minLength: field.minLength, maxLength: field.maxLength, min: field.min, max: field.max, pattern: field.pattern } }

export function normalizeCustomerInputSchema(schema: CustomerInputSchema) { return { ...schema, fields: [...schema.fields].sort((a, b) => a.sortOrder - b.sortOrder) } }

export function isCustomerInputSchemaValid(schema: CustomerInputSchema) { return schema.fields.every((field) => !validateCustomerInputField(field)) }

export function getCustomerInputFieldTypeOptions() { return Object.entries(customerInputFieldLabels) as [CustomerInputFieldType, string][] }

export function cloneCustomerInputSchema(schema: CustomerInputSchema) { return { ...schema, id: '', fields: schema.fields.map((field) => ({ ...field, id: `field-${Date.now()}-${field.sortOrder}` })) } }

export function schemaHasRequiredFields(schema: CustomerInputSchema) { return schema.fields.some((field) => field.required) }

export function fieldSupportsOptions(type: CustomerInputFieldType) { return type === 'select' }

export function schemaSummary(schema: CustomerInputSchema) { return schema.fields.length ? `${schema.fields.length} حقول` : 'بدون حقول' }
