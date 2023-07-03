<template>
  <q-dialog v-model="model" persistent>
    <base-card
      v-model:loading="loading"
      title="Registar Pago"
      subtitle="Registar Pago"
      avatar
      avatar-color="primary"
      :avatar-icon="icon"
      avatar-icon-size="sm"
      close-button
      form-validation
      body-separator
      show-actions
      @save="save"
      @close="model = false"
      @cancel="model = false"
    >
      <div class="q-gutter-y-md">
        <select-input
          v-if="props.paymentType === 'cash'"
          use-input
          :dense="false"
          label="Cliente"
          v-model="item.member"
          :options="members"
          option-value="id"
          option-label="identification"
          name="Cliente"
          rules="required"
          clearable
          :filter-fn="filterMember"
        />
        <q-item v-if="item.member" class="q-pa-sm q-ma-none" :class="props.paymentType === 'cash' ? '' : 'q-mt-lg'" clickable>
          <q-item-section avatar>
            <img v-if="item.member.avatar" :src="item.member.avatar" width="100" height="100">
            <q-icon v-else color="primary" size="lg" :name="item.member.sex === 'male' ? 'face' : 'face_3'" />
          </q-item-section>
          <q-item-section>
            <div>{{ [item.member.first_name, item.member.last_name].filter(x => x).join(' ') }}</div>
            <div class="text-caption">{{ [item.member.identification_type, item.member.identification].filter(x => x).join(' ') }}</div>
            <div v-if="props.paymentType === 'card'">Saldo en cuenta: <strong class="text-primary">${{ receivedAmount }}</strong></div>
          </q-item-section>
          <q-item-section side>
            <q-btn round color="negative" icon="close" @click.stop="clearCard"/>
          </q-item-section>
        </q-item>
        <q-toolbar class="bg-purple text-white shadow-2">
          <q-toolbar-title style="white-space: normal !important;">TOTAL A PAGAR</q-toolbar-title>
          <q-space style="flex-grow: 0 !important;" />
          <span class="text-h5">${{ item.total_amount }}</span>
        </q-toolbar>
        <template v-if="props.paymentType === 'cash'">
          <base-input
            v-model.number="receivedAmount"
            label="Valor recibido"
            name="Valor recibido"
            rules="required"
            autofocus
            :dense="false"
          />
          <q-toolbar class="text-white shadow-2" :class="`bg-${returnAmount < 0 ? 'red' : 'info'}`">
            <q-toolbar-title style="white-space: normal !important;">Monto {{ returnAmount < 0 ? 'pendiente' : 'a devolver' }}</q-toolbar-title>
            <q-space style="flex-grow: 0 !important;" />
            <span class="text-h5">${{ returnAmount < 0 ? returnAmount * -1 : returnAmount }}</span>
          </q-toolbar>
        </template>
        <template v-else>
          <div v-show="!validateCard" class="text-center q-mb-lg" style="position: relative">
            <div style="position: absolute; width: 100%">
              <q-spinner
                color="primary"
                size="50px"
              />
              <div>
                Esperando lectura de tarjeta...
              </div>
            </div>
            <div>
              <q-input
                ref="inputCardCode"
                v-model="cardCode"
                autofocus
                @blur="$refs?.inputCardCode?.focus"
                style="opacity: 0"
              />
            </div>
          </div>
          <q-toolbar class="text-white shadow-2" :class="`bg-${returnAmount < 0 ? 'red' : 'info'}`">
            <q-toolbar-title style="white-space: normal !important;">Monto {{ returnAmount < 0 ? 'pendiente' : 'disponible en cuenta' }}</q-toolbar-title>
            <q-space style="flex-grow: 0 !important;" />
            <span class="text-h5">${{ returnAmount < 0 ? returnAmount * -1 : returnAmount }}</span>
          </q-toolbar>
        </template>
        <q-checkbox
          v-if="returnAmount < 0 && item.member"
          v-model="allowNegativeBalance"
          :true-value="1"
          :false-value="0"
          label="Permitir venta con con monto pendiente"
        />
      </div>
    </base-card>
  </q-dialog>
</template>

<script lang="ts" setup>
import { ref, computed, defineEmits, watch } from 'vue'
import { api } from 'boot/axios'
import { Notify, QInput } from 'quasar'
import { debounce } from 'lodash'
import { notifyError, cloner } from 'src/utilities/utilities'
import { DataTableStore } from 'components/dataTable/store'
import { DataMockStore } from 'src/dataMock/store'
import ISale from 'src/modules/sales/models/ISale'
import Sale from 'src/modules/sales/models/Sale'
import IMember from 'src/modules/members/models/IMember'
import ICard from 'src/modules/cards/models/ICard'
interface IProps {
  modelValue: boolean
  order: ISale | null
  paymentType: string
}

const props = withDefaults(defineProps<IProps>(), {
  modelValue: false,
  order: null,
  paymentType: ''
})
const inputCardCode = ref<InstanceType<typeof QInput>>()
const dataMockStore = DataMockStore()
const dataTableStore = DataTableStore()
const allowNegativeBalance = ref(false)
const emit = defineEmits(['update:modelValue', 'saved'])
const icon = computed(() => props.paymentType === 'cash' ? 'fa fa-money-bill' : 'fa fa-credit-card')
const returnAmount = computed(() => receivedAmount.value - item.value.total_amount)
const loading = ref(false)
const validateCard = ref(false)
const cardCode = ref<string>('')
const receivedAmount = ref<number>(0)
const members = ref<IMember[]>([])
const cards = ref<ICard[]>([])
const item = ref(Sale.create(null))
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

watch(() => cardCode.value, newValue => {
  if (newValue) {
    findCard()
  }
})

const filterMember = (item: any, stringValue = '') => {
  const item1 = (item?.identification && String(item.identification).toLowerCase()) || ''
  const fullName = [item?.first_name, item?.last_name].filter(x => x).join(' ')
  const item2 = (fullName && String(fullName).toLowerCase()) || ''
  return item1.includes(stringValue) || item2.includes(stringValue)
}

const findCard = debounce(function () {
  console.log('cardCode.value', cardCode.value)
  const card = cards.value.find(x => x.code === cardCode.value)
  if (card) {
    if (card.member) {
      item.value.member = card.member
      receivedAmount.value = card.balance
      validateCard.value = true
    } else {
      console.log('La tarjeta no está vinculada a ningun cliente.')
      clearCard()
    }
  } else {
    Notify.create({
      type: 'warning',
      message: 'La tarjeta no está registrada o está inactiva.',
      caption: 'Favor comunicarse con el admiministrador del sistema.'
    })
    clearCard()
  }
}, 300)

const clearCard = () => {
  item.value.member = null
  receivedAmount.value = 0
  cardCode.value = ''
  validateCard.value = false
  setTimeout(() => {
    inputCardCode?.value?.focus()
  }, 400)
}

const clearItem = () => {
  item.value = Sale.create(null)
  clearCard()
}
const save = (value:boolean) => {
  if (value && (returnAmount.value >= 0 || allowNegativeBalance.value)) {
    setTimeout(() => {
      Notify.create({
        type: 'positive',
        message: 'La venta fue registrada con exito.'
      })
      loading.value = false
      model.value = false
      emit('saved')
      dataTableStore.setReloadTable('tableSales')
    }, 600)
  } else {
    setTimeout(() => {
      loading.value = false
    }, 600)
  }
}

const paymentCardLoading = ref(false)
const getItem = () => {
  if (props.order) item.value = Sale.create(props.order)
  if (props.paymentType === 'card') {
    paymentCardLoading.value = true
    validateCard.value = false
  }
}

const getMembers = () => {
  api.get('roles')
    .then(({ data }) => {
      if (data?.data) members.value = cloner(dataMockStore.members)
    })
    .catch(error => Notify.create(notifyError(error)))
}

const getCards = () => {
  api.get('roles')
    .then(({ data }) => {
      if (data?.data) cards.value = cloner(dataMockStore.cards)
    })
    .catch(error => Notify.create(notifyError(error)))
}

getMembers()
getCards()
</script>
