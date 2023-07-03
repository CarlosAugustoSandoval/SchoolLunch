<template>
  <q-card :style="`width: ${props.width};`">
    <q-toolbar class="q-py-sm">
      <q-avatar v-if="props.avatar" :color="props.avatarColor" size="xl">
        <q-icon v-if="props.avatarIcon" :size="props.avatarIconSize" :name="props.avatarIcon" />
      </q-avatar>

      <q-toolbar-title>
        <q-item-section>
          <q-item-label>{{ props.title }}</q-item-label>
          <q-item-label v-if="props.subtitle" class="text-subtitle2">{{ props.subtitle }}</q-item-label>
        </q-item-section>
      </q-toolbar-title>

      <q-btn
        v-if="props.closeButton" flat round dense icon="close" :loading="loadingModel" @click.stop="close" />
    </q-toolbar>

    <q-separator v-if="props.headerSeparator" />

    <component
      :is="props.formValidation ? 'form' : 'div'"
      ref="baseCardForm"
      @submit.prevent="props.formSubmit ? accept() : ''"
    >
      <q-card-section>
        <slot />
        <q-banner
          v-if="props.showAlertErrors && props.formValidation && Object.entries(errorsModel.value).length"
          inline-actions class="text-white bg-red"
        >
          <q-icon size="sm" name="warning" />
          Hay errores en el formulario
        </q-banner>
      </q-card-section>

      <q-separator v-if="props.bodySeparator" />
      <q-card-actions v-if="props.showActions" :align="props.actionsAlign">
        <q-btn
          v-if="props.cancelBtn"
          flat
          :label="props.cancelBtnLabel"
          color="primary"
          :loading="loadingModel"
          @click="cancel"
        />
        <q-btn
          :label="props.acceptBtnLabel"
          color="primary"
          :type="props.formSubmit ? 'submit' : 'button'"
          :loading="loadingModel"
          @click="accept"
        />
      </q-card-actions>
    </component>
  </q-card>
</template>

<script lang="ts" setup>
import { ref, defineEmits, watch, computed } from 'vue'
import { useForm } from 'vee-validate'
import PropsBaseCard from 'components/baseCard/PropsBaseCard'

export interface IPropsBaseCard {
  title: string
  subtitle?: string
  loading?: boolean
  avatar?: boolean
  avatarColor?: string
  avatarIcon?: string
  avatarIconSize?: string
  closeButton?: boolean
  headerSeparator?: boolean
  bodySeparator?: boolean
  formValidation?: boolean
  showActions?: boolean
  actionsAlign?: string
  cancelBtn?: boolean
  cancelBtnLabel?: string
  acceptBtnLabel?: string
  width?: string
  showAlertErrors?: boolean
  formSubmit?: boolean
}

const loadingModel = ref(false)
const errorsModel = computed(() => baseCardForm.errors)
const props = withDefaults(defineProps<IPropsBaseCard>(), { ...PropsBaseCard })
const emit = defineEmits(['update:loading', 'close', 'cancel', 'save'])
const baseCardForm = useForm()
watch(() => props.loading, newValue => {
  loadingModel.value = newValue
}, { immediate: true })

watch(loadingModel, newValue => {
  emit('update:loading', newValue)
})

const accept = async () => {
  if (props.formValidation) {
    if ((await baseCardForm.validate()).valid) {
      loadingModel.value = true
      emit('save', true)
    } else emit('save', false)
  } else {
    emit('save', true)
    loadingModel.value = true
  }
}
const cancel = () => {
  if (props.formValidation) baseCardForm.resetForm()
  emit('cancel')
  loadingModel.value = false
}
const close = () => {
  if (props.formValidation) baseCardForm.resetForm()
  emit('close')
  loadingModel.value = false
}
</script>
