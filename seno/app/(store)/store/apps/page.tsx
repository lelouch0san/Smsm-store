import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'شحن التطبيقات | Seno Store', description: 'اشحن تطبيقاتك وخدماتك الرقمية بسهولة.' }
export default function AppsPage() { return <StoreCategoryPage category="apps" /> }
