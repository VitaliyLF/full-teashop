import { axiosWithAuth } from '@/api/api.interceptors'

import { API_URL } from '@/config/api.config'

import { IFile } from '@/shared/types/file.interface'

// метод на загрузуку файла на сервер
// принимает в себя файл и папку в которую будет загружаться файл
const upload = async (file: FormData, folder?: string) => {
  // IFile[] потому что можно сразу несколько файлов загрузить
  const { data } = await axiosWithAuth<IFile[]>({
    // серверный роутинг для file /files
    url: API_URL.files(''),
    method: 'POST',
    // в данные закидываем сам файл
    data: file,
    // в параметрах указываем имя папки
    params: { folder },
    // специальный тип в хедере для файлов
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return data
}

export const fileService = {
  upload,
}
