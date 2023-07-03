<template>
  <vee-field
    :name="props.name"
    :rules="props.rules"
    :vid="props.vid"
    v-slot="{ errors }"
    v-model="vModel"
  >
    <q-select
      :use-input="props.useInput"
      :options="options"
      @filter="filterFn"
      :option-value="props.optionValue"
      :option-label="props.optionLabel"
      v-model="vModel"
      :autocomplete="props.autocomplete"
      :outlined="props.outlined"
      :label="props.label"
      :placeholder="props.placeholder"
      :hint="props.hint"
      :dense="props.dense"
      :no-error-icon="props.noErrorIcon"
      :error="errors.length > 0"
      :error-message="errors[0]"
      :loading="props.loading"
      :multiple="props.multiple"
      :use-chips="props.useChips"
      :clearable="props.clearable"
    >
      <template v-slot:no-option>
        <q-item>
          <q-item-section class="text-grey">
            No results
          </q-item-section>
        </q-item>
      </template>
    </q-select>
  </vee-field>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import PropsSelectInput from 'components/input/select/PropsSelectInput'

export interface IPropsSelectInput {
  name?: string
  vid?: string
  error?: boolean
  rules?: string
  loading?: boolean
  clearable?: boolean
  autofocus?: boolean
  for?: string
  newValueMode?: string // add, add-unique, toggle
  autocomplete?: string
  errorMessage?: string
  noErrorIcon?: boolean
  placeholder?: string
  label?: string
  stackLabel?: boolean
  hint?: string
  hideHint?: boolean
  prefix?: string
  suffix?: string
  counter?: boolean
  useInput?: boolean,
  inputDebounce?: number | string
  modelValue: any
  multiple?: boolean
  emitValue?: boolean
  optionValue?: string
  optionLabel?: string
  optionDisable?: boolean
  optionsDense?: boolean
  optionsDark?: boolean
  optionsCover?: boolean
  menuAnchor?: string // top left, top middle, top right, top start, top end, center left, center middle, center right, center start, center end, bottom left, bottom middle, bottom right, bottom start, bottom end
  menuSelf?: string // top left, top middle, top right, top start, top end, center left, center middle, center right, center start, center end, bottom left, bottom middle, bottom right, bottom start, bottom end
  menuOffset?: any // [8, 8] || [5, 10]
  hideSelected?: boolean
  maxValues?: number | string
  useChips?: boolean
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
  popupContentClass?: string
  popupContentStyle?: string
  inputClass?: string
  inputStyle?: string
  filterFn?: any
  options: any
}

const props = withDefaults(defineProps<IPropsSelectInput>(), { ...PropsSelectInput })

const emit = defineEmits<{(event: 'update:modelValue', value:any): void}>()
const vModel = computed({
  get () {
    return props.modelValue
  },
  set (value:any) {
    emit('update:modelValue', value)
  }
})

const options = ref(props.options)

const filterFn = (val: string, update: (arg0: () => void) => void, abort: any) => {
  update(() => {
    const needle = val.toLowerCase()
    options.value = props.options.filter((v:any) =>
      props.filterFn
        ? props.filterFn(v, needle)
        : props.optionLabel
          ? v[props.optionLabel].includes(needle)
          : v.toLowerCase().includes(needle)
    )
  })
}
</script>
