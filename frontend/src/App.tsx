import './App.css'
import { useUser } from './Context/Context'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import { load } from 'react-cookies'
import { decodeToken } from './helpers'
import Register from './components/Register/Register'
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
      </div> :
      <Login />

  )
}

export default App
