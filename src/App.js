import configureStore from './store/configureStore'
import { projectAdded } from './store/projects'
import { bugAdded, bugAssignedTouser, getBugAssignedToUser } from './store/bugs'
import { addUser } from './store/users'

const store = configureStore()

store.dispatch(projectAdded({ project: 'project 1' }))
store.dispatch(bugAdded({ description: 'Bug 1' }))
store.dispatch(bugAdded({ description: 'Bug 2' }))
store.dispatch(bugAdded({ description: 'Bug 3' }))
store.dispatch(addUser({ name: 'Oybek' }))
store.dispatch(addUser({ name: 'Jasur' }))
store.dispatch(bugAssignedTouser({ bugId: 1, userId: 1 }))

const assignedBugs = getBugAssignedToUser(1)(store.getState())
console.log('assignedBugs', assignedBugs)

console.log(store.getState())

function App() {
  return <div className='App'></div>
}

export default App
