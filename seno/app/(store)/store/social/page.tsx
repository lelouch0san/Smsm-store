import type { Metadata } from 'next'
import { SocialMediaServicesPage } from '@/components/social-media-services-page'

export const metadata: Metadata = { title: 'خدمات السوشيال | Seno Store', description: 'خدمات رقمية احترافية لحساباتك.' }
export default function SocialPage() { return <SocialMediaServicesPage /> }
