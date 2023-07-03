import { IPropsDataTable } from 'components/dataTable/DataTable.vue'

const PropsDataTable:IPropsDataTable = {
  columns: [],
  rowKey: '',
  visibleColumns: undefined,
  rowsPerPageOptions: [4, 20, 30, 50, 100],
  title: '',
  iconTitle: '',
  baseRoute: '',
  loadingProperty: false,
  name: '',
  mock: ''
}

export interface IDataRow {
  name?: string
  changes?: number
  version?: number
  headers?: any[]
}

export interface IDataTableState {
  dataRows: IDataRow[]
}

export interface IColumnDataTable {
  name?: string
  label?: string
  field: string | ((row: any) => any)
  required?: boolean
  align?: string
  sortable?: boolean
  format?: (val: any, row: any) => any
  style?: string
  classes?: string
  headerStyle?: string
  headerClasses?: string
}

export interface IPaginationDataTable {
  sortBy: string
  descending: boolean
  page: number
  lastPage: number
  rowsPerPage: number
  rowsNumber: number
}

export { PropsDataTable }
