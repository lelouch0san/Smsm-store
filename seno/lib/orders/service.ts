import { getProductById, getGameById, getProductPackages, getSocialMediaServiceById } from '@/lib/data'
import { createOrder as createStoredOrder } from '@/lib/data/orders'
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
  const product = input.productId ? getProductById(input.productId) : undefined
  const game = input.gameId ? getGameById(input.gameId) : undefined
  const packageName = input.packageId
    ? game?.packages.find((item) => item.id === input.packageId)?.id ?? (product ? getProductPackages(product.slug).find((item) => item.id === input.packageId)?.id : undefined)
    : undefined
  return createStoredOrder({
    customerId: 'demo-user', customerName: 'أحمد محمد', customerEmail: 'ahmed@seno-store.com', customerPhone: '+20 10 1234 5678',
    source: input.serviceId ? 'social_media' : input.gameId ? 'game' : input.senoCode ? 'seno_code' : 'catalog',
    productId: input.productId ?? input.gameId ?? input.serviceId ?? 'unknown', productName: product?.name ?? game?.name ?? input.serviceId ?? 'طلب خدمة',
    productType: product?.productType ?? 'خدمة رقمية', category: product?.category ?? 'الخدمات', packageId: input.packageId, packageName,
    quantity: pricing.quantity, originalPrice: pricing.subtotal, unitPrice: pricing.unitPrice, subtotal: pricing.subtotal, discount: 0, finalPrice: pricing.total, currency: pricing.currency,
    paymentMethod: 'غير محدد', paymentStatus: 'pending', transactionId: '', customerInputs: Object.entries(input.accountData ?? {}).map(([key, value]) => ({ key, label: key, value })),
    fulfillmentMethod: 'manual', fulfillmentStatus: 'pending_review', status: 'pending_review', adminNotes: [],
    platform: input.platform, serviceId: input.serviceId, target: input.target, targetType: input.targetType, total: pricing.total,
  })
}
