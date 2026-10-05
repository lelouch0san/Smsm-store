'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown, ChevronLeft, Search, Wallet } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { SidebarTrigger } from '@/components/global-sidebar'
const banners = [
  { title: 'شحن الألعاب', desc: 'اشحن حساباتك في جميع الألعاب الشهيرة', count: '+50 لعبة', cta: 'استكشف الألعاب', href: '/store/games', image: '/images/category-games.png', alt: 'بنر شحن الألعاب مع يد تحكم وبطاقات ألعاب', tone: 'border-red-600/80' },
  { title: 'شحن التطبيقات', desc: 'اشحن رصيدك في أفضل التطبيقات', count: '+30 تطبيق', cta: 'استكشف التطبيقات', href: '/store/apps', image: '/images/category-apps.png', alt: 'بنر شحن التطبيقات وبطاقات المنصات الرقمية', tone: 'border-amber-500/70' },
  { title: 'البطاقات الرقمية', desc: 'بطاقاتك الرقمية بأمان وسرعة', count: '+100 بطاقة', cta: 'تصفح البطاقات', href: '/store/gift-cards', image: '/images/category-gift-cards.png', alt: 'بنر البطاقات الرقمية وبطاقات الهدايا', tone: 'border-amber-500/70' },
  { title: 'خدمات أخرى', desc: 'خدمات متنوعة تناسب احتياجاتك', count: '+20 خدمة', cta: 'استكشف الخدمات', href: '/store/services', image: '/images/category-services.png', alt: 'بنر الخدمات الرقمية والتحويلات والدفع', tone: 'border-red-600/80' },
]

function Header({ onMenu }: { onMenu: () => void }) {
  return <header className="flex flex-col gap-6 pt-5 sm:pt-8"><div className="flex items-center justify-between gap-3" dir="ltr"><SenoLogo className="w-40" /><div className="flex items-center gap-2 sm:gap-5"><div className="hidden items-center gap-3 rounded-full border border-red-500/60 bg-white/[0.04] px-5 py-3 text-lg sm:flex"><Wallet className="text-amber-300" />500.00 EGP<ChevronDown className="size-4 text-amber-400" /></div><SidebarTrigger /></div></div><label className="flex h-16 items-center gap-4 rounded-full border border-white/35 bg-white/[0.045] px-6 text-zinc-400" dir="rtl"><input aria-label="البحث" className="min-w-0 flex-1 bg-transparent text-base text-white outline-none placeholder:text-zinc-400 sm:text-lg" placeholder="إبحث عن لعبة أو تطبيق أو بطاقة رقمية..." /><Search className="size-7 shrink-0" /></label></header>
}

function CategoryBanner({ item }: { item: typeof banners[number] }) {
  return <article className={`group relative aspect-[2/1] min-h-44 overflow-hidden rounded-3xl border ${item.tone} bg-black shadow-[0_12px_35px_rgba(0,0,0,.35)]`} dir="rtl"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 640px) calc(100vw - 32px), 960px" className="object-cover object-center transition duration-300 ease-out group-hover:scale-[1.025]" /><div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/45 to-black/10" /><div className="relative flex h-full flex-col items-start justify-center gap-2 px-5 py-5 sm:px-10"><span className="text-sm font-semibold text-amber-300">{item.count}</span><h2 className="text-2xl font-black text-white drop-shadow-[0_2px_8px_rgba(0,0,0,.8)] sm:text-3xl">{item.title}</h2><p className="max-w-[75%] text-sm text-zinc-200 sm:text-base">{item.desc}</p><Link href={item.href} className="mt-2 rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-[0_0_18px_rgba(255,0,30,.35)] transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">{item.cta}<ChevronLeft className="mr-2 inline size-4" /></Link></div></article>
}

export default function StorePage() {
  return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><Header onMenu={() => {}} /><div className="flex flex-col gap-7 py-7"><section className="grid gap-5">{banners.map((item) => <CategoryBanner key={item.title} item={item} />)}</section><section className="relative overflow-hidden rounded-3xl border border-red-600 bg-black px-6 py-6 text-center shadow-[0_0_24px_rgba(255,0,30,.2)]"><Image src="/images/offers-exclusive.png" alt="عروض حصرية من SENO STORE" fill sizes="(max-width: 640px) calc(100vw - 32px), 960px" className="object-cover object-center opacity-60" /><div className="relative"><h2 className="text-2xl font-black text-white">عروض وخصومات حصرية</h2><p className="mt-1 text-sm text-zinc-200">لا تفوت أفضل العروض على جميع المنتجات</p></div><Link href="/store/offers" className="relative mx-auto mt-3 inline-flex h-11 w-44 items-center justify-center rounded-full bg-red-600 px-4 text-base font-bold transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">شاهد العروض <ChevronLeft className="mr-1 size-4" /></Link></section></div></div></main>
}
