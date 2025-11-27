'use client'
// global-error.tsx ловит только runtime ошибки, брошенные в компонентах или серверных функциях, а не "страницы не существует".
// кастомная ошиюка
export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body>
        <h1>Произошла ошибка</h1>
        <p>{error.message}</p>
        <button onClick={() => reset()}>Попробовать снова</button>
      </body>
    </html>
  )
}
