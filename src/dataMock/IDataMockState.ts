import IGrade from 'src/modules/grades/models/IGrade'
import ICourse from 'src/modules/courses/models/ICourse'
import ILabel from 'src/modules/labels/models/ILabel'
import IMember from 'src/modules/members/models/IMember'
import ICard from 'src/modules/cards/models/ICard'
import ICategory from 'src/modules/inventory/categories/models/ICategory'
import IProduct from 'src/modules/inventory/products/models/IProduct'
import ISale from 'src/modules/sales/models/ISale'

export default interface IDataMockState {
  grades: IGrade[]
  courses: ICourse[]
  labels: ILabel[]
  members: IMember[]
  cards: ICard[]
  categories: ICategory[]
  products: IProduct[]
  sales: ISale[]
}
