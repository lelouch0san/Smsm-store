'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, CreditCard, Loader2, WalletCards, Zap } from 'lucide-react'
import { SenoLogo } from '@/components/branding/seno-logo'
import { useFrontendAuth } from '@/components/frontend-auth-provider'
import { routes } from '@/lib/routes'
import { SidebarTrigger } from '@/components/global-sidebar'

export default function SenoCodeRedeemPage() {
  const { user, isAuthenticated, setBalance } = useFrontendAuth()
  const [code, setCode] = useState('')
  const [status, setStatus] = useState<{ type: 'success' | 'error'; title: string; detail?: string } | null>(null)
  const [loading, setLoading] = useState(false)

  async function redeem() {
    if (!code.trim() || loading) return
    setLoading(true)
    setStatus(null)
    const response = await fetch('/api/wallet/redeem-code', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ code }) })
    const result = await response.json()
    if (response.ok) {
      setBalance((user?.balance ?? 0) + result.amount)
      setCode('')
      setStatus({ type: 'success', title: 'تم شحن رصيدك بنجاح', detail: `تمت إضافة $${result.amount.toFixed(2)} إلى محفظتك` })
    } else setStatus({ type: 'error', title: result.message ?? 'كود الشحن غير صحيح' })
    setLoading(false)
  }

  if (!isAuthenticated) return <main className="grid min-h-screen place-items-center bg-[#050506] px-6 text-center text-white"><div><h1 className="text-2xl font-black">سجّل الدخول لاستخدام سينو كود</h1><Link className="mt-5 inline-flex rounded-xl bg-red-600 px-5 py-3 font-bold" href="/login?callbackUrl=/wallet/seno-code">تسجيل الدخول</Link></div></main>
  return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-2xl px-4 sm:px-6"><header className="flex items-center justify-between gap-3 py-5"><SenoLogo className="w-32 sm:w-40" /><div className="flex items-center gap-3"><div className="flex items-center gap-2 rounded-full border border-amber-500/60 px-3 py-2 text-xs text-amber-100"><WalletCards className="size-4 text-amber-300" />{(user?.balance ?? 0).toFixed(2)} {user?.preferredCurrency ?? 'EGP'}</div><SidebarTrigger /></div></header><nav aria-label="تنقل المحفظة" className="flex gap-2 overflow-x-auto rounded-3xl border border-white/10 bg-[#070a0d] p-2"><Link href="/wallet" className="shrink-0 rounded-2xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/5">إضافة رصيد</Link><Link href="/wallet/deposits" className="shrink-0 rounded-2xl px-4 py-3 text-sm text-zinc-300 hover:bg-white/5">سجل الإيداعات</Link><Link href={routes.wallet + '/seno-code'} aria-current="page" className="shrink-0 rounded-2xl bg-red-600/20 px-4 py-3 text-sm font-bold text-white ring-1 ring-red-500/30">سينو كود</Link></nav><section className="mx-auto mt-8 max-w-md rounded-[2rem] border border-amber-400/20 bg-[radial-gradient(circle_at_top,rgba(176,124,22,.16),transparent_48%),#090e12] p-5 shadow-[0_0_40px_rgba(255,0,40,.08)] sm:mt-12 sm:p-8"><div className="flex flex-col items-center text-center"><SenoLogo variant="symbol" className="w-16" /><p className="mt-5 text-xs font-bold tracking-[0.24em] text-amber-300">SENO WALLET</p><h1 className="mt-2 text-2xl font-black sm:text-3xl">شحن رصيد المحفظة</h1><p className="mt-2 text-sm text-zinc-400">أدخل كود شحن الرصيد الذي اشتريته مسبقًا</p></div><div className="mt-8"><label htmlFor="seno-code" className="mb-2 block text-sm font-bold text-zinc-200">كود البطاقة</label><div className="relative"><CreditCard className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-amber-300" /><input id="seno-code" value={code} onChange={(event) => setCode(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter' && !event.nativeEvent.isComposing && event.keyCode !== 229) redeem() }} placeholder="أدخل كود شحن الرصيد" dir="ltr" autoComplete="off" className="h-14 w-full rounded-2xl border border-white/10 bg-black/60 pr-12 pl-4 text-center font-mono tracking-[0.18em] text-white outline-none transition placeholder:font-sans placeholder:tracking-normal focus:border-amber-400/70 focus:ring-2 focus:ring-amber-400/10" /></div><button type="button" onClick={redeem} disabled={!code.trim() || loading} className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-red-600 font-black text-white shadow-[0_10px_28px_rgba(220,38,38,.2)] transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50">{loading ? <Loader2 className="size-5 animate-spin" /> : <Zap className="size-5" />}شحن</button>{status && <div role="alert" className={`mt-4 rounded-2xl border p-4 text-center ${status.type === 'success' ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200' : 'border-red-400/30 bg-red-400/10 text-red-200'}`}><p className="font-bold">{status.title}</p>{status.detail && <p className="mt-1 text-sm">{status.detail}</p>}</div>}</div></section><Link href="/wallet" className="mx-auto mt-5 flex w-fit items-center gap-2 text-sm text-zinc-400 hover:text-amber-300"><ArrowRight className="size-4" />العودة إلى المحفظة</Link></div></main>
}
