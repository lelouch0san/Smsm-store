'use client'

import Link from 'next/link'
import { ArrowRight, Heart, Minus, Plus, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { mockCatalog, type CatalogItem } from '@/components/store-category-page'

export type SubscriptionProduct = { slug: string; name: string; description: string; detail: string; price: string; image: string; available?: boolean; requiresAccount?: boolean; quantity?: number }

const subscriptionProducts: SubscriptionProduct[] = (mockCatalog.subscriptions ?? []).map((product: CatalogItem) => ({ ...product, requiresAccount: true }))

function PurchaseModal({ product, onClose }: { product: SubscriptionProduct; onClose: () => void }) {
  const [account, setAccount] = useState('')
  const [quantity, setQuantity] = useState(product.quantity ?? 1)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const price = Number(product.price.replace(/[^\d.]/g, '')) || 0
  const total = price * quantity
  const canBuy = product.available !== false && (!product.requiresAccount || account.trim().length >= 3)

  useEffect(() => { document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = '' } }, [])
  useEffect(() => { const onKey = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', onKey); return () => window.removeEventListener('keydown', onKey) }, [onClose])

  async function purchase() {
    if (!canBuy) { setError(product.requiresAccount ? 'أدخل الإيميل أو الحساب أولاً.' : 'هذا المنتج غير متوفر حالياً.'); return }
    setSubmitting(true); setError('')
    const response = await fetch('/api/purchases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ productId: product.slug, accountData: { account: account.trim(), quantity, totalPrice: total } }) }).catch(() => null)
    const result = await response?.json().catch(() => null)
    if (!response?.ok || !result?.success) { setError(result?.message ?? 'تعذر إنشاء الطلب، حاول مرة أخرى.'); setSubmitting(false); return }
    setSuccess(result.orderId ? `رقم الطلب: #${result.orderId}` : 'تم إنشاء طلبك بنجاح'); setSubmitting(false)
  }

  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-3 backdrop-blur-sm sm:items-center" onClick={onClose}><div className="max-h-[92svh] w-full max-w-md overflow-y-auto rounded-[28px] border border-amber-300/25 bg-[#0b0f12] p-5 shadow-[0_0_44px_rgba(245,197,66,.14)]" role="dialog" aria-modal="true" aria-labelledby="subscription-purchase-title" onClick={(event) => event.stopPropagation()}>{success ? <div className="py-10 text-center"><div className="mx-auto grid size-16 place-items-center rounded-full bg-emerald-400 text-black">✓</div><h2 className="mt-5 text-2xl font-black text-white">تم إنشاء طلبك بنجاح</h2><p className="mt-3 text-sm text-zinc-300">تم استلام طلب شراء {product.name}.</p><p className="mt-3 text-xs text-amber-200">{success}</p><button type="button" onClick={onClose} className="mt-7 h-13 w-full rounded-2xl bg-gradient-to-r from-red-600 to-red-500 font-black text-white">حسنًا</button></div> : <><div className="flex items-start justify-between gap-3"><div className="flex items-center gap-3"><img src={product.image} alt="" className="size-16 rounded-2xl object-cover" /><div><h2 id="subscription-purchase-title" className="font-black text-white">{product.name}</h2><p className="mt-1 text-xs text-zinc-400">{product.detail}</p></div></div><div className="flex gap-1"><button type="button" aria-label="إضافة للمفضلة" className="rounded-full p-2 text-rose-300 hover:bg-white/10"><Heart /></button><button type="button" onClick={onClose} aria-label="إغلاق" className="rounded-full p-2 text-zinc-400 hover:bg-white/10"><X /></button></div></div><div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4"><span className="text-xs text-zinc-400">السعر</span><strong className="mt-1 block text-2xl font-black text-amber-300">{price.toLocaleString('en-US')} EGP</strong></div>{product.requiresAccount && <label className="mt-5 block text-sm font-bold text-white" htmlFor="subscription-account">الإيميل أو الحساب<input id="subscription-account" value={account} onChange={(event) => setAccount(event.target.value)} placeholder="أدخل الإيميل أو الحساب" className="mt-2 h-14 w-full rounded-2xl border border-white/15 bg-black/30 px-4 text-white outline-none focus:border-amber-300" /></label>}{(product.quantity ?? 1) > 1 && <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 p-3"><span className="text-sm font-bold text-white">الكمية</span><div className="flex items-center gap-4"><button type="button" onClick={() => setQuantity(Math.max(1, quantity - 1))} className="grid size-10 place-items-center rounded-xl bg-white/10"><Minus /></button><strong>{quantity}</strong><button type="button" onClick={() => setQuantity(quantity + 1)} className="grid size-10 place-items-center rounded-xl bg-white/10"><Plus /></button></div></div>}<div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4"><span className="text-sm text-zinc-400">الإجمالي</span><strong className="text-xl text-amber-300">{total.toLocaleString('en-US')} EGP</strong></div>{error && <p className="mt-3 text-sm text-red-300">{error}</p>}<div className="mt-6 grid grid-cols-2 gap-3"><button type="button" onClick={onClose} className="h-13 rounded-2xl border border-white/15 font-bold text-zinc-300">إلغاء</button><button type="button" onClick={purchase} disabled={!canBuy || submitting} className="h-13 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 font-black text-black disabled:cursor-not-allowed disabled:opacity-50">{submitting ? 'جارٍ الإرسال...' : 'شراء'}</button></div></>}</div></div>
}

export function SubscriptionsStorePage() {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<SubscriptionProduct | null>(null)
  const products = useMemo(() => subscriptionProducts.filter((product) => `${product.name} ${product.description}`.toLowerCase().includes(query.toLowerCase())), [query])
  return <main className="min-h-screen bg-[#050506] pb-32 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-5 sm:px-6"><header className="flex items-center justify-between gap-4 py-6"><Link href="/store" className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-sm text-zinc-200"><ArrowRight />العودة إلى المتجر</Link><SenoLogo className="w-36" /></header><div className="mb-6"><h1 className="text-3xl font-black">الاشتراكات</h1><p className="mt-2 text-sm text-zinc-400">اشتراكاتك المفضلة للترفيه والإنتاجية</p></div><label className="mb-6 flex h-14 items-center gap-3 rounded-2xl border border-white/15 bg-white/[.04] px-4"><Search className="text-amber-300" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="بحث" aria-label="بحث عن اشتراك" className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-zinc-500" /></label><section className="grid grid-cols-2 gap-3">{products.map((product) => { const available = product.available !== false; return <button key={product.slug} type="button" disabled={!available} onClick={() => setSelected(product)} className="group overflow-hidden rounded-3xl border border-white/10 bg-[#0a0b0f] text-right transition hover:-translate-y-0.5 hover:border-amber-300/50 disabled:cursor-not-allowed"><div className="relative aspect-[1.12] overflow-hidden bg-black"><img src={product.image} alt={product.name} loading="lazy" className="size-full object-cover transition duration-300 group-hover:scale-105" /><span className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[10px] font-bold ${available ? 'bg-emerald-600/90 text-white' : 'bg-red-950/90 text-red-200'}`}>{available ? 'متوفر' : 'غير متوفر'}</span></div><div className="p-3"><strong className="block truncate text-sm text-white">{product.name}</strong><span className="mt-1 block text-xs text-zinc-400">{product.detail}</span><span className="mt-2 block text-sm font-black text-amber-300">{product.price}</span></div></button>})}</section></div>{selected && <PurchaseModal product={selected} onClose={() => setSelected(null)} />}</main>
}

export { subscriptionProducts }
