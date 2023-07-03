<template>
  <q-page :class="`row q-pa-${$q.screen.xs ? 'sm' : 'lg'}`">
    <div class="col-12">
      <data-table
        :columns="columns"
        title="Cursos"
        icon-title="groups"
        base-route="roles"
        loading-property
        ref="tableCourses"
        name="tableCourses"
        mock="courses"
      >
        <template v-slot:top-left>
          <q-btn push color="primary" @click="create">
            <q-icon name="add_circle_outline" class="q-mr-xs" />
            Curso
          </q-btn>
        </template>
        <template v-slot:body-cell-actions="{scope}">
          <options-buttons @edit="edit(scope.row)" :loading="scope.row.loading" />
        </template>
      </data-table>
    </div>
    <CourseRegister v-model="registerModal" :item="itemSelected" @saved="$refs.tableCourses?.reload" />
  </q-page>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import CourseRegister from 'src/modules/courses/components/CourseRegister.vue'
import ICourse from 'src/modules/courses/models/ICourse'

const columns = [
  {
    name: 'name',
    required: true,
    label: 'Nombre',
    align: 'left',
    field: (row:ICourse) => row.name
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
