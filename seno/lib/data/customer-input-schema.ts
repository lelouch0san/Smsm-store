export type CustomerInputFieldType = 'text' | 'number' | 'email' | 'url' | 'select' | 'phone' | 'textarea'

export type CustomerInputOption = { labelAr: string; labelEn: string; value: string }

export type CustomerInputField = {
  id: string
  fieldName: string
  labelAr: string
  labelEn: string
  type: CustomerInputFieldType
  required: boolean
  enabled: boolean
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

export type CustomerInputSchema = { id: string; fields: CustomerInputField[]; updatedAt: string }

export const customerInputFieldTypeLabels: Record<CustomerInputFieldType, string> = {
  text: 'نص', number: 'رقم', email: 'بريد إلكتروني', url: 'رابط', select: 'قائمة اختيار', phone: 'هاتف', textarea: 'نص طويل',
}

export const customerInputSchemas: CustomerInputSchema[] = []

export function createCustomerInputField(sortOrder: number): CustomerInputField {
  return { id: `input-field-${Date.now()}-${sortOrder}`, fieldName: '', labelAr: '', labelEn: '', type: 'text', required: true, enabled: true, placeholder: '', description: '', defaultValue: '', sortOrder }
}

export function normalizeCustomerInputSchema(schema?: CustomerInputSchema | null): CustomerInputSchema {
  return schema || { id: `schema-${Date.now()}`, fields: [], updatedAt: new Date().toISOString() }
}

export function validateCustomerInputField(field: CustomerInputField): string | null {
  if (!field.labelAr.trim() || !field.fieldName.trim()) return 'يرجى إدخال اسم الحقل بالعربية واسم الحقل البرمجي'
  if (field.type === 'select' && (!field.options || field.options.length === 0 || field.options.some((option) => !option.labelAr.trim() || !option.value.trim()))) return 'أكمل خيارات قائمة الاختيار'
  if (field.pattern) { try { new RegExp(field.pattern) } catch { return `صيغة التحقق للحقل ${field.labelAr} غير صحيحة` } }
  return null
}

export function validateCustomerInputValues(schema: CustomerInputSchema, values: Record<string, string>): Record<string, string> {
  return Object.fromEntries(schema.fields.flatMap((field) => {
    const value = values[field.fieldName] || ''
    if (field.required && !value.trim()) return [[field.fieldName, `حقل ${field.labelAr} مطلوب`]]
    if (field.type === 'email' && value && !/^\S+@\S+\.\S+$/.test(value)) return [[field.fieldName, `صيغة ${field.labelAr} غير صحيحة`]]
    if (field.type === 'url' && value) { try { new URL(value); } catch { return [[field.fieldName, `الرابط في ${field.labelAr} غير صحيح`]] } }
    if (field.minLength && value.length < field.minLength) return [[field.fieldName, `الحد الأدنى لحقل ${field.labelAr} هو ${field.minLength}`]]
    if (field.maxLength && value.length > field.maxLength) return [[field.fieldName, `الحد الأقصى لحقل ${field.labelAr} هو ${field.maxLength}`]]
    if (field.type === 'number' && value && (Number.isNaN(Number(value)) || (field.min !== undefined && Number(value) < field.min) || (field.max !== undefined && Number(value) > field.max))) return [[field.fieldName, `قيمة ${field.labelAr} خارج النطاق المسموح`]]
    if (field.type === 'phone' && value && !/^[+\\d][\\d\\s().-]{6,}$/.test(value)) return [[field.fieldName, `رقم الهاتف في ${field.labelAr} غير صحيح`]]
    if (field.type === 'select' && value && !(field.options || []).some((option) => option.value === value)) return [[field.fieldName, `اختر قيمة صحيحة لحقل ${field.labelAr}`]]
    if (field.pattern && value) { try { if (!new RegExp(field.pattern).test(value)) return [[field.fieldName, `قيمة ${field.labelAr} لا تطابق النمط المطلوب`]] } catch { return [[field.fieldName, `إعداد التحقق لحقل ${field.labelAr} غير صحيح`]] } }
    return []
  }))
}

export function moveCustomerInputField(fields: CustomerInputField[], index: number, direction: -1 | 1) {
  const nextIndex = index + direction
  if (nextIndex < 0 || nextIndex >= fields.length) return fields
  const next = [...fields]
  ;[next[index], next[nextIndex]] = [next[nextIndex], next[index]]
  return next.map((field, sortOrder) => ({ ...field, sortOrder: sortOrder + 1 }))
}
