import IMember from 'src/modules/members/models/IMember'
import ICard from 'src/modules/cards/models/ICard'

export default class Card implements ICard {
  id: number | null
  code?: string
  name?: string
  status?: string
  balance: number
  member?: IMember | null

  static create (Card: ICard | null) {
    return new this(
      Card?.id || null,
      Card?.code || '',
      Card?.name || '',
      Card?.status || '',
      Card?.balance || 0,
      Card?.member || null
    )
  }

  constructor (id: number | null, code: string, name: string, status: string, balance: number, member: IMember | null) {
    this.id = id
    this.code = code
    this.name = name
    this.status = status
    this.balance = balance
    this.member = member
  }
}
