import IMember from 'src/modules/members/models/IMember'

export default interface ICard {
  id: number | null
  code?: string
  name?: string
  status?: string
  balance: number
  member?: IMember | null
}
