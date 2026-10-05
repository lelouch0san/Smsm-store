import { games } from '@/lib/data'
import { GameCard } from '@/components/game-card'

export function GamesCatalog() { return <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{games.map((game) => <GameCard key={game.id} game={game} />)}</section> }
