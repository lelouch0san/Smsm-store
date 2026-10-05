'use client'

import { useState } from 'react'
import { MessageCircle, X } from 'lucide-react'
import { senoBalanceCodeProducts, type SenoBalanceCodeProduct } from '@/lib/data'

const money = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' })

export function SenoBalanceCodesClient() {
  const [selected, setSelected] = useState<SenoBalanceCodeProduct | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')

  async function buyOnWhatsApp() {
    if (!selected) return
    setIsSubmitting(true)
    setError('')
    try {
      const response = await fetch('/api/purchases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: selected.id, senoCode: true }) })
      const result = await response.json().catch(() => null)
      if (!response.ok || !result?.success) throw new Error(result?.message || 'تعذر إنشاء الطلب، حاول مرة أخرى')
      const number = process.env.NEXT_PUBLIC_STORE_WHATSAPP_NUMBER?.replace(/\D/g, '')
      if (!number) throw new Error('رقم WhatsApp غير مُعد حاليًا')
      const message = `مرحبًا، أريد شراء كود سينو رصيد.\n\nالمنتج: ${selected.name}\nقيمة الكود: $${selected.denomination}\nالسعر: ${money.format(selected.price)}\nرقم المنتج: ${selected.sku}\nرقم الطلب: ${result.orderId}\n\nأرغب في إتمام عملية الشراء.`
      window.location.assign(`https://wa.me/${number}?text=${encodeURIComponent(message)}`)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : 'تعذر إنشاء الطلب، حاول مرة أخرى')
      setIsSubmitting(false)
    }
  }

  const activeProducts = senoBalanceCodeProducts.filter((product) => product.active)
  const availableProducts = activeProducts.filter((product) => product.available)

  return <main className="mx-auto min-h-screen max-w-5xl px-4 pb-28 pt-6" dir="rtl"><header className="mb-6 rounded-3xl border border-amber-400/25 bg-gradient-to-l from-red-950/50 via-zinc-950 to-amber-950/30 p-5 shadow-[0_0_28px_rgba(234,179,8,.08)]"><p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-amber-300">SENO DIGITAL GOODS</p><h1 className="text-3xl font-black text-white">أكواد سينو رصيد</h1><p className="mt-2 text-sm text-zinc-300">اشترِ كود رصيد سينو واستلمه بعد تأكيد الطلب</p></header>{availableProducts.length === 0 ? <section className="rounded-3xl border border-amber-400/20 bg-zinc-950 p-8 text-center"><h2 className="text-xl font-black text-white">لا توجد أكواد متاحة حاليًا</h2><p className="mt-2 text-sm text-zinc-400">سيتم إضافة أكواد جديدة قريبًا.</p></section> : <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4" aria-label="أكواد سينو رصيد">{activeProducts.map((product) => <article key={product.id} className="overflow-hidden rounded-2xl border border-amber-400/25 bg-zinc-950 shadow-[0_0_18px_rgba(239,68,68,.08)]"><div className="relative aspect-square bg-zinc-900"><img src={product.imageUrl} alt={product.name} className="size-full object-cover" loading="lazy" /><span className={`absolute right-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold ${product.available ? 'bg-emerald-500/90 text-white' : 'bg-red-950 text-red-200'}`}>{product.available ? 'متاح' : 'غير متوفر حاليًا'}</span></div><div className="p-3"><h2 className="text-sm font-black text-white">${product.denomination} SENO BALANCE</h2><p className="mt-1 text-xs text-zinc-400">{product.description}</p><p className="mt-3 text-lg font-black text-amber-300">{money.format(product.price)}</p><button type="button" disabled={!product.available} onClick={() => setSelected(product)} className="mt-3 w-full rounded-xl bg-gradient-to-l from-red-600 to-red-500 px-2 py-2 text-xs font-black text-white transition hover:from-amber-300 hover:to-amber-400 hover:text-black disabled:cursor-not-allowed disabled:opacity-40">{product.available ? 'شراء الكود' : 'غير متوفر حاليًا'}</button></div></article>)}</section>}{selected && <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 sm:items-center"><section role="dialog" aria-modal="true" aria-labelledby="seno-confirm-title" className="w-full max-w-md rounded-3xl border border-amber-400/30 bg-zinc-950 p-5 shadow-[0_0_40px_rgba(234,179,8,.15)]"><div className="flex items-center justify-between"><h2 id="seno-confirm-title" className="text-xl font-black text-white">تأكيد شراء كود سينو</h2><button type="button" onClick={() => setSelected(null)} aria-label="إغلاق" className="rounded-full p-2 text-zinc-400 hover:bg-white/10 hover:text-white"><X /></button></div><div className="mt-5 grid gap-3 rounded-2xl border border-white/10 bg-white/[.03] p-4 text-sm"><p className="flex justify-between text-zinc-300"><span>المنتج</span><strong className="text-white">SENO Balance Code</strong></p><p className="flex justify-between text-zinc-300"><span>قيمة الكود</span><strong className="text-amber-300">${selected.denomination}</strong></p><p className="flex justify-between text-zinc-300"><span>السعر</span><strong className="text-amber-300">{money.format(selected.price)}</strong></p></div><p className="mt-4 text-sm leading-6 text-zinc-400">سيتم التواصل معك عبر WhatsApp بعد إرسال طلب الشراء لتأكيد الدفع وتسليم كود الرصيد.</p>{error && <p role="alert" className="mt-3 rounded-xl border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}<div className="mt-5 grid gap-2"><button type="button" onClick={buyOnWhatsApp} disabled={isSubmitting} className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-l from-red-600 to-red-500 px-4 py-3 font-black text-white disabled:opacity-60"><MessageCircle />{isSubmitting ? 'جارٍ إنشاء الطلب...' : 'شراء عبر WhatsApp'}</button><button type="button" onClick={() => setSelected(null)} disabled={isSubmitting} className="rounded-xl border border-white/10 px-4 py-3 font-bold text-zinc-300">إلغاء</button></div></section></div>}</main>
}
