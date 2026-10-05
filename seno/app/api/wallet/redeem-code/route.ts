import { NextResponse } from 'next/server'

const codeInventory = new Map([
  ['SENO-REDEEM-10', { amount: 10, status: 'available' }],
  ['SENO-REDEEM-25', { amount: 25, status: 'available' }],
  ['SENO-REDEEM-50', { amount: 50, status: 'available' }],
])

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { code?: unknown } | null
  const normalized = typeof body?.code === 'string' ? body.code.trim().toUpperCase() : ''
  const record = codeInventory.get(normalized)
  if (!record) return NextResponse.json({ message: 'كود الشحن غير صحيح' }, { status: 400 })
  if (record.status === 'used') return NextResponse.json({ message: 'هذا الكود تم استخدامه بالفعل' }, { status: 409 })
  if (record.status === 'expired') return NextResponse.json({ message: 'انتهت صلاحية هذا الكود' }, { status: 410 })
  record.status = 'used'
  return NextResponse.json({ amount: record.amount })
}
