import Image from 'next/image'

const logoPath = '/branding/logo-source.png'

export function SenoLogo({ variant = 'full', className = '' }: { variant?: 'full' | 'symbol'; className?: string }) {
  return (
    <span
      className={`relative block overflow-hidden ${variant === 'symbol' ? 'aspect-square w-12' : 'aspect-[2.15/1] w-44'} ${className}`}
      aria-label="SENO STORE"
    >
      {variant === 'symbol' ? (
        <span className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <Image src={logoPath} alt="" fill priority sizes="48px" className="max-w-none object-cover object-left" style={{ width: '430%', left: 0 }} />
        </span>
      ) : (
        <Image src={logoPath} alt="SENO STORE" fill priority sizes="176px" className="object-contain" />
      )}
    </span>
  )
}

export { logoPath }
