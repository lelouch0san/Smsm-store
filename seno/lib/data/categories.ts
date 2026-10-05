import type { Category } from './types'

export const categories: Category[] = [
  { id: 'games', name: 'شحن الألعاب', nameEn: 'Game Top-ups', slug: 'games', type: 'store', purpose: 'general', order: 1, active: true, image: '/images/category-games.png' },
  { id: 'apps', name: 'شحن التطبيقات', slug: 'apps', type: 'store', order: 2, active: true, image: '/images/category-apps.png' },
  { id: 'gift-cards', name: 'البطاقات الرقمية', slug: 'gift-cards', type: 'store', order: 3, active: true, image: '/images/category-gift-cards.png' },
  { id: 'services', name: 'خدمات أخرى', slug: 'services', type: 'store', order: 4, active: true, image: '/images/category-services.png' },
  { id: 'shopping', name: 'التسوق', slug: 'shopping', type: 'store', order: 5, active: true, image: '/images/category-shopping.png' },
  { id: 'subscriptions', name: 'الاشتراكات', slug: 'subscriptions', type: 'store', order: 6, active: true, image: '/images/category-subscriptions.png' },
  { id: 'crypto', name: 'العملات الرقمية', slug: 'crypto', type: 'store', order: 7, active: true, image: '/images/category-crypto.png' },
  { id: 'social', name: 'السوشيال ميديا (خدمات)', slug: 'social', type: 'service', order: 8, active: true, image: '/images/category-username-lots.png' },
  { id: 'withdraw', name: 'سحب الأموال', slug: 'withdraw', type: 'account', order: 9, active: true, image: '/images/category-money-withdrawal.png' },
]

export function getCategories() { return categories.filter((category) => category.active) }
export function getCategoryById(id: string) { return categories.find((category) => category.id === id) }
export function getCategoryBySlug(slug: string) { return categories.find((category) => category.slug === slug) }
