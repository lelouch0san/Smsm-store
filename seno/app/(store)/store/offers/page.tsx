'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Search, ShoppingBag } from 'lucide-react'
import { useMemo, useState } from 'react'
import { SidebarTrigger } from '@/components/global-sidebar'
import { SenoLogo } from '@/components/branding/seno-logo'
import { discountedProducts } from '@/lib/data'

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'
const categories = ['الكل', 'شحن الألعاب', 'تطبيقات الصوت', 'البطاقات الرقمية', 'خدمات أخرى'] as const
const sortOptions = ['الأكثر شعبية', 'أكبر خصم', 'الأقل سعرًا', 'الأعلى سعرًا', 'الأحدث'] as const

type Category = (typeof categories)[number]
type SortOption = (typeof sortOptions)[number]

function Header() {
  return <header className="flex items-center justify-between gap-3 py-5 sm:py-8" dir="ltr"><Link href="/store" aria-label="العودة للمتجر" className="grid size-11 place-items-center rounded-2xl border border-white/10 bg-white/[.06] text-white"><ShoppingBag /></Link><SenoLogo className="w-40" /><SidebarTrigger /></header>
}

function OfferCard({ product }: { product: typeof discountedProducts[number] }) {
  return <article className="overflow-hidden rounded-2xl border border-amber-600/60 bg-zinc-950 shadow-[0_0_16px_rgba(255,190,0,.06)] transition hover:-translate-y-1 hover:border-amber-300/80" dir="rtl"><div className="relative h-36 overflow-hidden bg-zinc-900"><Image src={artwork} alt={product.name} fill sizes="(max-width: 640px) 50vw, 260px" className="object-cover opacity-90" style={{ objectPosition: product.imagePosition }} /><span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-black text-white ${product.isAvailable ? 'bg-emerald-600' : 'bg-red-950 border border-red-500/70'}`}>{product.isAvailable ? `متاح · خصم ${product.discountPercentage}%` : 'غير متوفر'}</span></div><div className="p-3"><h2 className="font-bold text-white">{product.name}</h2><p className="mt-1 text-sm text-zinc-300">{product.detail}</p><p className="mt-2 text-xs text-zinc-500">{product.category}</p><div className="mt-3 flex items-end justify-between gap-2"><div><del className="block text-xs text-zinc-500">{product.oldPrice} EGP</del><strong className="text-lg text-amber-300">{product.price} EGP</strong></div>{product.isAvailable ? <Link href={`/checkout?product=${encodeURIComponent(product.slug)}`} className="rounded-xl bg-gradient-to-l from-red-600 to-red-500 px-3 py-2 text-sm font-black text-white shadow-[0_0_16px_rgba(239,68,68,.3)] transition hover:from-amber-300 hover:to-amber-400 hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">اشترِ الآن</Link> : <button type="button" onClick={() => window.alert('هذا المنتج غير متوفر حاليًا')} className="rounded-xl border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm font-black text-zinc-400">غير متوفر</button>}</div></div></article>
}

export default function OffersPage() {
  const [category, setCategory] = useState<Category>('الكل')
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState<SortOption>('الأكثر شعبية')
  const products = useMemo(() => { const filtered = discountedProducts.filter((product) => (category === 'الكل' || product.category === category) && `${product.name} ${product.detail} ${product.category}`.toLowerCase().includes(query.toLowerCase())); return [...filtered].sort((a, b) => sort === 'أكبر خصم' ? b.discountPercentage - a.discountPercentage : sort === 'الأقل سعرًا' ? a.price - b.price : sort === 'الأعلى سعرًا' ? b.price - a.price : 0) }, [category, query, sort])

  return <main className="min-h-screen bg-[#050506] pb-24 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><Header /><div className="flex flex-col gap-6"><section><p className="text-sm font-bold text-red-400">SENO STORE</p><h1 className="mt-1 text-3xl font-black text-amber-300 sm:text-4xl">العروض المميزة</h1><p className="mt-2 text-zinc-400">اكتشف جميع المنتجات المتاحة حاليًا بأسعار خاصة</p></section><div className="flex h-12 items-center gap-3 rounded-full border border-white/15 bg-white/[.035] px-4"><Search className="size-5 shrink-0 text-zinc-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="ابحث في العروض..." aria-label="ابحث في العروض" className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" /></div><div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1" role="tablist" aria-label="تصفية العروض">{categories.map((item) => <button key={item} type="button" role="tab" aria-selected={category === item} onClick={() => setCategory(item)} className={`shrink-0 rounded-full border px-4 py-2 text-sm font-bold transition ${category === item ? 'border-red-500 bg-red-600 text-white' : 'border-white/10 bg-zinc-950 text-zinc-300 hover:border-amber-400/60'}`}>{item}</button>)}</div><label className="flex items-center gap-3 text-sm text-zinc-400">ترتيب حسب<select value={sort} onChange={(event) => setSort(event.target.value as SortOption)} className="rounded-xl border border-white/15 bg-zinc-950 px-3 py-2 text-white outline-none">{sortOptions.map((item) => <option key={item}>{item}</option>)}</select></label>{products.length > 0 ? <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">{products.map((product) => <OfferCard key={product.slug} product={product} />)}</div> : <section className="rounded-3xl border border-white/10 bg-zinc-950 p-10 text-center"><h2 className="text-xl font-black text-white">لا توجد عروض متاحة حاليًا</h2><p className="mt-2 text-zinc-400">سنضيف عروضًا جديدة قريبًا، تابعنا باستمرار.</p></section>}</div></div></main>
}
