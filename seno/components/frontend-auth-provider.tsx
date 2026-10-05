'use client'

import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { demoUser } from '@/lib/data'
import type { Profile } from '@/lib/mock-profile'

type FrontendAuth = { user: Profile | null; isAuthenticated: boolean; balance: number; setBalance: (balance: number) => void; signIn: () => void; signOut: () => void }
const AuthContext = createContext<FrontendAuth | null>(null)

export function FrontendAuthProvider({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(true)
  const [balance, setBalanceState] = useState(demoUser.balance)
  useEffect(() => {
    const savedAuth = window.localStorage.getItem('seno-auth')
    const savedBalance = window.localStorage.getItem('seno-balance')
    if (savedAuth === 'guest') setAuthenticated(false)
    if (savedBalance) setBalanceState(Number(savedBalance))
  }, [])
  const setBalance = (nextBalance: number) => { setBalanceState(nextBalance); window.localStorage.setItem('seno-balance', String(nextBalance)) }
  const user = authenticated ? { ...demoUser, balance } : null
  const value = useMemo(() => ({ user, isAuthenticated: authenticated, balance, setBalance, signIn: () => { setAuthenticated(true); window.localStorage.setItem('seno-auth', 'authenticated') }, signOut: () => { setAuthenticated(false); window.localStorage.setItem('seno-auth', 'guest') } }), [authenticated, balance, user])
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
