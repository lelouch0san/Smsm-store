import { NextResponse } from 'next/server'
import { storeProducts } from '@/lib/data'
import { getGame } from '@/lib/data'
import { getSenoBalanceCodeProduct } from '@/lib/data'
import { createOrder, resolveOrderPricing, OrderInputError } from '@/lib/orders/service'
import { createOrderSchema, getValidationMessage } from '@/lib/validation'

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { productId?: unknown; packageId?: unknown; gameId?: unknown; accountData?: unknown; senoCode?: unknown; crypto?: unknown; socialMediaService?: unknown; quantity?: unknown } | null
  const parsedInput = createOrderSchema.safeParse(body ?? {})
  if (!parsedInput.success && !body?.crypto && !body?.senoCode && !body?.socialMediaService) return NextResponse.json({ success: false, message: getValidationMessage(parsedInput.error) }, { status: 400 })
  if (typeof body?.gameId === 'string') {
    const game = typeof body.gameId === 'string' ? getGame(body.gameId) : undefined
    const selectedPackage = game?.packages.find((item) => item.id === body.packageId)
    if (!game || !selectedPackage) return NextResponse.json({ success: false, message: 'Game or package not found' }, { status: 400 })
    if (!game.isAvailable) return NextResponse.json({ success: false, message: 'Game is currently unavailable' }, { status: 409 })
    if (!selectedPackage.isAvailable) return NextResponse.json({ success: false, message: 'Package is currently unavailable' }, { status: 409 })
    if (!body.accountData || typeof body.accountData !== 'object') return NextResponse.json({ success: false, message: 'Account data is required' }, { status: 400 })
    const accountData = body.accountData as Record<string, unknown>
    if (game.requiredFields.some((field) => typeof accountData[field.id] !== 'string' || !(accountData[field.id] as string).trim())) return NextResponse.json({ success: false, message: 'Required account data is missing' }, { status: 400 })
    return NextResponse.json({ success: true, gameId: game.id, packageId: selectedPackage.id, amount: selectedPackage.price, currency: selectedPackage.currency })
  }
  if (body?.socialMediaService === true) {
    const socialBody = body as { platform?: unknown; serviceId?: unknown; serviceName?: unknown; target?: unknown; targetType?: unknown; quantity?: unknown }
    if (typeof socialBody.platform !== 'string' || typeof socialBody.serviceId !== 'string' || typeof socialBody.target !== 'string' || !socialBody.target.trim()) return NextResponse.json({ success: false, message: 'Required service data is missing' }, { status: 400 })
    try {
      const order = createOrder({ serviceId: socialBody.serviceId, platform: socialBody.platform, target: socialBody.target, targetType: typeof socialBody.targetType === 'string' ? socialBody.targetType : undefined, quantity: socialBody.quantity as number })
      return NextResponse.json({ success: true, orderId: order.id, orderType: 'social_media_service', platform: order.platform, serviceId: order.serviceId, serviceName: socialBody.serviceName, target: order.target, targetType: order.targetType, quantity: order.quantity, unitPrice: order.unitPrice, totalPrice: order.total, currency: order.currency, status: order.status })
    } catch (error) { const isInputError = error instanceof OrderInputError; return NextResponse.json({ success: false, message: isInputError ? error.message : 'Unable to create order' }, { status: isInputError ? error.status : 400 }) }
  }
  if (body?.crypto === true) {
    const cryptoBody = body as { productId?: unknown; productName?: unknown; symbol?: unknown; network?: unknown; walletAddress?: unknown; amount?: unknown; quantity?: unknown; unitPrice?: unknown; totalPrice?: unknown }
    if (typeof cryptoBody.productId !== 'string' || typeof cryptoBody.network !== 'string' || typeof cryptoBody.walletAddress !== 'string' || cryptoBody.walletAddress.trim().length < 20) return NextResponse.json({ success: false, message: 'بيانات العملة أو عنوان المحفظة غير صالح' }, { status: 400 })
    if (typeof cryptoBody.amount !== 'number' || cryptoBody.amount <= 0 || typeof cryptoBody.quantity !== 'number' || !Number.isInteger(cryptoBody.quantity) || cryptoBody.quantity <= 0) return NextResponse.json({ success: false, message: 'الكمية غير صالحة' }, { status: 400 })
    return NextResponse.json({ success: true, orderId: `SNO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, productId: cryptoBody.productId, productName: cryptoBody.productName, symbol: cryptoBody.symbol, network: cryptoBody.network, amount: cryptoBody.amount, quantity: cryptoBody.quantity, totalPrice: cryptoBody.totalPrice, status: 'pending' })
  }
  if (body?.senoCode === true) {
    const productId = typeof body.productId === 'string' ? body.productId : ''
    const product = getSenoBalanceCodeProduct(productId)
    if (!product || !product.active) return NextResponse.json({ success: false, message: 'SENO code not found' }, { status: 400 })
    if (!product.available) return NextResponse.json({ success: false, message: 'SENO code is currently unavailable' }, { status: 409 })
    return NextResponse.json({ success: true, orderId: `SNO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, productId: product.id, sku: product.sku, amount: product.price, denomination: product.denomination, currency: product.currency, fulfillmentStatus: 'pending_whatsapp', whatsappPurchase: true })
  }

  const productId = typeof body?.productId === 'string' ? body.productId : ''
  const product = storeProducts.find((item) => item.slug === productId)
  const digitalPackage = product?.digitalCardPackages?.find((item) => item.id === body?.packageId)

  if (!product) {
    return NextResponse.json({ success: false, message: 'Product not found' }, { status: 400 })
  }

  if (!product.isAvailable || (product.digitalCardPackages && (!digitalPackage || !digitalPackage.available))) {
    return NextResponse.json({ success: false, message: 'Product is currently unavailable' }, { status: 409 })
  }

  try {
    const order = createOrder({ productId: product.slug, packageId: typeof body?.packageId === 'string' ? body.packageId : undefined, quantity: typeof body?.quantity === 'number' ? body.quantity : undefined })
    return NextResponse.json({ success: true, orderId: order.id, productId: order.productId, packageId: order.packageId, amount: order.total, currency: order.currency, deliveryType: digitalPackage ? 'digital' : undefined, fulfillmentStatus: digitalPackage ? 'pending_delivery' : undefined })
  } catch (error) { const isInputError = error instanceof OrderInputError; return NextResponse.json({ success: false, message: isInputError ? error.message : 'Unable to create order' }, { status: isInputError ? error.status : 400 }) }
}
