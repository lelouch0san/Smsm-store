export type WalletStatus = 'active' | 'frozen'
export type Direction = 'credit' | 'debit'
export type TransactionType = 'deposit' | 'order_payment' | 'admin_credit' | 'admin_debit' | 'refund' | 'code_redemption'
export type DepositStatus = 'pending' | 'approved' | 'rejected' | 'cancelled'
export type SenoCodeStatus = 'available' | 'sold' | 'redeemed' | 'expired' | 'blocked'
export type LedgerStatus = 'posted' | 'pending'

export type Wallet = { id: string; customerId: string; customerName: string; email: string; phone: string; balance: number; totalDeposits: number; totalSpending: number; totalRefunds: number; totalAdjustments: number; status: WalletStatus; lastTransactionAt: string }
export type WalletTransaction = { id: string; customerId: string; customerName: string; amount: number; direction: Direction; type: TransactionType; previousBalance: number; newBalance: number; reason: string; actor: string; createdAt: string; status: LedgerStatus; orderId?: string; depositId?: string; codeId?: string }
export type DepositRequest = { id: string; customerId: string; customerName: string; amount: number; paymentMethod: string; reference: string; proof?: string; note?: string; status: DepositStatus; createdAt: string; reviewedAt?: string; reviewedBy?: string; rejectionReason?: string }
export type SenoCode = { id: string; value: string; denomination: number; batchId: string; batchName: string; status: SenoCodeStatus; createdAt: string; expiresAt?: string; customerId?: string; customerName?: string; soldAt?: string; redeemedAt?: string; blockedAt?: string; blockedReason?: string }
export type SenoCodeRedemption = { id: string; codeId: string; customerId: string; customerName: string; denomination: number; transactionId: string; redeemedAt: string; status: 'posted'|'failed'|'reversed'; amount: number }
export type SenoCodeBatch = { id: string; name: string; denomination: number; quantity: number; createdAt: string; expiresAt?: string }
// Redemption records remain linked to the code, customer, and wallet ledger transaction.

const MOCK_NOW = Date.UTC(2026, 9, 5, 10)
const stamp = (days: number) => new Date(MOCK_NOW - days * 86400000).toISOString()
let sequence = 2000
const nextId = (prefix: string) => `${prefix}-${++sequence}`

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
  ...Array.from({length:6},(_,i)=>({id:`CODE-${String(i+1).padStart(3,'0')}`,value:`SENO-10A4-9F${i}2-7A91`,denomination:10,batchId:'BAT-001',batchName:'OCT-2026-001',status:(i<3?'available':i===3?'sold':'redeemed') as SenoCodeStatus,createdAt:stamp(10),customerName:i>=5?'سارة خالد':undefined,redeemedAt:i>=5?stamp(2):undefined})),
  {id:'CODE-007',value:'SENO-25B2-11F0-2C33',denomination:25,batchId:'BAT-002',batchName:'OCT-2026-002',status:'blocked',createdAt:stamp(20),blockedAt:stamp(4),blockedReason:'طلب حظر إداري'},
  {id:'CODE-008',value:'SENO-10EX-PIRED-001',denomination:10,batchId:'BAT-003',batchName:'OCT-2026-01',status:'expired',createdAt:stamp(35),expiresAt:'2026-09-15T00:00:00.000Z'},
  {id:'CODE-009',value:'SENO-25EX-PIRED-002',denomination:25,batchId:'BAT-004',batchName:'SEP-2026-03',status:'expired',createdAt:stamp(40),expiresAt:'2026-09-28T00:00:00.000Z'},
  {id:'CODE-010',value:'SENO-50EX-PIRED-003',denomination:50,batchId:'BAT-005',batchName:'AUG-2026-02',status:'expired',createdAt:stamp(55),expiresAt:'2026-08-31T00:00:00.000Z'},
  {id:'CODE-011',value:'SENO-10BL-OCKED-01',denomination:10,batchId:'BAT-006',batchName:'OCT-2026-02',status:'blocked',createdAt:stamp(12),blockedAt:stamp(4),blockedReason:'نشاط مشبوه'},
  {id:'CODE-012',value:'SENO-100-BLOCKED-1',denomination:100,batchId:'BAT-007',batchName:'SEP-2026-01',status:'blocked',createdAt:stamp(18),blockedAt:stamp(10),blockedReason:'تم الإبلاغ عن الكود'}
]
let batches: SenoCodeBatch[] = [
  {id:'BAT-001',name:'OCT-2026-001',denomination:10,quantity:6,createdAt:stamp(10)},
  {id:'BAT-002',name:'OCT-2026-002',denomination:25,quantity:1,createdAt:stamp(20)},
]
let redemptions: SenoCodeRedemption[] = [
  {id:'RED-2026-00125',codeId:'CODE-006',customerId:'CUS-021',customerName:'سارة خالد',denomination:10,transactionId:'TXN-1003',redeemedAt:stamp(2),status:'posted',amount:10},
  {id:'RED-2026-00126',codeId:'CODE-003',customerId:'CUS-012',customerName:'عمر سعيد',denomination:10,transactionId:'TXN-1005',redeemedAt:stamp(5),status:'posted',amount:10},
  {id:'RED-2026-00127',codeId:'CODE-004',customerId:'CUS-067',customerName:'نور أحمد',denomination:10,transactionId:'TXN-1006',redeemedAt:stamp(8),status:'reversed',amount:10},
]

export const labels = { transaction:{deposit:'إيداع',order_payment:'دفع طلب',admin_credit:'إضافة إدارية',admin_debit:'خصم إداري',refund:'استرداد',code_redemption:'استرداد كود'}, deposit:{pending:'بانتظار المراجعة',approved:'مقبول',rejected:'مرفوض',cancelled:'ملغي'}, code:{available:'متاح',sold:'مباع',redeemed:'مستخدم',expired:'منتهي',blocked:'محظور'} }
export const getWallets = () => wallets
export const getWalletByCustomerId = (id:string) => wallets.find(w=>w.customerId===id)
export const getWalletTransactions = (customerId?:string) => customerId ? transactions.filter(t=>t.customerId===customerId) : transactions
export const getWalletTransactionById = (id:string) => transactions.find(t=>t.id===id)
export const getTransactionsByType = (type:TransactionType) => transactions.filter(t=>t.type===type)
export const getDepositRequests = () => deposits
export const getDepositRequestById = (id:string) => deposits.find(d=>d.id===id)
export const getSenoCodes = () => codes
export const getSenoCodeById = (id:string) => codes.find(c=>c.id===id)
export const getSenoCodeBatches = () => batches
export const getSenoCodeRedemptions = () => redemptions
export const getWalletStats = () => ({ totalBalance:wallets.reduce((s,w)=>s+w.balance,0), deposits:wallets.reduce((s,w)=>s+w.totalDeposits,0), spending:wallets.reduce((s,w)=>s+w.totalSpending,0), pendingDeposits:deposits.filter(d=>d.status==='pending').length, activeWallets:wallets.filter(w=>w.status==='active').length, transactions:transactions.length })
export type SenoCodeInventory = { denomination:number; available:number; sold:number; redeemed:number; expired:number; blocked:number }
export const getSenoCodeInventory = (): SenoCodeInventory[] => [10,25,50,100].map(denomination => ({ denomination, available:codes.filter(c=>c.denomination===denomination&&c.status==='available').length, sold:codes.filter(c=>c.denomination===denomination&&c.status==='sold').length, redeemed:codes.filter(c=>c.denomination===denomination&&c.status==='redeemed').length, expired:codes.filter(c=>c.denomination===denomination&&c.status==='expired').length, blocked:codes.filter(c=>c.denomination===denomination&&c.status==='blocked').length })).filter(x=>x.available+x.sold+x.redeemed+x.expired+x.blocked>0)

export function approveDeposit(id:string, actor='أحمد محمد') {
  const deposit=deposits.find(d=>d.id===id)
  if(!deposit) return {ok:false as const, reason:'deposit_not_found'}
  if(deposit.status==='approved') return {ok:true as const, transactionId:transactions.find(t=>t.depositId===id)?.id}
  if(deposit.status!=='pending') return {ok:false as const, reason:'invalid_status'}
  const wallet=wallets.find(w=>w.customerId===deposit.customerId)
  if(!wallet) return {ok:false as const, reason:'wallet_not_found'}
  const previous=wallet.balance; wallet.balance+=deposit.amount; wallet.totalDeposits+=deposit.amount; wallet.lastTransactionAt=stamp(0)
  deposit.status='approved'; deposit.reviewedAt=stamp(0); deposit.reviewedBy=actor
  const transactionId=nextId('TXN'); transactions.unshift({id:transactionId,customerId:deposit.customerId,customerName:deposit.customerName,amount:deposit.amount,direction:'credit',type:'deposit',previousBalance:previous,newBalance:wallet.balance,reason:'إيداع معتمد',actor,createdAt:stamp(0),status:'posted',depositId:id})
  return {ok:true as const,transactionId}
}
export function rejectDeposit(id:string, reason='لم يتم اعتماد الطلب', actor='أحمد محمد') { const d=deposits.find(x=>x.id===id); if(!d||d.status!=='pending') return false; d.status='rejected'; d.rejectionReason=reason; d.reviewedAt=stamp(0); d.reviewedBy=actor; return true }
export function creditWallet(customerId:string, amount:number, reason:string, actor='أحمد محمد', reference?:Pick<WalletTransaction,'orderId'|'depositId'|'codeId'>) { return postWalletMovement(customerId,amount,'credit','admin_credit',reason,actor,reference) }
export function debitWallet(customerId:string, amount:number, reason:string, actor='أحمد محمد', reference?:Pick<WalletTransaction,'orderId'|'depositId'|'codeId'>) { return postWalletMovement(customerId,amount,'debit','admin_debit',reason,actor,reference) }
function postWalletMovement(customerId:string, amount:number, direction:Direction, type:TransactionType, reason:string, actor:string, reference?:Pick<WalletTransaction,'orderId'|'depositId'|'codeId'>) { const wallet=wallets.find(w=>w.customerId===customerId); if(!wallet||!Number.isFinite(amount)||amount<=0||(direction==='debit'&&wallet.balance<amount)) return false; const previous=wallet.balance; wallet.balance+=direction==='credit'?amount:-amount; if(type==='admin_credit'||type==='admin_debit')wallet.totalAdjustments+=amount; if(type==='refund')wallet.totalRefunds+=amount; wallet.lastTransactionAt=stamp(0); transactions.unshift({id:nextId('TXN'),customerId,customerName:wallet.customerName,amount,direction,type,previousBalance:previous,newBalance:wallet.balance,reason,actor,createdAt:stamp(0),status:'posted',...reference}); return true }
export function adjustWallet(customerId:string,amount:number,direction:Direction,reason:string) { return direction==='credit' ? creditWallet(customerId,amount,reason) : debitWallet(customerId,amount,reason) }
export function toggleWalletFreeze(customerId:string) { const w=wallets.find(x=>x.customerId===customerId); if(!w)return false; w.status=w.status==='active'?'frozen':'active'; return true }
export function blockSenoCode(id:string, reason='حظر إداري') { const c=codes.find(x=>x.id===id); if(!c||c.status!=='available')return false; c.status='blocked'; c.blockedReason=reason; return true }
export function generateCodeBatch(denomination:number, quantity:number, batchName:string, expiresAt?:string) { if(!Number.isInteger(quantity)||quantity<1||denomination<=0)return false; const batchId=nextId('BAT'); batches.push({id:batchId,name:batchName,denomination,quantity,createdAt:stamp(0),expiresAt}); for(let i=0;i<quantity;i++)codes.push({id:nextId('CODE'),value:`SENO-${batchId.replace(/[^0-9]/g,'').padStart(4,'0')}-${String(i+1).padStart(4,'0')}`,denomination,batchId,batchName,status:'available',createdAt:stamp(0),expiresAt}); return true }
export const getWalletsForExport = () => wallets.map(w=>({...w}))
export const getTransactionsForExport = () => transactions.map(t=>({...t}))
export const getCodesForExport = (includeValues=false) => codes.map(c=>includeValues?({...c}):({...c,value:`${c.value.slice(0,5)}-XXXX-XXXX`}))
export const resetWalletFinanceMock = () => undefined

export default { getWallets, getWalletStats, getWalletByCustomerId, getWalletTransactions, getDepositRequests, getSenoCodes, getSenoCodeInventory, approveDeposit, rejectDeposit, adjustWallet, toggleWalletFreeze, blockSenoCode, generateCodeBatch }
