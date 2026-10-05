import type { Metadata } from 'next'
import { StoreCategoryPage } from '@/components/store-category-page'

export const metadata: Metadata = { title: 'سحب الأموال | Seno Store', description: 'واجهة تجريبية لسحب الرصيد إلى وسيلة الدفع المناسبة.' }
export default function WithdrawPage() { return <StoreCategoryPage category="withdraw" /> }
