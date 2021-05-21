import { configureStore } from '@reduxjs/toolkit'
import entities from './entities'

export default function () {
  return configureStore({ reducer: entities })
}
