export default interface IGrade {
  id: number | null
  name?: string
  status?: 'Active'|'Inactive'|null
}
