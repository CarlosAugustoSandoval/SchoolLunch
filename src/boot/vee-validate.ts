import { boot } from 'quasar/wrappers'

import { defineRule, configure, Form, Field } from 'vee-validate'
import { required, email, confirmed } from '@vee-validate/rules'
import { localize } from '@vee-validate/i18n'
import es from '@vee-validate/i18n/dist/locale/es.json'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.component('vee-form', Form)
  app.component('vee-field', Field)
  configure({
    generateMessage: localize('es', { ...es })
  })

  defineRule('required', required)
  defineRule('email', email)
  defineRule('confirmed', confirmed)
})
