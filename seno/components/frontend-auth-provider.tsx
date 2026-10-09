'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUser } from '@/lib/data'
import { DEMO_CUSTOMER_ID, debitWallet, getWalletBalance, getWalletByCustomerId, creditWallet } from '@/lib/data/wallet-finance'
import type { Profile } from '@/lib/mock-profile'

type FrontendAuth = { user: Profile | null; customerId: string; isAuthenticated: boolean; balance: number; setBalance: (balance: number) => void; signIn: () => void; signOut: () => void }
const AuthContext = createContext<FrontendAuth | null>(null)

export function FrontendAuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(true)
  const customerId = DEMO_CUSTOMER_ID
  const [balance, setBalanceState] = useState(() => getWalletBalance(customerId))
  useEffect(() => {
    const savedAuth = window.localStorage.getItem('seno-auth')
    if (savedAuth === 'guest') setAuthenticated(false)
    setBalanceState(getWalletBalance(customerId))
  }, [])
  const setBalance = (nextBalance: number) => {
    const currentBalance = getWalletBalance(customerId)
    const delta = nextBalance - currentBalance
    if (delta > 0) creditWallet(customerId, delta, 'تحديث رصيد تجريبي', 'النظام')
    if (delta < 0) debitWallet(customerId, Math.abs(delta), 'تحديث رصيد تجريبي', 'النظام')
    setBalanceState(getWalletBalance(customerId))
  }
  const wallet = getWalletByCustomerId(customerId)
  const user = authenticated ? { ...demoUser, id: customerId, balance, name: wallet?.customerName ?? demoUser.name } : null
  const value = useMemo(() => ({ user, customerId, isAuthenticated: authenticated, balance, setBalance, signIn: () => { setAuthenticated(true); window.localStorage.setItem('seno-auth', 'authenticated') }, signOut: () => { setAuthenticated(false); window.localStorage.setItem('seno-auth', 'guest') } }), [authenticated, balance, user, customerId])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useFrontendAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('useFrontendAuth must be used inside FrontendAuthProvider')
  return context
}

export function useAuth() {
  const { user, isAuthenticated } = useFrontendAuth()
  return { user, isAuthenticated, isLoading: false, login: undefined, logout: undefined, refreshUser: () => undefined }
}

export function useWallet() {
  const { balance, setBalance } = useFrontendAuth()
  return { balance, currency: 'EGP', isLoading: false, refreshBalance: () => undefined, setBalance }
}
