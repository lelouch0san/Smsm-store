export type GameField = { id: string; label: string; placeholder: string; inputMode?: 'text' | 'numeric' }
export type GamePackage = { id: string; amount: number; unit: string; imageUrl: string; price: number; oldPrice?: number; discount?: number; currency: 'EGP'; isAvailable: boolean; sortOrder: number }

export type Game = { id: string; name: string; description: string; image: string; isAvailable: boolean; requiredFields: GameField[]; sortOrder: number; packages: GamePackage[] }

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_00000000745c8210b7e91f63ac752576-4DWCAUGZc7E8ufa6DY7jUxb81H7yfb.png'
const fields = { player: [{ id: 'playerId', label: 'رقم اللاعب', placeholder: 'أدخل Player ID', inputMode: 'numeric' as const }], roblox: [{ id: 'username', label: 'اسم المستخدم', placeholder: 'أدخل Username', inputMode: 'text' as const }] }
const pack = (id: string, amount: number, unit: string, price: number, sortOrder: number, isAvailable = true, oldPrice?: number): GamePackage => ({ id, amount, unit, imageUrl: artwork, price, ...(oldPrice ? { oldPrice, discount: Math.round((1 - price / oldPrice) * 100) } : {}), currency: 'EGP', isAvailable, sortOrder })

export const games: Game[] = [
  { id: 'pubg-global', name: 'PUBG Mobile', description: 'شحن UC بسرعة وأمان', image: artwork, isAvailable: true, requiredFields: fields.player, sortOrder: 1, packages: [pack('pubg-60', 60, 'UC', 80, 1), pack('pubg-325', 325, 'UC', 400, 2), pack('pubg-660', 660, 'UC', 680, 3), pack('pubg-1800', 1800, 'UC', 1700, 4), pack('pubg-3850', 3850, 'UC', 3500, 5, false)] },
  { id: 'free-fire-global', name: 'Free Fire', description: 'شحن Diamonds بسرعة وأمان', image: artwork, isAvailable: true, requiredFields: fields.player, sortOrder: 2, packages: [pack('ff-100', 100, 'Diamonds', 110, 1), pack('ff-310', 310, 'Diamonds', 280, 2), pack('ff-520', 520, 'Diamonds', 430, 3)] },
  { id: 'mobile-legends-global', name: 'Mobile Legends', description: 'شحن الماس داخل اللعبة', image: artwork, isAvailable: true, requiredFields: fields.player, sortOrder: 3, packages: [pack('ml-86', 86, 'Diamonds', 100, 1), pack('ml-172', 172, 'Diamonds', 190, 2), pack('ml-343', 343, 'Diamonds', 360, 3)] },
  { id: 'cod-mobile-global', name: 'Call of Duty Mobile', description: 'احصل على CP فوراً', image: artwork, isAvailable: true, requiredFields: fields.player, sortOrder: 4, packages: [pack('cod-80', 80, 'CP', 100, 1), pack('cod-420', 420, 'CP', 420, 2), pack('cod-880', 880, 'CP', 820, 3)] },
  { id: 'roblox-global', name: 'Roblox', description: 'اشحن Robux لحسابك', image: artwork, isAvailable: true, requiredFields: fields.roblox, sortOrder: 5, packages: [pack('robux-400', 400, 'Robux', 250, 1), pack('robux-800', 800, 'Robux', 480, 2)] },
  { id: 'fc-mobile-global', name: 'EA SPORTS FC Mobile', description: 'اشحن نقاط FC Mobile', image: artwork, isAvailable: false, requiredFields: fields.player, sortOrder: 6, packages: [pack('fc-105', 105, 'Points', 120, 1), pack('fc-550', 550, 'Points', 10, 2)] },
]

export function getGame(gameId: string) { return games.find((game) => game.id === gameId) }

export const GAME_BALANCE_KEY = 'seno-game-balance'
export const GAME_ORDERS_KEY = 'seno-game-orders'
export const initialGameBalance = 100

export type GameOrder = { id: string; type: 'game'; gameId: string; gameName: string; packageId: string; package: string; quantity: number; playerId: string; unitPrice: number; total: number; currency: 'EGP'; status: 'pending'; createdAt: string }

export function readGameBalance() { if (typeof window === 'undefined') return initialGameBalance; const stored = window.localStorage.getItem(GAME_BALANCE_KEY); return stored ? Number(stored) : initialGameBalance }
export function readGameOrders(): GameOrder[] { if (typeof window === 'undefined') return []; try { return JSON.parse(window.localStorage.getItem(GAME_ORDERS_KEY) ?? '[]') } catch { return [] } }
export function saveGameOrder(order: GameOrder) { const orders = readGameOrders(); window.localStorage.setItem(GAME_ORDERS_KEY, JSON.stringify([order, ...orders])) }
export function saveGameBalance(balance: number) { window.localStorage.setItem(GAME_BALANCE_KEY, String(balance)) }
