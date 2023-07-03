<template>
  <q-item :clickable="props.clickable" :v-ripple="props.vRipple" class="q-px-sm" @click.stop="props.clickable ? toggleUserMenu() : ''">
    <q-item-section side :class="$q.screen.lt.sm ? 'q-px-none' : ''">
      <q-avatar rounded size="48px">
        <img src="/src/assets/profile.svg">
      </q-avatar>
    </q-item-section>
    <q-item-section v-if="$q.screen.gt.xs">
      <q-item-label>{{ user.name }}</q-item-label>
      <q-item-label caption class="text-white">{{ user.email }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script lang="ts" setup>
import { SettingsStore } from 'src/modules/settings/store'
import { AuthStore } from 'src/modules/auth/store'
import UserIndicatorProps from 'src/modules/settings/models/UserIndicatorProps'

export interface IUserIndicatorProps {
  clickable?: boolean
  vRipple?: boolean
  clicked?: boolean
}
const props = withDefaults(defineProps<IUserIndicatorProps>(), { ...UserIndicatorProps })
const authStore = AuthStore()
const user = authStore.user
const settingsStore = SettingsStore()

const toggleUserMenu = () => {
  settingsStore.setUserMenuOpen(!settingsStore.userDrawer)
}
</script>
