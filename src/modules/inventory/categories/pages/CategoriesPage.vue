<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Caegorías de productos"
        icon-title="category"
        base-route="roles"
        loading-property
        ref="tableCategories"
        name="tableCategories"
        mock="categories"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Categoría
          </q-btn>
        </template>
        <template v-slot:body-cell-image="{scope}">
          <q-td>
            <q-avatar v-if="scope.row.image" size="120px" rounded>
              <img :src="scope.row.image">
            </q-avatar>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <CategoryRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CategoryRegister from 'src/modules/inventory/categories/components/CategoryRegister.vue'
import ICategory from 'src/modules/inventory/categories/models/ICategory'

const columns = [
  {
    name: 'image',
    label: 'Imagen',
    align: 'left',
    field: (row:ICategory) => row.image,
    slotCell: true
  },
  {
    name: 'code',
    required: true,
    label: 'Código',
    align: 'left',
    field: (row:ICategory) => row.code
  },
  {
    name: 'name',
    label: 'Nombre',
    align: 'left',
    field: (row:ICategory) => row.name
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'left',
    field: (row:ICategory) => row.status
  },
  {
    name: 'actions',
    required: true,
    slotCell: true
  }
]

const itemSelected = ref<ICategory | null>(null)
const registerModal = ref(false)
const edit = (item:ICategory) => {
  itemSelected.value = item
  registerModal.value = true
}
const create = () => {
  itemSelected.value = null
  registerModal.value = true
}
</script>
