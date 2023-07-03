<template>
  <vee-field
    :name="props.name"
    :rules="props.rules"
    :vid="props.vid"
    v-slot="{ errors }"
    v-model="vModel"
  >
    <q-input
      v-model="vModel"
      :autofocus="props.autofocus"
      :autocomplete="props.autocomplete"
      :outlined="props.outlined"
      :label="label"
      :placeholder="props.placeholder"
      :hint="props.hint"
      :lazy-rules="props.lazyRules"
      :dense="props.dense"
      :type="props.type"
      :no-error-icon="props.noErrorIcon"
      :error="errors.length > 0"
      :error-message="errors[0]"
      :hide-bottom-space="props.hideBottomSpace"
      :readonly="props.readonly"
    />
  </vee-field>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import BasePropsInput from 'components/input/base/BasePropsInput'

export interface IBasePropsInput {
  name?: string
  vid?: string
  autocomplete?: string
  mask?: string
  fillMask?: boolean | string
  unmaskedValue?: boolean
  error?: boolean
  rules?: any
  lazyRules?: boolean | string
  loading?: boolean
  clearable?: boolean
  autofocus?: boolean
  errorMessage?: string
  noErrorIcon?: boolean
  label?: string
  placeholder?: string
  stackLabel?: boolean
  hint?: string
  hideHint?: boolean
  prefix?: string
  suffix?: string
  labelSlot?: boolean
  bottomSlots?: boolean
  counter?: boolean
  shadowText?: string
  autogrow?: boolean
  type?: string
  modelValue?: string | number | null | undefined
  debounce?: string | number
  maxlength?: string | number
  disable?: boolean
  readonly?: boolean
  labelColor?: string
  color?: string
  bgColor?: string
  dark?: boolean
  filled?: boolean
  outlined?: boolean
  borderless?: boolean
  standout?: boolean | string
  hideBottomSpace?: boolean
  rounded?: boolean
  square?: boolean
  dense?: boolean
  itemAligned?: boolean
  inputClass?: string
  inputStyle?: string
}

const props = withDefaults(defineProps<IBasePropsInput>(), { ...BasePropsInput })

const emit = defineEmits<{(event: 'update:modelValue', value:string | number | null | undefined): void}>()

const vModel = computed({
  get () {
    return props.modelValue
  },
  set (value:string|number|null|undefined) {
    emit('update:modelValue', value)
  }
})
</script>
