import { useMutation } from '@tanstack/react-query'
import { ChangeEvent, useCallback, useMemo, useRef } from 'react'
import toast from 'react-hot-toast'

import { fileService } from '@/services/file.services'

// хук функциона загрузки файлов на сервер
export const useUpload = (onChange: (value: string[]) => void) => {
  const fileInputRef = useRef<HTMLInputElement>(null)

  // описываем саму мутацию на загрузку файлов
  const { mutate: uploadFiles, isPending: isUploading } = useMutation({
    mutationKey: ['upload files'],
    // FormData — это встроенный веб-API (в браузере) для построения набора пар «ключ: значение», который удобно отправлять на сервер в формате multipart/form-data
    // Используется, когда нужно отправить файлы (например, File) вместе с обычными полями формы.
    mutationFn: (formData: FormData) => fileService.upload(formData),
    onSuccess(data) {
      onChange(data.map((file) => file.url))
    },
    onError() {
      toast.error('Ошибка при загрузки файлов')
    },
  })

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files

      // если есть выбранные файлы какие то хотя бы один
      if (selectedFiles) {
        // Array.from преобразует что то в массив
        // Array.from(что_превращаем, функция_преобразования?)
        // первым значение можем передать {length:5} указать массив
        // Array.from([1, 2, 3], (x) => x * 2)
        // тут формируем массив строк из url продукта
        const fileArray = Array.from(selectedFiles)

        // new FormData — это специальный объект JavaScript, который используется для отправки данных формы, особенно файлов, на сервер.
        const formData = new FormData()

        // Метод append добавляет данные в FormData.
        // append т.е создаю ключ значение
        // files: file1.jpg
        // files: file2.png
        // files: file3.pdf
        fileArray.forEach((file) => formData.append('files', file))

        // и отправляем наш готовый массив на сервер
        uploadFiles(formData)
      }
    },
    [uploadFiles],
  )

  const handleButtonClick = useCallback(() => {
    // будет открываться проводник когда мы нажмем на загрузку файлов
    fileInputRef.current?.click()
  }, [fileInputRef])

  // handleFileChange и handleButtonClick  — обычная функция, которая пересоздаётся при каждом рендере.
  // Вы затем передаёте её в useMemo как зависимость, поэтому сам useMemo тоже "ломается" — зависимость меняется каждый рендер.
  // Обернуть handleFileChange (и handleButtonClick) в useCallback, чтобы их ссылки были стабильны.

  // useCallback — только для функций оборачивать нужно, если использую useMemo и указываю в массиве зависимостей ссылку на функцию.
  // это нужно чтобы на каждом ререндере была стабильная ссылка на функцию

  // useMemo Используется, когда ты:
  // вычисляешь значение (объект, массив, число)
  // и хочешь сохранить одну и ту же ссылку на значение
  return useMemo(
    () => ({ uploadFiles, handleButtonClick, fileInputRef, handleFileChange, isUploading }),
    [uploadFiles, handleButtonClick, fileInputRef, handleFileChange, isUploading],
  )
}
