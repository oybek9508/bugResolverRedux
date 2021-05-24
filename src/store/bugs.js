import { createSlice } from '@reduxjs/toolkit'
import moment from 'moment'
import { createSelector } from 'reselect'
import { apiCallBegan } from './api'

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (state, action) => {
      state.loading = true
    },
    bugsRequestFailed: (state, action) => {
      state.loading = false
    },
    bugsReceived: (state, action) => {
      state.list = action.payload
      state.lastFetch = Date.now()
      state.loading = false
    },
    bugAdded: (state, action) => {
      state.list.push(action.payload)
    },
    bugAssignedToUser: (state, action) => {
      const { bugId, userId } = action.payload
      const index = state.list.findIndex((bug) => bug.id === bugId)
      state.list[index].userId = userId
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id)
      bugs.list[index].resolved = true
    },
  },
})

export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions
export default slice.reducer

const url = '/bugs'

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
  })
// loadBugs is an action creator returning a function
export const loadBugs = () => (dispatch, getState) => {
  const { bugs } = getState().entities
  console.log(bugs)
  const { lastFetch } = getState().entities.bugs
  // if the minutes are less than 10, then we are not gonna call the api for the second time
  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')
  if (diffInMinutes < 10) return

  dispatch(
    apiCallBegan({
      url,
      onError: bugsRequestFailed.type,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
    })
  )
}

// making a post request
export const addBugs = (bug) =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
  })

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (bugs) => bugs.list.filter((bug) => !bug.resolved)
)

export const getBugAssignedToUser = (userId) =>
  createSelector(
    (state) => state.entities.bugs,
    (bugs) => bugs.filter((bug) => bug.userId === userId)
  )
