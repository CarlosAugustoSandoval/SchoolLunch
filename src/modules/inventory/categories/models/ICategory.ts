import IProduct from 'src/modules/inventory/products/models/IProduct'

export default interface ICategory {
  id: number | null
  code?: string
  name?: string
  status?: string
  image?: string
  products?: IProduct[]
}
