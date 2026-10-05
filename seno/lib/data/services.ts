import { voiceChatProducts } from '@/lib/voice-chat-products'
import type { SocialMediaService } from './types'

export const getServices = () => voiceChatProducts
export const getServiceBySlug = (slug: string) => voiceChatProducts.find((service) => service.slug === slug && service.active)

const socialPlatforms = [
  ['instagram', 'Instagram'], ['tiktok', 'TikTok'], ['facebook', 'Facebook'], ['youtube', 'YouTube'], ['x', 'X'],
] as const
const socialKinds = [['followers', 'متابعين', 'profile_url', 'رابط الحساب'], ['likes', 'لايكات', 'post_url', 'رابط المنشور'], ['views', 'مشاهدات', 'video_url', 'رابط الفيديو'], ['shares', 'مشاركات', 'post_url', 'رابط المنشور']] as const

export const socialMediaServices: SocialMediaService[] = socialPlatforms.flatMap(([platform, label]) => socialKinds.map(([kind, name, inputType, inputLabel], index) => ({ id: `${platform}-${kind}`, platform, name: `${name} ${label}`, inputType, inputLabel, quantityRequired: true, minimumQuantity: 100, maximumQuantity: 100000, quantityStep: 100, pricePerUnit: 0.000112 + index * 0.00001, currency: 'USD', active: true, available: true, instructions: ['يبدأ تنفيذ الطلب بعد المراجعة', 'تأكد من صحة الرابط قبل الشراء'] })))
export function getSocialMediaServices(platform?: string) { return socialMediaServices.filter((service) => !platform || service.platform === platform) }
export function getSocialMediaServiceById(id: string) { return socialMediaServices.find((service) => service.id === id) }
