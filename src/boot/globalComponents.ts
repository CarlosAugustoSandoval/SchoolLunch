import { boot } from 'quasar/wrappers'
import BaseInput from 'components/input/base/BaseInput.vue'
import BaseCard from 'components/baseCard/BaseCard.vue'
import SelectInput from 'components/input/select/SelectInput.vue'
import DataTable from 'components/dataTable/DataTable.vue'
import OptionsButtons from 'components/optionsButtons/OptionButtons.vue'

export default boot(async ({ app }) => {
  app.component('base-input', BaseInput)
  app.component('select-input', SelectInput)
  app.component('base-card', BaseCard)
  app.component('data-table', DataTable)
  app.component('options-buttons', OptionsButtons)
})
