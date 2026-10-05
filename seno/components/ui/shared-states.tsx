'use client'

import { AlertCircle, Inbox, Loader2 } from 'lucide-react'
import type { ReactNode } from 'react'

type LoadingStateProps = { message?: string; variant?: 'page' | 'inline' }
export function LoadingState({ message = 'جارٍ التحميل...', variant = 'page' }: LoadingStateProps) {
  return <div className={variant === 'page' ? 'grid min-h-[240px] place-items-center px-5 py-12 text-center text-white' : 'flex items-center justify-center gap-2 py-5 text-sm text-zinc-400'} role="status" aria-live="polite"><Loader2 className="animate-spin text-amber-300" aria-hidden="true" /><span>{message}</span></div>
}
export function ProductCardSkeleton() { return <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[.04]" aria-hidden="true"><div className="aspect-[1.2] animate-pulse bg-white/10" /><div className="flex flex-col gap-3 p-4"><div className="h-4 w-3/4 animate-pulse rounded bg-white/10" /><div className="h-3 w-1/2 animate-pulse rounded bg-white/10" /></div></div> }
type StateProps = { title: string; description?: string; actionLabel?: string; onAction?: () => void; icon?: ReactNode }
export function EmptyState({ title, description, actionLabel, onAction, icon = <Inbox aria-hidden="true" /> }: StateProps) { return <section className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-5 py-10 text-center text-white" role="status"><div className="text-amber-300">{icon}</div><h2 className="text-lg font-black">{title}</h2>{description && <p className="max-w-sm text-sm text-zinc-400">{description}</p>}{actionLabel && onAction && <button type="button" onClick={onAction} className="mt-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold">{actionLabel}</button>}</section> }
export function ErrorState({ title = 'حدث خطأ', description = 'تعذر تحميل البيانات. حاول مرة أخرى.', actionLabel = 'إعادة المحاولة', onAction, icon = <AlertCircle aria-hidden="true" /> }: StateProps) { return <section className="flex min-h-[220px] flex-col items-center justify-center gap-3 px-5 py-10 text-center text-white" role="alert"><div className="text-red-400">{icon}</div><h2 className="text-lg font-black">{title}</h2><p className="max-w-sm text-sm text-zinc-400">{description}</p>{onAction && <button type="button" onClick={onAction} className="mt-2 rounded-xl border border-red-500/40 px-5 py-3 text-sm font-bold">{actionLabel}</button>}</section> }
