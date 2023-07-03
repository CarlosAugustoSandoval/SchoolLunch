<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Tarjetas"
        icon-title="credit_card"
        base-route="roles"
        loading-property
        ref="tableCards"
        name="tableCards"
        mock="cards"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Tarjeta
          </q-btn>
        </template>
        <template v-slot:body-cell-id="{scope}">
          <q-td>
            {{ [scope.row.id, scope.row.name].filter(x => x).join(' - ') }}
          </q-td>
        </template>
        <template v-slot:body-cell-member="{scope}">
          <q-td>
            <q-item v-if="scope.row.member" clickable @click="$router.push({ name: 'MemberProfile', params: { id:scope.row.member.id }, query: { user: scope.row.member.id } })">
              <q-item-section v-if="scope.row.member.sex" avatar class="q-pr-none" style="min-width: 48px;">
                <q-icon color="primary" size="lg" :name="scope.row.member.sex === 'male' ? 'face' : 'face_3'" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ [scope.row.member.first_name, scope.row.member.last_name].filter(x => x).join(' ') }}</q-item-label>
                <q-item-label caption>{{ [scope.row.member.identification_type, scope.row.member.identification].filter(x => x).join(' ') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <CardRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CardRegister from 'src/modules/cards/components/CardRegister.vue'
import ICard from 'src/modules/cards/models/ICard'

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'left',
    field: (row:ICard) => row.id,
    slotCell: true
  },
  {
    name: 'member',
    required: true,
    label: 'Miembro',
    align: 'left',
    field: (row:ICard) => row.member,
    slotCell: true
  },
  {
    name: 'status',
    label: 'Estado',
    align: 'left',
    field: (row:ICard) => row.status
  },
  {
    name: 'balance',
    label: 'Saldo',
    align: 'left',
    field: (row:ICard) => row.balance,
    format: (val: number | null) => `$${val || 0}`
  },
  {
    name: 'actions',
    required: true,
    slotCell: true
  }
]

const itemSelected = ref<ICard | null>(null)
const registerModal = ref(false)
const edit = (item:ICard) => {
  itemSelected.value = item
  registerModal.value = true
}
const create = () => {
  itemSelected.value = null
  registerModal.value = true
}
</script>
