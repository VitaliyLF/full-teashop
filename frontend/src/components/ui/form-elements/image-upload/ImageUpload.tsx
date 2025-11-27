import { ImagePlus } from 'lucide-react'
import Image from 'next/image'

import { useUpload } from '@/hooks/useUpload'

import { Button } from '../../Button'

import { cn } from '@/lib/utils'

interface IImageUploadProps {
  isDisabled: boolean
  // функция при изменении value в которую мы будем прокидывать value
  onChange: (value: string[]) => void
  value: string[]
}

// value это массив строк с url картинки
const ImageUpload = ({ isDisabled, onChange, value }: IImageUploadProps) => {
  const { handleButtonClick, isUploading, fileInputRef, handleFileChange } = useUpload(onChange)

  return (
    <>
      <div className="image-container grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 gap-5">
        {value.map((url) => (
          <div
            key={url}
            className="image-wrapper relative w-[200px] h-[200px] rounded-mm overflow-hidden">
            <Image className="object-cover" src={url} alt="Картинка" fill />
          </div>
        ))}
      </div>
      <Button
        className={cn('upload cursor-pointer', {
          'mt-4': value.length,
        })}
        type="button"
        disabled={isDisabled || isUploading}
        variant="secondary"
        onClick={handleButtonClick}>
        <ImagePlus className="mr-2 size-4" />
        Загрузить картинки
      </Button>
      {/* обязательно указываем этот инпут  */}
      <input
        className="hidden"
        type="file"
        multiple
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={isDisabled}
      />
    </>
  )
}

export default ImageUpload
