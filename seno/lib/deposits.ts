export type DepositStatus = 'pending' | 'approved' | 'rejected'

export type Deposit = {
  id: string
  userId: string
  amount: number
  currency: string
  paymentMethodId: string
  paymentMethodName: string
  paymentMethodLogo?: string
  status: DepositStatus
  transactionReference?: string
  senderName?: string
  senderAccount?: string
  network?: string
  walletAddress?: string
  transactionHash?: string
  receiptUrl?: string
  rejectionReason?: string
  createdAt: string
  updatedAt: string
}

export type DepositFilters = {
  status: 'all' | DepositStatus
  paymentMethod: string
  dateRange: 'all' | 'today' | '7d' | '30d'
  search: string
}

export type DepositResponse = {
  data: Deposit[]
  pagination: { page: number; limit: number; total: number; totalPages: number }
  summary: { totalDeposited: number; approvedAmount: number; pendingAmount: number; transactionCount: number }
}

const demoDeposits: Deposit[] = [
  { id: 'DEP-20261003-00125', userId: 'demo-user', amount: 500, currency: 'EGP', paymentMethodId: 'vodafone-cash', paymentMethodName: 'Vodafone Cash', paymentMethodLogo: 'VF', status: 'approved', transactionReference: 'TXN784521', senderName: 'أحمد محمد', senderAccount: '01012345678', receiptUrl: '/receipts/demo-vodafone.png', createdAt: '2026-10-03T20:42:00+03:00', updatedAt: '2026-10-03T20:50:00+03:00' },
  { id: 'DEP-20261002-00118', userId: 'demo-user', amount: 350, currency: 'EGP', paymentMethodId: 'usdt', paymentMethodName: 'USDT', paymentMethodLogo: '₮', status: 'pending', transactionReference: '0xTXN29821', network: 'TRC20', walletAddress: 'TXXXXXXXXXXXXXXXXXXXXXXXXXXXX', transactionHash: '0xTXN29821', createdAt: '2026-10-02T14:15:00+03:00', updatedAt: '2026-10-02T14:15:00+03:00' },
  { id: 'DEP-20260928-00097', userId: 'demo-user', amount: 1250, currency: 'EGP', paymentMethodId: 'bank-transfer', paymentMethodName: 'Bank Transfer', paymentMethodLogo: 'BK', status: 'approved', transactionReference: 'BNK550912', senderName: 'أحمد محمد', createdAt: '2026-09-28T11:30:00+03:00', updatedAt: '2026-09-28T12:10:00+03:00' },
]

export function getDepositsForUser(userId: string, filters: DepositFilters, page = 1, limit = 20): DepositResponse {
  const now = new Date('2026-10-03T23:59:59+03:00').getTime()
  const query = filters.search.trim().toLowerCase()
  const filtered = demoDeposits.filter((deposit) => {
    if (deposit.userId !== userId) return false
    if (filters.status !== 'all' && deposit.status !== filters.status) return false
    if (filters.paymentMethod !== 'all' && deposit.paymentMethodId !== filters.paymentMethod) return false
    if (query && !`${deposit.id} ${deposit.transactionReference ?? ''}`.toLowerCase().includes(query)) return false
    if (filters.dateRange !== 'all') {
      const days = filters.dateRange === 'today' ? 1 : filters.dateRange === '7d' ? 7 : 30
      if (now - new Date(deposit.createdAt).getTime() > days * 86400000) return false
    }
    return true
  })
  const total = filtered.length
  const start = (page - 1) * limit
  return { data: filtered.slice(start, start + limit), pagination: { page, limit, total, totalPages: Math.max(1, Math.ceil(total / limit)) }, summary: { totalDeposited: demoDeposits.filter((d) => d.userId === userId).reduce((sum, d) => sum + d.amount, 0), approvedAmount: demoDeposits.filter((d) => d.userId === userId && d.status === 'approved').reduce((sum, d) => sum + d.amount, 0), pendingAmount: demoDeposits.filter((d) => d.userId === userId && d.status === 'pending').reduce((sum, d) => sum + d.amount, 0), transactionCount: demoDeposits.filter((d) => d.userId === userId).length } }
}

export function getDepositByIdForUser(id: string, userId: string) { return demoDeposits.find((deposit) => deposit.id === id && deposit.userId === userId) }

export const depositPaymentMethods = Array.from(new Map(demoDeposits.map((deposit) => [deposit.paymentMethodId, { id: deposit.paymentMethodId, name: deposit.paymentMethodName, logo: deposit.paymentMethodLogo }])).values())
