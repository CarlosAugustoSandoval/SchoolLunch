import ICourse from 'src/modules/courses/models/ICourse'
import ILabel from 'src/modules/labels/models/ILabel'

export default interface IMember {
  id: number | null
  identification?: string
  identification_type?: string
  first_name?: string
  last_name?: string
  avatar?: string
  sex?: string
  course?: ICourse | null
  labels?: ILabel[] | []
}
