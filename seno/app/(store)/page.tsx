'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { LockKeyhole, Search, X } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { SidebarTrigger } from '@/components/global-sidebar'

const heroSlides = [
  { image: '/images/home-banner-new.png', alt: 'بانر SENO STORE السينمائي مع الألعاب والبطاقات والخدمات الرقمية', position: 'center' },
]

type Category = { label: string; description?: string; href: string; image: string; accent: string; status?: 'active' | 'coming_soon'; unavailableMessage?: string }
const categories: Category[] = [
  { label: 'شحن الألعاب', href: '/store/games', image: '/images/category-games.png', accent: 'border-red-500/80' },
  { label: 'تطبيقات الصوت', href: '/store/apps', image: '/images/category-apps.png', accent: 'border-blue-500/80' },
  { label: 'البطاقات الرقمية', href: '/store/gift-cards', image: '/images/category-gift-cards.png', accent: 'border-fuchsia-500/80' },
  { label: 'خدمات أخرى', href: '/store/services', image: '/images/category-services.png', accent: 'border-amber-400/80' },
  { label: 'أكواد سينو رصيد', description: 'رصيد رقمي مسبق الدفع', href: '/user/products/seno-codes', image: '/images/category-balance-codes-uploaded.png', accent: 'border-amber-300/90', status: 'active' },
  { label: 'سحب الأموال', description: 'خدمات سحب وتحويل الأموال', href: '/store/withdraw', image: '/images/category-withdraw-uploaded.png', accent: 'border-emerald-400/80', status: 'active' },
  { label: 'التسوق', description: 'منتجات التسوق الرقمية', href: '/store/shopping', image: '/images/category-shopping-uploaded.png', accent: 'border-orange-400/80', status: 'coming_soon', unavailableMessage: 'قسم التسوق غير متاح حاليًا. نعمل على تجهيز منتجات الألعاب والمفاتيح الرقمية والمزيد.' },
  { label: 'الاشتراكات', description: 'اشتراكاتك المفضلة', href: '/store/subscriptions', image: '/images/category-subscriptions-uploaded.png', accent: 'border-violet-400/80', status: 'coming_soon', unavailableMessage: 'قسم الاشتراكات غير متاح حاليًا. نعمل على تجهيز اشتراكات المنصات والخدمات الرقمية.' },
  { label: 'العملات الرقمية', description: 'شراء وبيع العملات الرقمية', href: '/store/crypto', image: '/images/category-crypto-uploaded.png', accent: 'border-cyan-400/80', status: 'coming_soon', unavailableMessage: 'قسم العملات الرقمية غير متاح حاليًا. نعمل على تجهيز خدمات شراء وبيع العملات الرقمية.' },
  { label: 'يوزرات سوشيال ميديا', description: 'خدمات وحسابات السوشيال ميديا', href: '/store/social', image: '/images/category-social-uploaded.png', accent: 'border-rose-400/80', status: 'coming_soon', unavailableMessage: 'قسم اليوزرات غير متاح حاليًا. نعمل على تجهيز الحسابات واليوزرات الرقمية.' },
]

function HomeHeader({ onMenu }: { onMenu: () => void }) {
  return <header className="flex items-center justify-between gap-3 py-5 sm:py-7" dir="ltr">
    <Link href="/" className="flex items-center gap-2" aria-label="Seno Store home">
<SenoLogo className="w-40 sm:w-48" />
    </Link>
    <div className="flex items-center gap-2">
      <SidebarTrigger />
    </div>
  </header>
}

function Hero() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const touchStart = useRef<number | null>(null)

  useEffect(() => {
    if (isPaused) return
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 5500)
    return () => window.clearInterval(timer)
  }, [isPaused])

  useEffect(() => {
    const handleVisibility = () => setIsPaused(document.hidden)
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [])

  const goToSlide = (index: number) => {
    setActiveSlide(index)
    setIsPaused(true)
    window.setTimeout(() => setIsPaused(false), 7000)
  }

  const goNext = () => goToSlide((activeSlide + 1) % heroSlides.length)
  const goPrevious = () => goToSlide((activeSlide - 1 + heroSlides.length) % heroSlides.length)

  return <section className="relative aspect-[1536/491] w-full overflow-hidden rounded-3xl border border-red-500/80 bg-black shadow-[0_0_24px_rgba(239,68,68,.12)]" dir="rtl" aria-roledescription="carousel" aria-label="عروض SENO STORE" tabIndex={0} onKeyDown={(event) => { if (event.key === 'ArrowLeft') goNext(); if (event.key === 'ArrowRight') goPrevious() }} onTouchStart={(event) => { touchStart.current = event.touches[0].clientX }} onTouchEnd={(event) => { if (touchStart.current === null) return; const delta = event.changedTouches[0].clientX - touchStart.current; if (Math.abs(delta) > 40) delta > 0 ? goPrevious() : goNext(); touchStart.current = null }}>
    {heroSlides.map((slide, index) => <Image key={slide.image} src={slide.image} alt={slide.alt} fill priority={index === 0} sizes="(max-width: 640px) calc(100vw - 32px), 976px" className={`object-cover transition duration-1000 ease-out ${index === activeSlide ? 'scale-[1.02] opacity-100' : 'scale-100 opacity-0'}`} style={{ objectPosition: slide.position }} />)}
    <div className="relative flex h-full items-end p-3 sm:p-5">
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2" role="group" aria-label="اختيار شريحة الهيرو">{heroSlides.map((slide, index) => <button key={slide.image} type="button" aria-label={`الانتقال إلى الشريحة ${index + 1}`} aria-current={index === activeSlide} onClick={() => goToSlide(index)} onFocus={() => setIsPaused(true)} className={`rounded-full transition-all ${index === activeSlide ? 'h-2.5 w-7 bg-amber-300' : 'size-2.5 bg-white/35 hover:bg-white/70'}`} />)}</div>
    </div>
  </section>
}

const announcements = ['عروض حصرية وأسعار تنافسية', 'شحن فوري وآمن', 'منتجات رقمية متنوعة', 'طرق دفع متعددة', 'معاملات آمنة وسريعة', 'خدمة سريعة على مدار الساعة']

function AnnouncementTicker() {
  const items = [...announcements, ...announcements]
  return <section className="overflow-hidden rounded-2xl border border-red-500/30 bg-gradient-to-l from-red-950/40 via-black to-amber-950/20 py-2.5 shadow-[0_0_20px_rgba(239,68,68,.08)]" dir="rtl" aria-label="إعلانات SENO STORE"><div className="flex w-max animate-[ticker_28s_linear_infinite] items-center gap-8 whitespace-nowrap px-4 text-xs font-bold text-zinc-200 sm:text-sm">{items.map((message, index) => <span key={`${message}-${index}`} className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-amber-300 shadow-[0_0_8px_rgba(253,224,71,.8)]" />{message}</span>)}</div><style jsx>{`@keyframes ticker { from { transform: translateX(0); } to { transform: translateX(50%); } } @media (prefers-reduced-motion: reduce) { div { animation-play-state: paused; } }`}</style></section>
}

function ComingSoonCategoryModal({ category, onClose }: { category: Category; onClose: () => void }) {
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center" role="presentation" onClick={onClose}><div className="w-full max-w-sm rounded-3xl border border-amber-300/25 bg-[#0b0f12] p-6 text-center shadow-[0_0_40px_rgba(245,197,66,.14)]" role="dialog" aria-modal="true" aria-labelledby="coming-soon-title" onClick={(event) => event.stopPropagation()}><button type="button" onClick={onClose} aria-label="إغلاق" className="absolute right-5 top-5 rounded-full p-2 text-zinc-400 hover:bg-white/10"><X className="size-5" /></button><span className="mx-auto grid size-16 place-items-center rounded-full border border-amber-300/40 bg-amber-300/10 text-amber-300"><LockKeyhole className="size-7" /></span><h2 id="coming-soon-title" className="mt-5 text-2xl font-black text-white">{category.label}</h2><p className="mt-3 text-sm leading-7 text-zinc-300">هذا القسم غير متاح حاليًا.<br />{category.unavailableMessage?.split('. ').slice(1).join('. ')}</p><button type="button" onClick={onClose} className="mt-6 h-13 w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 font-black text-white shadow-[0_0_22px_rgba(229,9,20,.22)]">حسنًا</button></div></div>
}

function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null)
  return <section dir="rtl"><div className="mb-4"><h2 className="text-xl font-black text-white sm:text-2xl">استكشف الأقسام</h2><p className="mt-1 text-sm text-zinc-400">كل ما تحتاجه في مكان واحد</p></div><div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{categories.map((category) => { const card = <><img src={category.image} alt="" aria-hidden="true" loading="lazy" className={`absolute inset-0 size-full object-cover object-center transition duration-300 group-hover:scale-105 ${category.status === 'coming_soon' ? 'opacity-75 saturate-75' : 'opacity-90 group-hover:opacity-100'}`} /><span className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/35 to-black/5" />{category.status === 'coming_soon' && <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full border border-amber-300/40 bg-black/70 px-2 py-1 text-[10px] font-bold text-amber-200"><LockKeyhole className="size-3" /> غير متاح حالياً</span>}<span className="relative mt-auto w-full p-3"><strong className="block text-sm font-bold text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.9)]">{category.label}</strong>{category.description && <small className="mt-1 block text-[10px] leading-4 text-zinc-300">{category.description}</small>}</span></> ; return category.status === 'coming_soon' ? <button type="button" key={category.href} onClick={() => setSelectedCategory(category)} className={`group relative isolate flex min-h-36 overflow-hidden rounded-2xl border bg-black text-center transition hover:-translate-y-0.5 ${category.accent}`}>{card}</button> : <Link href={category.href} key={category.href} className={`group relative isolate flex min-h-36 overflow-hidden rounded-2xl border bg-black text-center transition hover:-translate-y-0.5 ${category.accent}`}>{card}</Link> })}</div>{selectedCategory && <ComingSoonCategoryModal category={selectedCategory} onClose={() => setSelectedCategory(null)} />}</section>
}

export default function Page() {
  return <main className="min-h-screen bg-[#050506] pb-24 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-5 sm:px-6"><HomeHeader onMenu={() => {}} /><div className="flex flex-col gap-8 pb-8"><Hero /><AnnouncementTicker /><label className="flex h-14 items-center gap-3 rounded-full border border-white/15 bg-white/[.035] px-5 text-zinc-400" aria-label="البحث عن منتج أو فئة"><Search className="size-6 shrink-0" /><input className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500" placeholder="ابحث عن منتج أو فئة..." /></label><Categories /></div></div></main>
}
