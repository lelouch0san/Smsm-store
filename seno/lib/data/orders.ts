import { normalizeLegacyFulfillmentStatus, orderStatusLabels, ORDER_TRANSITIONS, validateOrderTransition, type FulfillmentStatus, type OrderStatus } from '@/utils/order-status'

export type { FulfillmentStatus, OrderStatus } from '@/utils/order-status'
export type FulfillmentMethod = 'manual' | 'automatic'
export type PaymentStatus = 'paid' | 'pending' | 'failed' | 'refunded'
export type OrderTimelineEvent = { id: string; label: string; detail?: string; createdAt: string }
export type CustomerInputValue = { key: string; label: string; value: string }
export type Order = {
  id: string; customerId: string; customerName: string; customerEmail: string; customerPhone: string
  publicOrderNumber?: string; source?: 'catalog' | 'game' | 'social_media' | 'digital_card' | 'subscription' | 'crypto' | 'seno_code'
  productId: string; productName: string; productType: string; category: string; packageId?: string; packageName?: string
  quantity: number; originalPrice: number; unitPrice?: number; subtotal?: number; discount: number; finalPrice: number; currency: string
  paymentMethod: string; paymentStatus: PaymentStatus; transactionId: string; customerInputs: CustomerInputValue[]
  fulfillmentMethod: FulfillmentMethod; fulfillmentStatus: FulfillmentStatus; status: OrderStatus; providerName?: string; providerReference?: string
  customerNote?: string; adminNotes: string[]; failureReason?: string; rejectionReason?: string; platform?: string; serviceId?: string; target?: string; targetType?: string; total?: number; createdAt: string; updatedAt: string
  startedAt?: string; completedAt?: string; timeline: OrderTimelineEvent[]
}

// Keep mock timestamps deterministic so server-rendered and client-rendered order views match.
const mockNow = new Date('2026-10-05T00:00:00.000Z')
const iso = (days: number, hours = 0) => new Date(mockNow.getTime() - (days * 86400000 + hours * 3600000)).toISOString()
const event = (id: string, label: string, createdAt: string, detail?: string): OrderTimelineEvent => ({ id, label, createdAt, detail })

let orders: Order[] = [
  { id: 'SENO-1048', customerId: 'CUS-104', customerName: 'محمد علي', customerEmail: 'mohamed@example.com', customerPhone: '+966501234567', productId: 'p-pubg', productName: 'PUBG Mobile', productType: 'شحن الألعاب', category: 'الألعاب', packageId: 'pkg-60', packageName: '60 UC', quantity: 1, originalPrice: 12, discount: 0, finalPrice: 12, currency: 'ر.س', paymentMethod: 'المحفظة', paymentStatus: 'paid', transactionId: 'TX-99001', customerInputs: [{ key: 'player_id', label: 'Player ID', value: '51290418' }, { key: 'server', label: 'Server', value: 'Middle East' }], fulfillmentMethod: 'manual', fulfillmentStatus: 'manual_review', status: 'pending_review', adminNotes: [], createdAt: iso(0, 2), updatedAt: iso(0, 2), timeline: [event('e1', 'تم إنشاء الطلب', iso(0, 2)), event('e2', 'تم تأكيد الدفع', iso(0, 2))] },
  { id: 'SENO-1047', customerId: 'CUS-021', customerName: 'سارة خالد', customerEmail: 'sara@example.com', customerPhone: '+966551112233', productId: 'p-instagram', productName: 'Instagram Followers', productType: 'خدمات السوشيال ميديا', category: 'السوشيال ميديا', packageId: 'pkg-1k', packageName: '1000 متابع', quantity: 1, originalPrice: 28, discount: 3, finalPrice: 25, currency: 'ر.س', paymentMethod: 'بطاقة بنكية', paymentStatus: 'paid', transactionId: 'TX-98991', customerInputs: [{ key: 'profile_url', label: 'رابط الحساب', value: 'instagram.com/seno' }], fulfillmentMethod: 'manual', fulfillmentStatus: 'processing', status: 'processing', providerName: 'Admin / Manual', adminNotes: ['تمت مراجعة الرابط'], createdAt: iso(1), updatedAt: iso(0, 8), startedAt: iso(0, 8), timeline: [event('e3', 'تم إنشاء الطلب', iso(1)), event('e4', 'بدأ التنفيذ اليدوي', iso(0, 8), 'بواسطة أحمد محمد')] },
  { id: 'SENO-1046', customerId: 'CUS-084', customerName: 'خالد حسن', customerEmail: 'khaled@example.com', customerPhone: '+966509998877', productId: 'p-capcut', productName: 'CapCut Pro', productType: 'الاشتراكات', category: 'الاشتراكات', packageId: 'pkg-month', packageName: 'شهر واحد', quantity: 1, originalPrice: 39, discount: 0, finalPrice: 39, currency: 'ر.س', paymentMethod: 'المحفظة', paymentStatus: 'paid', transactionId: 'TX-98920', customerInputs: [{ key: 'email', label: 'البريد الإلكتروني', value: 'khaled@example.com' }], fulfillmentMethod: 'automatic', fulfillmentStatus: 'completed', status: 'completed', providerName: 'Example API Provider', adminNotes: [], createdAt: iso(2), updatedAt: iso(1), startedAt: iso(2), completedAt: iso(1), timeline: [event('e5', 'تم إنشاء الطلب', iso(2)), event('e6', 'اكتمل الطلب', iso(1), 'Example API Provider')] },
  { id: 'SENO-1045', customerId: 'CUS-067', customerName: 'نور أحمد', customerEmail: 'noor@example.com', customerPhone: '+966544445555', productId: 'p-usdt', productName: 'USDT', productType: 'العملات الرقمية', category: 'العملات الرقمية', packageName: '25 USDT', quantity: 1, originalPrice: 94, discount: 0, finalPrice: 94, currency: 'ر.س', paymentMethod: 'تحويل بنكي', paymentStatus: 'failed', transactionId: 'TX-98870', customerInputs: [{ key: 'network', label: 'الشبكة', value: 'TRC20' }, { key: 'wallet', label: 'عنوان المحفظة', value: 'TXYZ...89AB' }], fulfillmentMethod: 'manual', fulfillmentStatus: 'failed', status: 'failed', failureReason: 'عنوان المحفظة غير صالح', adminNotes: [], createdAt: iso(3), updatedAt: iso(2), timeline: [event('e7', 'تم إنشاء الطلب', iso(3)), event('e8', 'فشل التنفيذ', iso(2), 'عنوان المحفظة غير صالح')] },
  { id: 'SENO-1044', customerId: 'CUS-012', customerName: 'عمر سعيد', customerEmail: 'omar@example.com', customerPhone: '+966500001122', productId: 'p-google', productName: 'Google Play USA', productType: 'البطاقات الرقمية', category: 'البطاقات الرقمية', packageName: '$25', quantity: 1, originalPrice: 99, discount: 0, finalPrice: 99, currency: 'ر.س', paymentMethod: 'بطاقة بنكية', paymentStatus: 'refunded', transactionId: 'TX-98770', customerInputs: [], fulfillmentMethod: 'manual', fulfillmentStatus: 'not_started', status: 'refunded', adminNotes: [], createdAt: iso(5), updatedAt: iso(4), failureReason: 'طلب العميل', timeline: [event('e9', 'تم إنشاء الطلب', iso(5)), event('e10', 'تم استرداد المبلغ', iso(4), 'طلب العميل')] } as Order,
]

export { orderStatusLabels }
export const fulfillmentLabels: Record<FulfillmentMethod, string> = { manual: 'تنفيذ يدوي', automatic: 'تنفيذ تلقائي' }
export const getOrders = () => orders
export const getOrderById = (id: string) => orders.find(order => order.id === id)
export const getOrdersByCustomerId = (customerId: string) => orders.filter(order => order.customerId === customerId)
export const createOrder = (input: Omit<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline'> & Partial<Pick<Order, 'id' | 'createdAt' | 'updatedAt' | 'timeline'>>) => {
  const now = input.createdAt ?? new Date().toISOString()
  const order: Order = {
    ...input,
    id: input.id ?? `SENO-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
    publicOrderNumber: input.publicOrderNumber ?? input.id,
    createdAt: now,
    updatedAt: input.updatedAt ?? now,
    timeline: input.timeline ?? [event(`${input.id ?? 'order'}-created`, 'تم إنشاء الطلب', now)],
  }
  orders.unshift(order)
  return order
}
export const updateOrder = (id: string, patch: Partial<Pick<Order, 'status' | 'fulfillmentStatus' | 'paymentStatus' | 'customerNote' | 'providerReference' | 'failureReason' | 'rejectionReason'>>) => {
  const order = getOrderById(id)
  if (!order) return undefined
  Object.assign(order, patch, { updatedAt: new Date().toISOString() })
  return order
}
export const getOrdersByStatus = (status: OrderStatus) => orders.filter(order => order.status === status)
export const getOrderCounts = () => Object.fromEntries((Object.keys(orderStatusLabels) as OrderStatus[]).map(status => [status, getOrdersByStatus(status).length])) as Record<OrderStatus, number>
export function transitionOrder(id: string, next: OrderStatus, detail?: string) {
  const order = getOrderById(id)
  if (!order) return { ok: false as const, code: 'order_not_found' as const, message: 'الطلب غير موجود' }
  const result = validateOrderTransition(order.status, next)
  if (!result.ok) return result
  const at = new Date().toISOString()
  order.status = next; order.updatedAt = at
  if (next === 'processing') { order.startedAt = at; if (order.fulfillmentStatus === 'not_started' || order.fulfillmentStatus === 'manual_review') order.fulfillmentStatus = 'processing' }
  if (next === 'completed') { order.completedAt = at }
  if (next === 'failed') order.failureReason = detail || 'فشل التنفيذ اليدوي'
  if (next === 'rejected') order.rejectionReason = detail || 'تم رفض الطلب من قبل الإدارة'
  order.timeline.push(event(`${id}-${at}`, `تم تحديث الحالة إلى ${orderStatusLabels[next]}`, at, detail))
  return { ok: true as const, from: result.from, to: result.to, order }
}
export function getAllowedOrderTransitions(status: OrderStatus) { return ORDER_TRANSITIONS[status] ?? [] }
export function normalizeOrderFulfillmentStatus(value: string): FulfillmentStatus { return normalizeLegacyFulfillmentStatus(value) }
export function addOrderNote(id: string, note: string) { const order = getOrderById(id); if (!order || !note.trim()) return false; order.adminNotes.push(note.trim()); order.updatedAt = new Date().toISOString(); order.timeline.push(event(`${id}-note-${Date.now()}`, 'تمت إضافة ملاحظة إدارية', order.updatedAt, note.trim())); return true }
export function canTransition(order: Order, next: OrderStatus) { return validateOrderTransition(order.status, next).ok }
export const orderStatuses = Object.keys(orderStatusLabels) as OrderStatus[]
export const fulfillmentProviders = [{ id: 'manual', name: 'Admin / Manual', type: 'manual', active: true, notes: 'التنفيذ اليدوي الحالي' }, { id: 'example-api', name: 'Example API Provider', type: 'api', active: false, notes: 'مزود تجريبي للمستقبل' }, { id: 'example-social', name: 'Example Social Provider', type: 'api', active: false, notes: 'مزود تجريبي للمستقبل' }] as const
export const fulfillmentRules = [{ name: 'التنفيذ اليدوي الافتراضي', method: 'manual', retry: true, cancellation: true, refund: true, timeout: 24 }, { name: 'مزود API التجريبي', method: 'automatic', retry: true, cancellation: false, refund: false, timeout: 2 }] as const
