'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ClipboardList, Gamepad2, Gift, Home, LogIn, MoreHorizontal, Smartphone, Store, UserRound, Wallet } from 'lucide-react'
import { routes } from '@/lib/routes'
import { useFrontendAuth } from '@/components/frontend-auth-provider'

const items = [
  { label: 'الرئيسية', href: routes.home, icon: Home, iconPath: '/icons/home.png' },
  { label: 'المتجر', href: routes.store, icon: Store, iconPath: '/icons/store.png' },
  { label: 'طلباتي', href: routes.orders, icon: ClipboardList, iconPath: '/icons/orders.png' },
  { label: 'المحفظة', href: routes.wallet, icon: Wallet, iconPath: '/icons/wallet.png' },
  { label: 'حسابي', href: routes.profile, icon: UserRound, iconPath: '/icons/profile.png' },
]

const menuItems = [
  ...items,
  { label: 'الألعاب', href: routes.games, icon: Gamepad2 },
  { label: 'التطبيقات', href: routes.apps, icon: Smartphone },
  { label: 'البطاقات الرقمية', href: routes.giftCards, icon: Gift },
  { label: 'خدمات أخرى', href: routes.services, icon: MoreHorizontal },
  { label: 'سينو كود', href: routes.senoCodes, icon: Gift },
]

function isActive(pathname: string, href: string) {
  if (href === routes.home) return pathname === href
  return pathname === href || pathname.startsWith(`${href}/`) || (href === routes.store && pathname.startsWith('/product/'))
}

export function BottomNavigation() {
  const pathname = usePathname()
  return <nav className="fixed bottom-0 left-1/2 z-30 flex h-[84px] w-full max-w-5xl -translate-x-1/2 items-center justify-around rounded-t-[1.75rem] border-t border-red-500/80 bg-[#070707]/95 px-3 pb-[calc(.75rem+env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl lg:hidden" dir="rtl">
    {items.map(({ label, href, iconPath }) => <Link href={href} key={label} className={`flex min-w-14 flex-col items-center gap-1 text-xs ${isActive(pathname, href) ? 'text-red-500 drop-shadow-[0_0_10px_rgba(255,0,30,.8)]' : 'text-zinc-300'}`}><img src={iconPath} alt="" aria-hidden="true" className="size-8 object-contain" /><span className="font-bold">{label}</span></Link>)}
  </nav>
}

export function SiteMenu({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname()
  const { isAuthenticated, user, signOut } = useFrontendAuth()
  return <div className="flex flex-col gap-2 text-lg" dir="rtl">{menuItems.map(({ label, href, icon: Icon }) => <Link onClick={onNavigate} href={href} key={label} className={`flex items-center gap-3 rounded-xl px-3 py-3 transition ${isActive(pathname, href) ? 'bg-red-600/20 text-red-300' : 'text-white hover:bg-white/5'}`}><Icon className="size-5 text-amber-300" />{label}</Link>)}{isAuthenticated ? <><div className="my-2 border-t border-white/10" /><div className="rounded-xl border border-amber-400/20 bg-amber-400/[0.06] px-3 py-3"><p className="font-bold text-white">{user?.name}</p><p className="text-xs text-zinc-400">الرصيد: {user?.balance.toFixed(2)} {user?.preferredCurrency}</p></div><button type="button" onClick={() => { signOut(); onNavigate?.() }} className="flex items-center gap-3 rounded-xl border border-red-500/30 px-3 py-3 text-red-200"><LogIn className="size-5" />تسجيل الخروج</button></> : <div className="mt-2 grid gap-2 border-t border-white/10 pt-4"><Link onClick={onNavigate} href={routes.login} className="flex items-center gap-3 rounded-xl bg-red-600 px-3 py-3 font-bold text-white"><LogIn className="size-5" />تسجيل الدخول</Link><Link onClick={onNavigate} href={routes.register} className="flex items-center gap-3 rounded-xl border border-amber-400/40 px-3 py-3 text-amber-200">إنشاء حساب</Link></div>}</div>
}
