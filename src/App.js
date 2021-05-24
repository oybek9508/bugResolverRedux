import Bugs from './components/Bugs'
import configureStore from './store/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Bugs />
      </Provider>
    </div>
  )
}

export default App
