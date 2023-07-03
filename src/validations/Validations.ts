import { IRule, IChildRule } from './IRule'

const validator = async (rule: IRule) => {
  const required = rule.rules.find(x => x.name === 'required')
  const maxlength = rule.rules.find(x => x.name === 'maxlength')
  const email = rule.rules.find(x => x.name === 'email')
  const rulesArray = [
    required ? await _required({ value: rule.value, fieldName: rule.fieldName, rule: required }) : null,
    maxlength ? await _maxlength({ value: rule.value, fieldName: rule.fieldName, rule: maxlength }) : null,
    email ? await _email({ value: rule.value, fieldName: rule.fieldName, rule: email }) : null
  ].filter(x => x && x !== true)
  return rulesArray?.length ? rulesArray[0] : true
}

const _required = (rule:IChildRule) => {
  return new Promise((resolve) => {
    const valid = (rule.value !== null && rule.value !== '') || `El campo ${rule.fieldName} es requerido.`
    resolve(valid)
  })
}

const _maxlength = (rule:IChildRule) => {
  return new Promise((resolve) => {
    resolve((rule.value !== null && rule?.rule?.param && String(rule.value).length <= rule?.rule?.param) || `El campo ${rule.fieldName} debe tener como maximo ${rule?.rule?.param} caracteres.`)
  })
}

const _email = (rule:IChildRule) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return new Promise((resolve) => {
    resolve((rule.value !== null && emailRegex.test(String(rule.value))) || `El campo ${rule.fieldName} no contiene un correo electrónico válido.`)
  })
}

export { validator }
