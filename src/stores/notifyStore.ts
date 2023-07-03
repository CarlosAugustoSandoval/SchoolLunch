import { defineStore } from 'pinia'

export const notifyStore = defineStore('notifyStore', {
  state: () => ({
    counter: 0
  }),

  getters: {
    doubleCount: state => {
      return state.counter * 2
    }
  },

  actions: {
    increment () {
      this.counter++
    }
  }
})
