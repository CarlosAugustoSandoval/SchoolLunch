import IPermission from 'src/modules/auth/models/IPermission'
export default interface IRole {
  id: number | null
  name: string
  created_at?: string
  guard_name?: string
  permissions?: IPermission[]
}
