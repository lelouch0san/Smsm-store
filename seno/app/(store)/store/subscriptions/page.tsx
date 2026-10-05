import type { Metadata } from 'next'
import { SubscriptionsStorePage } from '@/components/subscriptions-store-page'

export const metadata: Metadata = { title: 'الاشتراكات | Seno Store', description: 'اشتراكات ترفيه وإنتاجية رقمية.' }
export default function SubscriptionsPage() { return <SubscriptionsStorePage /> }
