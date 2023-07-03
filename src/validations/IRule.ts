interface IBasicRule {
  name: string
  message?: string
  param?: string | number
  param2?: string | number
}

export interface IChildRule {
  fieldName?: string
  value: string | number | null | undefined | object
  rule?: IBasicRule
}

export interface IRule extends IChildRule {
  rules: IBasicRule[]
}
