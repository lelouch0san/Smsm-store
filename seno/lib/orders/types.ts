export type CreateOrderInput = {
  productId?: string
  packageId?: string
  gameId?: string
  quantity?: number
  accountData?: Record<string, string>
  platform?: string
  serviceId?: string
  target?: string
  targetType?: string
  senoCode?: boolean
  crypto?: boolean
  walletAddress?: string
  amount?: number
  metadata?: Record<string, unknown>
}

export type OrderPricing = { unitPrice: number; quantity: number; subtotal: number; total: number; currency: string }

export class OrderInputError extends Error {
  constructor(public code: string, message: string, public status = 400) { super(message) }
}
