import { defineStore } from 'pinia'
import IAuthState from 'src/modules/auth/models/IAuthState'
import { api } from 'boot/axios'
import { Notify } from 'quasar'
import { notifyError } from 'src/utilities/utilities'
import ILoginModel from 'src/modules/auth/models/ILoginModel'
import User from 'src/modules/auth/models/User'

export const AuthStore = defineStore('AuthStore', {
  state: (): IAuthState => ({
    access_token: '',
    expires_at: '',
    token_type: '',
    user: null
  }),

  getters: {
    permissions: state => {
      if (state.user?.permissions?.length) {
        return state.user.permissions.reduce((result, key) => {
          return Object.defineProperty(result, key.referencia, { value: true })
        }, {})
      }
      return {}
    }
  },

  actions: {
    async login (user:ILoginModel) {
      return await new Promise(resolve => {
        api.post('login', user)
          .then(({ data }) => {
            if (data?.data) {
              this.access_token = data.data.token
              this.token_type = data.data.tipoToken
              data.data.usuario.permissions = data.data.usuario.permisos
              this.user = User.create(data.data.usuario)
              this.setDefaultAxios()
              resolve(true)
            }
          })
          .catch(error => {
            Notify.create(notifyError(error))
            resolve(false)
          })
      })
    },
    async getUser () {
      return await new Promise(resolve => {
        api.get('usuario')
          .then(({ data }) => {
            if (data?.data?.usuario) {
              data.data.usuario.permissions = data.data.usuario.permisos
              this.user = User.create(data.data.usuario)
              resolve(true)
            }
          })
          .catch(error => {
            Notify.create(notifyError(error))
            resolve(false)
          })
      })
    },
    async logOut () {
      return await new Promise(resolve => {
        api.post('logout')
          .then(() => {
            this.access_token = ''
            this.token_type = ''
            this.user = null
            this.setDefaultAxios()
            resolve(true)
          })
          .catch(error => {
            Notify.create(notifyError(error))
            resolve(false)
          })
      })
    },
    setDefaultAxios () {
      api.defaults.headers.common.Authorization = this.access_token && this.token_type
        ? `${this.token_type} ${this.access_token}`
        : ''
    }
  },
  persist: true
})
