import { storeProducts, discountedProducts } from '@/lib/store-products'
import { games } from '@/lib/game-data'
import { senoBalanceCodeProducts } from '@/lib/seno-balance-codes'
import { categories } from './categories'
import type { Product } from './types'

const categoryIds: Record<string, string> = Object.fromEntries(categories.map((category) => [category.name, category.id]))

export const canonicalProducts: Product[] = storeProducts.map((product, index) => ({
  ...product,
  id: product.slug,
  categoryId: categoryIds[product.category] || product.category,
  productTypeId: product.productType ? `product-type-${['game-top-up', 'voice-top-up', 'gift-card', 'subscription', 'service'].indexOf(product.productType) + 1}` : undefined,
  displayOrder: index + 1,
  availability: product.status || (product.isAvailable ? 'active' : 'inactive'),
}))

export { canonicalProducts as storeProducts, discountedProducts, games, senoBalanceCodeProducts }
export function getProducts(options?: { supportsPackages?: boolean }) { return options?.supportsPackages === undefined ? canonicalProducts : canonicalProducts.filter((product) => product.supportsPackages === options.supportsPackages) }
export function getPackageEnabledProducts() { return getProducts({ supportsPackages: true }) }
export function getProductsByType(type: NonNullable<Product['productType']>) { return canonicalProducts.filter((product) => product.productType === type) }
export function getProductBySlug(slug: string) { return canonicalProducts.find((product) => product.slug === slug) }
export function getProductById(id: string) { return canonicalProducts.find((product) => product.id === id) }
export function getProductsByCategory(category: Product['category'] | string) { return canonicalProducts.filter((product) => product.category === category || product.categoryId === category) }
export function getFeaturedProducts() { return canonicalProducts.filter((product) => product.isAvailable && product.discountPercentage > 0) }
export function getAvailableProducts() { return canonicalProducts.filter((product) => product.isAvailable && product.availability === 'active') }
export function getProductsByTypeId(productTypeId: string) { return canonicalProducts.filter((product) => product.productTypeId === productTypeId) }
export function searchProducts(query: string) { const normalized = query.trim().toLocaleLowerCase(); return normalized ? canonicalProducts.filter((product) => `${product.name} ${product.detail} ${product.slug}`.toLocaleLowerCase().includes(normalized)) : canonicalProducts }
export function getGames() { return games }
export function getGameById(id: string) { return games.find((game) => game.id === id) }
export function getSenoBalanceCodes() { return senoBalanceCodeProducts.filter((product) => product.active) }
