<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Grado"
      subtitle="Registar Grado"
      avatar
      avatar-color="primary"
      avatar-icon="format_list_numbered"
      close-button
      form-validation
      body-separator
      show-actions
      @save="save"
      @close="model = false"
      @cancel="model = false"
    >
      <div class="q-gutter-y-md">
        <base-input
          v-model="item.name"
          label="Nombre"
          name="Nombre"
          rules="required"
        />
        <select-input
          label="Estado"
          v-model="item.status"
          :options="statuses"
          name="Estado"
          rules="required"
        />
      </div>
    </base-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { api } from 'boot/axios'
import IGrade from 'src/modules/grades/models/IGrade'
import Grade from 'src/modules/grades/models/Grade'
import { Notify } from 'quasar'
import { notifyError, cloner } from 'src/utilities/utilities'
import { DataTableStore } from 'components/dataTable/store'
interface IProps {
  modelValue: boolean
  item: IGrade | null
}
// const fitraRol = (item: any, stringValue = '') => {
//   console.log('item', item)
//   console.log('stringValue', stringValue)
//   const item1 = (item?.id && String(item.id).toLowerCase()) || ''
//   return item1.includes(stringValue)
// }

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  item: null
})
const dataTableStore = DataTableStore()
const emit = defineEmits(['update:modelValue', 'saved'])
const statuses = ['Active', 'Inactive']
const loading = ref(false)
const item = ref(Grade.create(null))
const model = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})
watch(() => props.modelValue, newValue => {
  if (newValue) {
    getItem()
  } else clearItem()
})
const clearItem = () => {
  item.value = Grade.create(null)
}
const save = (value:boolean) => {
  if (value) {
    const dataCopy = cloner(item.value)
    const request = dataCopy.id ? api.put(`roles/${dataCopy.id}`, dataCopy) : api.post('roles', dataCopy)
    request
      .then(() => {
        Notify.create({
          type: 'positive',
          message: `El grado se ${dataCopy.id ? 'actualizó' : 'creó'} correctamente.`
        })
        model.value = false
        // emit('saved')
        dataTableStore.setReloadTable('tableGrades')
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}
const getItem = () => {
  if (props.item?.id) {
    loading.value = true
    api.get(`roles/${props.item.id}`)
      .then(({ data }) => {
        if (data?.data) item.value = Grade.create(data?.data?.rol)
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}
</script>
