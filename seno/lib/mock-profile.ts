export type Currency = 'EGP' | 'USD' | 'EUR' | 'SAR'

export type Profile = {
  id: string
  name: string
  email: string
  image?: string
  phone: string
  country: string
  preferredCurrency: Currency
  role: 'USER' | 'WHOLESALE' | 'ADMIN'
  profileCompleted: boolean
  completionPercent: number
  balance: number
  unreadNotifications: number
  memberSince: string
}

/** Temporary UI fallback until the authenticated profile API is connected. */
export const mockProfile: Profile = {
  id: 'mock-profile',
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  phone: '+20 10 1234 5678',
  country: 'مصر',
  preferredCurrency: 'EGP',
  role: 'USER',
  profileCompleted: true,
  completionPercent: 100,
  balance: 2450,
  unreadNotifications: 0,
  memberSince: 'سبتمبر 2026',
}

export function roleLabel(role: Profile['role']) {
  return role === 'ADMIN' ? 'مدير' : role === 'WHOLESALE' ? 'تاجر جملة' : 'حساب عادي'
}
