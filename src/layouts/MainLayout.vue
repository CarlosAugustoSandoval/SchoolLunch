<template>
  <q-layout view="lHh Lpr lFf">
    <MainHeader />
    <MainMenu />
    <UserMenu />
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { AuthStore } from 'src/modules/auth/store'
import MainHeader from 'src/modules/settings/components/MainHeader.vue'
import MainMenu from 'src/modules/settings/components/MainMenu.vue'
import UserMenu from 'src/modules/settings/components/UserMenu.vue'

const authStore = AuthStore()
const { getUser } = authStore

getUser()
</script>
