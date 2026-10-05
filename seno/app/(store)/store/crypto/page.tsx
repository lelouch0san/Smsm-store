import type { Metadata } from 'next'
import { CryptoStorePage } from '@/components/crypto-store-page'

export const metadata: Metadata = { title: 'العملات الرقمية | Seno Store', description: 'واجهة اختيار باقات العملات الرقمية.' }
export default function CryptoPage() { return <CryptoStorePage /> }
