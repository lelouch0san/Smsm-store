import { z } from 'zod'

export const idSchema = z.string().trim().min(1, 'هذا الحقل مطلوب.')
export const emailSchema = z.string().trim().email('يرجى إدخال بريد إلكتروني صحيح.')
export const urlSchema = z.string().trim().url('يرجى إدخال رابط صحيح.')
export const quantitySchema = z.number({ error: 'العدد غير صحيح.' }).int('العدد يجب أن يكون رقماً صحيحاً.').positive('العدد يجب أن يكون أكبر من صفر.')
export const currencySchema = z.string().trim().min(3, 'العملة غير صحيحة.')
export const createOrderSchema = z.object({ productId: idSchema.optional(), packageId: idSchema.optional(), serviceId: idSchema.optional(), gameId: idSchema.optional(), quantity: quantitySchema.optional(), targetUrl: urlSchema.optional(), target: z.string().trim().min(1, 'هذا الحقل مطلوب.').optional(), playerId: z.string().trim().min(1, 'معرّف اللاعب مطلوب.').optional(), accountId: z.string().trim().min(1, 'معرّف الحساب مطلوب.').optional(), metadata: z.record(z.string(), z.unknown()).optional() }).refine((value) => value.productId || value.serviceId || value.gameId, { message: 'يجب تحديد المنتج أو الخدمة.' })
export const socialMediaTargetSchema = z.discriminatedUnion('targetType', [z.object({ targetType: z.literal('profile_url'), target: urlSchema }), z.object({ targetType: z.literal('post_url'), target: urlSchema }), z.object({ targetType: z.literal('video_url'), target: urlSchema }), z.object({ targetType: z.literal('username'), target: z.string().trim().min(2, 'اسم المستخدم غير صحيح.') })])
export const redeemSenoCodeSchema = z.object({ code: z.string().trim().min(4, 'يرجى إدخال كود صحيح.') })
export const loginSchema = z.object({ email: emailSchema, password: z.string().min(1, 'يرجى إدخال كلمة المرور.') })
export const registerSchema = loginSchema.extend({ name: z.string().trim().min(2, 'يرجى إدخال الاسم.') })
export const rechargeSchema = z.object({ amount: z.number().positive('المبلغ يجب أن يكون أكبر من صفر.'), paymentMethod: idSchema, reference: z.string().trim().optional() })
export function validateQuantity(value: number, minimum: number, maximum: number, step = 1) { return quantitySchema.refine((quantity) => quantity >= minimum && quantity <= maximum && (quantity - minimum) % step === 0, `العدد يجب أن يكون بين ${minimum} و ${maximum} وبخطوة ${step}.`).safeParse(value) }
export function getValidationMessage(error: unknown) { const first = error instanceof z.ZodError ? error.issues[0]?.message : undefined; return first || 'يرجى مراجعة البيانات المدخلة.' }
