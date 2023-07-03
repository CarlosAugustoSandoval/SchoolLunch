<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Usuario"
      subtitle="Registar Usuario"
      avatar
      avatar-color="primary"
      avatar-icon="person"
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
        <base-input
          v-model="item.email"
          label="Correo electrónico"
          name="Correo electrónico"
          rules="required|email"
        />
        <select-input
          use-input
          label="Roles"
          v-model="item.roles"
          :loading="loadingRoles"
          :options="roles"
          option-value="id"
          option-label="name"
          name="Roles"
          rules="required"
          multiple
          use-chips
        />
        <template v-if="!item.id && !loading">
          <base-input
            v-model="password"
            label="Contraseña"
            name="Contraseña"
            rules="required"
            type="password"
            autocomplete="new-password"
          />
          <base-input
            v-model="passwordConfirmation"
            label="Confirmación de contraseña"
            name="Confirmación de contraseña"
            rules="required|confirmed:@Contraseña"
            type="password"
            autocomplete="new-password"
          />
        </template>
      </div>
    </base-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { api } from 'boot/axios'
import IUser from 'src/modules/auth/models/IUser'
import IRole from 'src/modules/auth/models/IRole'
import User from 'src/modules/auth/models/User'
import { Notify } from 'quasar'
import { notifyError, cloner } from 'src/utilities/utilities'
interface IProps {
  modelValue: boolean
  item: IUser | null
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
const emit = defineEmits(['update:modelValue', 'saved'])
const loading = ref(false)
const loadingRoles = ref(false)
const item = ref(User.create(null))
const password = ref(null)
const passwordConfirmation = ref(null)
let roles:IRole[] = []
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
    getRoles()
  } else clearItem()
})
const clearItem = () => {
  item.value = User.create(null)
  password.value = null
  passwordConfirmation.value = null
}
const save = (value:boolean) => {
  if (value) {
    const dataCopy = cloner(item.value)
    dataCopy.roles = dataCopy.roles.map((x:IRole) => x.id)
    dataCopy.password = password.value
    dataCopy.passwordConfirmation = passwordConfirmation.value
    // unnecessary
    const characters = '123456789'
    let result = ''
    for (let i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * 9))
    }
    dataCopy.identificacion = result
    dataCopy.tipo_identificacion = 'CC'
    dataCopy.telefono = '3222346834'
    const request = dataCopy.id ? api.put(`usuarios/${dataCopy.id}`, dataCopy) : api.post('usuarios', dataCopy)
    request
      .then(() => {
        Notify.create({
          type: 'positive',
          message: `El usuario se ${dataCopy.id ? 'actualizó' : 'creó'} correctamente.`
        })
        emit('saved')
        model.value = false
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}
const getItem = () => {
  if (props.item?.id) {
    loading.value = true
    api.get(`usuarios/${props.item.id}`)
      .then(({ data }) => {
        if (data?.data) item.value = User.create(data?.data?.usuario)
      })
      .catch(error => Notify.create(notifyError(error)))
      .finally(() => { loading.value = false })
  }
}

const getRoles = () => {
  loadingRoles.value = true
  api.get('roles')
    .then(({ data }) => {
      roles = data?.data[0] || []
    })
    .catch(error => Notify.create(notifyError(error)))
    .finally(() => { loadingRoles.value = false })
}
</script>
