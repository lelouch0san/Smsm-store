import { GameRechargePackageCard } from '@/components/game-recharge-package-card'
import type { Game } from '@/lib/data'

export function GamePackageList({ game }: { game: Game }) {
  const packages = [...game.packages].sort((a, b) => a.sortOrder - b.sortOrder)
  return (
    <section>
      <div className="mb-5 flex items-end justify-between">
        <div><p className="text-sm font-bold text-amber-300">الخطوة الثانية</p><h2 className="mt-1 text-2xl font-black">اختر باقة الشحن</h2></div>
        <span className="text-sm text-zinc-500">{packages.length} باقات</span>
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {packages.map((item) => <GameRechargePackageCard key={item.id} gameId={game.id} package={item} gameAvailable={game.isAvailable} />)}
      </div>
    </section>
  )
}
