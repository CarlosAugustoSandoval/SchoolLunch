<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Etiqueta"
      subtitle="Registar Etiqueta"
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
        <q-input
          outlined
          dense
          v-model="item.color"
          label="Color"
          clearable
        >
          <template v-slot:prepend>
            <q-chip v-if="item.color" square :style="`background-color: ${item.color}`" />
          </template>
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy cover transition-show="scale" transition-hide="scale">
                <q-color v-model="item.color" style="min-width: 300px" no-header-tabs/>
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
      </div>
    </base-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { api } from 'boot/axios'
import ILabel from 'src/modules/labels/models/ILabel'
import Label from 'src/modules/labels/models/Label'
import { Notify } from 'quasar'
import { notifyError, cloner } from 'src/utilities/utilities'
import { DataTableStore } from 'components/dataTable/store'
interface IProps {
  modelValue: boolean
  item: ILabel | null
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  item: null
})
const dataTableStore = DataTableStore()
const emit = defineEmits(['update:modelValue', 'saved'])
const statuses = ['Active', 'Inactive']
const loading = ref(false)
const item = ref(Label.create(null))
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
  item.value = Label.create(null)
}
const save = (value:boolean) => {
  if (value) {
    const dataCopy = cloner(item.value)
    const request = dataCopy.id ? api.put(`roles/${dataCopy.id}`, dataCopy) : api.post('roles', dataCopy)
    request
      .then(() => {
        Notify.create({
          type: 'positive',
          message: `La etiqueta se ${dataCopy.id ? 'actualizó' : 'creó'} correctamente.`
        })
        model.value = false
        // emit('saved')
        dataTableStore.setReloadTable('tableLabels')
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
        if (data?.data) item.value = Label.create(data?.data?.rol)
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}
</script>
