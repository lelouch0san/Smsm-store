'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useFrontendAuth } from '@/components/frontend-auth-provider'
import { Bell, ChevronLeft, ClipboardList, Globe2, Mail, Phone, ShieldCheck, UserRound, Wallet, WifiOff } from 'lucide-react'
import { routes } from '@/lib/routes'
import { SenoLogo } from '@/components/branding/seno-logo'
import { mockProfile, type Profile, type Currency, roleLabel } from '@/lib/mock-profile'
import { SenoLevelCard } from '@/components/loyalty/seno-level-card'

type ProfileState = 'loading' | 'guest' | 'authenticated' | 'offline'

const quickActions = [
  { label: 'المحفظة', description: 'إدارة رصيدك وعمليات الإيداع', href: routes.wallet, icon: Wallet },
  { label: 'طلباتي', description: 'تابع حالة مشترياتك وشحناتك', href: routes.orders, icon: ClipboardList },
]

export default function ProfilePage() {
  const { user, isAuthenticated } = useFrontendAuth()
  const [state] = useState<ProfileState>('authenticated')
  const profile = user
  const displayState: ProfileState = isAuthenticated ? state : 'guest'

  return (
    <main className="min-h-screen bg-[#050506] px-4 pb-28 pt-6 text-white sm:px-6 lg:pb-10" dir="rtl">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-black sm:text-4xl">حسابي</h1>
            <p className="mt-2 text-zinc-400">إدارة بيانات حسابك وخدماتك</p>
          </div>
          <SenoLogo className="w-40 sm:w-44" />
        </header>
        {displayState === 'loading' && <ProfileSkeleton />}
        {displayState === 'guest' && <GuestProfileState />}
        {displayState === 'offline' && <OfflineProfileState onRetry={() => undefined} />}
        {displayState === 'authenticated' && profile && <AuthenticatedProfile profile={profile} />}
      </div>
    </main>
  )
}

function GuestProfileState() {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-red-500/30 bg-[#090d10] p-8 text-center shadow-[0_0_34px_rgba(255,0,30,.15)] sm:p-12">
      <div className="mx-auto grid size-20 place-items-center rounded-3xl border border-amber-400/40 bg-gradient-to-br from-red-600/30 to-amber-400/10 text-amber-200"><UserRound className="size-10" /></div>
      <h2 className="mt-6 text-2xl font-black">مرحباً بك في SENO STORE</h2>
      <p className="mx-auto mt-3 max-w-md leading-8 text-zinc-400">سجّل الدخول للوصول إلى حسابك وإدارة مشترياتك ومحفظتك.</p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link href="/login?callbackUrl=%2Fprofile" className="rounded-xl bg-red-600 px-5 py-3.5 font-bold transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">تسجيل الدخول</Link>
        <Link href="/register?callbackUrl=%2Fprofile" className="rounded-xl border border-amber-400/50 px-5 py-3.5 font-bold text-amber-200 transition hover:bg-amber-400/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300">إنشاء حساب</Link>
      </div>
    </section>
  )
}

function OfflineProfileState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="mx-auto max-w-xl rounded-3xl border border-red-500/40 bg-[#090d10] p-8 text-center shadow-[0_0_30px_rgba(255,0,30,.12)]">
      <WifiOff className="mx-auto size-12 text-red-400" aria-hidden="true" />
      <h2 className="mt-4 text-xl font-black">تعذر تحميل بيانات الحساب</h2>
      <p className="mt-2 text-zinc-400">يرجى التحقق من اتصال الإنترنت أو المحاولة مرة أخرى.</p>
      <button type="button" onClick={onRetry} className="mt-6 rounded-xl bg-red-600 px-6 py-3 font-bold transition hover:bg-red-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">إعادة المحاولة</button>
    </section>
  )
}

function AuthenticatedProfile({ profile }: { profile: Profile }) {
  return (
    <div className="space-y-5">
      <section className="rounded-3xl border border-red-500/50 bg-gradient-to-br from-[#16080b] via-[#090d10] to-[#101216] p-5 shadow-[0_0_34px_rgba(255,0,30,.15)] sm:p-7">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="grid size-24 shrink-0 place-items-center rounded-3xl border-2 border-amber-400/70 bg-zinc-900 text-amber-300 shadow-[0_0_25px_rgba(245,158,11,.28)]" aria-hidden="true"><UserRound className="size-11" /></div>
          <div className="min-w-0 flex-1"><h2 className="text-2xl font-black">{profile.name}</h2><p className="mt-1 flex items-center gap-2 truncate text-zinc-400"><Mail className="size-4" aria-hidden="true" />{profile.email}</p><div className="mt-3 flex flex-wrap gap-2"><span className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-sm text-emerald-300">حساب نشط</span><span className="rounded-full border border-amber-400/40 bg-amber-400/10 px-3 py-1 text-sm text-amber-200">{roleLabel(profile.role)}</span></div></div>
          <Link href={routes.completeProfile} className="rounded-xl border border-red-500/60 px-4 py-3 text-center font-bold text-red-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">تعديل الملف الشخصي</Link>
        </div>
      </section>
      <SenoLevelCard totalSpentUSD={0} lifetimeOrders={0} />
      <section className="rounded-3xl border border-amber-400/30 bg-gradient-to-br from-[#181006] to-[#090d10] p-5 shadow-[0_0_25px_rgba(245,158,11,.1)] sm:p-6"><div className="flex items-center justify-between gap-4"><div><p className="text-sm text-zinc-400">رصيد المحفظة</p><p className="mt-2 text-3xl font-black text-amber-300">{profile.balance.toFixed(2)} {profile.preferredCurrency}</p></div><Wallet className="size-10 text-amber-300" aria-hidden="true" /></div><Link href={routes.wallet} className="mt-5 inline-flex rounded-xl bg-red-600 px-5 py-3 font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300">إضافة رصيد</Link></section>
      <section className="rounded-3xl border border-white/10 bg-[#090d10] p-5 sm:p-6"><h2 className="text-xl font-black">بيانات الحساب</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{[["الاسم الأول", 'أحمد'], ['اسم العائلة', 'محمد'], ['رقم الهاتف', profile.phone], ['الدولة', profile.country], ['العملة المفضلة', profile.preferredCurrency], ['البريد الإلكتروني', profile.email]].map(([label, value]) => <div key={label} className="rounded-2xl border border-white/10 bg-black/20 p-4"><p className="text-sm text-zinc-500">{label}</p><p className="mt-2 font-bold">{value}</p></div>)}</div></section>
      <section className="rounded-3xl border border-white/10 bg-[#090d10] p-5 sm:p-6"><h2 className="text-xl font-black">اختصارات الحساب</h2><div className="mt-4 grid gap-3 sm:grid-cols-2">{quickActions.map(({ label, description, href, icon: Icon }) => <Link href={href} key={label} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 p-4 transition hover:border-red-500/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"><Icon className="size-6 text-amber-300" aria-hidden="true" /><span className="min-w-0 flex-1"><b className="block">{label}</b><small className="mt-1 block text-zinc-500">{description}</small></span><ChevronLeft className="size-4 text-zinc-500" aria-hidden="true" /></Link>)}</div></section>
      <p className="flex items-center gap-2 text-sm text-zinc-500"><Bell className="size-4" aria-hidden="true" />عضو منذ {profile.memberSince}</p>
    </div>
  )
}

function ProfileSkeleton() {
  return <div className="space-y-5" aria-label="جاري تحميل الملف الشخصي"><div className="h-36 animate-pulse rounded-3xl bg-zinc-900" /><div className="h-32 animate-pulse rounded-3xl bg-zinc-900" /><div className="h-64 animate-pulse rounded-3xl bg-zinc-900" /></div>
}
