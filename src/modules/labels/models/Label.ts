import ILabel from 'src/modules/labels/models/ILabel'

export default class Label implements ILabel {
  id: number | null
  name: string
  color: string

  static create (Label: ILabel | null) {
    return new this(
      Label?.id || null,
      Label?.name || '',
      Label?.color || ''
    )
  }

  constructor (id: number | null, name: string, color: string) {
    this.id = id
    this.name = name
    this.color = color
  }
}
