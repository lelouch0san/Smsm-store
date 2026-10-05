import type { Metadata } from 'next'
import { GamesCatalog } from '@/components/games-catalog'

export const metadata: Metadata = { title: 'شحن الألعاب | SENO STORE', description: 'اختر لعبتك وباقتك لشحن حسابك بسرعة.' }

export default function GamesPage() { return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><header className="py-8"><p className="text-sm font-bold text-amber-300">متجر الألعاب</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">اختر لعبتك</h1><p className="mt-2 text-zinc-400">باقات شحن فورية لأشهر الألعاب العالمية</p></header><GamesCatalog /></div></main> }
