'use client'

import { useState, type ReactNode } from 'react'
import { Archive, Copy, Edit2, Eye, EyeOff, MoreVertical, Trash2, AlertCircle, Calendar, Link2 } from 'lucide-react'
import { toast } from 'sonner'
import type { HomepageBanner, HomepageSection, HomepageConfig } from '@/lib/data/homepage'
import { cn } from '@/lib/utils'

export function BannerStatusBadge({ status }: { status: HomepageBanner['status'] }) {
  const statusMap = {
    active: { label: 'نشط', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    draft: { label: 'مسودة', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    scheduled: { label: 'مجدول', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    inactive: { label: 'غير نشط', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
    archived: { label: 'مؤرشف', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  }
  const s = statusMap[status]
  return <span className={cn('inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold', s.bg, s.text, s.border)}>{s.label}</span>
}

export function SectionStatusBadge({ status }: { status: HomepageSection['status'] }) {
  const statusMap = {
    active: { label: 'نشط', bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/20' },
    draft: { label: 'مسودة', bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
    scheduled: { label: 'مجدول', bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
    inactive: { label: 'غير نشط', bg: 'bg-gray-500/10', text: 'text-gray-400', border: 'border-gray-500/20' },
    archived: { label: 'مؤرشف', bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  }
  const s = statusMap[status]
  return <span className={cn('inline-flex items-center gap-1 rounded-lg border px-2 py-1 text-xs font-bold', s.bg, s.text, s.border)}>{s.label}</span>
}

export function BannerCard({ banner, onEdit, onArchive }: { banner: HomepageBanner; onEdit: () => void; onArchive: () => void }) {
  const [showMenu, setShowMenu] = useState(false)

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-4">
        <div className="relative size-20 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-white/5">
          <img src={banner.image} alt={banner.altText} className="size-full object-cover" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="font-bold text-white">{banner.nameAr}</h3>
          <p className="mt-1 text-xs text-white/40">{banner.nameEn}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <BannerStatusBadge status={banner.status} />
            {banner.startDate && (
              <span className="flex items-center gap-1 text-xs text-white/35">
                <Calendar className="size-3" />
                {banner.startDate}
              </span>
            )}
            {banner.targetType !== 'none' && (
              <span className="flex items-center gap-1 text-xs text-white/35">
                <Link2 className="size-3" />
                {banner.targetType}
              </span>
            )}
          </div>
        </div>
      </div>
      <div className="relative flex items-center gap-1">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-white"
          aria-label="تعديل البنر"
        >
          <Edit2 className="size-4" />
        </button>
        <button
          type="button"
          onClick={() => setShowMenu(!showMenu)}
          className="rounded-lg border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-white"
          aria-label="المزيد"
        >
          <MoreVertical className="size-4" />
        </button>
        {showMenu && (
          <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-48 rounded-xl border border-white/10 bg-[#111518] shadow-2xl">
            <button
              type="button"
              onClick={() => {
                toast.info('سيتم نسخ إعدادات البنر')
                setShowMenu(false)
              }}
              className="w-full px-4 py-2.5 text-right text-xs text-white/70 hover:bg-white/5 flex items-center gap-2"
            >
              <Copy className="size-3" />
              نسخ
            </button>
            <button
              type="button"
              onClick={() => {
                onArchive()
                setShowMenu(false)
              }}
              className="w-full px-4 py-2.5 text-right text-xs text-white/70 hover:bg-white/5 flex items-center gap-2 border-t border-white/10"
            >
              <Archive className="size-3" />
              أرشفة
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function SectionCard({ section, onEdit }: { section: HomepageSection; onEdit: () => void }) {
  const typeLabels: Record<HomepageSection['type'], string> = {
    banner: 'بنر',
    category_grid: 'شبكة الأقسام',
    product_grid: 'شبكة المنتجات',
    featured_products: 'المنتجات المميزة',
    popular_products: 'الأكثر مبيعاً',
    promotional: 'عروض ترويجية',
    service_grid: 'شبكة الخدمات',
  }

  const layoutLabels: Record<HomepageSection['layout'], string> = {
    grid: 'شبكة',
    carousel: 'دوار',
    list: 'قائمة',
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 flex-1">
        <h3 className="font-bold text-white">{section.nameAr}</h3>
        <p className="mt-1 text-xs text-white/40">{section.nameEn}</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="rounded-lg bg-white/5 px-2 py-1 text-xs font-semibold text-white/65">{typeLabels[section.type]}</span>
          <span className="rounded-lg bg-white/5 px-2 py-1 text-xs font-semibold text-white/65">{layoutLabels[section.layout]}</span>
          <SectionStatusBadge status={section.status} />
          {section.maxItems && <span className="text-xs text-white/40">حد أقصى: {section.maxItems}</span>}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => toast.info(section.visibility ? 'سيتم إخفاء القسم' : 'سيتم إظهار القسم')}
          className="rounded-lg border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-white"
          aria-label={section.visibility ? 'إخفاء القسم' : 'إظهار القسم'}
        >
          {section.visibility ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
        </button>
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-white/10 p-2 text-white/50 hover:bg-white/5 hover:text-white"
          aria-label="تعديل القسم"
        >
          <Edit2 className="size-4" />
        </button>
      </div>
    </div>
  )
}

export function HomepageStatusOverview({ sections, banners }: { sections: HomepageSection[]; banners: HomepageBanner[] }) {
  const activeSections = sections.filter((s) => s.status === 'active').length
  const activeBanners = banners.filter((b) => b.status === 'active').length
  const scheduledItems = sections.filter((s) => s.status === 'scheduled').length + banners.filter((b) => b.status === 'scheduled').length

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <div className="rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/40">الأقسام النشطة</p>
        <p className="mt-2 text-2xl font-black text-white">{activeSections}</p>
      </div>
      <div className="rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/40">البنرات النشطة</p>
        <p className="mt-2 text-2xl font-black text-white">{activeBanners}</p>
      </div>
      <div className="rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/40">عناصر مجدولة</p>
        <p className="mt-2 text-2xl font-black text-[#f5c542]">{scheduledItems}</p>
      </div>
      <div className="rounded-2xl border border-white/[.09] bg-[#0b0f12] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wide text-white/40">إجمالي الأقسام</p>
        <p className="mt-2 text-2xl font-black text-white/65">{sections.length}</p>
      </div>
    </div>
  )
}

export function BannerEditForm({
  banner,
  onSave,
  onCancel,
}: {
  banner?: HomepageBanner
  onSave: (data: Partial<HomepageBanner>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<HomepageBanner>>(
    banner || {
      nameAr: '',
      nameEn: '',
      image: '',
      status: 'draft',
      targetType: 'none',
      visibility: true,
    }
  )

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onClick={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111518] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white">{banner ? 'تعديل البنر' : 'إنشاء بنر جديد'}</h2>
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-white">الاسم بالعربية</label>
            <input
              type="text"
              value={formData.nameAr || ''}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#f5c542] focus:outline-none"
              placeholder="اسم البنر"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white">الاسم بالإنجليزية</label>
            <input
              type="text"
              value={formData.nameEn || ''}
              onChange={(e) => setFormData({ ...formData, nameEn: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#f5c542] focus:outline-none"
              placeholder="Banner name"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white">الحالة</label>
            <select
              value={formData.status || 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-[#f5c542] focus:outline-none"
            >
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="scheduled">مجدول</option>
              <option value="inactive">غير نشط</option>
              <option value="archived">مؤرشف</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-white/65 hover:bg-white/5"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={() => {
                onSave(formData)
                onCancel()
              }}
              className="flex-1 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-bold text-[#090909] hover:bg-[#ffd55d]"
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SectionEditForm({
  section,
  onSave,
  onCancel,
}: {
  section?: HomepageSection
  onSave: (data: Partial<HomepageSection>) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState<Partial<HomepageSection>>(
    section || {
      nameAr: '',
      nameEn: '',
      type: 'category_grid',
      status: 'draft',
      layout: 'grid',
      dataSource: 'custom',
      visibility: true,
    }
  )

  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-black/70 p-4 backdrop-blur-sm" role="presentation" onClick={onCancel}>
      <div
        role="dialog"
        aria-modal="true"
        className="w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111518] p-6 shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold text-white">{section ? 'تعديل القسم' : 'إنشاء قسم جديد'}</h2>
        <div className="mt-6 flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-white">الاسم بالعربية</label>
            <input
              type="text"
              value={formData.nameAr || ''}
              onChange={(e) => setFormData({ ...formData, nameAr: e.target.value })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-[#f5c542] focus:outline-none"
              placeholder="اسم القسم"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-white">نوع القسم</label>
            <select
              value={formData.type || 'category_grid'}
              onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-[#f5c542] focus:outline-none"
            >
              <option value="category_grid">شبكة أقسام</option>
              <option value="product_grid">شبكة منتجات</option>
              <option value="popular_products">الأكثر مبيعاً</option>
              <option value="featured_products">منتجات مميزة</option>
              <option value="promotional">عروض ترويجية</option>
              <option value="service_grid">شبكة خدمات</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-white">الحالة</label>
            <select
              value={formData.status || 'draft'}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
              className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white focus:border-[#f5c542] focus:outline-none"
            >
              <option value="draft">مسودة</option>
              <option value="active">نشط</option>
              <option value="scheduled">مجدول</option>
              <option value="inactive">غير نشط</option>
              <option value="archived">مؤرشف</option>
            </select>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-white/65 hover:bg-white/5"
            >
              إلغاء
            </button>
            <button
              type="button"
              onClick={() => {
                onSave(formData)
                onCancel()
              }}
              className="flex-1 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-bold text-[#090909] hover:bg-[#ffd55d]"
            >
              حفظ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
