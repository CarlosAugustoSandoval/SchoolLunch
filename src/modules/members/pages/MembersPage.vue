<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Miembros"
        icon-title="account_box"
        base-route="roles"
        loading-property
        ref="tableMembers"
        name="tableMembers"
        mock="members"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Miembro
          </q-btn>
        </template>
        <template v-slot:body-cell-name="{scope}">
          <q-td>
            <q-item clickable @click="$router.push({ name: 'MemberProfile', params: { id:scope.row.id }, query: { user: scope.row.id } })">
              <q-item-section v-if="scope.row.sex" avatar class="q-pr-none" style="min-width: 48px;">
                <q-icon color="primary" size="lg" :name="scope.row.sex === 'male' ? 'face' : 'face_3'" />
              </q-item-section>
              <q-item-section>
                <q-item-label>{{ [scope.row.first_name, scope.row.last_name].filter(x => x).join(' ') }}</q-item-label>
                <q-item-label caption>{{ [scope.row.identification_type, scope.row.identification].filter(x => x).join(' ') }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-td>
        </template>
        <template v-slot:body-cell-course="{scope}">
          <q-td>
            {{ [scope.row.course?.grade?.name, scope.row.course?.name].filter(x => x).join(' - ') }}
          </q-td>
        </template>
        <template v-slot:body-cell-labels="{scope}">
          <q-td>
            <q-chip
              v-for="(label, labelIndex) in scope.row.labels"
              :key="`label${scope.row.id}_${labelIndex}`"
              text-color="white"
              size="sm"
              :style="`background-color: ${label.color};`"
            >
              {{ label.name }}
            </q-chip>
          </q-td>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <MemberRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableGrades?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import MemberRegister from 'src/modules/members/components/MemberRegister.vue'
import IMember from 'src/modules/members/models/IMember'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:IMember) => row.first_name,
    slotCell: true
  },
  {
    name: 'course',
    label: 'Grupo',
    align: 'left',
    field: (row:IMember) => row.course,
    slotCell: true
  },
  {
    name: 'labels',
    label: 'Etiquetas',
    align: 'left',
    field: (row:IMember) => row.labels,
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
