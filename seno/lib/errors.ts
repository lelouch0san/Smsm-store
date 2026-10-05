export function getUserFriendlyError(error: unknown): string {
  const message = error instanceof Error ? error.message.toLowerCase() : String(error).toLowerCase()
  if (message.includes('unauthorized') || message.includes('login')) return 'يرجى تسجيل الدخول أولاً.'
  if (message.includes('balance') || message.includes('insufficient')) return 'الرصيد غير كافٍ لإتمام العملية.'
  if (message.includes('unavailable')) return 'هذا المنتج أو الخدمة غير متاح حالياً.'
  if (message.includes('network') || message.includes('fetch')) return 'تعذر الاتصال بالخدمة. حاول مرة أخرى.'
  if (message.includes('invalid') || message.includes('required')) return 'يرجى مراجعة البيانات المدخلة.'
  return 'حدث خطأ غير متوقع. حاول مرة أخرى.'
}
