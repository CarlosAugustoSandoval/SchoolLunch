<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Rol"
      subtitle="Registar Rol"
      avatar
      avatar-color="primary"
      avatar-icon="settings_accessibility"
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
          use-input
          label="Permisos"
          v-model="item.permissions"
          :loading="loadingPermissions"
          :options="permissions"
          option-value="id"
          option-label="name"
          name="Permisos"
          rules="required"
          multiple
          use-chips
        />
      </div>
    </base-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { api } from 'boot/axios'
import IRole from 'src/modules/auth/models/IRole'
import Role from 'src/modules/auth/models/Role'
import { Notify } from 'quasar'
import { notifyError, cloner } from 'src/utilities/utilities'
import IPermission from 'src/modules/auth/models/IPermission'
import { DataTableStore } from 'components/dataTable/store'
interface IProps {
  modelValue: boolean
  item: IRole | null
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
const loading = ref(false)
const loadingPermissions = ref(false)
const item = ref(Role.create(null))
let permissions:IPermission[] = []
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
    getPermissions()
  } else clearItem()
})
const clearItem = () => {
  item.value = Role.create(null)
}
const save = (value:boolean) => {
  if (value) {
    const dataCopy = cloner(item.value)
    dataCopy.permissions = dataCopy.permissions.map((x:IPermission) => x.id)
    dataCopy.permisos = dataCopy.permissions
    const request = dataCopy.id ? api.put(`roles/${dataCopy.id}`, dataCopy) : api.post('roles', dataCopy)
    request
      .then(() => {
        Notify.create({
          type: 'positive',
          message: `El rol se ${dataCopy.id ? 'actualizó' : 'creó'} correctamente.`
        })
        model.value = false
        emit('saved')
        // dataTableStore.setReloadTable('tableRoles')
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
        if (data?.data) item.value = Role.create(data?.data?.rol)
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}

const getPermissions = () => {
  loadingPermissions.value = true
  api.get('permisos')
    .then(({ data }) => {
      permissions = data?.data?.permisos || []
    })
    .catch(error => Notify.create(notifyError(error)))
    .finally(() => { loadingPermissions.value = false })
}
</script>
