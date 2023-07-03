<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Etiquetas"
        icon-title="label"
        base-route="roles"
        loading-property
        ref="tableLabels"
        name="tableLabels"
        mock="labels"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Etiqueta
          </q-btn>
        </template>
        <template v-slot:body-cell-color="{scope}">
          <q-td style="text-align: center;">
            <q-chip size="md">
              <q-avatar
                text-color="white"
                icon="colorize"
                :style="`background-color: ${scope.row.color};`"
              />
              {{ scope.row.color }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <LabelRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import LabelRegister from 'src/modules/labels/components/LabelRegister.vue'
import ILabel from 'src/modules/labels/models/ILabel'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:ILabel) => row.name
  },
  {
    name: 'color',
    required: true,
    label: 'Color',
    align: 'center',
    field: (row:ILabel) => row.color,
    slotCell: true
  },
  {
    name: 'actions',
    required: true,
    slotCell: true
  }
]

const itemSelected = ref(null)
const registerModal = ref(false)
const edit = (item:any) => {
  itemSelected.value = item
  registerModal.value = true
}
const create = () => {
  itemSelected.value = null
  registerModal.value = true
}
</script>
