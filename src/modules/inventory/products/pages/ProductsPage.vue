<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Productos"
        icon-title="fa fa-cubes"
        base-route="roles"
        loading-property
        ref="tableProducts"
        name="tableProducts"
        mock="products"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Producto
          </q-btn>
        </template>
        <template v-slot:body-cell-image="{scope}">
          <q-td class="text-center">
            <q-avatar v-if="scope.row?.images?.length" size="120px" rounded>
              <img :src="scope.row.images[0]">
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-name="{scope}">
          <q-td style="white-space: normal">
            <div class="text-body2">
              {{ [scope.row.id, scope.row.name].filter(x => x).join(' - ') }}
            </div>
            <div class="text-caption">
              {{ scope.row.description }} fsds dsd sdsd sds sdsd sds dsdsd sdsdsdsd
              sdsd sdsds dsdsdsdsdsd s dsdsd sds sd sdsd
            </div>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <ProductRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import ProductRegister from 'src/modules/inventory/products/components/ProductRegister.vue'
import IProduct from 'src/modules/inventory/products/models/IProduct'

const columns = [
  {
    name: 'image',
    label: 'Imagen',
    align: 'center',
    field: (row:IProduct) => row.images,
    slotCell: true
  },
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:IProduct) => row.name,
    slotCell: true
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'left',
    field: (row:IProduct) => row.status
  },
  {
    name: 'price',
    label: 'Precio',
    align: 'left',
    field: (row:IProduct) => row.price,
    format: (val: number | null) => `$${val || 0}`
  },
  {
    name: 'actions',
    required: true,
    slotCell: true
  }
]

const itemSelected = ref<IProduct | null>(null)
const registerModal = ref(false)
const edit = (item:IProduct) => {
  itemSelected.value = item
  registerModal.value = true
}
const create = () => {
  itemSelected.value = null
  registerModal.value = true
}
</script>
