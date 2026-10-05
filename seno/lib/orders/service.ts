import { getProductById, getGameById, getProductPackages, getSocialMediaServiceById } from '@/lib/data'
import type { CreateOrderInput, OrderPricing } from './types'
import { OrderInputError } from './types'
export { OrderInputError } from './types'

function quantityOf(value: unknown) {
  if (value === undefined) return 1
  if (typeof value !== 'number' || !Number.isInteger(value) || value < 1) throw new OrderInputError('invalid_quantity', 'Invalid quantity')
  return value
}

export function resolveOrderPricing(input: CreateOrderInput): OrderPricing {
  const quantity = quantityOf(input.quantity)
  if (input.serviceId) {
    const service = getSocialMediaServiceById(input.serviceId)
    if (!service || !service.active) throw new OrderInputError('service_not_found', 'Service not found')
    if (!service.available) throw new OrderInputError('service_unavailable', 'Service unavailable', 409)
    if (quantity < service.minimumQuantity || quantity > service.maximumQuantity || quantity % service.quantityStep !== 0) throw new OrderInputError('invalid_quantity', 'Quantity is outside the allowed range')
    const total = Number((service.pricePerUnit * quantity).toFixed(6))
    return { unitPrice: service.pricePerUnit, quantity, subtotal: total, total, currency: service.currency }
  }
  if (input.gameId) {
    const game = getGameById(input.gameId)
    const pack = game?.packages.find((item) => item.id === input.packageId)
    if (!game || !pack) throw new OrderInputError('package_not_found', 'Game package not found')
    if (!game.isAvailable || !pack.isAvailable) throw new OrderInputError('unavailable', 'Product unavailable', 409)
    return { unitPrice: pack.price, quantity, subtotal: pack.price * quantity, total: pack.price * quantity, currency: pack.currency }
  }
  if (!input.productId) throw new OrderInputError('product_required', 'Product is required')
  const product = getProductById(input.productId)
  if (!product || !product.isAvailable) throw new OrderInputError('product_unavailable', 'Product unavailable', 409)
  const pack = input.packageId ? getProductPackages(product.slug).find((item) => item.id === input.packageId) : undefined
  if (input.packageId && (!pack || !('available' in pack) || !pack.available)) throw new OrderInputError('package_unavailable', 'Package unavailable', 409)
  const unitPrice = pack && 'sellingPrice' in pack ? pack.sellingPrice : product.price
  const currency = pack && 'sellingCurrency' in pack ? pack.sellingCurrency : 'EGP'
  return { unitPrice, quantity, subtotal: unitPrice * quantity, total: unitPrice * quantity, currency }
}

export function createOrder(input: CreateOrderInput) {
  const pricing = resolveOrderPricing(input)
  return { id: `SNO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, ...input, ...pricing, status: 'pending' as const, createdAt: new Date().toISOString() }
}
