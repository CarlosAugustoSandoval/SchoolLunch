import IProduct from 'src/modules/inventory/products/models/IProduct'
import ICategory from 'src/modules/inventory/categories/models/ICategory'

export default class Product implements IProduct {
  id: number | null
  code?: string
  name?: string
  description?: string
  status?: string
  price: number
  images?: string[]
  category?: ICategory | null

  static create (Product: Product | null) {
    return new this(
      Product?.id || null,
      Product?.code || '',
      Product?.name || '',
      Product?.description || '',
      Product?.status || '',
      Product?.price || 0,
      Product?.images || [],
      Product?.category || null
    )
  }

  constructor (id: number | null, code: string, name: string, description: string, status: string, price: number, images: string[], category: ICategory | null) {
    this.id = id
    this.code = code
    this.name = name
    this.description = description
    this.status = status
    this.price = price
    this.images = images
    this.category = category
  }
}
