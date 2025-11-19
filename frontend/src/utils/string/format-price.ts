export const formatPrice = (price: number) => {
  // Пример
  // formatPrice(123456)

  // Результат:
  // '123 456 ₽'

  // Преобразует число в строку по правилам русской локали:
  return price.toLocaleString('ru-RU', {
    // Говорит, что нужно форматировать как валюту.
    // есть разные стили и проценты еще топ
    style: 'currency',
    // Валюта — российские рубли.
    currency: 'RUB',
    // Как отображать валюту (работает только со style: "currency"):
    // "code" → RUB
    currencyDisplay: 'code',
    // Разделять тысячи или нет
    useGrouping: true,
    //Убирает копейки — будет без .00.
    minimumFractionDigits: 0,
  })
}
