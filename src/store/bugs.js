import { createSlice } from '@reduxjs/toolkit'
import { create } from 'lodash'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'bugs',
  initialState: [],
  reducers: {
    bugAdded: (state, action) => {
      state.push({
        id: ++lastId,
        description: action.payload.description,
        resolved: false,
      })
    },
    bugAssignedTouser: (state, action) => {
      const { bugId, userId } = action.payload
      const index = state.findIndex((bug) => bug.id === bugId)
      state[index].userId = userId
    },
    bugResolved: (state, action) => {
      state.map((bug) =>
        bug.id === action.payload.id ? (bug.resolved = true) : bug
      )
    },
  },
})

export const { bugAdded, bugResolved, bugAssignedTouser } = slice.actions
export default slice.reducer

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.filter((bug) => !bug.resolved)
)

export const getBugAssignedToUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  )
