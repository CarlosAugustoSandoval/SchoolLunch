const notifyError = (error:any) => {
  console.log('error', error.response)
  return {
    type: 'negative',
    message: error.response?.data?.mensaje,
    caption: error.response?.data?.titulo || `${error.response.status}: ${error.response.statusText}`
  }
}

const cloner = (target: any) => {
  return JSON.parse(JSON.stringify(target))
}

export { notifyError, cloner }
