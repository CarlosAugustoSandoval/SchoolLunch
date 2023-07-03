<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click.stop="toggleMenu"
      />
      <q-toolbar-title>
        {{ $t('defaultLayout.header.title') }}
      </q-toolbar-title>
      <LanguageSwitcher class="q-mr-sm" />
      <UserIndicator />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import { SettingsStore } from 'src/modules/settings/store'
import UserIndicator from 'src/modules/settings/components/UserIndicator.vue'
import LanguageSwitcher from 'src/modules/settings/components/LanguageSwitcher.vue'

const settingsStore = SettingsStore()

const toggleMenu = () => settingsStore.setMenuOpen(!settingsStore.menuDrawer)
</script>
