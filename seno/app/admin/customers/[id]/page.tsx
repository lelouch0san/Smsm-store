import CustomersManagement from '@/components/admin/customers/customers-management'
export default async function CustomerDetailPage({params}:{params:Promise<{id:string}>}){const {id}=await params;return <CustomersManagement detailId={id}/>} 
