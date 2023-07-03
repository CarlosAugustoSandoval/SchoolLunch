import IUser from 'src/modules/auth/models/IUser'

export default interface IAuthState {
  access_token?: string,
  expires_at?: string,
  token_type?: string,
  user?: IUser | null
}
