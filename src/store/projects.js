import { createSlice } from '@reduxjs/toolkit'

let lastId = 0

const slice = createSlice({
  name: 'projects',
  initialState: [],
  reducers: {
    projectAdded: (state, action) => {
      state.push({
        id: ++lastId,
        project: action.payload.project,
      })
    },
  },
})

export const { projectAdded } = slice.actions

export default slice.reducer
