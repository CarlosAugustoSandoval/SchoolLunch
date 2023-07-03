import IGrade from 'src/modules/grades/models/IGrade'
export default interface ICourse {
  id: number | null
  name?: string
  status?: 'Active'|'Inactive'|null
  grade?: IGrade|null
}
