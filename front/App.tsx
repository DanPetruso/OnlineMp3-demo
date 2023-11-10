
import { Provider } from 'react-redux'
import { Controls } from './components/Controls'
import './App.css'
import {store} from './redux/store'

function App() {
  return (
    <Provider store={store}>
      <div>
        <Controls/>
      </div>
    </Provider>
  )
}

export default App
