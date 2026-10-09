export const ORDER_STATUSES = ['pending_review', 'processing', 'completed', 'rejected', 'failed', 'cancelled', 'refunded'] as const
export type OrderStatus = (typeof ORDER_STATUSES)[number]

export const FULFILLMENT_STATUSES = ['not_started', 'queued', 'processing', 'completed', 'failed', 'manual_review'] as const
export type FulfillmentStatus = (typeof FULFILLMENT_STATUSES)[number]

export const orderStatusLabels: Record<OrderStatus, string> = {
  pending_review: 'بانتظار المراجعة', processing: 'قيد التنفيذ', completed: 'مكتمل', rejected: 'مرفوض', failed: 'فاشل', cancelled: 'ملغي', refunded: 'مسترد',
}
export const fulfillmentStatusLabels: Record<FulfillmentStatus, string> = {
  not_started: 'لم يبدأ', queued: 'في قائمة الانتظار', processing: 'قيد التنفيذ', completed: 'مكتمل', failed: 'فاشل', manual_review: 'مراجعة يدوية',
}

export const ORDER_TRANSITIONS: Record<OrderStatus, readonly OrderStatus[]> = {
  pending_review: ['processing', 'rejected', 'cancelled'],
  processing: ['completed', 'failed', 'cancelled'],
  completed: ['refunded'],
  rejected: [], failed: ['processing'], cancelled: [], refunded: [],
}

export type TransitionResult =
  | { ok: true; from: OrderStatus; to: OrderStatus }
  | { ok: false; code: 'invalid_transition' | 'unknown_status'; message: string }

export function canTransitionStatus(current: OrderStatus, next: OrderStatus) {
  return ORDER_TRANSITIONS[current]?.includes(next) ?? false
}

export function validateOrderTransition(current: OrderStatus, next: OrderStatus): TransitionResult {
  if (!ORDER_STATUSES.includes(current) || !ORDER_STATUSES.includes(next)) return { ok: false, code: 'unknown_status', message: 'حالة الطلب غير معروفة' }
  if (!canTransitionStatus(current, next)) return { ok: false, code: 'invalid_transition', message: `لا يمكن الانتقال من ${orderStatusLabels[current]} إلى ${orderStatusLabels[next]}` }
  return { ok: true, from: current, to: next }
}

export function normalizeLegacyFulfillmentStatus(value: string): FulfillmentStatus {
  if (value === 'pending_review') return 'manual_review'
  if (value === 'refunded' || value === 'cancelled' || value === 'rejected') return 'not_started'
  if ((FULFILLMENT_STATUSES as readonly string[]).includes(value)) return value as FulfillmentStatus
  return 'manual_review'
}
