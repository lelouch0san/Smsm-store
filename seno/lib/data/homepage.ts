export type HomepageBanner = {
  id: string
  nameAr: string
  nameEn: string
  subtitleAr?: string
  subtitleEn?: string
  image: string
  mobileImage?: string
  ctaLabel?: string
  targetType: 'product' | 'category' | 'offer' | 'route' | 'url' | 'none'
  targetValue?: string
  status: 'draft' | 'active' | 'scheduled' | 'inactive' | 'archived'
  sortOrder: number
  startDate?: string
  endDate?: string
  visibility: boolean
  altText: string
  placement?: 'main_homepage' | 'homepage_promo' | 'store' | 'category' | 'product'
  targetPage?: 'homepage' | 'store' | 'category' | 'product'
  targetId?: string
  createdAt: string
  updatedAt: string
}

export type HomepageSection = {
  id: string
  nameAr: string
  nameEn: string
  type: 'banner' | 'category_grid' | 'product_grid' | 'featured_products' | 'popular_products' | 'promotional' | 'service_grid'
  status: 'draft' | 'active' | 'scheduled' | 'inactive' | 'archived'
  visibility: boolean
  sortOrder: number
  dataSource: 'categories' | 'products' | 'featured_products' | 'popular_products' | 'manual_selection' | 'custom'
  sourceValue?: string
  maxItems?: number
  layout: 'grid' | 'carousel' | 'list'
  backgroundColor?: string
  startDate?: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export type HomepageConfig = {
  id: string
  maxVisibleSections: number
  defaultSpacing: 'compact' | 'normal' | 'spacious'
  showPromotionalAreas: boolean
  showFeaturedAreas: boolean
  homepageState: 'active' | 'maintenance' | 'limited'
  updatedAt: string
}

export type HomepageData = {
  sections: HomepageSection[]
  banners: HomepageBanner[]
  config: HomepageConfig
}

const mockBanners: HomepageBanner[] = [
  {
    id: '1',
    nameAr: 'بنر رئيسي',
    nameEn: 'Main Banner',
    subtitleAr: 'اكتشف أفضل العروض',
    subtitleEn: 'Discover best offers',
    image: '/images/home-banner-new.png',
    mobileImage: '/images/home-banner-new.png',
    ctaLabel: 'تصفح الآن',
    targetType: 'category',
    targetValue: 'games',
    status: 'active',
    sortOrder: 1,
    visibility: true,
    altText: 'البنر الرئيسي للمتجر',
    createdAt: '2024-01-15T10:00:00Z',
    updatedAt: '2024-01-20T14:30:00Z',
  },
  {
    id: '2',
    nameAr: 'عرض خاص',
    nameEn: 'Special Offer',
    subtitleAr: 'توفير 30% على البطاقات الرقمية',
    subtitleEn: '30% off digital cards',
    image: '/images/category-gift-cards.png',
    mobileImage: '/images/category-gift-cards.png',
    ctaLabel: 'احصل على العرض',
    targetType: 'category',
    targetValue: 'gift-cards',
    status: 'scheduled',
    sortOrder: 2,
    visibility: false,
    startDate: '2024-02-01',
    endDate: '2024-02-14',
    altText: 'عرض خاص على البطاقات الرقمية',
    createdAt: '2024-01-18T09:00:00Z',
    updatedAt: '2024-01-18T09:00:00Z',
  },
  {
    id: '3',
    nameAr: 'تطبيقات صوتية',
    nameEn: 'Voice Apps',
    subtitleAr: 'شحن التطبيقات بكل سهولة',
    subtitleEn: 'Charge apps easily',
    image: '/images/category-apps.png',
    mobileImage: '/images/category-apps.png',
    ctaLabel: 'استكشف',
    targetType: 'category',
    targetValue: 'apps',
    status: 'active',
    sortOrder: 3,
    visibility: true,
    altText: 'بنر التطبيقات الصوتية',
    createdAt: '2024-01-16T11:00:00Z',
    updatedAt: '2024-01-19T08:00:00Z',
  },
]

const mockSections: HomepageSection[] = [
  {
    id: 'sec-1',
    nameAr: 'البنر الرئيسي',
    nameEn: 'Hero Banner',
    type: 'banner',
    status: 'active',
    visibility: true,
    sortOrder: 1,
    dataSource: 'custom',
    layout: 'carousel',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'sec-2',
    nameAr: 'الأقسام الرئيسية',
    nameEn: 'Main Categories',
    type: 'category_grid',
    status: 'active',
    visibility: true,
    sortOrder: 2,
    dataSource: 'categories',
    maxItems: 8,
    layout: 'grid',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'sec-3',
    nameAr: 'الأكثر مبيعاً',
    nameEn: 'Best Sellers',
    type: 'popular_products',
    status: 'active',
    visibility: true,
    sortOrder: 3,
    dataSource: 'popular_products',
    maxItems: 6,
    layout: 'carousel',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'sec-4',
    nameAr: 'عروض وخصومات',
    nameEn: 'Offers & Discounts',
    type: 'promotional',
    status: 'active',
    visibility: true,
    sortOrder: 4,
    dataSource: 'custom',
    layout: 'grid',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
  {
    id: 'sec-5',
    nameAr: 'الخدمات',
    nameEn: 'Services',
    type: 'service_grid',
    status: 'inactive',
    visibility: false,
    sortOrder: 5,
    dataSource: 'custom',
    layout: 'grid',
    createdAt: '2024-01-10T08:00:00Z',
    updatedAt: '2024-01-10T08:00:00Z',
  },
]

const mockConfig: HomepageConfig = {
  id: 'config-1',
  maxVisibleSections: 5,
  defaultSpacing: 'normal',
  showPromotionalAreas: true,
  showFeaturedAreas: true,
  homepageState: 'active',
  updatedAt: '2024-01-20T10:00:00Z',
}

export const mockHomepageData: HomepageData = {
  sections: mockSections,
  banners: mockBanners,
  config: mockConfig,
}

export function getHomepageData(): HomepageData {
  return mockHomepageData
}

export function updateHomepageData(data: HomepageData): HomepageData {
  Object.assign(mockHomepageData, data)
  return mockHomepageData
}

export function getBannerById(id: string): HomepageBanner | undefined {
  return mockHomepageData.banners.find((b) => b.id === id)
}

export function updateBanner(id: string, updates: Partial<HomepageBanner>): HomepageBanner {
  const banner = getBannerById(id)
  if (!banner) throw new Error(`Banner ${id} not found`)
  const updated = { ...banner, ...updates, updatedAt: new Date().toISOString() }
  const index = mockHomepageData.banners.findIndex((b) => b.id === id)
  mockHomepageData.banners[index] = updated
  return updated
}

export function getSectionById(id: string): HomepageSection | undefined {
  return mockHomepageData.sections.find((s) => s.id === id)
}

export function updateSection(id: string, updates: Partial<HomepageSection>): HomepageSection {
  const section = getSectionById(id)
  if (!section) throw new Error(`Section ${id} not found`)
  const updated = { ...section, ...updates, updatedAt: new Date().toISOString() }
  const index = mockHomepageData.sections.findIndex((s) => s.id === id)
  mockHomepageData.sections[index] = updated
  return updated
}

export function reorderSections(sections: HomepageSection[]): HomepageData {
  mockHomepageData.sections = sections.map((s, i) => ({ ...s, sortOrder: i + 1 }))
  return mockHomepageData
}

export function reorderBanners(banners: HomepageBanner[]): HomepageData {
  mockHomepageData.banners = banners.map((b, i) => ({ ...b, sortOrder: i + 1 }))
  return mockHomepageData
}
