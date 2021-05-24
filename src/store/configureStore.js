import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import entities from './entities'
import api from './middleware/api'
import toast from './middleware/toast'

export default function () {
  return configureStore({
    reducer: entities,
    middleware: [...getDefaultMiddleware(), toast, api],
  })
}
