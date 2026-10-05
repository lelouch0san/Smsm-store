import { SenoLogo } from '@/components/branding/seno-logo'

export function SenoLoadingScreen({ label = 'جاري التحميل...' }: { label?: string }) {
  return (
    <div className="grid min-h-screen place-items-center bg-[#030303] text-white" role="status" aria-live="polite">
      <div className="flex flex-col items-center gap-6 px-6">
        <div className="animate-[brand-breathe_1.8s_ease-in-out_infinite] motion-reduce:animate-none">
          <SenoLogo className="w-64 max-w-[72vw]" />
        </div>
        <p className="text-sm text-zinc-400">{label}</p>
        <span className="h-0.5 w-40 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
          <span className="block h-full w-1/2 animate-[loading-line_1.1s_ease-in-out_infinite] bg-gradient-to-l from-red-500 to-amber-300 motion-reduce:animate-none" />
        </span>
      </div>
    </div>
  )
}
