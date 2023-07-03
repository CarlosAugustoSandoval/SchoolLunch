import IPermission from 'src/modules/auth/models/IPermission'
import IRole from 'src/modules/auth/models/IRole'

export default interface IUser {
  id: number | null
  name: string
  email: string
  permissions?: IPermission[]
  roles?: IRole[]
}
