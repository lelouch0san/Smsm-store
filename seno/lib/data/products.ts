import { storeProducts, discountedProducts } from '@/lib/store-products'
import { games } from '@/lib/game-data'
import { senoBalanceCodeProducts } from '@/lib/seno-balance-codes'
import type { Product } from './types'

export { storeProducts, discountedProducts, games, senoBalanceCodeProducts }
export function getProducts(options?: { supportsPackages?: boolean }) { return options?.supportsPackages === undefined ? storeProducts : storeProducts.filter((product) => product.supportsPackages === options.supportsPackages) }
export function getPackageEnabledProducts() { return getProducts({ supportsPackages: true }) }
export function getProductsByType(type: NonNullable<Product['productType']>) { return storeProducts.filter((product) => product.productType === type) }
export function getProductBySlug(slug: string) { return storeProducts.find((product) => product.slug === slug) }
export function getProductById(id: string) { return getProductBySlug(id) }
export function getProductsByCategory(category: Product['category']) { return storeProducts.filter((product) => product.category === category) }
export function getFeaturedProducts() { return storeProducts.filter((product) => product.isAvailable && product.discountPercentage > 0) }
export function getAvailableProducts() { return storeProducts.filter((product) => product.isAvailable) }
export function searchProducts(query: string) { const normalized = query.trim().toLocaleLowerCase(); return normalized ? storeProducts.filter((product) => `${product.name} ${product.detail}`.toLocaleLowerCase().includes(normalized)) : storeProducts }
export function getGames() { return games }
export function getGameById(id: string) { return games.find((game) => game.id === id) }
export function getSenoBalanceCodes() { return senoBalanceCodeProducts.filter((product) => product.active) }
