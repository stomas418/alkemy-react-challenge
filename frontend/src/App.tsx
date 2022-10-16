import './App.css'
import { useUser } from './Context/Context'

import Home from './components/Home/Home'
import { load } from 'react-cookies'
import { decodeToken } from './helpers'
import Sign from './components/Sign/Sign'
import Logout from './components/Logout/Logout'

function App() {
  const [user, setUser] = useUser()
  const token = load('token') as undefined | string
  if (token != undefined) {
    setUser(decodeToken(token))
  }
  return (
    user.name != '' ?
      <div className="App">
        <Home />
        <Logout />
      </div> :
      <Sign />

  )
}

export default App
