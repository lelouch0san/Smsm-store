import Link from 'next/link'
import { Check, ChevronLeft, LockKeyhole } from 'lucide-react'
import type { GamePackage } from '@/lib/data'

type Props = {
  gameId: string
  package: GamePackage
  selected?: boolean
  gameAvailable: boolean
}

export function GameRechargePackageCard({ gameId, package: item, selected = false, gameAvailable }: Props) {
  const available = gameAvailable && item.isAvailable
  return (
    <article className={`group overflow-hidden rounded-[1.4rem] border bg-[#090d10] transition ${selected ? 'border-amber-300 shadow-[0_0_0_1px_rgba(252,211,77,.35),0_0_28px_rgba(245,158,11,.18)]' : 'border-white/10 hover:-translate-y-1 hover:border-red-500/60'} ${!available ? 'opacity-75' : ''}`}>
      <div className="relative aspect-[1.35] overflow-hidden bg-[#11151a]">
        <img src={item.imageUrl} alt={`${item.amount.toLocaleString('en-US')} ${item.unit}`} className={`size-full object-cover transition duration-500 ${available ? 'group-hover:scale-105' : 'grayscale brightness-50'}`} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d10] via-transparent to-transparent" />
        <span className={`absolute right-3 top-3 rounded-full border px-2.5 py-1 text-[11px] font-bold ${available ? 'border-emerald-400/40 bg-emerald-950/80 text-emerald-300' : 'border-red-400/40 bg-red-950/80 text-red-200'}`}>{available ? 'متاح' : 'غير متوفر'}</span>
        {selected && <span className="absolute left-3 top-3 flex size-7 items-center justify-center rounded-full bg-amber-300 text-black"><Check className="size-4" /></span>}
      </div>
      <div className="p-3.5" dir="rtl">
        <p className="text-lg font-black text-white">{item.amount.toLocaleString('en-US')} <span className="text-xs font-bold text-zinc-400">{item.unit}</span></p>
        <div className="mt-1 flex items-end justify-between gap-2"><div><p className="text-base font-black text-amber-300">{item.price.toLocaleString('en-EG')} {item.currency}</p>{item.oldPrice && <p className="text-xs text-zinc-500 line-through">{item.oldPrice.toLocaleString('en-EG')} {item.currency}</p>}</div>{item.discount && <span className="rounded-md bg-red-600/20 px-1.5 py-1 text-[10px] font-bold text-red-200">خصم {item.discount}%</span>}</div>
        {available ? <Link href={`/store/games/${gameId}/topup?package=${item.id}`} className="mt-3 flex h-10 items-center justify-center rounded-xl bg-red-600 px-2 text-xs font-bold text-white transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">اختيار الباقة <ChevronLeft className="mr-1 size-3.5" /></Link> : <span className="mt-3 flex h-10 items-center justify-center rounded-xl border border-red-500/30 text-xs font-bold text-red-200"><LockKeyhole className="ml-1 size-3.5" />غير متوفر</span>}
      </div>
    </article>
  )
}
