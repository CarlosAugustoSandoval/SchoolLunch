import { defineStore } from 'pinia'
import ISettingsState from 'src/modules/settings/models/ISettingsState'

export const SettingsStore = defineStore('SettingsStore', {
  state: (): ISettingsState => ({
    menuDrawer: true,
    userDrawer: false,
    locale: 'es-CO'
  }),

  actions: {
    async setMenuOpen (open = true) {
      this.menuDrawer = open
    },
    async setUserMenuOpen (open = false) {
      this.userDrawer = open
    }
  },
  persist: true
})
