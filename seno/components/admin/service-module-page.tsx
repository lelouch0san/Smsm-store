'use client'

import { useMemo, useState } from 'react'
import { Plus, Search, Settings2 } from 'lucide-react'
import { toast } from 'sonner'
import { AdminCard, AdminPageContainer, AdminPageHeader } from '@/components/admin/admin-components'
import { CustomerInputBuilder } from '@/components/admin/customer-input-builder'
import {
  createEmptyServiceRecord,
  getServiceModuleRecords,
  saveServiceModuleRecord,
  serviceModuleMeta,
  type ServiceModuleKind,
  type ServiceModuleRecord,
} from '@/lib/data/service-modules'
import type { CustomerInputSchema } from '@/lib/data/customer-input-schema'

const inputClass = 'w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]/60'

export function ServiceModulePage({ kind }: { kind: ServiceModuleKind }) {
  const meta = serviceModuleMeta[kind]
  const [refresh, setRefresh] = useState(0)
  const [query, setQuery] = useState('')
  const [editing, setEditing] = useState<ServiceModuleRecord | null>(null)
  const items = useMemo(
    () => getServiceModuleRecords(kind).filter((item) => `${item.nameAr} ${item.nameEn}`.toLocaleLowerCase().includes(query.toLocaleLowerCase())),
    [kind, query, refresh],
  )
  const save = (item: ServiceModuleRecord) => {
    if (!item.nameAr.trim() || !item.nameEn.trim()) {
      toast.error('يرجى إدخال اسم الخدمة بالعربية والإنجليزية')
      return
    }
    saveServiceModuleRecord(kind, item)
    setEditing(null)
    setRefresh((value) => value + 1)
    toast.success('تم حفظ التغييرات بنجاح')
  }

  return (
    <AdminPageContainer>
      <AdminPageHeader
        title={meta.title}
        description={meta.description}
        breadcrumbs={[{ label: 'الرئيسية', href: '/admin' }, { label: 'الخدمات' }, { label: meta.title }]}
        actions={<button type="button" onClick={() => setEditing(createEmptyServiceRecord(kind, items.length + 1))} className="flex items-center justify-center gap-2 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-black"><Plus className="size-4" />{meta.addLabel}</button>}
      />
      <AdminCard className="p-4 sm:p-6">
        <label className={`${inputClass} flex items-center gap-2`}><Search className="size-4 text-white/40" /><input aria-label="البحث" value={query} onChange={(event) => setQuery(event.target.value)} className="w-full bg-transparent outline-none" placeholder="ابحث بالاسم" /></label>
        <div className="mt-4 grid gap-3">
          {items.map((item) => <article key={item.id} className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/[.02] p-4 sm:flex-row sm:items-center"><div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#f5c542]/10 text-[#f5c542]"><Settings2 className="size-5" /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center gap-2"><h2 className="font-bold text-white">{item.nameAr || 'بدون اسم'}</h2><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/60">{item.status === 'active' ? 'نشط' : 'غير نشط'}</span></div><p className="mt-1 text-xs text-white/45">{item.nameEn}</p><p className="mt-2 text-xs leading-6 text-white/60">{item.detailAr} · {item.supportsPackages ? 'الباقات مدعومة' : 'بدون باقات'} · {item.requiresCustomerInput ? `بيانات العميل: ${item.customerInputSchema.fields.filter((field) => field.enabled).length} حقول` : 'لا يحتاج بيانات العميل'}</p></div><button type="button" onClick={() => setEditing(item)} className="rounded-xl border border-white/10 px-4 py-2 text-xs font-bold text-white/75 hover:border-[#f5c542]/40 hover:text-[#f5c542]">تعديل</button></article>)}
          {items.length === 0 && <p className="rounded-xl border border-dashed border-white/15 p-8 text-center text-sm text-white/45">لا توجد سجلات مطابقة</p>}
        </div>
      </AdminCard>
      {editing && <RecordForm item={editing} onCancel={() => setEditing(null)} onSave={save} />}
    </AdminPageContainer>
  )
}

function RecordForm({ item, onCancel, onSave }: { item: ServiceModuleRecord; onCancel: () => void; onSave: (item: ServiceModuleRecord) => void }) {
  const [form, setForm] = useState(item)
  const update = <K extends keyof ServiceModuleRecord>(key: K, value: ServiceModuleRecord[K]) => setForm((current) => ({ ...current, [key]: value }))
  const updateSchema = (schema: CustomerInputSchema) => update('customerInputSchema', schema)

  return <div className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onCancel()}><div role="dialog" aria-modal="true" aria-label="تحرير الخدمة" className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/10 bg-[#111518] p-5"><div className="flex items-center justify-between gap-3"><h2 className="text-lg font-bold text-white">{form.id ? 'تعديل الخدمة' : 'إضافة خدمة'}</h2><button type="button" onClick={onCancel} className="text-sm text-white/50">إغلاق</button></div><div className="mt-5 grid gap-4 sm:grid-cols-2"><label className="flex flex-col gap-2 text-xs font-semibold text-white/70">الاسم بالعربية<input required className={inputClass} value={form.nameAr} onChange={(event) => update('nameAr', event.target.value)} /></label><label className="flex flex-col gap-2 text-xs font-semibold text-white/70">الاسم بالإنجليزية<input required className={inputClass} value={form.nameEn} onChange={(event) => update('nameEn', event.target.value)} /></label><label className="flex flex-col gap-2 text-xs font-semibold text-white/70 sm:col-span-2">الوصف<textarea className={inputClass} value={form.detailAr} onChange={(event) => update('detailAr', event.target.value)} /></label><label className="flex flex-col gap-2 text-xs font-semibold text-white/70">الحالة<select className={inputClass} value={form.status} onChange={(event) => update('status', event.target.value as ServiceModuleRecord['status'])}><option value="active">نشط</option><option value="inactive">غير نشط</option></select></label><label className="flex items-center gap-2 rounded-xl border border-white/10 p-3 text-xs text-white/75"><input type="checkbox" checked={form.supportsPackages} onChange={(event) => update('supportsPackages', event.target.checked)} /> يدعم الباقات</label><label className="flex items-center gap-2 rounded-xl border border-white/10 p-3 text-xs text-white/75 sm:col-span-2"><input type="checkbox" checked={form.requiresCustomerInput} onChange={(event) => update('requiresCustomerInput', event.target.checked)} /> يتطلب بيانات العميل</label>{form.requiresCustomerInput && <CustomerInputBuilder value={form.customerInputSchema} onChange={updateSchema} />}</div><div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" onClick={onCancel} className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-bold text-white/70">إلغاء</button><button type="button" onClick={() => onSave(form)} className="rounded-xl bg-[#f5c542] px-5 py-2.5 text-sm font-black text-black">حفظ الخدمة</button></div></div></div>
}
