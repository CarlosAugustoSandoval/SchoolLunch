<template>
  <q-page :class="`q-pa-sm`">
    <div class="row q-col-gutter-md" style="height: 100%">
      <div class="col-12 col-md-8">
        <q-tabs
          v-model="tab"
          active-color="white"
          class="text-grey-5 tabs-categories-sale-register"
        >
          <q-tab v-for="(category, categoryIndex) in Categories" :key="`category${categoryIndex}`" :name="`category${categoryIndex}`" style="text-transform: none; white-space: normal;" :ripple="{ color: 'primary' }">
            <q-card flat bordered style="width: 140px; height: 200px">
              <img v-if="category.image" :src="category.image" style="height: 140px">
              <q-card-section class="q-pa-sm">
                <div style="width: 100%; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                  {{ category.name }}
                </div>
                <div class="text-grey text-caption">
                  8 opciones
                </div>
              </q-card-section>
            </q-card>
          </q-tab>
        </q-tabs>
        <q-scroll-area style="height: 640px;">
          <q-tab-panels v-model="tab" animated>
            <q-tab-panel v-for="(category, categoryIndex) in Categories" :key="`categoryPanel${categoryIndex}`" :name="`category${categoryIndex}`">
              <div class="row q-col-gutter-sm justify-between">
                <div v-for="(product, productIndex) in category.products" :key="`productCategory${categoryIndex}${productIndex}`">
                  <q-card class="my-card" style="height: 300px; width: 300px;"  flat bordered>
                    <q-img @click="addProducts(product)" :src="product?.images[0]" height="200px" class="cursor-pointer" />
                    <q-card-section>
                      <div class="row no-wrap items-center">
                        <div class="col text-h6 ellipsis">
                          {{ product.name }}
                        </div>
                      </div>
                      <div class="text-h5 text-primary">
                        ${{ product.price }}
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </q-tab-panel>
          </q-tab-panels>
        </q-scroll-area>
      </div>
      <div class="col-12 col-md-4">
        <q-card style="height: 100%">
          <q-toolbar>
            <q-toolbar-title>
              Orden actual
            </q-toolbar-title>
            <q-btn v-if="countItems" flat color="warning" @click="clearOrder">Limpiar</q-btn>
          </q-toolbar>
          <q-scroll-area style="height: calc(100% - 220px);">
            <template v-if="countItems">
              <q-item v-for="(item, itemIndex) in order.items" :key="`item${itemIndex}`" clickable>
                <q-item-section avatar>
                  <q-avatar>
                    <img :src="item.product?.images[0]">
                  </q-avatar>
                </q-item-section>

                <q-item-section>
                  <q-item-label lines="2">{{ item.product.name }}</q-item-label>
                </q-item-section>
                <q-item-section top side>
                  <div class="text-grey-8 q-gutter-xs">
                    <q-btn class="gt-xs" size="12px" flat dense round icon="remove" @click.stop="subtractCount(item, itemIndex)" />
                    <q-avatar>{{ item.count }}</q-avatar>
                    <q-btn size="12px" flat dense round icon="add" @click.stop="addCount(item)" />
                  </div>
                </q-item-section>
                <q-item-section side>
                  ${{ item.amount }}
                </q-item-section>
              </q-item>
            </template>
            <div v-else class="q-pa-md text-center text-subtitle1">
              No hay items en la orden
            </div>
          </q-scroll-area>
          <q-card-actions>
            <q-toolbar class="bg-purple text-white shadow-2">
              <q-toolbar-title>TOTAL</q-toolbar-title>
              <q-space />
              <span class="text-h5">${{ order.total_amount }}</span>
            </q-toolbar>
          </q-card-actions>
          <q-card-actions class="justify-between">
            <q-btn
              outline
              color="primary"
              style="width: 46%; height: 80px"
              :disable="!countItems"
              @click.stop="payOrder('cash')"
            >
              <q-icon name="fa fa-money-bill" size="xl" class="q-mr-md" />
              Efectivo
            </q-btn>
            <q-btn
              outline
              color="primary"
              style="width: 46%; height: 80px"
              :disable="!countItems"
              @click.stop="payOrder('card')"
            >
              <q-icon name="fa fa-credit-card" size="lg" class="q-mr-md" />
              Tarjeta
            </q-btn>
          </q-card-actions>
        </q-card>
      </div>
    </div>
    <OrderPayment
      v-model="registerModal"
      :payment-type="paymentType"
      :order="order"
      @saved="clearOrder"
    />
  </q-page>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { sumBy } from 'lodash'
import OrderPayment from 'src/modules/sales/components/OrderPayment.vue'
import Categories from 'src/dataMock/data/Categories'
import IProduct from 'src/modules/inventory/products/models/IProduct'
import ISale from 'src/modules/sales/models/ISale'
import Sale from 'src/modules/sales/models/Sale'
import ItemSale from 'src/modules/sales/models/ItemSale'
const tab = ref('category0')

const order = ref<ISale>(Sale.create(null))
const countItems = computed(() => order.value?.items?.length)

const registerModal = ref(false)
const paymentType = ref('')

const payOrder = (type:string) => {
  paymentType.value = type
  registerModal.value = true
}

const addProducts = (product: IProduct) => {
  const findItem = order.value.items?.find(x => x?.product?.id === product.id)
  if (findItem) addCount(findItem)
  else {
    const newItem = ItemSale.create(null)
    newItem.count = 1
    newItem.unit_amount = product.price
    newItem.amount = product.price
    newItem.product = product
    order.value.items.push(newItem)
  }
}

const clearOrder = () => {
  order.value = Sale.create(null)
}

const subtractCount = (item: ItemSale, index: number) => {
  item.count--
  if (item.count <= 0) order.value.items.splice(index, 1)
  else item.amount = item.count * item.unit_amount
}

const addCount = (item: ItemSale) => {
  item.count++
  item.amount = item.count * item.unit_amount
}

watch(() => order.value.items, (items) => {
  order.value.total_amount = sumBy(items, 'amount')
}, { immediate: true, deep: true })
</script>

<style lang="scss" scoped>
.my-card {
  width: 100%;
  max-width: 250px;
}

.tabs-categories-sale-register{
  .q-tabs__content {
    .q-tab {
      padding: 0 !important;
      margin-right: 16px;
      .q-tab__content {
        padding: 0;
      }
    }
  }
}
</style>
