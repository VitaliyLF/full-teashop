import Link from 'next/link'

export default function NotFound() {
  return (
    <div>
      <h2>Не найден товар</h2>
      <p>Ошибка описание ее </p>
      <Link href="/">Вернуться домой</Link>
    </div>
  )
}
