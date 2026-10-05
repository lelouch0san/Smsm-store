export type ProductField = { key: string; label: string; type: 'text'; required: boolean; placeholder: string }
export type VoiceChatProduct = { name: string; slug: string; category: 'voice-chat'; image: string; description: string; currency: 'USD'; conversion: { type: 'fixed-rate'; ratePerUnit: number; unitName: string; rounding: 'nearest' }; pricing: { minAmount: number; maxAmount: number }; requiredFields: ProductField[]; fulfillment: { type: 'api' }; active: boolean }

const artwork = 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/file_0000000015f4820aad3a7637b56e3f84-WGC1XKchVlp1uO7orecqwKhbJ0S36M.png'

export const voiceChatProducts: VoiceChatProduct[] = [
  { name: 'Sahra Chat', slug: 'sahra-chat', category: 'voice-chat', image: artwork, description: 'اشحن عملات تطبيق سهرة شات بسرعة وأمان.', currency: 'USD', conversion: { type: 'fixed-rate', ratePerUnit: 9905, unitName: 'عملات', rounding: 'nearest' }, pricing: { minAmount: 1, maxAmount: 1000 }, requiredFields: [{ key: 'userId', label: 'رقم المستخدم', type: 'text', required: true, placeholder: '123456789' }], fulfillment: { type: 'api' }, active: true },
  { name: 'Soul Star', slug: 'soul-star', image: artwork, category: 'voice-chat', description: 'اشحن رصيد Soul Star مباشرة إلى حسابك.', currency: 'USD', conversion: { type: 'fixed-rate', ratePerUnit: 8200, unitName: 'عملات', rounding: 'nearest' }, pricing: { minAmount: 1, maxAmount: 1000 }, requiredFields: [{ key: 'userId', label: 'رقم المستخدم', type: 'text', required: true, placeholder: '123456789' }], fulfillment: { type: 'api' }, active: true },
  { name: 'Crack', slug: 'crack', image: artwork, category: 'voice-chat', description: 'أضف العملات إلى حساب Crack بسهولة.', currency: 'USD', conversion: { type: 'fixed-rate', ratePerUnit: 7500, unitName: 'عملات', rounding: 'nearest' }, pricing: { minAmount: 1, maxAmount: 1000 }, requiredFields: [{ key: 'userId', label: 'رقم المستخدم', type: 'text', required: true, placeholder: '123456789' }], fulfillment: { type: 'api' }, active: true },
]

export function getVoiceChatProduct(slug: string) { return voiceChatProducts.find((product) => product.slug === slug && product.active) }
export function calculateProductQuantity(product: VoiceChatProduct, amount: number) { return Math.round(amount * product.conversion.ratePerUnit) }
export function validateAmount(product: VoiceChatProduct, amount: number) { return Number.isFinite(amount) && amount >= product.pricing.minAmount && amount <= product.pricing.maxAmount }
export function validateUserId(value: string) { return /^\d{6,20}$/.test(value.trim()) }
