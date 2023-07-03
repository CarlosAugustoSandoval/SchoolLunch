import ICategory from 'src/modules/inventory/categories/models/ICategory'

export default interface IProduct {
  id: number | null
  code?: string
  name?: string
  description?: string
  status?: string
  price: number
  images?: string[]
  category?: ICategory | null
}
