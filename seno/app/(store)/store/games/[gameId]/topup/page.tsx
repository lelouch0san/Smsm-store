import { notFound } from 'next/navigation'
import { getGame } from '@/lib/data'
import { GameTopUpForm } from '@/components/game-topup-form'

export default async function GameTopUpPage({ params, searchParams }: { params: Promise<{ gameId: string }>; searchParams: Promise<{ package?: string }> }) { const { gameId } = await params; const { package: packageId } = await searchParams; const game = getGame(gameId); if (!game) notFound(); return <main className="min-h-screen bg-[#050506] pb-28 text-white" dir="rtl"><div className="mx-auto max-w-5xl px-4 sm:px-6"><header className="py-8"><p className="text-sm text-amber-300">شحن الألعاب / {game.name}</p><h1 className="mt-2 text-3xl font-black sm:text-4xl">شحن {game.name}</h1><p className="mt-2 text-zinc-400">اختر باقتك وأدخل بيانات الحساب لإتمام الطلب.</p></header><GameTopUpForm game={game} packageId={packageId ?? game.packages[0].id} /></div></main> }
