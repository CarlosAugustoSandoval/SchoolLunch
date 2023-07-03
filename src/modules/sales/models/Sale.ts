import ISale from 'src/modules/sales/models/ISale'
import IItemSale from 'src/modules/sales/models/IItemSale'
import IMember from 'src/modules/members/models/IMember'

export default class Sale implements ISale {
  id: number | null
  code?: string
  date?: string
  status?: string
  total_amount: number
  member?: IMember | null
  items: IItemSale[]
  note?: string

  static create (Sale: ISale | null) {
    return new this(
      Sale?.id || null,
      Sale?.code || '',
      Sale?.date || '',
      Sale?.status || '',
      Sale?.total_amount || 0,
      Sale?.member || null,
      Sale?.items || [],
      Sale?.note || ''
    )
  }

  constructor (id: number | null, code: string, date: string, status: string, totalAmount: number, member: IMember | null, items: IItemSale[], note: string) {
    this.id = id
    this.code = code
    this.date = date
    this.status = status
    this.total_amount = totalAmount
    this.member = member
    this.items = items
    this.note = note
  }
}
