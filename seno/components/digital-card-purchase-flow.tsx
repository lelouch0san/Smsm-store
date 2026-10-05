'use client'

import { useState } from 'react'
import { Check, FileText, LockKeyhole, Wallet } from 'lucide-react'
import type { DigitalCardPackage, StoreProduct } from '@/lib/data'

const walletBalance = 500

type Props = { product: StoreProduct; initialPackageId?: string }

export function DigitalCardPurchaseFlow({ product, initialPackageId }: Props) {
  const [selectedId, setSelectedId] = useState(initialPackageId ?? product.digitalCardPackages?.find((item) => item.available)?.id ?? '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState<{ orderId: string; pack: DigitalCardPackage } | null>(null)
  const selected = product.digitalCardPackages?.find((item) => item.id === selectedId)
  const canPay = Boolean(selected?.available && walletBalance >= (selected?.sellingPrice ?? 0))

  async function submit() {
    if (!selected || !selected.available || !canPay || loading) return
    setLoading(true)
    setError('')
    const response = await fetch('/api/purchases', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ productId: product.slug, packageId: selected.id, paymentMethod: 'wallet' }) })
    const result = await response.json().catch(() => null)
    setLoading(false)
    if (!response.ok) {
      setError(result?.message === 'Product is currently unavailable' ? 'هذه القيمة غير متوفرة حاليًا' : 'تعذر إنشاء الطلب، حاول مرة أخرى')
      return
    }
    setSuccess({ orderId: result.orderId ?? 'SNO-PENDING', pack: selected })
  }

  if (success) return <section className="rounded-3xl border border-emerald-400/50 bg-[#090d10] p-6 text-center shadow-[0_0_32px_rgba(52,211,153,.12)]"><div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-300"><Check className="size-8" /></div><h1 className="mt-5 text-2xl font-black">تم استلام طلبك بنجاح</h1><p className="mt-3 leading-7 text-zinc-300">سيتم التواصل معك وإرسال كود البطاقة الرقمية بعد تأكيد وتجهيز الطلب.</p><div className="mt-6 rounded-2xl border border-white/10 bg-white/[.03] p-5 text-right"><p className="text-sm text-zinc-400">رقم الطلب</p><strong className="text-lg text-amber-300">#{success.orderId}</strong><p className="mt-4 text-sm text-zinc-400">المنتج</p><strong>{product.name}</strong><p className="mt-4 text-sm text-zinc-400">القيمة</p><strong>{success.pack.denominationCurrency}{success.pack.denomination}</strong><p className="mt-4 text-sm text-zinc-400">الحالة</p><strong className="text-amber-300">جاري تجهيز الكود</strong></div><div className="mt-6 flex flex-col gap-3 sm:flex-row"><a href="/store" className="flex-1 rounded-2xl bg-red-600 px-5 py-3 font-bold">متابعة التسوق</a><a href="/orders" className="flex-1 rounded-2xl border border-white/15 px-5 py-3 font-bold">عرض طلباتي</a></div></section>

  return <div className="flex flex-col gap-5"><section className="rounded-3xl border border-red-600/60 bg-[#090d10] p-5 shadow-[0_0_22px_rgba(255,0,30,.07)]"><div className="grid gap-5 sm:grid-cols-[10rem_1fr] sm:items-center"><img src={product.imageUrl ?? '/images/category-gift-cards.png'} alt={product.name} className="mx-auto h-40 w-full max-w-[12rem] rounded-2xl object-cover" /><div><h1 className="text-3xl font-black">{product.name} Gift Card</h1><p className="mt-2 text-zinc-300">بطاقة رقمية يتم إرسال الكود الخاص بها بعد تأكيد الطلب</p>{selected?.region ? <p className="mt-3 text-sm text-amber-200">المنطقة: {selected.region} — تأكد من توافق منطقة حسابك</p> : null}</div></div></section><section className="rounded-3xl border border-white/10 bg-[#090d10] p-5"><h2 className="mb-4 text-xl font-black">اختر قيمة البطاقة</h2><div className="grid grid-cols-2 gap-3 sm:grid-cols-3">{product.digitalCardPackages?.map((pack) => <button key={pack.id} type="button" disabled={!pack.available} onClick={() => { setSelectedId(pack.id); setError('') }} className={`relative rounded-2xl border p-4 text-right transition ${selectedId === pack.id ? 'border-amber-300 bg-amber-400/10 shadow-[0_0_18px_rgba(245,158,11,.18)]' : 'border-white/10 bg-white/[.03]'} ${!pack.available ? 'opacity-45' : 'hover:border-red-400'}`}><span className="block text-sm text-zinc-400">{product.name}</span><strong className="mt-1 block text-xl">{pack.denominationCurrency}{pack.denomination}</strong><span className="mt-2 block font-bold text-amber-300">{pack.sellingPrice.toFixed(2)} {pack.sellingCurrency}</span>{pack.discount ? <span className="mt-2 inline-block rounded-full bg-red-600/20 px-2 py-1 text-xs text-red-200">خصم {pack.discount}%</span> : null}{!pack.available ? <span className="absolute inset-x-2 bottom-2 rounded bg-black/60 py-1 text-center text-xs text-zinc-300">غير متوفر</span> : null}{selectedId === pack.id && <span className="absolute left-2 top-2 grid size-6 place-items-center rounded-full bg-amber-300 text-black"><Check className="size-4" /></span>}</button>)}</div></section>{selected ? <><section className="rounded-3xl border border-white/10 bg-[#090d10] p-5"><h2 className="mb-4 flex items-center gap-2 text-xl font-black"><Wallet className="text-amber-300" />طريقة الدفع</h2><div className="rounded-2xl border border-emerald-400/50 bg-emerald-950/20 p-4"><div className="flex items-center justify-between gap-3"><span>رصيد المحفظة</span><strong className="text-amber-300">{walletBalance.toFixed(2)} EGP</strong></div><p className="mt-2 text-sm text-zinc-400">{canPay ? 'الرصيد كافٍ لإتمام الشراء' : `الرصيد غير كافٍ، تحتاج إلى ${(selected.sellingPrice - walletBalance).toFixed(2)} EGP إضافية`}</p></div></section><section className="rounded-3xl border border-white/10 bg-[#090d10] p-5"><h2 className="mb-4 flex items-center gap-2 text-xl font-black"><FileText className="text-amber-300" />مراجعة الطلب</h2><div className="space-y-3 text-sm"><div className="flex justify-between"><span className="text-zinc-400">المنتج</span><strong>{product.name} Gift Card</strong></div><div className="flex justify-between"><span className="text-zinc-400">القيمة</span><strong>{selected.denominationCurrency}{selected.denomination}</strong></div><div className="flex justify-between"><span className="text-zinc-400">الكمية</span><strong>1</strong></div><div className="flex justify-between border-t border-white/10 pt-3 text-lg"><span>الإجمالي</span><strong className="text-amber-300">{selected.sellingPrice.toFixed(2)} {selected.sellingCurrency}</strong></div></div></section><button type="button" onClick={submit} disabled={!canPay || loading} className="rounded-2xl bg-red-600 px-5 py-4 text-lg font-black shadow-[0_0_22px_rgba(220,38,38,.25)] disabled:cursor-not-allowed disabled:opacity-45">{loading ? 'جاري إنشاء الطلب...' : 'تأكيد الشراء'}</button>{error ? <p role="alert" className="rounded-2xl border border-red-400/40 bg-red-950/30 p-4 text-center text-sm text-red-200">{error}</p> : null}<p className="flex items-center justify-center gap-2 text-center text-xs text-zinc-500"><LockKeyhole className="size-3" />لن يظهر الكود إلا بعد تأكيد وتجهيز الطلب</p></> : null}</div>
}
