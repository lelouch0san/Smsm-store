'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import { Bell, Gamepad2, Gift, Home, LogIn, Mail, Menu, Mic2, Package, Store, UserRound, Wallet, X, Zap, LogOut } from 'lucide-react'
import { useFrontendAuth } from '@/components/frontend-auth-provider'
import { routes } from '@/lib/routes'
import { SenoLogo } from '@/components/branding/seno-logo'
import { CompactLevelBadge } from '@/components/loyalty/seno-level-card'

const SidebarContext = createContext<{ open: boolean; setOpen: (open: boolean) => void }>({ open: false, setOpen: () => {} })

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false)
  return <SidebarContext.Provider value={{ open, setOpen }}>{children}</SidebarContext.Provider>
}

export function SidebarTrigger() {
  const { setOpen } = useContext(SidebarContext)
  return <button type="button" onClick={() => setOpen(true)} aria-label="فتح القائمة" className="grid size-11 place-items-center rounded-xl border border-white/10 bg-zinc-950/90 text-amber-300 backdrop-blur"><MenuIcon /></button>
}

function MenuIcon() {
  return <Menu aria-hidden="true" />
}

const publicItems = [
  { label: 'الرئيسية', href: routes.home, icon: Home },
  { label: 'المتجر', href: routes.store, icon: Store },
  { label: 'شحن الألعاب', href: routes.games, icon: Gamepad2 },
  { label: 'تطبيقات الدردشة الصوتية', href: routes.apps, icon: Mic2 },
  { label: 'البطاقات الرقمية', href: routes.giftCards, icon: Gift },
  { label: 'خدمات أخرى', href: routes.services, icon: Zap },
]

const accountItems = [
  { label: 'المحفظة', href: routes.wallet, icon: Wallet },
  { label: 'طلباتي', href: routes.orders, icon: Package },
  { label: 'حسابي', href: routes.profile, icon: UserRound },
  { label: 'الإشعارات', href: '/notifications', icon: Bell },
]

type NavItem = (typeof publicItems)[number] | (typeof accountItems)[number]

function active(pathname: string, href: string) {
  return href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(`${href}/`) || (href === routes.store && pathname.startsWith('/product/'))
}

function NavLink({ item, pathname, onClick }: { item: NavItem; pathname: string; onClick: () => void }) {
  const Icon = item.icon
  return <Link href={item.href} onClick={onClick} className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition ${active(pathname, item.href) ? 'bg-red-600/20 text-red-200 shadow-[inset_0_0_18px_rgba(239,68,68,.12)]' : 'text-zinc-300 hover:bg-white/[0.06] hover:text-white'}`}><Icon className="size-5 text-amber-300" />{item.label}</Link>
}

export function GlobalSidebar({ showTrigger = true }: { showTrigger?: boolean }) {
  const pathname = usePathname()
  const { open, setOpen } = useContext(SidebarContext)
  const { user, isAuthenticated, signOut } = useFrontendAuth()
  const close = () => setOpen(false)

  useEffect(() => {
    if (!open) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [open])

  const content = <aside onClick={event => event.stopPropagation()} className="flex h-full min-h-0 w-72 flex-col border-l border-white/10 bg-[#080809] p-5 shadow-[0_0_45px_rgba(0,0,0,.45)]" dir="rtl">
    <div className="mb-8 flex items-center justify-between"><Link href="/" onClick={close} aria-label="العودة إلى الرئيسية"><SenoLogo className="w-40" /></Link><button onClick={close} className="lg:hidden" aria-label="إغلاق القائمة"><X className="size-5 text-zinc-400" /></button></div>
    <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto overscroll-contain pb-6"><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-zinc-500">المتجر</p>{publicItems.map(item => <NavLink key={item.href} item={item} pathname={pathname} onClick={close} />)}{isAuthenticated ? <><div className="my-5 border-t border-white/10" />{accountItems.map(item => <NavLink key={item.href} item={item} pathname={pathname} onClick={close} />)}<div className="mt-auto rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-4"><p className="font-bold text-white">{user?.name}</p><p className="mt-1 truncate text-xs text-zinc-400">{user?.email}</p><div className="mt-2"><CompactLevelBadge /></div><p className="mt-3 text-sm text-amber-200">الرصيد: {user?.balance.toFixed(2)} {user?.preferredCurrency}</p><p className="mt-1 text-xs text-emerald-300">الحساب: نشط</p></div><button type="button" onClick={() => { signOut(); close() }} className="mt-3 flex items-center justify-center gap-2 rounded-xl border border-red-500/30 px-3 py-2.5 text-sm font-bold text-red-200 hover:bg-red-500/10"><LogOut className="size-4" />تسجيل الخروج</button></> : <><div className="my-5 border-t border-white/10" /><p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[.2em] text-zinc-500">تسجيل الدخول لحسابك</p><Link href={`${routes.login}?callbackUrl=${encodeURIComponent(pathname)}`} onClick={close} className="mt-2 rounded-2xl border border-red-500/30 bg-red-950/20 p-4"><div className="mb-3 text-sm font-bold text-white">تسجيل الدخول لحسابك</div><div className="grid gap-2"><span className="flex items-center justify-center gap-2 rounded-xl bg-white px-3 py-2 text-xs font-bold text-zinc-900"><LogIn className="size-4" />تسجيل الدخول</span><span className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-3 py-2 text-xs text-zinc-200"><Mail className="size-4" />إنشاء حساب</span></div></Link></>}</nav>
  </aside>
  return <><div className="fixed inset-y-0 right-0 z-50 hidden h-[100dvh] max-h-[100dvh] lg:block">{content}</div>{showTrigger && <button onClick={() => setOpen(true)} aria-label="فتح القائمة" className="fixed right-4 top-4 z-40 grid size-11 place-items-center rounded-xl border border-white/10 bg-zinc-950/90 text-amber-300 backdrop-blur lg:hidden"><Menu className="size-5" /></button>}{open && <div dir="ltr" className="fixed inset-0 z-50 flex h-[100dvh] max-h-[100dvh] items-stretch justify-end overflow-hidden bg-black/70 lg:hidden" onClick={close}>{content}</div>}</>
}
