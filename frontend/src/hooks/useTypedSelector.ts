import { TypedUseSelectorHook, useSelector } from 'react-redux'

import { TypeRootState } from '@/store/store'

// это точно самый useSelector из редакса просто с добавленной типизацией
export const useTypedSelector: TypedUseSelectorHook<TypeRootState> = useSelector
