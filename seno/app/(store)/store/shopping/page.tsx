import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'التسوق | Seno Store', description: 'بطاقات ومفاتيح رقمية من Seno Store.' }
export default function ShoppingPage() { return <StoreCategoryPage category="shopping" /> }
