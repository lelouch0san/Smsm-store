export type PaymentMethodType = 'wallet' | 'bank' | 'instant' | 'digital' | 'other'
export type PaymentStatus = 'active' | 'inactive'
export type PaymentTransactionStatus = 'pending' | 'processing' | 'completed' | 'failed' | 'rejected' | 'cancelled' | 'refunded'
export type RelatedEntityType = 'order' | 'deposit' | 'other'
export type PaymentMethod = { id:string; name:string; arabicName:string; type:PaymentMethodType; description:string; status:PaymentStatus; customerAvailable:boolean; displayOrder:number; createdAt:string; updatedAt:string; adminNotes?:string }
export type PaymentAccount = { id:string; methodId:string; name:string; identifier:string; owner:string; status:PaymentStatus; displayOrder:number; createdAt:string; updatedAt:string; isDefault:boolean; description?:string; notes?:string }
export type PaymentTransaction = { id:string; customerName:string; customerId:string; methodId:string; accountId:string; amount:number; currency:string; reference:string; status:PaymentTransactionStatus; relatedEntityType:RelatedEntityType; relatedEntityId:string; createdAt:string; updatedAt:string; note?:string; proof?:string }
const stamp=(days:number)=>new Date(Date.UTC(2026,9,5-days,12,0)).toISOString()
let methods:PaymentMethod[]=[
{id:'PM-0001',name:'Vodafone Cash',arabicName:'فودافون كاش',type:'wallet',description:'محفظة فودافون كاش لاستقبال المدفوعات.',status:'active',customerAvailable:true,displayOrder:1,createdAt:stamp(90),updatedAt:stamp(4)},
{id:'PM-0002',name:'InstaPay',arabicName:'إنستا باي',type:'instant',description:'تحويل فوري إلى حساب المتجر.',status:'active',customerAvailable:true,displayOrder:2,createdAt:stamp(85),updatedAt:stamp(7)},
{id:'PM-0003',name:'Orange Cash',arabicName:'أورنج كاش',type:'wallet',description:'محفظة أورنج كاش.',status:'active',customerAvailable:true,displayOrder:3,createdAt:stamp(80),updatedAt:stamp(8)},
{id:'PM-0004',name:'Etisalat Cash',arabicName:'اتصالات كاش',type:'wallet',description:'محفظة اتصالات كاش.',status:'active',customerAvailable:true,displayOrder:4,createdAt:stamp(70),updatedAt:stamp(9)},
{id:'PM-0005',name:'WE Pay',arabicName:'وي باي',type:'wallet',description:'محفظة وي باي.',status:'active',customerAvailable:true,displayOrder:5,createdAt:stamp(65),updatedAt:stamp(11)},
{id:'PM-0006',name:'PayPal',arabicName:'باي بال',type:'digital',description:'محفظة رقمية للاستخدام المستقبلي.',status:'inactive',customerAvailable:false,displayOrder:6,createdAt:stamp(60),updatedAt:stamp(12)},
]
let accounts:PaymentAccount[]=[
{id:'ACC-0001',methodId:'PM-0001',name:'Seno Store Main',identifier:'01012345678',owner:'Seno Store',status:'active',displayOrder:1,createdAt:stamp(80),updatedAt:stamp(4),isDefault:true},
{id:'ACC-0002',methodId:'PM-0002',name:'Seno Store InstaPay',identifier:'seno.store@instapay',owner:'Seno Store',status:'active',displayOrder:1,createdAt:stamp(78),updatedAt:stamp(5),isDefault:true},
{id:'ACC-0003',methodId:'PM-0003',name:'Seno Store Orange',identifier:'01234567890',owner:'Seno Store',status:'active',displayOrder:1,createdAt:stamp(70),updatedAt:stamp(8),isDefault:true},
{id:'ACC-0004',methodId:'PM-0005',name:'WE Pay Reserve',identifier:'01512345678',owner:'Seno Store',status:'inactive',displayOrder:1,createdAt:stamp(60),updatedAt:stamp(10),isDefault:false},
{id:'ACC-0005',methodId:'PM-0001',name:'Vodafone Backup',identifier:'01198765432',owner:'Seno Store',status:'active',displayOrder:2,createdAt:stamp(45),updatedAt:stamp(14),isDefault:false},
{id:'ACC-0006',methodId:'PM-0002',name:'Seno Pay',identifier:'seno.pay@instapay',owner:'Seno Store',status:'active',displayOrder:2,createdAt:stamp(35),updatedAt:stamp(16),isDefault:false},
]
const transactions:PaymentTransaction[]=[...Array.from({length:12},(_,i)=>{const statuses:PaymentTransactionStatus[]=['completed','pending','processing','failed','rejected','cancelled','refunded'];const methodIds=['PM-0001','PM-0002','PM-0003','PM-0004','PM-0005'];const accountIds=['ACC-0001','ACC-0002','ACC-0003','ACC-0001','ACC-0004'];return {id:`PAY-2026-${String(125+i).padStart(5,'0')}`,customerName:['أحمد محمد','عمر سعيد','سارة خالد','نور أحمد'][i%4],customerId:['CUS-10024','CUS-012','CUS-021','CUS-067'][i%4],methodId:methodIds[i%5],accountId:accountIds[i%5],amount:[25,50,75,100,35,120][i%6],currency:'USD',reference:['VF-839201','IP-293810','OR-551200','ET-229110'][i%4],status:statuses[i%statuses.length],relatedEntityType:i%3===0?'deposit':'order',relatedEntityId:i%3===0?`DEP-2026-${String(125+i).padStart(5,'0')}`:`ORD-2026-${String(481+i).padStart(5,'0')}`,createdAt:stamp(i+1),updatedAt:stamp(i),note:i===2?'تمت مراجعة العملية يدوياً.':undefined,proof:undefined}})]
export const paymentLabels={type:{wallet:'محفظة إلكترونية',bank:'تحويل بنكي',instant:'دفع فوري',digital:'محفظة رقمية',other:'أخرى'},status:{active:'نشطة',inactive:'غير نشطة'},transaction:{pending:'معلّقة',processing:'قيد المعالجة',completed:'مكتملة',failed:'فاشلة',rejected:'مرفوضة',cancelled:'ملغاة',refunded:'مستردة'},entity:{order:'طلب',deposit:'إيداع',other:'أخرى'}} as const
export const getPaymentMethods=()=>[...methods].sort((a,b)=>a.displayOrder-b.displayOrder)
export const getPaymentMethodById=(id:string)=>methods.find(x=>x.id===id)
export const getPaymentAccounts=()=>[...accounts]
export const getPaymentAccountById=(id:string)=>accounts.find(x=>x.id===id)
export const getPaymentAccountsByMethod=(methodId:string)=>accounts.filter(x=>x.methodId===methodId)
export const getPaymentTransactions=()=>[...transactions]
export const getPaymentTransactionById=(id:string)=>transactions.find(x=>x.id===id)
export const getPaymentStats=()=>({total:transactions.reduce((s,x)=>s+x.amount,0),completed:transactions.filter(x=>x.status==='completed').reduce((s,x)=>s+x.amount,0),pending:transactions.filter(x=>x.status==='pending'||x.status==='processing').reduce((s,x)=>s+x.amount,0),failed:transactions.filter(x=>['failed','rejected','cancelled'].includes(x.status)).reduce((s,x)=>s+x.amount,0)})
export const createPaymentMethod=(input:Omit<PaymentMethod,'id'|'createdAt'|'updatedAt'>)=>{const now=new Date().toISOString();const item={...input,id:`PM-${String(methods.length+1).padStart(4,'0')}`,createdAt:now,updatedAt:now};methods.push(item);return item}
export const updatePaymentMethod=(id:string,input:Partial<Omit<PaymentMethod,'id'|'createdAt'>>)=>{const item=methods.find(x=>x.id===id);if(!item)return undefined;Object.assign(item,input,{updatedAt:new Date().toISOString()});return item}
export const createPaymentAccount=(input:Omit<PaymentAccount,'id'|'createdAt'|'updatedAt'>)=>{const now=new Date().toISOString();if(input.isDefault)accounts.forEach(x=>{if(x.methodId===input.methodId)x.isDefault=false});const item={...input,id:`ACC-${String(accounts.length+1).padStart(4,'0')}`,createdAt:now,updatedAt:now};accounts.push(item);return item}
export const updatePaymentAccount=(id:string,input:Partial<Omit<PaymentAccount,'id'|'createdAt'>>)=>{const item=accounts.find(x=>x.id===id);if(!item)return undefined;if(input.isDefault)accounts.forEach(x=>{if(x.methodId===item.methodId)x.isDefault=false});Object.assign(item,input,{updatedAt:new Date().toISOString()});return item}
export const getPaymentMethodTransactionCount=(methodId:string)=>transactions.filter(x=>x.methodId===methodId).length
export const getPaymentAccountTransactionStats=(accountId:string)=>{const rows=transactions.filter(x=>x.accountId===accountId);return {total:rows.length,successful:rows.filter(x=>x.status==='completed').length,failed:rows.filter(x=>['failed','rejected'].includes(x.status)).length,amount:rows.reduce((s,x)=>s+x.amount,0)}}
export const getPaymentMethodName=(id:string)=>getPaymentMethodById(id)?.arabicName||id
export const getPaymentAccountName=(id:string)=>getPaymentAccountById(id)?.name||id
export const maskIdentifier=(value:string)=>value.length>5?`${value.slice(0,3)}••••${value.slice(-3)}`:value
