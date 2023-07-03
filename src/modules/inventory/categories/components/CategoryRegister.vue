<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Categoría"
      subtitle="Registar Categoría"
      avatar
      avatar-color="primary"
      avatar-icon="label"
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
import ICategory from 'src/modules/inventory/categories/models/ICategory'
import Category from 'src/modules/inventory/categories/models/Category'
import { Notify } from 'quasar'
import { notifyError, cloner } from 'src/utilities/utilities'
import { DataTableStore } from 'components/dataTable/store'
interface IProps {
  modelValue: boolean
  item: ICategory | null
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  item: null
})
const dataTableStore = DataTableStore()
const emit = defineEmits(['update:modelValue', 'saved'])
const statuses = ['Active', 'Inactive', 'Canceled']
const loading = ref(false)
const item = ref(Category.create(null))
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
  item.value = Category.create(null)
}
const save = (value:boolean) => {
  if (value) {
    const dataCopy = cloner(item.value)
    const request = dataCopy.id ? api.put(`roles/${dataCopy.id}`, dataCopy) : api.post('roles', dataCopy)
    request
      .then(() => {
        Notify.create({
          type: 'positive',
          message: `La categpría se ${dataCopy.id ? 'actualizó' : 'creó'} correctamente.`
        })
        model.value = false
        // emit('saved')
        dataTableStore.setReloadTable('tableCards')
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
        if (data?.data) item.value = Category.create(data?.data?.rol)
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}
</script>
