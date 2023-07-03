import IMember from 'src/modules/members/models/IMember'
import IItemSale from 'src/modules/sales/models/IItemSale'

export default interface ISale {
  id: number | null
  code?: string
  date?: string
  status?: string
  total_amount: number
  member?: IMember | null
  items: IItemSale[]
  note?: string
}
