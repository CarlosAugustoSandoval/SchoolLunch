<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Usuarios"
        icon-title="manage_accounts"
        base-route="usuarios"
        loading-property
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Usuario
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <UserRegister v-model="registerModal" :item="itemSelected" />
  </q-page>
</template>

<script lang="ts" setup>
import IUser from 'src/modules/auth/models/IUser'
import { ref } from 'vue'
import UserRegister from 'src/modules/users/components/UserRegister.vue'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:IUser) => row.name
  },
  {
    name: 'email',
    label: 'Email',
    align: 'left',
    field: (row:IUser) => row.email
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
