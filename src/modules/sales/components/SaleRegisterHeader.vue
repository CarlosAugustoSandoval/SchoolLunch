<template>
  <q-header elevated>
    <q-toolbar>
      <q-toolbar-title>
        <q-icon name="fa fa-cash-register" size="md" class="q-mr-md" />
        Registro de venta
      </q-toolbar-title>
      <LanguageSwitcher class="q-mr-sm" />
      <UserIndicator />
    </q-toolbar>
  </q-header>
</template>

<script lang="ts" setup>
import UserIndicator from 'src/modules/settings/components/UserIndicator.vue'
import LanguageSwitcher from 'src/modules/settings/components/LanguageSwitcher.vue'
</script>
