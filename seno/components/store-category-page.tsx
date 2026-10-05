'use client'

import Link from 'next/link'
import { ArrowRight, Check, Clock3, Search, ShoppingBag, Wallet, X } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { storeProducts } from '@/lib/data'
import { DigitalGiftCard, type DigitalGiftCardData } from '@/components/digital-gift-card'

export type StoreCategory = 'games' | 'apps' | 'gift-cards' | 'services' | 'shopping' | 'subscriptions' | 'crypto' | 'social' | 'withdraw'
export type CatalogItem = { slug: string; name: string; description: string; detail: string; image: string; price: string; type: string; available?: boolean }
type PageMeta = { title: string; eyebrow: string; subtitle: string; search: string }

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'
export const mockCatalog: Partial<Record<StoreCategory, CatalogItem[]>> = {
  shopping: [
    { slug: 'steam-wallet', name: 'Steam Wallet', description: 'بطاقة رصيد لألعاب Steam', detail: 'بطاقة رقمية', price: '500 EGP', type: 'بطاقات ألعاب', image: '/images/category-shopping.png' },
    { slug: 'steam-game-key', name: 'Steam Game Key', description: 'مفتاح لعبة رقمي جاهز للتفعيل', detail: 'Game Key', price: '750 EGP', type: 'مفاتيح ألعاب', image: '/images/category-shopping.png' },
  ],
  subscriptions: [
    { slug: 'netflix', name: 'Netflix', description: 'اشتراك ترفيهي بجودة عالية', detail: 'شهر واحد', price: '250 EGP', type: 'ترفيه', image: '/images/category-subscriptions.png' },
    { slug: 'spotify', name: 'Spotify', description: 'استمع إلى موسيقاك بدون إعلانات', detail: '3 أشهر', price: '450 EGP', type: 'موسيقى', image: '/images/category-subscriptions.png' },
    { slug: 'ai-subscription', name: 'AI Premium', description: 'أدوات ذكية لإنتاجيتك اليومية', detail: 'شهر واحد', price: '350 EGP', type: 'ذكاء اصطناعي', image: '/images/category-subscriptions.png' },
  ],
  crypto: [
    { slug: 'usdt-10', name: 'USDT', description: 'رصيد رقمي على شبكة TRC20', detail: '10 USDT • TRC20', price: 'حسب السعر الحالي', type: 'عملة رقمية', image: '/images/category-crypto.png' },
    { slug: 'usdt-25', name: 'USDT', description: 'رصيد رقمي على شبكة TRC20', detail: '25 USDT • TRC20', price: 'حسب السعر الحالي', type: 'عملة رقمية', image: '/images/category-crypto.png' },
    { slug: 'usdt-50', name: 'USDT', description: 'رصيد رقمي على شبكة TRC20', detail: '50 USDT • TRC20', price: 'حسب السعر الحالي', type: 'عملة رقمية', image: '/images/category-crypto.png' },
  ],
  social: [
    { slug: 'instagram-followers', name: 'Instagram', description: 'متابعين Instagram حقيقيين', detail: '1,000 متابع', price: '120 EGP', type: 'خدمة سوشيال', image: '/images/category-username-lots.png' },
    { slug: 'tiktok-followers', name: 'TikTok', description: 'زيادة وصول حسابك على TikTok', detail: '1,000 متابع', price: '100 EGP', type: 'خدمة سوشيال', image: '/images/category-username-lots.png' },
  ],
}

const meta: Record<StoreCategory, PageMeta> = {
  games: { title: 'شحن الألعاب', eyebrow: 'Seno Store Gaming', subtitle: 'اشحن ألعابك المفضلة بسرعة وأمان', search: 'ابحث عن اللعبة...' },
  apps: { title: 'شحن التطبيقات', eyebrow: 'Seno Store Apps', subtitle: 'اشحن تطبيقاتك وخدماتك الرقمية بسهولة', search: 'ابحث عن التطبيق...' },
  'gift-cards': { title: 'البطاقات الرقمية', eyebrow: 'بطاقات رقمية موثوقة', subtitle: 'اختر العلامة والقيمة المناسبة بأمان', search: 'ابحث عن بطاقة...' },
  services: { title: 'خدمات أخرى', eyebrow: 'Seno Store Services', subtitle: 'خدمات رقمية متنوعة من مكان واحد', search: 'ابحث عن خدمة...' },
  shopping: { title: 'التسوق', eyebrow: 'Digital Shopping', subtitle: 'بطاقات ومفاتيح رقمية لعالمك المفضل', search: 'ابحث في منتجات التسوق...' },
  subscriptions: { title: 'الاشتراكات', eyebrow: 'Premium Memberships', subtitle: 'اشتراكاتك المفضلة للترفيه والإنتاجية', search: 'ابحث عن اشتراك...' },
  crypto: { title: 'العملات الرقمية', eyebrow: 'Digital Assets', subtitle: 'اختر باقة USDT والشبكة المناسبة لك', search: 'ابحث عن باقة...' },
  social: { title: 'يوزرات وخدمات السوشيال', eyebrow: 'Social Services', subtitle: 'خدمات رقمية احترافية لحساباتك', search: 'ابحث عن خدمة...' },
  withdraw: { title: 'سحب الأموال', eyebrow: 'Balance Withdrawal', subtitle: 'قم بسحب رصيدك إلى وسيلة الدفع المناسبة لك', search: '' },
}

const legacyCatalog: Record<'games' | 'apps' | 'gift-cards' | 'services', CatalogItem[]> = {
  games: ['pubg-mobile', 'free-fire', 'mobile-legends', 'call-of-duty-mobile'].map((slug) => ({ slug, name: slug.replaceAll('-', ' '), description: 'شحن سريع وآمن من SENO STORE', detail: 'شحن مباشر', price: 'متاح', type: 'ألعاب', image: '/images/category-games.png' })),
  apps: ['sahra-chat', 'tiktok', 'bigo-live'].map((slug) => ({ slug, name: slug.replaceAll('-', ' '), description: 'شحن تطبيقك بسهولة', detail: 'رصيد رقمي', price: 'متاح', type: 'تطبيقات', image: '/images/category-apps.png' })),
  'gift-cards': ['google-play', 'apple-gift-card', 'playstation', 'steam'].map((slug) => ({ slug, name: slug.replaceAll('-', ' '), description: 'بطاقة رقمية موثوقة', detail: 'Digital Card', price: 'اختر القيمة', type: 'بطاقات', image: '/images/category-gift-cards.png' })),
  services: [{ slug: 'digital-services', name: 'خدمات رقمية', description: 'خدمات رقمية متنوعة', detail: 'خدمات', price: 'متاح', type: 'خدمات', image: '/images/category-services.png' }],
}

function ProductCard({ item }: { item: CatalogItem }) {
  const isAvailable = item.available !== false
  return <article className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b0f] shadow-[0_0_24px_rgba(239,68,68,.06)] transition hover:-translate-y-1 hover:border-amber-400/60" dir="rtl"><div className="relative aspect-[1.25] overflow-hidden bg-black"><img src={item.image} alt="" aria-hidden="true" loading="lazy" className="size-full object-cover opacity-85 transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-transparent to-black/10" /><span className="absolute right-3 top-3 rounded-full border border-amber-300/30 bg-black/65 px-2 py-1 text-[10px] font-bold text-amber-200">{item.type}</span><span className={`absolute left-3 top-3 rounded-full px-2 py-1 text-[10px] font-bold ${isAvailable ? 'bg-emerald-600/90 text-white' : 'bg-red-950 text-red-200'}`}>{isAvailable ? 'متاح' : 'غير متوفر'}</span></div><div className="p-4"><h2 className="text-base font-black text-white">{item.name}</h2><p className="mt-1 text-xs text-zinc-400">{item.description}</p><div className="mt-3 flex items-end justify-between gap-2"><div><p className="text-xs text-zinc-500">{item.detail}</p><strong className="text-base text-amber-300">{item.price}</strong></div>{isAvailable ? <Link href={`/product/${item.slug}`} className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white"><ShoppingBag />عرض المنتج</Link> : <span className="rounded-xl border border-red-500/30 px-3 py-2 text-xs text-red-200">غير متوفر</span>}</div></div></article>
}

function WithdrawalPage() {
  const methods = [
    { name: 'Vodafone Cash', description: 'تحويل سريع وآمن', image: '/images/deposit-vodafone.png', field: 'رقم فودافون كاش' },
    { name: 'InstaPay', description: 'استلام فوري', image: '/images/deposit-instapay.png', field: 'حساب أو عنوان InstaPay' },
    { name: 'Orange Cash', description: 'محفظة Orange', image: '/images/category-money-withdrawal.png', field: 'رقم Orange Cash' },
    { name: 'Etisalat Cash', description: 'محفظة Etisalat', image: '/images/category-money-withdrawal.png', field: 'رقم Etisalat Cash' },
    { name: 'WE Pay', description: 'تحويل مباشر', image: '/images/category-money-withdrawal.png', field: 'رقم WE Pay' },
    { name: 'وش موني', description: 'طريقة دفع محلية', image: '/images/category-money-withdrawal.png', field: 'رقم الحساب أو الهاتف' },
  ]
  const [selected, setSelected] = useState<(typeof methods)[number] | null>(null)
  const [amount, setAmount] = useState('500')
  const [contact, setContact] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const numericAmount = Number(amount) || 0

  if (submitted && selected) return <section className="flex min-h-[360px] items-center justify-center" dir="rtl"><div className="w-full rounded-3xl border border-emerald-300/40 bg-emerald-950/25 p-7 text-center shadow-[0_0_32px_rgba(69,224,178,.12)]"><span className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-400 text-[#07100d]"><Check className="size-8" /></span><h2 className="mt-5 text-2xl font-black text-white">تم قبول طلبك</h2><p className="mt-2 text-sm leading-7 text-emerald-100">تم إرسال طلب السحب بنجاح وسيتم تنفيذه حسب النظام.</p><p className="mt-4 text-xs text-zinc-400">{selected.name} · {numericAmount.toLocaleString('en-US')} EGP</p><button type="button" onClick={() => { setSubmitted(false); setSelected(null); setContact('') }} className="mt-6 rounded-2xl border border-emerald-300/40 px-5 py-3 text-sm font-bold text-emerald-200">طلب سحب جديد</button></div></section>

  return <section className="relative" dir="rtl"><div className="grid grid-cols-2 gap-3 sm:gap-4">{methods.map((method) => <button key={method.name} type="button" onClick={() => setSelected(method)} className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0b0f12] text-right shadow-[0_0_20px_rgba(0,0,0,.2)] transition hover:border-amber-300/60 active:scale-[.98]"><div className="relative aspect-[1.35] overflow-hidden bg-black"><img src={method.image} alt={method.name} className="size-full object-cover opacity-90 transition duration-300 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b0f12] via-transparent to-transparent" /></div><div className="p-3"><strong className="block text-sm font-black text-white">{method.name}</strong><small className="mt-1 block text-[11px] text-zinc-400">{method.description}</small></div></button>)}</div>{selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center"><div className="w-full max-w-md rounded-3xl border border-amber-300/25 bg-[#0b0f12] p-5 shadow-[0_0_40px_rgba(245,197,66,.12)]" role="dialog" aria-modal="true" aria-labelledby="withdrawal-dialog-title"><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><img src={selected.image} alt="" className="size-14 rounded-2xl object-cover" /><div><h2 id="withdrawal-dialog-title" className="font-black text-white">{selected.name}</h2><p className="mt-1 text-xs text-zinc-400">{selected.description}</p></div></div><button type="button" onClick={() => setSelected(null)} className="rounded-full p-2 text-zinc-400 hover:bg-white/10" aria-label="إغلاق"><X className="size-5" /></button></div><label className="mt-5 block text-sm font-bold text-white" htmlFor="withdrawal-contact">{selected.field}</label><input id="withdrawal-contact" value={contact} onChange={(event) => setContact(event.target.value)} placeholder="أدخل البيانات المطلوبة" className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3.5 text-white outline-none focus:border-amber-300/60" /><label className="mt-4 block text-sm font-bold text-white" htmlFor="withdrawal-amount">مبلغ السحب</label><div className="mt-2 flex items-center rounded-2xl border border-white/10 bg-black/30 px-4"><input id="withdrawal-amount" value={amount} onChange={(event) => setAmount(event.target.value.replace(/[^0-9]/g, ''))} inputMode="numeric" className="min-w-0 flex-1 bg-transparent py-3.5 text-xl font-black text-white outline-none" /><span className="text-sm text-amber-300">EGP</span></div><div className="mt-4 rounded-2xl bg-white/[.035] p-3 text-sm"><div className="flex justify-between py-1.5 text-zinc-400"><span>المبلغ</span><b className="text-white">{numericAmount.toLocaleString('en-US')} EGP</b></div><div className="flex justify-between py-1.5 text-zinc-400"><span>الرسوم</span><b className="text-white">0 EGP</b></div><div className="mt-2 flex justify-between border-t border-white/10 pt-3 font-black"><span>صافي المبلغ</span><b className="text-amber-300">{numericAmount.toLocaleString('en-US')} EGP</b></div></div><button type="button" disabled={!contact.trim() || numericAmount <= 0} onClick={() => setSubmitted(true)} className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 font-black text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-40"><Wallet className="size-5" />شراء</button></div></div>}</section>
}

export function StoreCategoryPage({ category }: { category: StoreCategory }) {
  const [query, setQuery] = useState('')
  const page = meta[category]
  const items = useMemo(() => (mockCatalog[category] ?? legacyCatalog[category as keyof typeof legacyCatalog] ?? []).filter((item) => `${item.name} ${item.description}`.toLowerCase().includes(query.toLowerCase())), [category, query])
  return <main className="min-h-screen bg-[#050506] pb-32 text-white" dir="rtl"><div className="mx-auto max-w-6xl px-5 sm:px-6"><header className="flex items-center justify-between gap-4 py-6"><Link href="/store" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-zinc-200"><ArrowRight />العودة إلى المتجر</Link><SenoLogo className="w-36" /></header><nav className="mb-6 flex gap-2 text-sm"><Link href="/store" className="text-zinc-400">المتجر</Link><span className="text-zinc-600">/</span><span className="text-amber-300">{page.title}</span></nav><section className="relative overflow-hidden rounded-3xl border border-red-600/70 bg-gradient-to-l from-red-950/70 via-[#0b1014] to-black p-6 shadow-[0_0_28px_rgba(255,0,30,.13)] sm:p-10"><div className="absolute -left-10 -top-16 size-48 rounded-full bg-amber-300/10 blur-3xl" /><p className="relative text-sm font-bold text-amber-300">{page.eyebrow}</p><h1 className="relative mt-2 text-3xl font-black sm:text-5xl">{page.title}</h1><p className="relative mt-3 max-w-2xl text-zinc-300 sm:text-lg">{page.subtitle}</p></section>{category === 'withdraw' ? <div className="my-6"><WithdrawalPage /></div> : <><div className="my-6 flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[.04] px-4"><Search className="text-amber-300" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder={page.search} className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500" /></div>{category === 'crypto' && <div className="mb-6 flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/[.06] p-4 text-sm text-cyan-100"><Check /> واجهة اختيار تجريبية فقط — لا توجد معاملات مالية حقيقية.</div>}{category === 'gift-cards' && <div className="mb-6 rounded-2xl border border-amber-400/20 bg-amber-400/[.06] p-4 text-sm text-amber-100">الأسعار والقيم ثابتة من إعدادات المتجر ولا يمكن تعديلها يدويًا.</div>}<section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{items.map((item) => { const product = storeProducts.find((entry) => entry.slug === item.slug); if (category === 'gift-cards' && product?.digitalCardPackages) return product.digitalCardPackages.slice(0, 2).map((card) => <DigitalGiftCard key={card.id} productSlug={item.slug} card={card as DigitalGiftCardData} />); return <ProductCard key={item.slug} item={item} /> }).flat()}</section></>}</div></main>
}

export { meta as labels }
