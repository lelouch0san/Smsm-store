import { WalletDetails } from '@/components/admin/wallet-finance/wallet-finance-management'
export default async function WalletDetailsPage({params}:{params:Promise<{customerId:string}>}){const {customerId}=await params;return <WalletDetails customerId={customerId}/>}
