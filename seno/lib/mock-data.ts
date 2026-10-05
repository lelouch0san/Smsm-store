import type { Profile } from '@/lib/mock-profile'

export const demoUser: Profile = {
  id: 'demo-user', name: 'أحمد محمد', email: 'ahmed@seno-store.com', phone: '+20 10 1234 5678', country: 'مصر', preferredCurrency: 'EGP', role: 'USER', profileCompleted: true, completionPercent: 100, balance: 2450, unreadNotifications: 0, memberSince: 'سبتمبر 2026',
}

export const mockWallet = { currency: 'EGP', balance: 2450, transactions: [
  { id: 'tx-1', type: 'إيداع', amount: 1500, status: 'مكتمل' },
  { id: 'tx-2', type: 'إيداع', amount: 1000, status: 'مكتمل' },
  { id: 'tx-3', type: 'شراء', amount: -50, status: 'مكتمل' },
  { id: 'tx-4', type: 'شراء', amount: -250, status: 'مكتمل' },
] }

export const mockOrders = [
  { id: 'SENO-1001', product: 'Sahra Chat', package: '6,000 عملة', price: 240, currency: 'EGP', status: 'مكتمل', userId: '123456789', date: '29 سبتمبر 2026' },
  { id: 'SENO-1002', product: 'PUBG Mobile', package: 'UC 660', price: 680, currency: 'EGP', status: 'قيد المعالجة', userId: '987654321', date: '28 سبتمبر 2026' },
]

export const mockPaymentMethods = [
  { id: 'vodafone', name: 'Vodafone Cash', slug: 'vodafone-cash', logo: 'VF', description: 'إيداع سريع عبر فودافون كاش', enabled: true },
  { id: 'usdt', name: 'USDT', slug: 'usdt', logo: '₮', description: 'تحويل آمن بالعملات الرقمية', enabled: true },
  { id: 'binance', name: 'Binance', slug: 'binance', logo: 'BN', description: 'إيداع عبر Binance Pay', enabled: true },
  { id: 'paypal', name: 'PayPal', slug: 'paypal', logo: 'P', description: 'دفع عبر PayPal', enabled: true },
]

export const mockCategories = ['games', 'apps', 'gift-cards', 'services']

export const mockProducts = [
  { id: 'pubg-mobile', name: 'PUBG Mobile', category: 'games', price: 680 },
  { id: 'free-fire', name: 'Free Fire', category: 'games', price: 250 },
  { id: 'sahra-chat', name: 'Sahra Chat', category: 'apps', price: 240 },
  { id: 'soul-star', name: 'Soul Star', category: 'apps', price: 240 },
  { id: 'google-play', name: 'Google Play', category: 'gift-cards', price: 100 },
  { id: 'itunes', name: 'iTunes', category: 'gift-cards', price: 100 },
]

export type MockOrder = typeof mockOrders[number]
export type MockWallet = typeof mockWallet
export type MockUser = typeof demoUser
