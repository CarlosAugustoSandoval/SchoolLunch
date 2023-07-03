<template>
  <q-select
    v-model="locale"
    :options="options"
    dense
    dark
    outlined
    emit-value
    map-options
  >
    <template v-slot:selected>
      <div v-if="model" class="row items-center no-wrap">
        <CountryFLag style="margin-top: -9px;" :style="$q.screen.lt.md ?'' : 'margin-right: 1px;'" :country='model.flag'/>
        {{ $q.screen.lt.md ?'' : model.label }}
      </div>
    </template>
    <template v-slot:option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section avatar>
          <CountryFLag style="margin-top: -9px; margin-right: 1px;" :country='scope.opt.flag'/>
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ scope.opt.label }}</q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts" setup>
import CountryFLag from 'vue-country-flag-next'
import { SettingsStore } from 'src/modules/settings/store'
import { useI18n } from 'vue-i18n'
import { computed, watch } from 'vue'

const options:Record<string, string>[] = [
  { value: 'en-US', label: 'English', flag: 'us' },
  { value: 'es-CO', label: 'Español', flag: 'co' }
]
const settingsStore = SettingsStore()
const model = computed(() => options.find(x => x.value === locale.value) || null)
const { locale } = useI18n({ useScope: 'global' })

watch(locale, newValue => {
  settingsStore.locale = String(newValue)
})
</script>
