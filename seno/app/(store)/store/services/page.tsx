import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'خدمات رقمية | Seno Store', description: 'خدمات رقمية متنوعة من Seno Store.' }
export default function ServicesPage() { return <StoreCategoryPage category="services" /> }
