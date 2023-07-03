import { defineStore } from 'pinia'
import IDataMockState from 'src/dataMock/IDataMockState'
import IGrade from 'src/modules/grades/models/IGrade'
import Grades from 'src/dataMock/data/Grades'
import Courses from 'src/dataMock/data/Courses'
import Labels from 'src/dataMock/data/Labels'
import Members from 'src/dataMock/data/Members'
import Cards from 'src/dataMock/data/Cards'
import Categories from 'src/dataMock/data/Categories'
import Products from 'src/dataMock/data/Products'
import Sales from 'src/dataMock/data/Sales'

export const DataMockStore = defineStore('DataMockStore', {
  state: (): IDataMockState => ({
    grades: Grades,
    courses: Courses,
    labels: Labels,
    members: Members,
    cards: Cards,
    categories: Categories,
    products: Products,
    sales: Sales
  }),

  actions: {
    async setGrade (grade: IGrade) {
      const index = grade?.id ? this.grades?.findIndex(x => x.id === grade.id) || 0 : 0
      this.grades.splice(index, index ? 1 : 0, grade)
    }
  },
  persist: true
})
