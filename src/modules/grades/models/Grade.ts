import IGrade from 'src/modules/grades/models/IGrade'

export default class Grade implements IGrade {
  id: number | null
  name: string
  status: 'Active'|'Inactive'|null

  static create (Grade: IGrade | null) {
    return new this(
      Grade?.id || null,
      Grade?.name || '',
      Grade?.status || null
    )
  }

  constructor (id: number | null, name: string, status: 'Active'|'Inactive'|null) {
    this.id = id
    this.name = name
    this.status = status
  }
}
