<template>
  <q-layout view="hHr lpR fFr">
    <SaleRegisterHeader />
    <UserMenu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { AuthStore } from 'src/modules/auth/store'
import UserMenu from 'src/modules/settings/components/UserMenu.vue'
import SaleRegisterHeader from 'src/modules/sales/components/SaleRegisterHeader.vue'

const authStore = AuthStore()
const { getUser } = authStore

getUser()
</script>
