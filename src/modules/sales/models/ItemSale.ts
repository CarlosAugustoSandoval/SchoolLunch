import IItemSale from 'src/modules/sales/models/IItemSale'
import IProduct from 'src/modules/inventory/products/models/IProduct'

export default class ItemSale implements IItemSale {
  id: number | null
  status?: string
  amount: number
  unit_amount: number
  count: number
  product?: IProduct | null

  static create (ItemSale: IItemSale | null) {
    return new this(
      ItemSale?.id || null,
      ItemSale?.status || 'Active',
      ItemSale?.amount || 0,
      ItemSale?.unit_amount || 0,
      ItemSale?.count || 0,
      ItemSale?.product || null
    )
  }

  constructor (id: number | null, status: string, amount: number, unitAmount: number, count: number, product: IProduct | null) {
    this.id = id
    this.status = status
    this.amount = amount
    this.unit_amount = unitAmount
    this.count = count
    this.product = product
  }
}
