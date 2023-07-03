<template>
  <q-drawer
    v-model="model"
    show-if-above
    bordered
  >
    <q-list>
      <q-item-label header>
        Main Menu
      </q-item-label>
      <MainMenuItems />
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { SettingsStore } from 'src/modules/settings/store'
import MainMenuItems from 'src/modules/settings/components/MainMenuItems.vue'

const settingsStore = SettingsStore()
const model = computed({
  get () {
    return settingsStore.menuDrawer
  },
  set (newVal) {
    settingsStore.menuDrawer = newVal
  }
})
</script>
