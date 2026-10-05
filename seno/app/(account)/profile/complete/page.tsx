'use client'

import Link from 'next/link'
import { routes } from '@/lib/routes'
import { SenoLogo } from '@/components/branding/seno-logo'

export default function CompleteProfilePage() {
  return <main className="min-h-screen bg-[#050506] px-4 py-10 text-white" dir="rtl"><section className="mx-auto max-w-xl rounded-3xl border border-red-600/60 bg-[#090d10] p-6 shadow-[0_0_30px_rgba(255,0,30,.14)] sm:p-8"><SenoLogo className="mb-6 w-44" /><h1 className="text-3xl font-black">أكمل بيانات حسابك</h1><p className="mt-3 leading-8 text-zinc-400">يرجى إكمال بيانات حسابك قبل متابعة الشراء.</p><form className="mt-8 flex flex-col gap-5"><label className="flex flex-col gap-2"><span>رقم الهاتف</span><input required type="tel" className="h-14 rounded-xl border border-white/15 bg-[#11171c] px-4 outline-none" /></label><label className="flex flex-col gap-2"><span>الدولة</span><input required className="h-14 rounded-xl border border-white/15 bg-[#11171c] px-4 outline-none" /></label><label className="flex flex-col gap-2"><span>العملة المفضلة</span><select required className="h-14 rounded-xl border border-white/15 bg-[#11171c] px-4 outline-none"><option>EGP</option><option>USD</option><option>EUR</option><option>SAR</option></select></label><button className="rounded-2xl bg-red-600 px-5 py-4 font-bold shadow-[0_0_20px_rgba(255,0,30,.3)]">حفظ ومتابعة</button></form><Link href={routes.profile} className="mt-6 block text-center text-sm text-amber-300">العودة إلى الحساب</Link></section></main>
}
