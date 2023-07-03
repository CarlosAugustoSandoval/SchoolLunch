import IProduct from 'src/modules/inventory/products/models/IProduct'

export default interface IItemSale {
  id: number | null
  status?: string
  amount: number
  unit_amount: number
  count: number
  product?: IProduct | null
}
