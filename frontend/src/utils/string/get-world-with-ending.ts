export const getWordWithEnding = (reviewCount: number) => {
  switch (reviewCount) {
    case 1:
    case 21:
    case 31:
      return `${reviewCount} отзыв`

    case 2:
    case 3:
    case 4:
    case 22:
    case 23:
    case 24:
    case 34:
      return `${reviewCount} отзыва`

    default:
      return `${reviewCount} отзывов`
  }
}

// export const getWordWithEnding = (count: number) => {
//   const lastDigit = count % 10
//   const lastTwoDigits = count % 100

//   if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
//     return `${count} отзывов`
//   }

//   if (lastDigit === 1) {
//     return `${count} отзыв`
//   }

//   if (lastDigit >= 2 && lastDigit <= 4) {
//     return `${count} отзыва`
//   }

//   return `${count} отзывов`
// }
