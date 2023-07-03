import IGrade from 'src/modules/grades/models/IGrade'
import ICourse from 'src/modules/courses/models/ICourse'
export default class Course implements ICourse {
  id: number | null
  name: string
  status: 'Active'|'Inactive'|null
  grade: IGrade|null

  static create (Course: ICourse | null) {
    return new this(
      Course?.id || null,
      Course?.name || '',
      Course?.status || null,
      Course?.grade || null
    )
  }

  constructor (id: number | null, name: string, status: 'Active'|'Inactive'|null, grade:IGrade|null) {
    this.id = id
    this.name = name
    this.status = status
    this.grade = grade
  }
}
