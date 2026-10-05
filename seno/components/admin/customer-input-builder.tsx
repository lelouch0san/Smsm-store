'use client'

import { useEffect, useState } from 'react'
import { ArrowDown, ArrowUp, Plus, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  createCustomerInputField,
  customerInputFieldTypeLabels,
  moveCustomerInputField,
  validateCustomerInputField,
  type CustomerInputField,
  type CustomerInputSchema,
} from '@/lib/data/customer-input-schema'

const inputClass = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]/60'

export function CustomerInputBuilder({ value, onChange }: { value?: CustomerInputSchema; onChange: (schema: CustomerInputSchema) => void }) {
  const [schema, setSchema] = useState<CustomerInputSchema>(value || { id: `schema-${Date.now()}`, fields: [], updatedAt: new Date().toISOString() })

  useEffect(() => {
    if (value) setSchema(value)
  }, [value])

  const update = (fields: CustomerInputField[]) => {
    const next = { ...schema, fields, updatedAt: new Date().toISOString() }
    setSchema(next)
    onChange(next)
  }
  const add = () => update([...schema.fields, createCustomerInputField(schema.fields.length + 1)])
  const patch = (index: number, key: keyof CustomerInputField, fieldValue: unknown) => update(schema.fields.map((field, fieldIndex) => fieldIndex === index ? { ...field, [key]: fieldValue } : field))
  const remove = (index: number) => update(schema.fields.filter((_, fieldIndex) => fieldIndex !== index).map((field, sortOrder) => ({ ...field, sortOrder: sortOrder + 1 })))
  const move = (index: number, direction: -1 | 1) => update(moveCustomerInputField(schema.fields, index, direction))
  const addOption = (index: number) => patch(index, 'options', [...(schema.fields[index].options || []), { labelAr: '', labelEn: '', value: '' }])
  const patchOption = (fieldIndex: number, optionIndex: number, key: 'labelAr' | 'labelEn' | 'value', fieldValue: string) => patch(fieldIndex, 'options', (schema.fields[fieldIndex].options || []).map((option, index) => index === optionIndex ? { ...option, [key]: fieldValue } : option))
  const removeOption = (fieldIndex: number, optionIndex: number) => patch(fieldIndex, 'options', (schema.fields[fieldIndex].options || []).filter((_, index) => index !== optionIndex))
  const validate = () => {
    const error = schema.fields.map(validateCustomerInputField).find(Boolean)
    if (error) toast.error(error)
    return !error
  }

  return <section className="col-span-full rounded-2xl border border-[#f5c542]/20 bg-[#f5c542]/[.04] p-4" aria-labelledby="customer-input-title">
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div><h3 id="customer-input-title" className="font-bold text-white">بيانات العميل</h3><p className="mt-1 text-xs text-white/50">أضف الحقول التي ستظهر للعميل عند الشراء</p></div>
      <button type="button" onClick={add} className="flex items-center justify-center gap-2 rounded-xl border border-[#f5c542]/30 px-3 py-2 text-xs font-bold text-[#f5c542]"><Plus className="size-4" />إضافة حقل</button>
    </div>
    <div className="mt-4 grid gap-3">
      {schema.fields.map((field, index) => <div key={field.id} className="rounded-xl border border-white/10 bg-black/20 p-3">
        <div className="mb-3 flex items-center justify-between gap-2"><span className="text-xs font-bold text-[#f5c542]">الحقل {index + 1}</span><div className="flex gap-1"><button type="button" aria-label="تحريك لأعلى" disabled={index === 0} onClick={() => move(index, -1)} className="rounded-lg p-2 text-white/60 disabled:opacity-30"><ArrowUp className="size-4" /></button><button type="button" aria-label="تحريك لأسفل" disabled={index === schema.fields.length - 1} onClick={() => move(index, 1)} className="rounded-lg p-2 text-white/60 disabled:opacity-30"><ArrowDown className="size-4" /></button><button type="button" aria-label="حذف الحقل" onClick={() => remove(index)} className="rounded-lg p-2 text-red-400"><Trash2 className="size-4" /></button></div></div>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-2 text-xs text-white/70">الاسم بالعربية<input className={inputClass} value={field.labelAr} onChange={(e) => patch(index, 'labelAr', e.target.value)} placeholder="Player ID" /></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">الاسم بالإنجليزية<input className={inputClass} value={field.labelEn} onChange={(e) => patch(index, 'labelEn', e.target.value)} placeholder="Player ID" /></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">مفتاح الحقل<input className={inputClass} value={field.fieldName} onChange={(e) => patch(index, 'fieldName', e.target.value.replace(/[^a-zA-Z0-9_]/g, '_'))} placeholder="player_id" /></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">نوع الحقل<select className={inputClass} value={field.type} onChange={(e) => patch(index, 'type', e.target.value)}>{Object.entries(customerInputFieldTypeLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">النص الإرشادي<input className={inputClass} value={field.placeholder} onChange={(e) => patch(index, 'placeholder', e.target.value)} /></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">النص المساعد<textarea className={inputClass} value={field.description} onChange={(e) => patch(index, 'description', e.target.value)} /></label>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 p-3 text-xs text-white/75"><input type="checkbox" checked={field.required} onChange={(e) => patch(index, 'required', e.target.checked)} />حقل مطلوب</label>
          <label className="flex items-center gap-2 rounded-xl border border-white/10 p-3 text-xs text-white/75"><input type="checkbox" checked={field.enabled !== false} onChange={(e) => patch(index, 'enabled', e.target.checked)} />حقل مفعل</label>
          <label className="flex flex-col gap-2 text-xs text-white/70">الحد الأدنى {field.type === 'number' ? 'للقيمة' : 'للطول'}<input type="number" className={inputClass} value={field.type === 'number' ? field.min ?? '' : field.minLength ?? ''} onChange={(e) => patch(index, field.type === 'number' ? 'min' : 'minLength', e.target.value ? Number(e.target.value) : undefined)} /></label>
          <label className="flex flex-col gap-2 text-xs text-white/70">الحد الأقصى {field.type === 'number' ? 'للقيمة' : 'للطول'}<input type="number" className={inputClass} value={field.type === 'number' ? field.max ?? '' : field.maxLength ?? ''} onChange={(e) => patch(index, field.type === 'number' ? 'max' : 'maxLength', e.target.value ? Number(e.target.value) : undefined)} /></label>
        </div>
        {field.type === 'select' && <div className="mt-3 rounded-xl border border-white/10 p-3"><div className="flex items-center justify-between"><span className="text-xs font-bold text-white/70">خيارات القائمة</span><button type="button" onClick={() => addOption(index)} className="text-xs font-bold text-[#f5c542]">إضافة خيار</button></div><div className="mt-2 grid gap-2">{(field.options || []).map((option, optionIndex) => <div key={`${field.id}-option-${optionIndex}`} className="grid grid-cols-[1fr_1fr_auto] gap-2"><input aria-label="اسم الخيار بالعربية" className={inputClass} value={option.labelAr} onChange={(e) => patchOption(index, optionIndex, 'labelAr', e.target.value)} placeholder="العربية" /><input aria-label="قيمة الخيار" className={inputClass} value={option.value} onChange={(e) => patchOption(index, optionIndex, 'value', e.target.value)} placeholder="value" /><button type="button" onClick={() => removeOption(index, optionIndex)} className="px-2 text-red-400" aria-label="حذف الخيار"><Trash2 className="size-4" /></button></div>)}</div></div>}
      </div>)}
      {schema.fields.length === 0 && <p className="rounded-xl border border-dashed border-white/15 p-5 text-center text-xs text-white/45">لا توجد حقول. أضف أول حقل لبيانات العميل.</p>}
    </div>
    {schema.fields.length > 0 && <div className="mt-4 rounded-xl border border-white/10 bg-black/20 p-4" dir="rtl"><h4 className="text-sm font-bold text-white">معاينة بيانات العميل</h4><div className="mt-3 grid gap-3 sm:grid-cols-2">{schema.fields.filter((field) => field.enabled !== false).map((field) => <label key={`preview-${field.id}`} className="flex flex-col gap-2 text-xs text-white/70">{field.labelAr || 'اسم الحقل'} {field.required && <span className="text-red-400">*</span>}{field.type === 'textarea' ? <textarea className={inputClass} placeholder={field.placeholder} disabled /> : field.type === 'select' ? <select className={inputClass} disabled><option>{field.placeholder || 'اختر من القائمة'}</option></select> : <input className={inputClass} type={field.type === 'phone' ? 'tel' : field.type} placeholder={field.placeholder} disabled />}{field.description && <span className="text-[10px] text-white/40">{field.description}</span>}</label>)}</div></div>}
    <button type="button" onClick={validate} className="mt-3 text-xs text-white/45 underline underline-offset-4">التحقق من الحقول</button>
  </section>
}
