import ICategory from 'src/modules/inventory/categories/models/ICategory'
import IProduct from 'src/modules/inventory/products/models/IProduct'

export default class Category implements ICategory {
  id: number | null
  code?: string
  name?: string
  status?: string
  image?: string
  products?: IProduct[]

  static create (Category: ICategory | null) {
    return new this(
      Category?.id || null,
      Category?.code || '',
      Category?.name || '',
      Category?.status || '',
      Category?.image || '',
      Category?.products || []
    )
  }

  constructor (id: number | null, code: string, name: string, status: string, image: string, products: IProduct[]) {
    this.id = id
    this.code = code
    this.name = name
    this.status = status
    this.image = image
    this.products = products
  }
}
