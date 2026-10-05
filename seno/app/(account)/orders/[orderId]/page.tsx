'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { Bell, Check, ChevronLeft, CircleUserRound, Copy, Gamepad2, LockKeyhole, MessageCircle, Wallet, Clock3, X } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'

const productImage = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'
const code = 'SENO-PUBG-660-7X4K'

function Header() {
  return <header className="flex items-center justify-between gap-3 py-5 sm:py-7" dir="ltr">
    <Link href="/orders" className="grid size-11 shrink-0 place-items-center rounded-2xl border border-white/10 bg-white/[.06] text-white transition hover:border-amber-400/50" aria-label="رجوع"><ChevronLeft className="rotate-180" /></Link>
    <SenoLogo className="w-32 sm:w-40" />
    <div className="flex items-center gap-3 text-amber-200"><Bell className="size-5" /><CircleUserRound className="size-6" /></div>
  </header>
}

function InfoRow({ label, children }: { label: string; children: ReactNode }) {
  return <div className="flex items-center justify-between gap-4 border-b border-white/[.07] py-3 last:border-0"><span className="text-sm text-zinc-500">{label}</span><b dir="auto" className="max-w-[62%] text-left text-sm text-zinc-100">{children}</b></div>
}

function StatusBadge() {
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3 py-1.5 text-sm font-bold text-emerald-300"><Check className="size-4" /> مقبول</span>
}

export default function OrderDetailsPage() {
  const [revealed, setRevealed] = useState(false)
  const [copied, setCopied] = useState(false)
  const copy = async () => { await navigator.clipboard?.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1600) }

  return <main className="min-h-screen bg-[#050506] pb-32 text-white" dir="rtl">
    <div className="mx-auto max-w-3xl px-5 sm:px-6"><Header />
      <div className="space-y-4 pb-8">
        <div className="flex items-end justify-between gap-3"><div><p className="text-sm text-zinc-500">طلب رقم</p><h1 className="mt-1 text-2xl font-black sm:text-3xl">تفاصيل الطلب</h1></div><span dir="ltr" className="text-sm font-bold text-zinc-400">#SNO-10482</span></div>

        <section className="rounded-2xl border border-emerald-400/20 bg-[#0b0f12] p-4 shadow-[0_0_24px_rgba(69,224,178,.06)]">
          <div className="flex items-center justify-between gap-3"><div><p className="text-xs text-zinc-500">الحالة الحالية</p><div className="mt-2"><StatusBadge /></div></div><div className="text-left text-sm font-bold text-amber-300"><Clock3 className="mb-1 ml-auto size-5" />مدة الاستجابة<br /><span className="text-xs text-zinc-400">2 دقيقة و0 ثانية</span></div></div>
          <div className="mt-4 grid grid-cols-4 gap-1 border-t border-white/[.07] pt-4 text-center text-[10px] text-zinc-500"><div className="text-emerald-300"><span className="mx-auto grid size-7 place-items-center rounded-full bg-emerald-400/15"><Check className="size-4" /></span><p className="mt-1">تم الإنشاء</p></div><div className="text-emerald-300"><span className="mx-auto grid size-7 place-items-center rounded-full bg-emerald-400/15"><Check className="size-4" /></span><p className="mt-1">تم الدفع</p></div><div className="text-emerald-300"><span className="mx-auto grid size-7 place-items-center rounded-full bg-emerald-400/15"><Check className="size-4" /></span><p className="mt-1">قيد التنفيذ</p></div><div className="text-amber-300"><span className="mx-auto grid size-7 place-items-center rounded-full bg-amber-400/15"><Check className="size-4" /></span><p className="mt-1">تم التنفيذ</p></div></div>
        </section>

        <section className="rounded-2xl border border-white/10 bg-[#0b0f12] p-4"><h2 className="mb-3 flex items-center gap-2 text-lg font-black"><Gamepad2 className="size-5 text-amber-300" /> المنتج</h2><div className="flex items-center gap-3"><img src={productImage} alt="PUBG Mobile" className="size-16 rounded-xl border border-white/10 object-cover" /><div><h3 className="font-bold">PUBG Mobile</h3><p className="mt-1 text-sm text-zinc-400">UC 660</p></div><strong dir="ltr" className="mr-auto text-lg text-amber-300">EGP 680.00</strong></div></section>

        <section className="rounded-2xl border border-white/10 bg-[#0b0f12] p-4"><h2 className="mb-1 text-lg font-black">تفاصيل الطلب</h2><InfoRow label="رقم العملية"><span dir="ltr">ID_SNO-10482</span></InfoRow><InfoRow label="المنتج">PUBG Mobile</InfoRow><InfoRow label="الباقة">UC 660</InfoRow><InfoRow label="الكمية">660 UC</InfoRow><InfoRow label="السعر الإجمالي"><span dir="ltr">EGP 680.00</span></InfoRow><InfoRow label="التاريخ"><span dir="ltr">19 سبتمبر 2026</span></InfoRow><InfoRow label="طريقة الدفع">Seno Balance</InfoRow></section>

        <section className="rounded-2xl border border-amber-400/30 bg-gradient-to-br from-amber-400/[.10] to-[#0b0f12] p-4"><div className="flex items-center gap-2"><LockKeyhole className="size-5 text-amber-300" /><div><h2 className="font-black">الكود الخاص بك</h2><p className="text-xs text-zinc-400">يظهر الكود بعد التحقق من طلبك.</p></div></div>{revealed ? <div className="mt-4 flex items-center gap-2"><code dir="ltr" className="flex-1 rounded-xl border border-amber-400/30 bg-black/40 px-3 py-3 text-center text-sm text-amber-200">{code}</code><button onClick={copy} className="grid size-11 place-items-center rounded-xl border border-amber-400/30 text-amber-300" aria-label="نسخ الكود"><Copy className="size-4" /></button></div> : <button onClick={() => setRevealed(true)} className="mt-4 h-12 w-full rounded-full bg-amber-300 font-bold text-black transition hover:bg-amber-200">إظهار الكود</button>}{copied && <p className="mt-2 text-center text-xs text-emerald-300">تم نسخ الكود</p>}</section>

        <section className="rounded-2xl border border-white/10 bg-[#0b0f12] p-4"><h2 className="mb-2 font-black">رد الدعم</h2><p className="text-sm leading-7 text-zinc-400">تم تنفيذ طلبك بنجاح. شكرًا لاستخدامك SENO STORE.</p></section>
        <div className="grid grid-cols-2 gap-3"><Link href="/store" className="flex h-12 items-center justify-center rounded-full bg-amber-300 font-bold text-black">شراء مرة أخرى</Link><button className="flex h-12 items-center justify-center gap-2 rounded-full border border-amber-400/40 bg-[#0b0f12] font-bold text-amber-200"><MessageCircle className="size-4" /> الدعم</button></div>
      </div>
    </div>
  </main>
}
