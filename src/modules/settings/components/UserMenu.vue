<template>
  <q-drawer
    v-model="model"
    side="right"
    bordered
  >
    <q-list>
      <q-item-label header>
        User configurations
      </q-item-label>
      <q-item
        clickable
        @click.stop="close"
      >
        <q-item-section avatar>
          <q-circular-progress
            v-if="loading"
            indeterminate
            rounded
            size="30px"
            color="primary"
          />
          <q-icon v-else name="power_settings_new" />
        </q-item-section>

        <q-item-section>
          <q-item-label>Cerrar sesión</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </q-drawer>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { SettingsStore } from 'src/modules/settings/store'
import { AuthStore } from 'src/modules/auth/store'
import { useRouter } from 'vue-router'

const authStore = AuthStore()
const settingsStore = SettingsStore()
const { logOut } = authStore
const router = useRouter()
const loading = ref(false)

const model = computed({
  get () {
    return settingsStore.userDrawer
  },
  set (newVal) {
    settingsStore.userDrawer = newVal
  }
})

const close = () => {
  loading.value = true
  logOut().then(response => {
    if (response) router.push({ name: 'Login' })
    loading.value = false
  })
}
</script>
