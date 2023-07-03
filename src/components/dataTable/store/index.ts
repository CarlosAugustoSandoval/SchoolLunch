import { defineStore } from 'pinia'
import { IDataRow, IDataTableState } from 'components/dataTable/models'
import DataRow from 'components/dataTable/DataRow'

export const DataTableStore = defineStore('DataTableStore', {
  state: (): IDataTableState => ({
    dataRows: []
  }),
  getters: {
    myDataTable: state => (name:string) => state.dataRows.find(x => x.name === name)
  },
  actions: {
    setReloadTable (name:string) {
      console.log('name', name)
      const data = this.dataRows.find(x => x.name === name)
      if (data?.changes) data.changes++
    },
    setDataRow (data:IDataRow) {
      this.dataRows.push(DataRow.create(data))
    }
  },
  persist: true
})
