import type { DigitalCardPackage, StoreProduct } from '@/lib/store-products'
import type { Game, GamePackage, GameField, GameOrder } from '@/lib/game-data'
import type { VoiceChatProduct, ProductField } from '@/lib/voice-chat-products'
import type { SenoBalanceCodeProduct } from '@/lib/seno-balance-codes'

export type CategoryType = 'store' | 'account' | 'service'
export type CategoryPurpose = 'general' | 'offers' | 'custom'

export type Category = { id: string; name: string; nameEn?: string; slug: string; type: CategoryType; purpose?: CategoryPurpose; description?: string; order: number; active: boolean; image?: string; metadata?: Record<string, unknown> }
export type Product = StoreProduct
export type ProductPackage = DigitalCardPackage | GamePackage
export type { DigitalCardPackage, StoreProduct, Game, GamePackage, GameField, GameOrder, VoiceChatProduct, ProductField, SenoBalanceCodeProduct }
export type Service = VoiceChatProduct
export type SocialMediaService = { id: string; platform: string; name: string; inputType: 'profile_url' | 'post_url' | 'video_url' | 'username'; inputLabel: string; quantityRequired: boolean; minimumQuantity: number; maximumQuantity: number; quantityStep: number; pricePerUnit: number; currency: string; active: boolean; available: boolean; image?: string; instructions?: string[]; metadata?: Record<string, unknown> }
export type Subscription = Product & { type?: 'subscription' }
export type GiftCard = Product & { type?: 'gift-card' }
export type SenoBalanceCode = SenoBalanceCodeProduct
export type CatalogProduct = Product | Game | Service | SenoBalanceCode
