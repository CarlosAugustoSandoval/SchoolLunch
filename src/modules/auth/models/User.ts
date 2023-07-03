import IUser from 'src/modules/auth/models/IUser'
import IPermission from 'src/modules/auth/models/IPermission'
import IRole from 'src/modules/auth/models/IRole'

export default class User implements IUser {
  id: number | null
  email: string
  name: string
  permissions: IPermission[]
  roles: IRole[]

  static create (User:IUser | null) {
    return new this(
      User?.id || null,
      User?.name || '',
      User?.email || '',
      User?.permissions || [],
      User?.roles || []
    )
  }

  constructor (id: number | null, name:string, email:string, permissions:IPermission[], roles:IRole[]) {
    this.id = id
    this.name = name
    this.email = email
    this.permissions = permissions
    this.roles = roles
  }
}
