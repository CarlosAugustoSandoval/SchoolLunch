import { IPropsSelectInput } from 'components/input/select/SelectInput.vue'

const PropsSelectInput:IPropsSelectInput = {
  name: '',
  vid: '',
  error: false,
  rules: '',
  loading: false,
  clearable: false,
  autofocus: false,
  for: '',
  newValueMode: 'add-unique', // add, add-unique, toggle
  autocomplete: '',
  errorMessage: '',
  noErrorIcon: true,
  placeholder: '',
  label: '',
  stackLabel: true,
  hint: '',
  hideHint: true,
  prefix: '',
  suffix: '',
  counter: false,
  useInput: false,
  inputDebounce: 0,
  modelValue: null,
  multiple: false,
  emitValue: false,
  optionValue: '',
  optionLabel: '',
  optionDisable: false,
  optionsDense: false,
  optionsDark: false,
  optionsCover: false,
  menuAnchor: 'bottom end', // top left, top middle, top right, top start, top end, center left, center middle, center right, center start, center end, bottom left, bottom middle, bottom right, bottom start, bottom end
  menuSelf: 'top left', // top left, top middle, top right, top start, top end, center left, center middle, center right, center start, center end, bottom left, bottom middle, bottom right, bottom start, bottom end
  menuOffset: [0, 0], // [8, 8] || [5, 10]
  hideSelected: false,
  maxValues: 0,
  useChips: false,
  disable: false,
  readonly: false,
  labelColor: '',
  color: '',
  bgColor: '',
  dark: false,
  filled: false,
  outlined: true,
  borderless: false,
  standout: false,
  hideBottomSpace: false,
  rounded: false,
  square: false,
  dense: true,
  itemAligned: true,
  popupContentClass: '',
  popupContentStyle: '',
  inputClass: '',
  inputStyle: '',
  filterFn: null,
  options: []
}

export default PropsSelectInput
