'use client'

import Link from 'next/link'
import { CheckCircle2, ChevronLeft, CircleOff } from 'lucide-react'
import type { Game } from '@/lib/data'

export function GameCard({ game }: { game: Game }) {
  return <article className="group overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090d10] shadow-[0_0_24px_rgba(255,0,30,.08)] transition hover:-translate-y-1 hover:border-red-500/70">
    <div className="relative aspect-[1.45] overflow-hidden bg-zinc-900"><img src={game.image} alt={game.name} className="size-full object-cover object-center transition duration-500 group-hover:scale-105" /><div className="absolute inset-0 bg-gradient-to-t from-[#090d10] via-[#090d10]/20 to-transparent" /><span className={`absolute right-3 top-3 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-bold ${game.isAvailable ? 'border-emerald-400/40 bg-emerald-950/80 text-emerald-300' : 'border-red-400/40 bg-red-950/90 text-red-200'}`}>{game.isAvailable ? <CheckCircle2 className="size-3.5" /> : <CircleOff className="size-3.5" />}{game.isAvailable ? 'متاح' : 'غير متوفر'}</span></div>
    <div className="p-4" dir="rtl"><h2 className="text-lg font-black">{game.name}</h2><p className="mt-1 text-sm text-zinc-400">{game.description}</p>{game.isAvailable ? <Link href={`/store/games/${game.id}`} className="mt-4 flex items-center justify-center rounded-2xl bg-red-600 px-4 py-3 text-sm font-bold text-white shadow-[0_0_18px_rgba(255,0,30,.25)]">شحن الآن <ChevronLeft className="mr-2 size-4" /></Link> : <button type="button" disabled className="mt-4 flex h-12 w-full items-center justify-center rounded-2xl border border-red-500/40 bg-red-950/30 text-sm font-bold text-red-200">غير متوفر حاليًا</button>}</div>
  </article>
}
