export const formatDate = (dateString: string) => {
  const date = new Date(dateString)

  // padStart Он добавляет символы в начало строки, пока её длина не станет равной указанной.
  // Это значит:
  // берём число (например 5)
  // превращаем в строку "5"
  // если длина меньше 2 — добавляем слева 0
  // примеры
  // "5".padStart(2, "0")   // "05"
  // "12".padStart(2, "0")  // "12"
  // "3".padStart(2, "0")   // "03"
  // "7".padStart(3, "0")   // "007"
  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}.${month}.${year}`
}
