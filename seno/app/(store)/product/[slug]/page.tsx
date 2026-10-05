import { notFound } from 'next/navigation'
import ProductDetailsClient from './product-details-client'

const productSlugs = new Set(['pubg-mobile', 'sahra-chat', 'soul-star', 'crack'])

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!productSlugs.has(slug)) notFound()
  return <ProductDetailsClient slug={slug} />
}
