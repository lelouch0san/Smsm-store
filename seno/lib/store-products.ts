export type ProductOptionMetadata = {
  packageValue?: number
  unit?: string
  currencyCode?: string
  duration?: number
  durationUnit?: 'month' | 'year' | 'day'
  region?: string
  [key: string]: unknown
}

export type ProductOption = {
  id: string
  productId: string
  name: string
  displayName: string
  price: number
  currency: string
  oldPrice?: number
  discount?: number
  status: 'draft' | 'active' | 'inactive' | 'archived'
  available: boolean
  sortOrder: number
  sku?: string
  metadata?: ProductOptionMetadata
}

export type DigitalCardPackage = Partial<ProductOption> & { id: string; denomination: number; denominationCurrency: string; sellingPrice: number; sellingCurrency: string; region?: string; available: boolean }

export type Package = ProductOption


export type StoreProduct = {
  name: string
  slug: string
  detail: string
  oldPrice: number
  price: number
  discountPercentage: number
  category: 'شحن الألعاب' | 'تطبيقات الصوت' | 'البطاقات الرقمية' | 'خدمات أخرى'
  productType?: 'game-top-up' | 'voice-top-up' | 'gift-card' | 'subscription' | 'service'
  supportsPackages?: boolean
  sku?: string
  status?: 'draft' | 'active' | 'inactive' | 'archived'
  imagePosition: string
  imageUrl?: string
  digitalCardPackages?: DigitalCardPackage[]
  isAvailable: boolean
}

export const storeProducts: StoreProduct[] = [
  { name: 'PUBG Mobile', slug: 'pubg-mobile', detail: '660 UC', oldPrice: 800, price: 680, discountPercentage: 15, category: 'شحن الألعاب', productType: 'game-top-up', supportsPackages: true, imagePosition: '50% 65%', isAvailable: true, digitalCardPackages: [{ id: 'pubg-60', productId: 'pubg-mobile', name: '60 UC', displayName: '60 UC', denomination: 60, denominationCurrency: 'UC', sellingPrice: 100, sellingCurrency: 'EGP', price: 100, currency: 'EGP', available: true, status: 'active', sortOrder: 1, metadata: { packageValue: 60, unit: 'UC' } }, { id: 'pubg-325', productId: 'pubg-mobile', name: '325 UC', displayName: '325 UC', denomination: 325, denominationCurrency: 'UC', sellingPrice: 450, sellingCurrency: 'EGP', price: 450, currency: 'EGP', available: true, status: 'active', sortOrder: 2, metadata: { packageValue: 325, unit: 'UC' } }, { id: 'pubg-660', productId: 'pubg-mobile', name: '660 UC', displayName: '660 UC', denomination: 660, denominationCurrency: 'UC', sellingPrice: 850, sellingCurrency: 'EGP', price: 850, currency: 'EGP', available: false, status: 'active', sortOrder: 3, metadata: { packageValue: 660, unit: 'UC' } }] },
  { name: 'Free Fire', slug: 'free-fire', detail: '100 Diamonds', oldPrice: 140, price: 110, discountPercentage: 21, category: 'شحن الألعاب', productType: 'game-top-up', supportsPackages: true, imagePosition: '50% 67%', isAvailable: true, digitalCardPackages: [{ id: 'free-fire-100', productId: 'free-fire', name: '100 Diamonds', displayName: '100 Diamonds', denomination: 100, denominationCurrency: 'Diamonds', sellingPrice: 120, sellingCurrency: 'EGP', price: 120, currency: 'EGP', available: true, status: 'active', sortOrder: 1, metadata: { packageValue: 100, unit: 'Diamonds' } }, { id: 'free-fire-310', productId: 'free-fire', name: '310 Diamonds', displayName: '310 Diamonds', denomination: 310, denominationCurrency: 'Diamonds', sellingPrice: 300, sellingCurrency: 'EGP', price: 300, currency: 'EGP', available: true, status: 'active', sortOrder: 2, metadata: { packageValue: 310, unit: 'Diamonds' } }] },
  { name: 'Mobile Legends', slug: 'mobile-legends', detail: '86 Diamonds', oldPrice: 125, price: 100, discountPercentage: 20, category: 'شحن الألعاب', imagePosition: '50% 72%', isAvailable: false },
  { name: 'Sahra Chat', slug: 'sahra-chat', detail: '6,000 Masa', oldPrice: 300, price: 240, discountPercentage: 20, category: 'تطبيقات الصوت', imagePosition: '50% 76%', isAvailable: false },
  { name: 'Call of Duty Mobile', slug: 'call-of-duty-mobile', detail: 'CP', oldPrice: 100, price: 100, discountPercentage: 0, category: 'شحن الألعاب', imagePosition: '50% 58%', isAvailable: true },
  { name: 'TikTok', slug: 'tiktok', detail: 'Coins', oldPrice: 100, price: 100, discountPercentage: 0, category: 'تطبيقات الصوت', imagePosition: '50% 42%', isAvailable: true },
  { name: 'Bigo Live', slug: 'bigo-live', detail: 'Diamonds', oldPrice: 100, price: 100, discountPercentage: 0, category: 'تطبيقات الصوت', imagePosition: '50% 48%', isAvailable: true },
  { name: 'CapCut Pro', slug: 'capcut-pro', detail: 'اشتراكات', oldPrice: 300, price: 300, discountPercentage: 0, category: 'خدمات أخرى', productType: 'subscription', supportsPackages: true, imagePosition: '50% 50%', isAvailable: true, digitalCardPackages: [{ id: 'capcut-monthly', productId: 'capcut-pro', name: 'Monthly', displayName: 'Monthly', denomination: 1, denominationCurrency: 'month', sellingPrice: 300, sellingCurrency: 'EGP', price: 300, currency: 'EGP', available: true, status: 'active', sortOrder: 1, metadata: { duration: 1, durationUnit: 'month' } }, { id: 'capcut-yearly', productId: 'capcut-pro', name: 'Yearly', displayName: 'Yearly', denomination: 12, denominationCurrency: 'month', sellingPrice: 2500, sellingCurrency: 'EGP', price: 2500, currency: 'EGP', available: true, status: 'active', sortOrder: 2, metadata: { duration: 12, durationUnit: 'month' } }] },
  { name: 'Google Play', slug: 'google-play', detail: 'بطاقات رقمية', oldPrice: 600, price: 550, discountPercentage: 8, category: 'البطاقات الرقمية', imagePosition: '50% 30%', imageUrl: '/images/category-gift-cards.png', isAvailable: true, digitalCardPackages: [{ id: 'google-play-us-5', denomination: 5, denominationCurrency: '$', sellingPrice: 280, sellingCurrency: 'EGP', region: 'USA', available: true }, { id: 'google-play-us-10', denomination: 10, denominationCurrency: '$', sellingPrice: 550, sellingCurrency: 'EGP', region: 'USA', oldPrice: 600, discount: 8, available: true }, { id: 'google-play-us-25', denomination: 25, denominationCurrency: '$', sellingPrice: 1300, sellingCurrency: 'EGP', region: 'USA', available: true }, { id: 'google-play-us-50', denomination: 50, denominationCurrency: '$', sellingPrice: 2550, sellingCurrency: 'EGP', region: 'USA', available: false }, { id: 'google-play-us-100', denomination: 100, denominationCurrency: '$', sellingPrice: 5000, sellingCurrency: 'EGP', region: 'USA', available: false }] },
  { name: 'Apple Gift Card', slug: 'apple-gift-card', detail: 'Digital Card', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 25%', isAvailable: true },
  { name: 'PlayStation', slug: 'playstation', detail: 'PSN Card', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 55%', isAvailable: true },
  { name: 'Steam', slug: 'steam', detail: 'Steam Wallet', oldPrice: 100, price: 100, discountPercentage: 0, category: 'البطاقات الرقمية', imagePosition: '50% 60%', isAvailable: true },
  { name: 'خدمات رقمية', slug: 'digital-services', detail: 'خدمات رقمية', oldPrice: 100, price: 100, discountPercentage: 0, category: 'خدمات أخرى', imagePosition: '50% 86%', isAvailable: true },
]

export const discountedProducts = storeProducts.filter((product) => product.oldPrice > product.price && product.discountPercentage > 0)
