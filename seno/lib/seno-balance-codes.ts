export type SenoBalanceCodeProduct = {
  id: string
  sku: string
  name: string
  denomination: number
  price: number
  currency: 'USD'
  description: string
  imageUrl: string
  active: boolean
  available: boolean
}

export const senoBalanceCodeProducts: SenoBalanceCodeProduct[] = [10, 20, 25, 50, 100, 200].map((denomination) => ({
  id: `seno-code-${denomination}`,
  sku: `SENO-${denomination}`,
  name: `كود سينو رصيد $${denomination}`,
  denomination,
  price: denomination + 1,
  currency: 'USD',
  description: 'رصيد سينو مسبق الدفع',
  imageUrl: '/images/seno-balance-code.png',
  active: true,
  available: true,
}))

export function getSenoBalanceCodeProduct(id: string) {
  return senoBalanceCodeProducts.find((product) => product.id === id)
}
