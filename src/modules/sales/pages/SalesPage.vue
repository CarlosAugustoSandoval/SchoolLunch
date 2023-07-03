<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Ventas"
        icon-title="fa fa-file-invoice-dollar"
        base-route="roles"
        loading-property
        ref="tableSales"
        name="tableSales"
        mock="sales"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" href="/sale/register" target="_parent">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Venta
          </q-btn>
        </template>
        <template v-slot:body-cell-code="{scope}">
          <q-td>
            <div>{{ scope.row.code }}</div>
            <div>{{ scope.row.date }}</div>
          </q-td>
        </template>
        <template v-slot:body-cell-member="{scope}">
          <q-td style="padding: 0;">
            <q-item v-if="scope.row.member" clickable class="q-pa-sm" @click="$router.push({ name: 'MemberProfile', params: { id:scope.row.member.id }, query: { user: scope.row.member.id } })">
              <q-icon color="primary" size="lg" class="q-mr-sm" :name="scope.row.member.sex === 'male' ? 'face' : 'face_3'" />
              <div>
                <div>{{ [scope.row.member.first_name, scope.row.member.last_name].filter(x => x).join(' ') }}</div>
                <div class="text-caption">{{ [scope.row.member.identification_type, scope.row.member.identification].filter(x => x).join(' ') }}</div>
              </div>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-products="{scope}">
          <q-td>
            <div class="full-height">
              <q-avatar
                v-for="(item, itemIndex) in scope.row.items.filter(x => x.product)"
                :key="`product${item.id}${itemIndex}`"
                size="44px"
                class="overlapping cursor-pointer"
                color="primary"
                :style="`left: ${itemIndex * 25}px`"
              >
                <img v-if="item.product.images?.length && item.product.images[0]" :src="item.product.images[0]">
                <span v-else-if="item.product.name">
                  {{ item.product.name.charAt(0) }}
                </span>
                <q-tooltip anchor="top middle" :offset="[0, 34]">
                  {{ item.product.name }}
                </q-tooltip>
              </q-avatar>
            </div>
          </q-td>
        </template>
      </data-table>
    </div>
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ISale from 'src/modules/sales/models/ISale'

const columns = [
  {
    name: 'code',
    required: true,
    label: 'Consecutivo',
    align: 'left',
    field: (row:ISale) => row.code,
    slotCell: true
  },
  {
    name: 'member',
    required: true,
    label: 'Comprador',
    align: 'left',
    field: (row:ISale) => row.member,
    slotCell: true
  },
  {
    name: 'products',
    label: 'Productos',
    align: 'left',
    field: (row:ISale) => row.items,
    slotCell: true
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'left',
    field: (row:ISale) => row.status
  },
  {
    name: 'amount',
    label: 'Valor',
    align: 'left',
    field: (row:ISale) => row.total_amount,
    format: (val: number | null) => `$${val || 0}`
  }
]

const itemSelected = ref<ISale | null>(null)
const registerModal = ref(false)
const edit = (item:ISale) => {
  itemSelected.value = item
  registerModal.value = true
}
const create = () => {
  itemSelected.value = null
  registerModal.value = true
}
</script>

<style lang="sass" scoped>
.overlapping
  border: 1px solid white
  position: absolute
</style>
