'use client'

import Link from 'next/link'
import { SenoLogo } from '@/components/branding/seno-logo'

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050506] px-6 text-center text-white" dir="rtl">
      <div className="flex max-w-md flex-col items-center gap-5">
        <SenoLogo className="w-52" />
        <h1 className="text-2xl font-black">حدث خطأ غير متوقع</h1>
        <div className="flex gap-3"><button type="button" onClick={reset} className="rounded-xl bg-red-600 px-6 py-3 font-bold">إعادة المحاولة</button><Link href="/" className="rounded-xl border border-white/15 px-6 py-3 font-bold">الرئيسية</Link></div>
      </div>
    </main>
  )
}
