// функция которая отдает тип application/json
export const getContentType = () => ({
  'Content-type': 'application/json',
})

// для обработки ошибок для их отлова
export const errorCatch = (error: any): string => {
  const message = error?.response?.data?.message

  return message
    ? typeof error.response.data.message === 'object'
      ? message[0]
      : message
    : error.message
}
