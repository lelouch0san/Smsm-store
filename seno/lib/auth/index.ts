import type { Profile } from '@/lib/mock-profile'
export type AuthSnapshot = { user: Profile | null; isAuthenticated: boolean; isLoading: boolean }
export type AuthAdapter = { getCurrentUser: () => Profile | null; isAuthenticated: () => boolean }
