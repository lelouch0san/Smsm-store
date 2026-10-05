'use client'

import { Crown, History, Shield, Sparkles } from 'lucide-react'
import { formatUSD, getLevelProgress, type LevelHistoryEntry } from '@/lib/loyalty-levels'

export function SenoLevelCard({ totalSpentUSD = 0, lifetimeOrders = 0, history = [] }: { totalSpentUSD?: number; lifetimeOrders?: number; history?: LevelHistoryEntry[] }) {
  const { currentLevel, nextLevel, progressPercent, remainingAmountUSD } = getLevelProgress(totalSpentUSD)

  return <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#181006] via-[#0b0d10] to-[#090d10] p-5 shadow-[0_0_25px_rgba(245,158,11,.1)] sm:p-6" aria-labelledby="seno-level-title">
    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
      <div className="flex items-start gap-4">
        <div className="grid size-16 shrink-0 place-items-center rounded-2xl border border-amber-300/60 bg-amber-400/10 text-amber-300"><Crown className="size-8" aria-hidden="true" /></div>
        <div><p id="seno-level-title" className="text-xs font-bold uppercase tracking-[.22em] text-amber-300">Seno Level</p><h2 className="mt-2 text-2xl font-black text-white">Level {currentLevel.level} <span className="text-amber-300">• {currentLevel.name}</span></h2><p className="mt-1 text-sm text-zinc-400">{currentLevel.description}</p></div>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:min-w-64"><div className="rounded-2xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-zinc-500">الإنفاق مدى الحياة</p><p className="mt-1 font-black text-amber-300">{formatUSD(totalSpentUSD)}</p></div><div className="rounded-2xl border border-white/10 bg-black/20 p-3"><p className="text-xs text-zinc-500">الطلبات المكتملة</p><p className="mt-1 font-black text-white">{lifetimeOrders}</p></div></div>
    </div>
    <div className="mt-6"><div className="flex items-center justify-between gap-3 text-sm"><span className="text-zinc-300">{nextLevel ? `التقدم نحو ${nextLevel.name}` : 'MAX LEVEL'}</span><span className="font-bold text-amber-300">{Math.round(progressPercent)}%</span></div><div className="mt-3 h-3 overflow-hidden rounded-full bg-white/10"><div className="h-full rounded-full bg-gradient-to-l from-amber-300 to-red-500 transition-[width]" style={{ width: `${progressPercent}%` }} /></div>{nextLevel ? <p className="mt-3 text-sm text-zinc-400">{formatUSD(remainingAmountUSD)} متبقية للوصول إلى Level {nextLevel.level}</p> : <p className="mt-3 text-sm font-bold text-amber-200">Seno Legend — وصلت إلى أعلى مستوى</p>}</div>
    <div className="mt-6 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-2"><div><div className="flex items-center gap-2 text-sm font-bold text-white"><Sparkles className="size-4 text-amber-300" />مزايا المستوى</div><ul className="mt-2 grid gap-1 text-sm text-zinc-400">{currentLevel.benefits.map(benefit => <li key={benefit.label}>• {benefit.label}</li>)}</ul></div><div><div className="flex items-center gap-2 text-sm font-bold text-white"><History className="size-4 text-amber-300" />سجل المستويات</div>{history.length ? <p className="mt-2 text-sm text-zinc-400">{history.length} تغييرات مسجلة</p> : <p className="mt-2 text-sm text-zinc-500">لا توجد تغييرات مسجلة بعد.</p>}</div></div>
  </section>
}

export function CompactLevelBadge({ totalSpentUSD = 0 }: { totalSpentUSD?: number }) {
  const { currentLevel } = getLevelProgress(totalSpentUSD)
  return <span className="inline-flex items-center gap-1 text-xs text-amber-200"><Shield className="size-3.5" aria-hidden="true" />Level {currentLevel.level} • {currentLevel.name}</span>
}
