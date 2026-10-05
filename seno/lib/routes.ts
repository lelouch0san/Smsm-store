export const routes = {
  home: '/',
  store: '/store',
  games: '/store/games',
  apps: '/store/apps',
  giftCards: '/store/gift-cards',
  services: '/store/services',
  senoCodes: '/user/products/seno-codes',
  orders: '/orders',
  wallet: '/wallet',
  walletSenoCode: '/wallet/seno-code',
  profile: '/profile',
  completeProfile: '/profile/complete',
  login: '/login',
  register: '/register',
  forgotPassword: '/forgot-password',
  resetPassword: '/reset-password',
  checkout: '/checkout',
  product: (slug: string) => `/product/${slug}`,
  category: (slug: string) => `/store/${slug}`,
  order: (id: string) => `/orders/${id}`,
  deposit: (methodSlug: string) => `/wallet/deposit/${methodSlug}`,
} as const

export function safeCallbackUrl(value: string | null | undefined, fallback = routes.home) {
  if (!value || !value.startsWith('/') || value.startsWith('//')) return fallback
  return value
}
