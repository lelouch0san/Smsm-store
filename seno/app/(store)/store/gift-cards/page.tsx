import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'البطاقات الرقمية | Seno Store', description: 'بطاقات رقمية وشحن مباشر لأشهر الخدمات.' }
export default function GiftCardsPage() { return <StoreCategoryPage category="gift-cards" /> }
