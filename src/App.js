import store from './functional/store'
import * as actions from './functional/actions'

store.dispatch(actions.bugAdded('Bug 1'))
store.dispatch(actions.bugAdded('Bug 2'))
store.dispatch(actions.bugAdded('Bug 3'))
store.dispatch(actions.bugResolved(1))

console.log(store.getState())
function App() {
  return <div className='App'></div>
}

export default App
