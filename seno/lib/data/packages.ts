import { storeProducts } from '@/lib/store-products'
import { games } from '@/lib/game-data'
import type { ProductPackage } from './types'
import type { ProductOption } from '@/lib/store-products'

export function getProductPackages(productId: string): ProductPackage[] { return storeProducts.find((product) => product.slug === productId)?.digitalCardPackages ?? [] }
export function getPackagesByProduct(productId: string): ProductOption[] { return getProductPackages(productId) as ProductOption[] }
export function getPackageById(packageId: string) { return storeProducts.flatMap((product) => product.digitalCardPackages ?? []).find((item) => item.id === packageId) }
export function getAvailablePackagesByProduct(productId: string) { return getPackagesByProduct(productId).filter((item) => item.available && (item.status === undefined || item.status === 'active')).sort((a, b) => a.sortOrder - b.sortOrder) }
export function getGamePackages(gameId: string) { return games.find((game) => game.id === gameId)?.packages ?? [] }
export function getAvailableProductPackages(productId: string) { return getProductPackages(productId).filter((pack) => 'available' in pack ? pack.available : pack.isAvailable) }
export function getAvailableGamePackages(gameId: string) { return getGamePackages(gameId).filter((pack) => pack.isAvailable) }
