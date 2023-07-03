<template>
  <router-view />
</template>

<script setup lang="ts">
import { AuthStore } from 'src/modules/auth/store'

const authStore = AuthStore()
const { setDefaultAxios } = authStore

setDefaultAxios()
</script>
