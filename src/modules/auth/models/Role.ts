import IPermission from 'src/modules/auth/models/IPermission'
import IRole from 'src/modules/auth/models/IRole'

export default class Role implements IRole {
  id: number | null
  name: string
  permissions: IPermission[]

  static create (Role:IRole | null) {
    return new this(
      Role?.id || null,
      Role?.name || '',
      Role?.permissions || []
    )
  }

  constructor (id: number | null, name:string, permissions:IPermission[]) {
    this.id = id
    this.name = name
    this.permissions = permissions
  }
}
