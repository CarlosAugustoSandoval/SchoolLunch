<template>
  <q-table
    flat
    :rows="rows"
    :columns="props.columns"
    :row-key="rowKey"
    :visible-columns="visibleColumns"
    :loading="loading"
    v-model:pagination="pagination"
    :rows-per-page-options="props.rowsPerPageOptions"
    @request="getItems"
  >
    <template v-slot:top-left>
      <div class="text-h5 q-mb-xs">
        <q-icon v-if="props.iconTitle" size="lg" :name="props.iconTitle" />
        <span v-if="props.title" class="q-ml-xs q-mr-md" style="position: relative; top: 4px;">{{ props.title }}</span>
        <slot name="top-left" />
      </div>
    </template>
    <template v-slot:top-right>
      <q-select
        v-if="optionColumns.length"
        v-model="visibleColumns"
        multiple
        outlined
        dense
        options-dense
        display-value=""
        emit-value
        map-options
        :options="optionColumns"
        option-value="name"
        class="q-mr-sm q-mb-xs"
      >
        <template v-slot:append>
          <q-icon size="md" name="view_column" />
        </template>
      </q-select>
      <q-input
        v-model="filter"
        outlined
        dense
        placeholder="Search"
        class="search-master q-mb-xs"
        clearable
        @keypress.enter="getItems"
      >
        <template v-slot:append>
          <q-btn icon="search" unelevated dense color="primary" @click.stop="getItems" />
        </template>
      </q-input>
    </template>
    <template
      v-for="(cell, indexCell) in cellTemplates"
      :key="`cell${indexCell}`"
      v-slot:[`body-cell-${cell.name}`]="scope"
    >
      <slot :name="`body-cell-${cell.name}`" :scope="scope"/>
    </template>
  </q-table>
</template>

<script setup lang="ts">
import { Notify, QTableProps } from 'quasar'
import { IDataRow, PropsDataTable } from 'components/dataTable/models'
import { api } from 'boot/axios'
import { notifyError } from 'src/utilities/utilities'
import { computed, ref, watch, defineExpose } from 'vue'
import TableManager from 'components/dataTable/TableManager'
import { DataTableStore } from 'components/dataTable/store'
import { DataMockStore } from 'src/dataMock/store'

export interface IPropsDataTable {
  columns: any
  rowKey?: string
  visibleColumns?: any
  rowsPerPageOptions?: any
  title?: string
  iconTitle?: string
  baseRoute?: string
  loadingProperty?: boolean
  name: string
  mock: string
}
const props = withDefaults(defineProps<IPropsDataTable>(), { ...PropsDataTable })
const dataTableStore = DataTableStore()
const dataMockStore = DataMockStore()
const pagination = ref({
  sortBy: '',
  descending: false,
  page: 1,
  lastPage: 0,
  rowsPerPage: 4,
  rowsNumber: 0
})
const filter = ref('')
const rows = ref([])
const loading = ref(false)
const optionColumns = ref(props.columns.filter((x:any) => !x.required))
const cellTemplates = ref(props.columns.filter((x:any) => x.slotCell))

const visibleColumns = ref(props.visibleColumns || props.columns?.map((x:any) => x.name) || [])
const rowKey = props.rowKey || 'id'
const stateTable = computed(() => dataTableStore.myDataTable(props.name))
const reload = () => {
  getItems(null)
}
defineExpose({ reload })
watch(filter, newValue => {
  if (!newValue) getItems()
})
watch(() => stateTable?.value?.changes, () => {
  reload()
}, { immediate: false })

const sendState = (data:IDataRow) => {
  dataTableStore.setDataRow(data)
}

const constDataRow = props.name ? TableManager.find(x => x.name === props.name) : null
if (constDataRow) sendState(constDataRow)

const getItems = (propsTable:QTableProps | null = null) => {
  loading.value = true
  api.get(`${props.baseRoute}?per_page=${propsTable?.pagination?.rowsPerPage || pagination.value.rowsPerPage}&page=${propsTable?.pagination?.page || pagination.value.page}&filter[search]=${propsTable?.filter || filter.value || ''}`)
    .then(({ data }) => {
      pagination.value.rowsNumber = data.data.total
      pagination.value.rowsPerPage = data.data.per_page
      pagination.value.page = data.data.current_page
      if (props.mock) {
        switch (props.mock) {
          case 'grades':
            data.data.data = dataMockStore.grades
            break
          case 'courses':
            data.data.data = dataMockStore.courses
            break
          case 'labels':
            data.data.data = dataMockStore.labels
            break
          case 'members':
            data.data.data = dataMockStore.members
            break
          case 'cards':
            data.data.data = dataMockStore.cards
            break
          case 'categories':
            data.data.data = dataMockStore.categories
            break
          case 'products':
            data.data.data = dataMockStore.products
            break
          case 'sales':
            data.data.data = dataMockStore.sales
            break
        }
      }
      if (data?.data?.data?.length && props.loadingProperty) {
        data.data.data.forEach((x:any) => {
          x.loading = false
        })
      }
      rows.value = data?.data?.data || []
      loading.value = false
    })
    .catch(error => {
      Notify.create(notifyError(error))
      loading.value = false
    })
}
getItems()
</script>

<style lang="scss">
.search-master{
  width: auto;
  min-width: 300px !important;
  .q-field__inner {
    .q-field__control {
      padding-right: 0;
      .q-field__append {
        padding-left: 0 !important;
        button{
          width: 40px !important;
          height: 40px !important;
        }
      }
    }
  }
}
</style>
