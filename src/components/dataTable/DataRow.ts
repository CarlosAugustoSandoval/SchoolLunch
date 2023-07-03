import { IDataRow } from 'components/dataTable/models'

export default class DataRow implements IDataRow {
  name?: string
  changes?: number
  version?: number
  headers?: any[]

  static create (DataRow:IDataRow | null) {
    return new this(
      DataRow?.name || '',
      DataRow?.changes || 0,
      DataRow?.version || 0,
      DataRow?.headers || []
    )
  }

  constructor (name: string, changes:number, version: number, headers: any[]) {
    this.name = name
    this.changes = changes
    this.version = version
    this.headers = headers
  }
}
