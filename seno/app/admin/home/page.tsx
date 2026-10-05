'use client'

import { useMemo, useState } from 'react'
import { Eye, Plus, Save, Settings2, Sparkles, Image as ImageIcon, LayoutList, Search } from 'lucide-react'
import { toast } from 'sonner'
import { AdminCard, AdminPageContainer, AdminPageHeader, AdminToolbar } from '@/components/admin/admin-components'
import { BannerCard, BannerEditForm, HomepageStatusOverview, SectionCard, SectionEditForm } from '@/components/admin/homepage/homepage-components'
import { getHomepageData, updateBanner, updateSection, type HomepageBanner, type HomepageSection } from '@/lib/data/homepage'
import { getProducts } from '@/lib/data/products'

export default function AdminHomepagePage() {
  const initialData = useMemo(() => getHomepageData(), [])
  const [data, setData] = useState(initialData)
  const [tab, setTab] = useState<'sections' | 'banners' | 'featured' | 'promotions' | 'settings'>('sections')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [editingBanner, setEditingBanner] = useState<HomepageBanner | undefined>()
  const [editingSection, setEditingSection] = useState<HomepageSection | undefined>()
  const [previewOpen, setPreviewOpen] = useState(false)

  const filteredSections = data.sections.filter((section) => {
    const matchesSearch = section.nameAr.includes(search) || section.nameEn.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || section.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const filteredBanners = data.banners.filter((banner) => {
    const matchesSearch = banner.nameAr.includes(search) || banner.nameEn.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || banner.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleBannerSave = (updates: Partial<HomepageBanner>) => {
    if (!editingBanner) return
    updateBanner(editingBanner.id, updates)
    setData({ ...getHomepageData(), banners: [...getHomepageData().banners] })
    toast.success('تم تحديث البنر بنجاح')
  }

  const handleSectionSave = (updates: Partial<HomepageSection>) => {
    if (!editingSection) return
    updateSection(editingSection.id, updates)
    setData({ ...getHomepageData(), sections: [...getHomepageData().sections] })
    toast.success('تم تحديث القسم بنجاح')
  }

  const handleSave = () => {
    toast.success('تم حفظ إعدادات الصفحة الرئيسية')
  }

  const tabs = [
    { id: 'sections' as const, label: 'الأقسام', icon: LayoutList, count: data.sections.length },
    { id: 'banners' as const, label: 'البنرات', icon: ImageIcon, count: data.banners.length },
    { id: 'featured' as const, label: 'العناصر المميزة', icon: Sparkles },
    { id: 'promotions' as const, label: 'العروض الترويجية', icon: ImageIcon },
    { id: 'settings' as const, label: 'إعدادات العرض', icon: Settings2 },
  ]

  return (
    <AdminPageContainer>
      <AdminPageHeader
        title="إدارة الصفحة الرئيسية"
        description="تحكم في محتوى وترتيب العناصر الظاهرة في الصفحة الرئيسية للمتجر"
        breadcrumbs={[{ label: 'الرئيسية', href: '/admin' }, { label: 'المتجر' }, { label: 'إدارة الرئيسية' }]}
        actions={
          <div className="flex flex-wrap gap-2">
            <button type="button" onClick={() => setPreviewOpen(true)} className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-xs font-bold text-white/75 hover:bg-white/5 hover:text-white">
              <Eye className="size-4" />
              معاينة الصفحة
            </button>
            <button type="button" onClick={handleSave} className="flex items-center gap-2 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-[#090909] hover:bg-[#ffd55d]">
              <Save className="size-4" />
              حفظ المسودة
            </button>
          </div>
        }
      />

      <div className="flex flex-col gap-6">
        <HomepageStatusOverview sections={data.sections} banners={data.banners} />

        <AdminCard className="overflow-hidden">
          <div className="flex overflow-x-auto border-b border-white/[.08] px-2 sm:px-4" role="tablist" aria-label="إدارة الصفحة الرئيسية">
            {tabs.map((item) => {
              const Icon = item.icon
              return <button key={item.id} type="button" role="tab" aria-selected={tab === item.id} onClick={() => setTab(item.id)} className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-4 text-xs font-bold transition sm:px-4 ${tab === item.id ? 'border-[#f5c542] text-[#f5c542]' : 'border-transparent text-white/45 hover:text-white'}`}><Icon className="size-4" />{item.label}{item.count !== undefined && <span className="rounded-full bg-white/10 px-1.5 py-0.5 text-[10px]">{item.count}</span>}</button>
            })}
          </div>

          {tab === 'sections' && <div className="flex flex-col gap-4 p-4 sm:p-6"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-bold text-white">أقسام الصفحة الرئيسية</h2><p className="mt-1 text-xs text-white/40">رتب الأقسام وتحكم في ظهورها على واجهة المتجر</p></div><button type="button" onClick={() => setEditingSection({ id: '', nameAr: '', nameEn: '', type: 'category_grid', status: 'draft', visibility: true, sortOrder: data.sections.length + 1, dataSource: 'custom', layout: 'grid', createdAt: '', updatedAt: '' })} className="flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-2.5 text-xs font-bold text-white hover:bg-white/15"><Plus className="size-4" />إضافة قسم</button></div><AdminToolbar><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="البحث في الأقسام..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#f5c542]" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none"><option value="all">كل الحالات</option><option value="active">نشط</option><option value="inactive">غير نشط</option><option value="scheduled">مجدول</option></select></AdminToolbar><div className="flex flex-col gap-3">{filteredSections.map((section) => <SectionCard key={section.id} section={section} onEdit={() => setEditingSection(section)} />)}</div></div>}

          {tab === 'banners' && <div className="flex flex-col gap-4 p-4 sm:p-6"><div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between"><div><h2 className="text-lg font-bold text-white">إدارة البنرات</h2><p className="mt-1 text-xs text-white/40">تحكم في البنرات والعروض الظاهرة على الصفحة الرئيسية</p></div><button type="button" onClick={() => setEditingBanner({ id: '', nameAr: '', nameEn: '', image: '/images/home-banner-new.png', targetType: 'none', status: 'draft', sortOrder: data.banners.length + 1, visibility: true, altText: '', createdAt: '', updatedAt: '' })} className="flex items-center justify-center gap-2 rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-[#090909] hover:bg-[#ffd55d]"><Plus className="size-4" />إضافة بنر</button></div><AdminToolbar><input type="search" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="البحث في البنرات..." className="min-w-0 flex-1 rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none placeholder:text-white/35 focus:border-[#f5c542]" /><select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-white outline-none"><option value="all">كل الحالات</option><option value="active">نشط</option><option value="draft">مسودة</option><option value="scheduled">مجدول</option></select></AdminToolbar><div className="flex flex-col gap-3">{filteredBanners.map((banner) => <BannerCard key={banner.id} banner={banner} onEdit={() => setEditingBanner(banner)} onArchive={() => toast.success('تم أرشفة البنر')} />)}</div></div>}

          {tab === 'featured' && <FeaturedItems data={data} onChange={setData} />}
          {tab === 'promotions' && <PromotionalItems data={data} onChange={setData} />}
          {tab === 'settings' && <DisplaySettings config={data.config} onChange={(config) => setData({ ...data, config })} />}
        </AdminCard>
      </div>

      {editingBanner && <BannerEditForm banner={editingBanner.id ? editingBanner : undefined} onSave={handleBannerSave} onCancel={() => setEditingBanner(undefined)} />}
      {editingSection && <SectionEditForm section={editingSection.id ? editingSection : undefined} onSave={handleSectionSave} onCancel={() => setEditingSection(undefined)} />}
      {previewOpen && <HomepagePreview data={data} onClose={() => setPreviewOpen(false)} />}
    </AdminPageContainer>
  )
}

function FeaturedItems({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const products = getProducts()
  const [selected, setSelected] = useState<string[]>(data.featuredProductIds || products.slice(0, 3).map((product) => product.slug))
  const toggle = (id: string) => setSelected((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id])
  return <div className="p-4 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">العناصر المميزة</h2><p className="mt-1 text-xs text-white/40">اختر المنتجات الموجودة في الكتالوج ورتبها للواجهة الرئيسية</p></div><button type="button" onClick={() => { onChange({ ...data, featuredProductIds: selected }); toast.success('تم حفظ العناصر المميزة') }} className="rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-black">حفظ العناصر</button></div><div className="mt-5 grid gap-3 sm:grid-cols-2">{products.slice(0, 12).map((product) => <label key={product.slug} className={`flex cursor-pointer items-center gap-3 rounded-2xl border p-3 ${selected.includes(product.slug) ? 'border-[#f5c542]/60 bg-[#f5c542]/10' : 'border-white/10 bg-white/[.02]'}`}><input type="checkbox" checked={selected.includes(product.slug)} onChange={() => toggle(product.slug)} className="accent-[#f5c542]" /><div className="size-14 rounded-xl bg-white/10" /><div className="min-w-0"><p className="truncate text-sm font-bold text-white">{product.name}</p><p className="mt-1 text-[11px] text-white/40">{product.category} · {product.isAvailable ? 'متاح' : 'غير متاح'}</p></div></label>)}</div></div>
}

function PromotionalItems({ data, onChange }: { data: any; onChange: (data: any) => void }) {
  const promotions = [{ id: 'promo-discounts', name: 'عروض وخصومات' }, { id: 'promo-gift-cards', name: 'عروض البطاقات الرقمية' }, { id: 'promo-games', name: 'عروض شحن الألعاب' }]
  const [selected, setSelected] = useState<string[]>(data.promotionalIds || promotions.map((item) => item.id))
  return <div className="p-4 sm:p-6"><div className="flex items-center justify-between"><div><h2 className="text-lg font-bold text-white">العروض الترويجية</h2><p className="mt-1 text-xs text-white/40">اختر مواضع العروض الموجودة دون تعديل بيانات العرض نفسها</p></div><button type="button" onClick={() => { onChange({ ...data, promotionalIds: selected }); toast.success('تم حفظ العروض الترويجية') }} className="rounded-xl bg-[#f5c542] px-4 py-2.5 text-xs font-black text-black">حفظ العروض</button></div><div className="mt-5 flex flex-col gap-3">{promotions.map((item) => <label key={item.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[.02] p-4"><input type="checkbox" checked={selected.includes(item.id)} onChange={() => setSelected((current) => current.includes(item.id) ? current.filter((id) => id !== item.id) : [...current, item.id])} className="accent-[#f5c542]" /><span className="text-sm font-bold text-white">{item.name}</span><span className="ms-auto text-xs text-white/40">موضع ترويجي</span></label>)}</div></div>
}

function DisplaySettings({ config, onChange }: { config: any; onChange: (config: any) => void }) {
  return <div className="p-4 sm:p-6"><div><h2 className="text-lg font-bold text-white">إعدادات العرض</h2><p className="mt-1 text-xs text-white/40">قواعد بسيطة للتحكم في طريقة عرض الصفحة الرئيسية</p></div><div className="mt-6 grid gap-4 md:grid-cols-2"><label className="rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="block text-xs font-bold text-white">الحد الأقصى للأقسام الظاهرة</span><input type="number" min="1" max="20" value={config.maxVisibleSections} onChange={(e) => onChange({ ...config, maxVisibleSections: Number(e.target.value) })} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]" /></label><label className="rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="block text-xs font-bold text-white">المسافة بين الأقسام</span><select value={config.defaultSpacing} onChange={(e) => onChange({ ...config, defaultSpacing: e.target.value })} className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white outline-none focus:border-[#f5c542]"><option value="compact">مضغوطة</option><option value="normal">عادية</option><option value="spacious">واسعة</option></select></label><Toggle label="عرض المناطق الترويجية" checked={config.showPromotionalAreas} onChange={(checked) => onChange({ ...config, showPromotionalAreas: checked })} /><Toggle label="عرض المناطق المميزة" checked={config.showFeaturedAreas} onChange={(checked) => onChange({ ...config, showFeaturedAreas: checked })} /></div></div>
}

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: (checked: boolean) => void }) {
  return <label className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[.02] p-4"><span className="text-xs font-bold text-white">{label}</span><button type="button" role="switch" aria-checked={checked} onClick={() => onChange(!checked)} className={`relative h-6 w-11 rounded-full transition ${checked ? 'bg-[#f5c542]' : 'bg-white/15'}`}><span className={`absolute top-1 size-4 rounded-full bg-white transition ${checked ? 'right-1' : 'right-6'}`} /></button></label>
}

function HomepagePreview({ data, onClose }: { data: any; onClose: () => void }) {
  const categories = [
    { label: 'شحن الألعاب', image: '/images/category-games.png', accent: 'border-red-500/70' },
    { label: 'تطبيقات الصوت', image: '/images/category-apps.png', accent: 'border-blue-500/70' },
    { label: 'البطاقات الرقمية', image: '/images/category-gift-cards.png', accent: 'border-fuchsia-500/70' },
    { label: 'خدمات أخرى', image: '/images/category-services.png', accent: 'border-amber-400/70' },
    { label: 'أكواد سينو رصيد', image: '/images/category-balance-codes-uploaded.png', accent: 'border-amber-300/70' },
    { label: 'سحب الأموال', image: '/images/category-withdraw-uploaded.png', accent: 'border-emerald-400/70' },
    { label: 'الاشتراكات', image: '/images/category-subscriptions-uploaded.png', accent: 'border-violet-400/70' },
    { label: 'العملات الرقمية', image: '/images/category-crypto-uploaded.png', accent: 'border-cyan-400/70' },
  ]
  const activeSections = data.sections.filter((section: HomepageSection) => section.visibility && section.status === 'active').sort((a: HomepageSection, b: HomepageSection) => a.sortOrder - b.sortOrder)
  const hero = data.banners.find((banner: any) => banner.visibility && banner.status === 'active') || data.banners[0]
  return <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-3 backdrop-blur-sm" role="presentation" onClick={onClose}>
    <div className="flex max-h-[95vh] w-full max-w-md flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#050506] shadow-2xl" role="dialog" aria-modal="true" aria-label="معاينة الصفحة الرئيسية" onClick={(e) => e.stopPropagation()}>
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-3"><div><p className="text-sm font-bold text-white">معاينة الصفحة الرئيسية</p><p className="text-[10px] text-white/40">محاكاة واجهة Seno Store بعرض 390px</p></div><button type="button" onClick={onClose} className="rounded-lg px-3 py-2 text-xs text-white/60 hover:bg-white/5 hover:text-white">إغلاق</button></div>
      <div className="overflow-y-auto bg-[#050506]" dir="rtl">
        <div className="mx-auto flex w-full flex-col gap-5 px-4 pb-5 pt-3 text-white">
          <div className="flex items-center justify-between py-2" dir="ltr"><span className="text-lg font-black tracking-[.18em] text-white">SENO <span className="text-[#f5c542]">STORE</span></span><span className="rounded-full border border-white/10 px-2 py-1 text-[10px] text-white/50">المتجر</span></div>
          <div className="relative aspect-[1536/491] overflow-hidden rounded-3xl border border-red-500/70 bg-black"><img src={hero?.mobileImage || hero?.image || '/images/home-banner-new.png'} alt={hero?.altText || 'البنر الرئيسي للمتجر'} className="size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" /><div className="absolute bottom-3 right-3"><p className="text-sm font-black text-white">{hero?.nameAr || 'اكتشف أفضل العروض'}</p><p className="mt-1 text-[10px] text-white/70">{hero?.subtitleAr || 'شحن فوري وخدمات رقمية متنوعة'}</p></div></div>
          <div className="flex h-11 items-center gap-2 rounded-full border border-white/15 bg-white/[.035] px-4 text-xs text-white/40"><Search className="size-4" />ابحث عن منتج أو فئة...</div>
          {activeSections.filter((section: HomepageSection) => section.type !== 'banner').map((section: HomepageSection) => <section key={section.id} className="flex flex-col gap-3"><div className="flex items-end justify-between"><div><h3 className="text-base font-black text-white">{section.nameAr}</h3><p className="mt-1 text-[10px] text-white/40">كل ما تحتاجه في مكان واحد</p></div><span className="text-[10px] font-bold text-[#f5c542]">عرض الكل</span></div>{section.dataSource === 'categories' || section.type === 'category_grid' || section.type === 'service_grid' ? <div className="grid grid-cols-2 gap-2.5">{categories.slice(0, section.maxItems || 8).map((category) => <div key={category.label} className={`group relative flex min-h-28 overflow-hidden rounded-2xl border bg-black ${category.accent}`}><img src={category.image} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-90" /><span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" /><strong className="relative mt-auto p-2.5 text-xs text-white">{category.label}</strong></div>)}</div> : section.type === 'promotional' ? <div className="relative aspect-[2/1] overflow-hidden rounded-2xl border border-amber-400/50"><img src="/images/offers-exclusive.png" alt="عروض حصرية" className="size-full object-cover" /><span className="absolute inset-x-3 bottom-3 text-sm font-black text-white">عروض وخصومات حصرية</span></div> : <div className="grid grid-cols-2 gap-2.5">{[{ label: 'شحن الألعاب', image: '/images/category-games.png' }, { label: 'البطاقات الرقمية', image: '/images/category-gift-cards.png' }, { label: 'تطبيقات الصوت', image: '/images/category-apps.png' }, { label: 'أكواد سينو', image: '/images/category-balance-codes-uploaded.png' }].map((item) => <div key={item.label} className="overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f12]"><img src={item.image} alt="" aria-hidden="true" className="aspect-[1.5/1] w-full object-cover" /><div className="p-3"><p className="text-xs font-bold text-white">{item.label}</p><p className="mt-1 text-[10px] text-white/40">متاح الآن</p></div></div>)}</div>}</section>)}
          <nav className="sticky bottom-0 grid grid-cols-4 rounded-2xl border border-white/10 bg-[#0b0f12]/95 p-2 text-center text-[10px] text-white/45"><span className="rounded-xl bg-[#f5c542]/10 py-2 font-bold text-[#f5c542]">الرئيسية</span><span className="py-2">المتجر</span><span className="py-2">الطلبات</span><span className="py-2">حسابي</span></nav>
        </div>
      </div>
    </div>
  </div>
}
