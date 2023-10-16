import './App.css'

import {
  Route,
  Routes,
} from "react-router-dom";

import { useStateValue } from './config/StateProvider';

import Sidebar from './components/Sidebar/Sidebar'
import Chat from './components/Chat'
import Login from './components/Login';

function App() {
  const [{ user }, dispatch] = useStateValue();

  //console.log('user', user)

  return (
    <div className='app'>
      {!user ? (
        <Login />
      ) : (
      <div className='app__body'>
        <Sidebar />
        <Routes>
          <Route path='/rooms/:roomId' element={<Chat />} />
        </Routes>
        <Routes>
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
        )}
    </div>
  )
}

export default App
