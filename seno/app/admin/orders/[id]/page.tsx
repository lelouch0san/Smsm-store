import { OrdersManagement } from '@/components/admin/orders/orders-management'
export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) { const { id } = await params; return <OrdersManagement detailId={id} /> }
