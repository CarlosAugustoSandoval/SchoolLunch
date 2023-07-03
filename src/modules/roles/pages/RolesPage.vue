<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Roles"
        icon-title="settings_accessibility"
        base-route="roles"
        loading-property
        ref="tableRoles"
        name="tableRoles"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Rol
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
<!--    <RoleRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableRoles?.reload" />-->
    <RoleRegister v-model="registerModal" :item="itemSelected" @saved="executeReload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import RoleRegister from 'src/modules/roles/components/RoleRegister.vue'
import IRole from 'src/modules/auth/models/IRole'
import DataTable from 'components/dataTable/DataTable.vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:IRole) => row.name
  },
  {
    name: 'actions',
    required: true,
    slotCell: true
  }
]

const tableRoles = ref<InstanceType<typeof DataTable>>(null)
const executeReload = () => {
  tableRoles.value.reload()
}

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
