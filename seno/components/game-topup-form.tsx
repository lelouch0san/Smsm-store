'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { CheckCircle2, ChevronLeft, ShieldCheck } from 'lucide-react'
import type { Game, GameOrder } from '@/lib/data'
import { saveGameOrder } from '@/lib/data'
import { useFrontendAuth } from '@/components/frontend-auth-provider'

export function GameTopUpForm({ game, packageId }: { game: Game; packageId: string }) {
  const selected = game.packages.find((item) => item.id === packageId) ?? game.packages.find((item) => item.isAvailable) ?? game.packages[0]
  const { balance, setBalance } = useFrontendAuth()
  const [accountData, setAccountData] = useState<Record<string, string>>({})
  const [error, setError] = useState('')
  const [order, setOrder] = useState<GameOrder | null>(null)
  const total = useMemo(() => selected.price, [selected.price])
  const canPurchase = game.isAvailable && selected.isAvailable

  async function purchase() {
    if (!canPurchase) return setError('هذه اللعبة أو الباقة غير متوفرة حاليًا')
    if (game.requiredFields.some((field) => !accountData[field.id]?.trim())) return setError('يرجى إدخال بيانات الحساب المطلوبة')
    if (balance < total) return setError('الرصيد غير كافٍ لإتمام عملية الشراء')
    const response = await fetch('/api/purchases', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ gameId: game.id, packageId: selected.id, accountData }) })
    const result = await response.json()
    if (!response.ok) return setError(result.message ?? 'تعذر إنشاء الطلب')
    const nextBalance = balance - result.amount
    const created: GameOrder = { id: `SENO-${Math.floor(100000 + Math.random() * 900000)}`, type: 'game', gameId: game.id, gameName: game.name, packageId: selected.id, package: `${selected.amount.toLocaleString('en-US')} ${selected.unit}`, quantity: 1, playerId: Object.values(accountData)[0]?.trim() ?? '', unitPrice: result.amount, total: result.amount, currency: 'EGP', status: 'pending', createdAt: new Date().toLocaleString('ar-EG') }
    setBalance(nextBalance); saveGameOrder(created); setOrder(created); setError('')
  }

  if (order) return <section className="mx-auto max-w-2xl rounded-3xl border border-emerald-400/40 bg-[#090d10] p-6 text-center"><CheckCircle2 className="mx-auto size-16 text-emerald-300" /><h2 className="mt-5 text-2xl font-black">تم إنشاء الطلب بنجاح</h2><p className="mt-2 text-zinc-400">رقم الطلب: <b className="text-amber-300">{order.id}</b></p><div className="mt-5 rounded-2xl bg-black/30 p-4">الإجمالي: <b className="text-amber-300">{order.total.toLocaleString('en-EG')} EGP</b></div><Link href="/store/games" className="mt-6 block rounded-2xl border border-white/10 px-4 py-3 font-bold">العودة للألعاب</Link></section>

  return <div className="grid gap-5 lg:grid-cols-[1.1fr_.9fr]"><section className="rounded-3xl border border-white/10 bg-[#090d10] p-5"><div className="flex items-center justify-between border-b border-white/10 pb-5"><div><p className="text-sm text-zinc-400">الباقة المختارة</p><h2 className="mt-1 text-2xl font-black">{selected.amount.toLocaleString('en-US')} {selected.unit}</h2></div><p className="text-xl font-bold text-amber-300">{selected.price.toLocaleString('en-EG')} EGP</p></div><div className="mt-6"><p className="text-sm font-bold">بيانات الحساب</p><div className="mt-3 grid gap-4">{game.requiredFields.map((field) => <label key={field.id} className="block text-sm font-bold">{field.label}<input value={accountData[field.id] ?? ''} onChange={(event) => setAccountData((current) => ({ ...current, [field.id]: event.target.value }))} placeholder={field.placeholder} inputMode={field.inputMode} className="mt-2 h-14 w-full rounded-2xl border border-white/10 bg-black/30 px-4 text-white outline-none focus:border-amber-400" /></label>)}</div></div></section><aside className="h-fit rounded-3xl border border-amber-400/30 bg-[#0d0d0a] p-5"><div className="flex items-center gap-2 text-emerald-300"><ShieldCheck className="size-5" /><span className="text-xs font-bold">سعر ثابت وآمن من النظام</span></div><h2 className="mt-4 text-xl font-black">ملخص الطلب</h2><div className="mt-5 space-y-4 text-sm"><p className="flex justify-between gap-3"><span className="text-zinc-400">المنتج</span><b>{game.name}</b></p><p className="flex justify-between gap-3"><span className="text-zinc-400">الباقة</span><b>{selected.amount.toLocaleString('en-US')} {selected.unit}</b></p><p className="flex justify-between gap-3"><span className="text-zinc-400">الإجمالي</span><b className="text-xl text-amber-300">{total.toLocaleString('en-EG')} EGP</b></p></div>{error && <p className="mt-4 rounded-xl border border-red-500/40 bg-red-950/30 p-3 text-sm text-red-200">{error}</p>}<button type="button" onClick={purchase} disabled={!canPurchase} className="mt-6 flex h-14 w-full items-center justify-center rounded-2xl bg-red-600 font-black shadow-[0_0_20px_rgba(255,0,30,.25)] disabled:cursor-not-allowed disabled:bg-zinc-700">{canPurchase ? 'تأكيد الشراء' : 'غير متوفر حاليًا'}{canPurchase && <ChevronLeft className="mr-2 size-5" />}</button></aside></div>
}
