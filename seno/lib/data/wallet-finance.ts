export type WalletStatus = 'active' | 'frozen'
export type Direction = 'credit' | 'debit'
export type TransactionType = 'deposit' | 'order_payment' | 'admin_credit' | 'admin_debit' | 'refund' | 'code_redemption'
export type DepositStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'
export type SenoCodeStatus = 'available' | 'sold' | 'redeemed' | 'expired' | 'blocked'

export type Wallet = { id: string; customerId: string; customerName: string; email: string; phone: string; balance: number; totalDeposits: number; totalSpending: number; totalRefunds: number; totalAdjustments: number; status: WalletStatus; lastTransactionAt: string }
export type WalletTransaction = { id: string; customerId: string; customerName: string; amount: number; direction: Direction; type: TransactionType; previousBalance: number; newBalance: number; reason: string; actor: string; createdAt: string; status: 'posted' | 'pending'; orderId?: string; depositId?: string; codeId?: string }
export type DepositRequest = { id: string; customerId: string; customerName: string; amount: number; paymentMethod: string; reference: string; proof?: string; note?: string; status: DepositStatus; createdAt: string; reviewedAt?: string; reviewedBy?: string; rejectionReason?: string }
export type SenoCode = { id: string; value: string; denomination: number; batchId: string; batchName: string; status: SenoCodeStatus; createdAt: string; expiresAt?: string; customerName?: string; redeemedAt?: string }

const stamp = (days: number) => new Date(Date.UTC(2026, 9, 5 - days, 10, 0)).toISOString()
let wallets: Wallet[] = [
 { id:'WAL-012', customerId:'CUS-012', customerName:'عمر سعيد', email:'omar@example.com', phone:'+966500001122', balance:340, totalDeposits:600, totalSpending:280, totalRefunds:20, totalAdjustments:0, status:'active', lastTransactionAt:stamp(1) },
 { id:'WAL-021', customerId:'CUS-021', customerName:'سارة خالد', email:'sara@example.com', phone:'+966551112233', balance:80, totalDeposits:200, totalSpending:120, totalRefunds:0, totalAdjustments:0, status:'active', lastTransactionAt:stamp(2) },
 { id:'WAL-067', customerId:'CUS-067', customerName:'نور أحمد', email:'noor@example.com', phone:'+966544445555', balance:0, totalDeposits:100, totalSpending:100, totalRefunds:0, totalAdjustments:0, status:'frozen', lastTransactionAt:stamp(4) },
 { id:'WAL-084', customerId:'CUS-084', customerName:'خالد حسن', email:'khaled@example.com', phone:'+966509998877', balance:15, totalDeposits:50, totalSpending:35, totalRefunds:0, totalAdjustments:0, status:'active', lastTransactionAt:stamp(8) },
]
let transactions: WalletTransaction[] = [
 {id:'TXN-1001',customerId:'CUS-012',customerName:'عمر سعيد',amount:200,direction:'credit',type:'deposit',previousBalance:140,newBalance:340,reason:'إيداع معتمد',actor:'أحمد محمد',createdAt:stamp(1),status:'posted',depositId:'DEP-1001'},
 {id:'TXN-1002',customerId:'CUS-012',customerName:'عمر سعيد',amount:80,direction:'debit',type:'order_payment',previousBalance:420,newBalance:340,reason:'دفع الطلب SENO-1044',actor:'النظام',createdAt:stamp(2),status:'posted',orderId:'SENO-1044'},
 {id:'TXN-1003',customerId:'CUS-021',customerName:'سارة خالد',amount:50,direction:'credit',type:'code_redemption',previousBalance:30,newBalance:80,reason:'استرداد كود سينو',actor:'سارة خالد',createdAt:stamp(2),status:'posted',codeId:'CODE-003'},
 {id:'TXN-1004',customerId:'CUS-067',customerName:'نور أحمد',amount:100,direction:'debit',type:'order_payment',previousBalance:100,newBalance:0,reason:'دفع طلب خدمة',actor:'النظام',createdAt:stamp(4),status:'posted',orderId:'SENO-1031'},
]
let deposits: DepositRequest[] = [
 {id:'DEP-1001',customerId:'CUS-012',customerName:'عمر سعيد',amount:200,paymentMethod:'تحويل بنكي',reference:'TRX-883421',status:'approved',createdAt:stamp(1),reviewedAt:stamp(1),reviewedBy:'أحمد محمد',proof:'/images/deposit-proof.png'},
 {id:'DEP-1002',customerId:'CUS-021',customerName:'سارة خالد',amount:150,paymentMethod:'مدى',reference:'MAD-10291',status:'pending',createdAt:stamp(0),note:'يرجى مراجعة التحويل'},
 {id:'DEP-1003',customerId:'CUS-067',customerName:'نور أحمد',amount:100,paymentMethod:'تحويل بنكي',reference:'TRX-883010',status:'rejected',createdAt:stamp(4),reviewedAt:stamp(4),reviewedBy:'أحمد محمد',rejectionReason:'المرجع غير مطابق'},
]
let codes: SenoCode[] = [
 ...Array.from({length:6},(_,i)=>({id:`CODE-${String(i+1).padStart(3,'0')}`,value:`SENO-10A4-9F${i}2-7A91`,denomination:10,batchId:'BAT-001',batchName:'OCT-2026-001',status:i<3?'available':i===3?'sold':'redeemed',createdAt:stamp(10),customerName:i>=5?'سارة خالد':undefined,redeemedAt:i>=5?stamp(2):undefined} as SenoCode)),
 {id:'CODE-007',value:'SENO-25B2-11F0-2C33',denomination:25,batchId:'BAT-002',batchName:'OCT-2026-002',status:'blocked',createdAt:stamp(20)},
]
export const labels = { transaction: {deposit:'إيداع',order_payment:'دفع طلب',admin_credit:'إضافة إدارية',admin_debit:'خصم إداري',refund:'استرداد',code_redemption:'استرداد كود'}, deposit:{pending:'بانتظار المراجعة',approved:'مقبول',rejected:'مرفوض',cancelled:'ملغي'}, code:{available:'متاح',sold:'مباع',redeemed:'مستخدم',expired:'منتهي',blocked:'محظور'} }
export const getWallets = () => wallets
export const getWalletStats = () => ({ totalBalance: wallets.reduce((s,w)=>s+w.balance,0), deposits: wallets.reduce((s,w)=>s+w.totalDeposits,0), spending: wallets.reduce((s,w)=>s+w.totalSpending,0), pendingDeposits: deposits.filter(d=>d.status==='pending').length, activeWallets: wallets.filter(w=>w.status==='active').length, transactions: transactions.length })
export const getWalletByCustomerId = (id:string) => wallets.find(w=>w.customerId===id)
export const getWalletTransactions = (customerId?:string) => customerId ? transactions.filter(t=>t.customerId===customerId) : transactions
export const getDepositRequests = () => deposits
export const getSenoCodes = () => codes
export const getSenoCodeInventory = () => [10,25,50,100].map(denomination=>({denomination,available:codes.filter(c=>c.denomination===denomination&&c.status==='available').length,sold:codes.filter(c=>c.denomination===denomination&&c.status==='sold').length,redeemed:codes.filter(c=>c.denomination===denomination&&c.status==='redeemed').length,expired:codes.filter(c=>c.denomination===denomination&&c.status==='expired').length,blocked:codes.filter(c=>c.denomination===denomination&&c.status==='blocked').length})).filter(x=>x.available+x.sold+x.redeemed+x.expired+x.blocked)
export function approveDeposit(id:string) { const deposit=deposits.find(d=>d.id===id); if(!deposit || deposit.status!=='pending') return false; const wallet=wallets.find(w=>w.customerId===deposit.customerId); if(!wallet)return false; const previous=wallet.balance; wallet.balance+=deposit.amount; wallet.totalDeposits+=deposit.amount; wallet.lastTransactionAt=stamp(0); deposit.status='approved'; deposit.reviewedAt=stamp(0); deposit.reviewedBy='أحمد محمد'; transactions.unshift({id:`TXN-${Date.now()}`,customerId:deposit.customerId,customerName:deposit.customerName,amount:deposit.amount,direction:'credit',type:'deposit',previousBalance:previous,newBalance:wallet.balance,reason:'إيداع معتمد',actor:'أحمد محمد',createdAt:stamp(0),status:'posted',depositId:id}); return true }
export function rejectDeposit(id:string,reason='لم يتم اعتماد الطلب') { const d=deposits.find(x=>x.id===id); if(!d||d.status!=='pending')return false; d.status='rejected';d.rejectionReason=reason;d.reviewedAt=stamp(0);d.reviewedBy='أحمد محمد';return true }
export function adjustWallet(customerId:string,amount:number,direction:Direction,reason:string) { const wallet=wallets.find(w=>w.customerId===customerId); if(!wallet||amount<=0||(direction==='debit'&&wallet.balance<amount))return false;const previous=wallet.balance;wallet.balance+=direction==='credit'?amount:-amount;wallet.totalAdjustments+=amount;wallet.lastTransactionAt=stamp(0);transactions.unshift({id:`TXN-${Date.now()}`,customerId:wallet.customerId,customerName:wallet.customerName,amount,direction,type:direction==='credit'?'admin_credit':'admin_debit',previousBalance:previous,newBalance:wallet.balance,reason,actor:'أحمد محمد',createdAt:stamp(0),status:'posted'});return true }
export function toggleWalletFreeze(customerId:string) { const w=wallets.find(x=>x.customerId===customerId);if(!w)return false;w.status=w.status==='active'?'frozen':'active';return true }
export function blockSenoCode(id:string) { const c=codes.find(x=>x.id===id);if(!c||c.status!=='available')return false;c.status='blocked';return true }
export function generateCodeBatch(denomination:number,quantity:number,batchName:string) { for(let i=0;i<quantity;i++)codes.push({id:`CODE-${Date.now()}-${i}`,value:`SENO-${Math.random().toString(36).slice(2,6).toUpperCase()}-${Math.random().toString(36).slice(2,6).toUpperCase()}`,denomination,batchId:`BAT-${Date.now()}`,batchName,status:'available',createdAt:stamp(0)});return true }
