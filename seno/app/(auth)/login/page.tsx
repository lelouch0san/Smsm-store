'use client'

import Link from 'next/link'
import { FormEvent, Suspense, useState } from 'react'
import { LogIn, Eye, EyeOff, LockKeyhole, Mail, ShieldCheck } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { routes, safeCallbackUrl } from '@/lib/routes'
import { SenoLogo } from '@/components/branding/seno-logo'
import { useFrontendAuth } from '@/components/frontend-auth-provider'

function LoginForm() {
  const params = useSearchParams()
  const callbackUrl = safeCallbackUrl(params.get('callbackUrl'))
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useFrontendAuth()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    if (!email.trim()) return setError('يرجى إدخال البريد الإلكتروني')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return setError('البريد الإلكتروني غير صحيح')
    if (!password) return setError('يرجى إدخال كلمة المرور')
    setLoading(true)
    try {
      signIn()
      window.location.assign(callbackUrl)
    } finally { setLoading(false) }
  }

  return <main className="grid min-h-screen place-items-center bg-[#050506] px-4 py-10 text-white" dir="rtl"><section className="w-full max-w-md rounded-3xl border border-red-600/60 bg-[#090d10] p-6 shadow-[0_0_35px_rgba(255,0,30,.16)] sm:p-8"><div className="text-center"><SenoLogo className="mx-auto w-52" /><h1 className="mt-6 text-2xl font-black">تسجيل الدخول</h1><p className="mt-2 text-sm leading-7 text-zinc-400">سجل الدخول إلى حسابك في Seno Store</p></div><button type="button" disabled={loading} className="mt-7 flex h-14 w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white text-sm font-bold text-zinc-900 transition hover:bg-zinc-200 disabled:opacity-60"><LogIn className="size-5" />{loading ? 'جاري الاتصال بـ Google...' : 'المتابعة باستخدام Google'}</button><div className="my-6 flex items-center gap-3 text-xs text-zinc-500"><span className="h-px flex-1 bg-white/10" />أو باستخدام البريد الإلكتروني<span className="h-px flex-1 bg-white/10" /></div><form onSubmit={submit} className="space-y-4"><label className="block text-sm font-bold">البريد الإلكتروني<div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#11171c] px-4"><Mail className="size-5 text-zinc-500" /><input value={email} onChange={e => setEmail(e.target.value)} type="email" dir="ltr" autoComplete="email" className="h-13 min-w-0 flex-1 bg-transparent outline-none" placeholder="name@example.com" /></div></label><label className="block text-sm font-bold">كلمة المرور<div className="mt-2 flex items-center gap-3 rounded-xl border border-white/10 bg-[#11171c] px-4"><LockKeyhole className="size-5 text-zinc-500" /><input value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} dir="ltr" autoComplete="current-password" className="h-13 min-w-0 flex-1 bg-transparent outline-none" /><button type="button" aria-label={showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'} onClick={() => setShowPassword(v => !v)}>{showPassword ? <EyeOff className="size-5 text-zinc-500" /> : <Eye className="size-5 text-zinc-500" />}</button></div></label>{error && <p role="alert" className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</p>}<button disabled={loading} className="h-14 w-full rounded-2xl bg-red-600 font-black shadow-[0_0_22px_rgba(255,0,30,.3)] disabled:opacity-60">{loading ? 'جاري تسجيل الدخول...' : 'تسجيل الدخول'}</button></form><div className="mt-5 flex justify-between text-sm"><Link href={routes.forgotPassword} className="text-amber-300">هل نسيت كلمة المرور؟</Link><Link href={`${routes.register}?callbackUrl=${encodeURIComponent(callbackUrl)}`} className="text-zinc-300 hover:text-white">إنشاء حساب</Link></div><div className="mt-7 flex items-center justify-center gap-2 text-xs text-emerald-300"><ShieldCheck className="size-4" />تسجيل آمن ومحمي</div></section></main>
}

export default function AuthPage() {
  return <Suspense fallback={<div className="min-h-screen bg-[#050506]" />}><LoginForm /></Suspense>
}
