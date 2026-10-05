export type LevelBenefit = { label: string }

export type MembershipLevel = {
  level: number
  name: string
  minSpentUSD: number
  description: string
  badge: string
  benefits: LevelBenefit[]
  isActive: boolean
  sortOrder: number
}

export type LevelProgress = {
  currentLevel: MembershipLevel
  nextLevel: MembershipLevel | null
  progressPercent: number
  remainingAmountUSD: number
}

export type LoyaltyProfile = {
  totalSpentUSD: number
  lifetimeOrders: number
  loyaltyPoints: number
}

export const membershipLevels: MembershipLevel[] = [
  ['Newcomer', 0, 'بداية رحلتك مع Seno Store', 'N0', ['Level badge']],
  ['Starter', 100, 'خطوتك الأولى نحو مزايا العضوية', 'N1', ['Level badge']],
  ['Bronze', 150, 'عضوية برونزية لعشاق المتجر', 'N2', ['Special member offers']],
  ['Silver', 225, 'عضوية فضية مع حضور مميز', 'N3', ['Exclusive promotions']],
  ['Gold', 340, 'عضوية ذهبية للنخبة', 'N4', ['Gold member status']],
  ['Platinum', 510, 'عضوية بلاتينية متقدمة', 'N5', ['Priority member offers']],
  ['Diamond', 765, 'عضوية ألماسية استثنائية', 'N6', ['Diamond member status']],
  ['Elite', 1150, 'عضوية النخبة', 'N7', ['Elite member offers']],
  ['Master', 1725, 'عضوية الماستر المميزة', 'N8', ['Master member status']],
  ['Grand Master', 2600, 'أعلى درجات التميز قبل الأسطورة', 'N9', ['Grand master member status']],
  ['Seno Legend', 3900, 'الأسطورة في Seno Store', 'N10', ['Seno Legend status']],
].map(([name, minSpentUSD, description, badge, benefits], index) => ({
  level: index,
  name: name as string,
  minSpentUSD: minSpentUSD as number,
  description: description as string,
  badge: badge as string,
  benefits: (benefits as string[]).map(label => ({ label })),
  isActive: true,
  sortOrder: index,
}))

export function calculateUserLevel(totalSpentUSD: number, levels = membershipLevels): MembershipLevel {
  const spending = Math.max(0, Number.isFinite(totalSpentUSD) ? totalSpentUSD : 0)
  return [...levels].filter(level => level.isActive && level.minSpentUSD <= spending).sort((a, b) => b.minSpentUSD - a.minSpentUSD)[0] ?? levels[0]
}

export function getNextLevel(currentLevel: MembershipLevel, levels = membershipLevels): MembershipLevel | null {
  return [...levels].filter(level => level.isActive && level.minSpentUSD > currentLevel.minSpentUSD).sort((a, b) => a.minSpentUSD - b.minSpentUSD)[0] ?? null
}

export function getLevelProgress(totalSpentUSD: number, levels = membershipLevels): LevelProgress {
  const spending = Math.max(0, Number.isFinite(totalSpentUSD) ? totalSpentUSD : 0)
  const currentLevel = calculateUserLevel(spending, levels)
  const nextLevel = getNextLevel(currentLevel, levels)
  if (!nextLevel) return { currentLevel, nextLevel: null, progressPercent: 100, remainingAmountUSD: 0 }
  const range = nextLevel.minSpentUSD - currentLevel.minSpentUSD
  return { currentLevel, nextLevel, progressPercent: Math.min(100, Math.max(0, ((spending - currentLevel.minSpentUSD) / range) * 100)), remainingAmountUSD: Math.max(0, nextLevel.minSpentUSD - spending) }
}

export function getRemainingAmountToNextLevel(totalSpentUSD: number, levels = membershipLevels) {
  return getLevelProgress(totalSpentUSD, levels).remainingAmountUSD
}

export function formatUSD(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value)
}

export const initialLoyaltyProfile: LoyaltyProfile = { totalSpentUSD: 0, lifetimeOrders: 0, loyaltyPoints: 0 }

export type RankableOrder = { status: string; rankValueUSD: number; refunded?: boolean }

export function calculateLifetimeSpending(orders: RankableOrder[]) {
  return orders.filter(order => ['paid', 'completed', 'successful'].includes(order.status.toLowerCase()) && !order.refunded).reduce((total, order) => total + Math.max(0, order.rankValueUSD), 0)
}

export function calculateLifetimeOrders(orders: RankableOrder[]) {
  return orders.filter(order => ['paid', 'completed', 'successful'].includes(order.status.toLowerCase()) && !order.refunded).length
}

export function calculateRankValueUSD(amount: number, currency: 'USD' | 'EUR' | 'SAR' | 'EGP', rates: Record<string, number>) {
  return Math.max(0, amount * (currency === 'USD' ? 1 : rates[currency] ?? 0))
}

export type LevelHistoryEntry = { previousLevel: number; newLevel: number; reachedAt: string; spendingUSD: number }

export const emptyLevelHistory: LevelHistoryEntry[] = []

export function getLevelByNumber(level: number, levels = membershipLevels) {
  return levels.find(item => item.level === level) ?? levels[0]
}

export const supportedRankingCurrencies = ['USD', 'EUR', 'SAR', 'EGP'] as const

export type SupportedRankingCurrency = typeof supportedRankingCurrencies[number]

export function isSupportedRankingCurrency(currency: string): currency is SupportedRankingCurrency {
  return supportedRankingCurrencies.includes(currency as SupportedRankingCurrency)
}

export function getDefaultExchangeRates() {
  return { EUR: 1.08, SAR: 0.266, EGP: 0.0205 }
}

export function toRankValueUSD(amount: number, currency: SupportedRankingCurrency, rates = getDefaultExchangeRates()) {
  return calculateRankValueUSD(amount, currency, rates)
}

export const loyaltyConfig = { normalizedCurrency: 'USD' as const, levels: membershipLevels }

export const rankCurrency = 'USD' as const

export const maxMembershipLevel = membershipLevels[membershipLevels.length - 1]

export default membershipLevels
