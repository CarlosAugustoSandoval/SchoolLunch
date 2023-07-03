<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Grados"
        icon-title="format_list_numbered"
        base-route="roles"
        loading-property
        ref="tableGrades"
        name="tableGrades"
        mock="grades"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Grado
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <GradeRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import GradeRegister from 'src/modules/grades/components/GradeRegister.vue'
import IGrade from 'src/modules/grades/models/IGrade'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:IGrade) => row.name
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
