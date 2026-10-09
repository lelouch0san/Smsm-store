import { getOrders, type Order } from './orders'
import { getCustomers } from './customers'
import { getProducts } from './products'

export type ReportRange = 'today'|'yesterday'|'7d'|'30d'|'month'|'last-month'
export type ReportFilters = { range: ReportRange; status?: string }
const now = new Date('2026-10-05T00:00:00.000Z')
const ranges: Record<ReportRange, number> = { today: 1, yesterday: 2, '7d': 7, '30d': 30, month: 31, 'last-month': 61 }
const within = (iso:string, range:ReportRange) => (now.getTime()-new Date(iso).getTime()) <= ranges[range]*86400000
const paid = (o:Order) => o.paymentStatus === 'paid' && !['cancelled','rejected','failed','refunded'].includes(o.status)
const money = (n:number) => Math.round(n*100)/100
export const reportLabels = { ranges:{today:'اليوم',yesterday:'أمس','7d':'آخر 7 أيام','30d':'آخر 30 يوماً',month:'هذا الشهر','last-month':'الشهر الماضي'}, statuses:{pending_review:'بانتظار المراجعة',processing:'قيد التنفيذ',completed:'مكتمل',rejected:'مرفوض',failed:'فاشل',cancelled:'ملغي',refunded:'مسترد'} }
export function getReportOrders(filters:ReportFilters){ return getOrders().filter(o=>within(o.createdAt,filters.range)&&(!filters.status||o.status===filters.status)) }
export function getSalesReport(filters:ReportFilters){ const rows=getReportOrders(filters).filter(paid), gross=rows.reduce((s,o)=>s+o.originalPrice,0), discounts=rows.reduce((s,o)=>s+o.discount,0), net=rows.reduce((s,o)=>s+o.finalPrice,0); return { rows, gross:money(gross), discounts:money(discounts), refunds:0, net:money(net), paid:rows.length, average:rows.length?money(net/rows.length):0 } }
export function getOrdersReport(filters:ReportFilters){ const rows=getReportOrders(filters); return { rows, total:rows.length, pending:rows.filter(o=>o.status==='pending_review').length, processing:rows.filter(o=>o.status==='processing').length, completed:rows.filter(o=>o.status==='completed').length, failed:rows.filter(o=>['failed','rejected'].includes(o.status)).length, cancelled:rows.filter(o=>o.status==='cancelled').length } }
export function getProductsReport(filters:ReportFilters){ const rows=getReportOrders(filters).filter(paid), products=getProducts(); return { products:products.map(p=>{const matches=rows.filter(o=>o.productId===p.slug||o.productName===p.name),sales=matches.reduce((s,o)=>s+o.finalPrice,0);return {id:p.slug,name:p.name,category:p.category,orders:matches.length,units:matches.reduce((s,o)=>s+o.quantity,0),sales:money(sales),available:p.isAvailable}}).sort((a,b)=>b.sales-a.sales), sold:rows.length, sales:money(rows.reduce((s,o)=>s+o.finalPrice,0)), active:products.filter(p=>p.isAvailable).length, total:products.length } }
export function getCustomersReport(filters:ReportFilters){ const rows=getReportOrders(filters).filter(paid), customers=getCustomers(); return { customers:customers.map(c=>{const orders=rows.filter(o=>o.customerId===c.id);return {id:c.id,name:c.displayName,registeredAt:c.registeredAt,orders:orders.length,spending:money(orders.reduce((s,o)=>s+o.finalPrice,0)),status:c.status}}), total:customers.length, newCount:customers.filter(c=>within(c.registeredAt,filters.range)).length, purchasing:new Set(rows.map(o=>o.customerId)).size, active:new Set(rows.map(o=>o.customerId)).size } }
export function getProfitsReport(filters:ReportFilters){ const sales=getSalesReport(filters); return {...sales,costAvailable:false,profit:null,margin:null} }
export function exportCsv(headers:string[], rows:(string|number)[][]){ const csv='\uFEFF'+[headers,...rows].map(row=>row.map(value=>`"${String(value).replaceAll('"','""')}"`).join(',')).join('\n'); const blob=new Blob([csv],{type:'text/csv;charset=utf-8'}); const url=URL.createObjectURL(blob); const a=document.createElement('a');a.href=url;a.download='seno-report.csv';a.click();URL.revokeObjectURL(url) }
export const formatDate=(iso:string)=>new Intl.DateTimeFormat('ar-SA',{dateStyle:'medium'}).format(new Date(iso))
export const formatMoney=(n:number)=>`${n.toLocaleString('ar-SA')} ر.س`
