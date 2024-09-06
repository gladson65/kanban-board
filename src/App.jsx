import './App.css'
import Board from './Components/Board'
import { Provider } from 'react-redux'
import TaskStore from './Utils/taskStore'; 

function App() {
  
  return (
    <>

      <Provider store={TaskStore}>
        <Board />
      </Provider>
      
    </>
  )
}

export default App
