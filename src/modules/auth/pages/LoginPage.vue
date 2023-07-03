<template>
  <q-page class="flex flex-center">
    <q-card :style="screenSize">
      <q-card-section>
        <q-avatar size="103px" class="absolute-center shadow-10">
          <img src="/src/assets/profile.svg">
        </q-avatar>
      </q-card-section>
      <q-card-section>
        <div class="text-center q-pt-xl">
          <div class="col text-h4 ellipsis">
            Nombre cliente
          </div>
          <p class="q-pt-md q-mb-none">
            Ingrese su correo electrónico y contraseña para acceder al panel de administración.
          </p>
        </div>
      </q-card-section>
      <q-card-section>
        <form ref="loginForm">
          <div class="q-gutter-y-md">
            <base-input
              v-model="model.email"
              label="Correo electrónico"
              name="Correo electrónico"
              rules="required|email"
            />
            <base-input
              v-model="model.password"
              label="Contraseña"
              name="Contraseña"
              rules="required"
              type="password"
              autocomplete="current-password"
            />
            <div>
              <q-btn
                label="Iniciar Sesión"
                type="button"
                color="primary"
                class="full-width"
                size="lg"
                :loading="loading"
                @click="sigIn"
              />
            </div>
          </div>
        </form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { useQuasar } from 'quasar'
import { AuthStore } from 'src/modules/auth/store'
import ILoginModel from 'src/modules/auth/models/ILoginModel'

const authStore = AuthStore()
const loginForm = reactive(useForm())
const router = useRouter()
const loading = ref(false)
const quasar = useQuasar()
const { login } = authStore
const screenSize = computed(() => ({
  width:
    quasar.screen.xs ? '90%'
      : quasar.screen.sm ? '70%'
        : quasar.screen.md ? '50%'
          : quasar.screen.lg ? '40%'
            : '30%'
}))

const model:ILoginModel = reactive({
  email: '',
  password: '',
  remember_token: 1,
  device: 'mi equipo'
})

const sigIn = () => {
  loginForm.validate().then(result => {
    if (result.valid) {
      loading.value = true
      login(model).then(response => {
        if (response) router.push({ name: 'Home' })
        loading.value = false
      })
    }
  })
}
</script>
