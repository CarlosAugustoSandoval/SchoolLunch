<template>
  <template v-for="(menu, indexMenu) in MainMenuItems">
    <q-separator v-if="menu.type === 'separator'" :key="`mainMenuSeparator${indexMenu}`" spaced />
    <q-item-label v-if="menu.type === 'label'" :key="`mainMenuLabel${indexMenu}`" header>{{ menu.title }}</q-item-label>
    <q-item
      v-if="!menu.type"
      :key="`mainMenu${indexMenu}`"
      clickable
      :to="{name: menu.routeName}"
    >
      <q-item-section
        v-if="menu.icon"
        avatar
      >
        <q-icon :name="menu.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ menu.title }}</q-item-label>
        <q-item-label caption>{{ menu.caption }}</q-item-label>
      </q-item-section>
    </q-item>
  </template>
</template>

<script lang="ts" setup>
import MainMenuItemProps from 'src/modules/settings/models/MainMenuItemProps'
import MainMenuItems from 'src/modules/settings/data/MainMenuItems'

export interface IMainMenuItemProps {
  title?: string
  caption?: string
  routeName?: string
  icon?: string
  type?: string
}
withDefaults(defineProps<IMainMenuItemProps>(), { ...MainMenuItemProps })
</script>
