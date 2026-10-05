import Image from 'next/image'
import Link from 'next/link'
import { Check, LockKeyhole, ShoppingBag } from 'lucide-react'

export type DigitalGiftCardData = {
  id: string
  brand: string
  imageUrl: string
  denomination: number
  denominationCurrency: string
  sellingPrice: number
  sellingCurrency: string
  region?: string
  oldPrice?: number
  discount?: number
  available: boolean
}

export function DigitalGiftCard({ card, productSlug }: { card: DigitalGiftCardData; productSlug: string }) {
  return <article className={`overflow-hidden rounded-3xl border bg-[#090d10] transition ${card.available ? 'border-white/10 shadow-[0_0_24px_rgba(255,190,0,.08)] hover:-translate-y-1 hover:border-amber-400/60' : 'border-white/10 opacity-75'}`} dir="rtl">
    <div className="relative aspect-[1.65] overflow-hidden bg-zinc-900"><Image src={card.imageUrl} alt={`${card.brand} ${card.denominationCurrency}${card.denomination}`} fill sizes="(max-width: 640px) 50vw, 320px" className={`object-cover transition duration-500 ${card.available ? 'group-hover:scale-105' : 'grayscale opacity-60'}`} /><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/10" /><span className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold ${card.available ? 'border-emerald-400/40 bg-emerald-950/80 text-emerald-300' : 'border-red-400/40 bg-red-950/80 text-red-200'}`}>{card.available ? 'متاح' : 'غير متوفر'}</span>{card.discount ? <span className="absolute left-3 top-3 rounded-full bg-amber-300 px-2.5 py-1 text-[11px] font-black text-black">خصم {card.discount}%</span> : null}</div>
    <div className="p-4"><div className="flex items-start justify-between gap-2"><div><h2 className="font-black text-white">{card.brand}</h2><p className="mt-1 text-2xl font-black text-amber-300">{card.denominationCurrency}{card.denomination}</p>{card.region ? <p className="mt-1 text-xs text-zinc-400">المنطقة: {card.region}</p> : null}</div>{card.available ? <Check className="mt-1 size-5 text-emerald-300" /> : <LockKeyhole className="mt-1 size-5 text-red-300" />}</div><div className="mt-4 flex items-end justify-between gap-2"><div>{card.oldPrice ? <del className="block text-xs text-zinc-500">{card.oldPrice.toLocaleString('en-EG')} {card.sellingCurrency}</del> : null}<strong className="text-lg text-white">{card.sellingPrice.toLocaleString('en-EG')} <small className="text-xs text-amber-300">{card.sellingCurrency}</small></strong></div>{card.available ? <Link href={`/checkout?product=${productSlug}&package=${card.id}`} className="inline-flex items-center gap-1 rounded-xl bg-red-600 px-3 py-2 text-xs font-black text-white shadow-[0_0_14px_rgba(239,68,68,.3)]"><ShoppingBag className="size-3.5" />شراء البطاقة</Link> : <span className="rounded-xl border border-red-500/30 px-3 py-2 text-xs font-bold text-red-200">غير متوفر</span>}</div>{card.region ? <p className="mt-3 text-[11px] leading-5 text-zinc-500">تأكد من توافق منطقة حسابك مع البطاقة قبل الشراء.</p> : null}</div>
  </article>
}
