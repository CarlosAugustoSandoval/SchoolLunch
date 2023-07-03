import IMember from 'src/modules/members/models/IMember'
import ICourse from 'src/modules/courses/models/ICourse'
import ILabel from 'src/modules/labels/models/ILabel'

export default class Member implements IMember {
  id: number | null
  identification?: string
  identification_type?: string
  first_name?: string
  last_name?: string
  sex?: string
  avatar?: string
  course?: ICourse | null
  labels?: ILabel[] | []

  static create (Member: IMember | null) {
    return new this(
      Member?.id || null,
      Member?.identification || '',
      Member?.identification_type || '',
      Member?.first_name || '',
      Member?.last_name || '',
      Member?.sex || '',
      Member?.avatar || '',
      Member?.course || null,
      Member?.labels || []
    )
  }

  constructor (id: number | null, identification: string, identificationType: string, firstName: string, lastName: string, sex: string, avatar: string, course: ICourse | null, labels: ILabel[] | []) {
    this.id = id
    this.identification = identification
    this.identification_type = identificationType
    this.first_name = firstName
    this.last_name = lastName
    this.sex = sex
    this.avatar = avatar
    this.course = course
    this.labels = labels
  }
}
