import configureStore from './store/configureStore'
import { addBugs } from './store/bugs'

const store = configureStore()

store.dispatch(addBugs({ description: 'bug 5' }))

function App() {
  return <div className='App'></div>
}

export default App
