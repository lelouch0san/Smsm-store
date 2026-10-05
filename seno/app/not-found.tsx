import Link from 'next/link'
import { SenoLogo } from '@/components/branding/seno-logo'
import { ArrowRight, Store } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#050506] px-6 text-center text-white" dir="rtl">
      <div className="flex max-w-md flex-col items-center gap-5">
        <SenoLogo className="w-52" />
        <p className="text-sm text-amber-300">404</p>
        <h1 className="text-2xl font-black">الصفحة غير موجودة</h1>
        <p className="max-w-sm leading-7 text-zinc-400">الصفحة التي تبحث عنها غير موجودة أو ربما تم نقلها.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="inline-flex items-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-bold"><ArrowRight className="size-4" aria-hidden="true" />العودة للرئيسية</Link>
          <Link href="/store" className="inline-flex items-center gap-2 rounded-xl border border-amber-400/50 px-6 py-3 font-bold text-amber-200"><Store className="size-4" aria-hidden="true" />الذهاب للمتجر</Link>
        </div>
      </div>
    </main>
  )
}
