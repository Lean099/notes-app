import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

import { BrowserRouter as Router, Route, Routes } from "react-router"
import {Page} from './components/Page'
import Nav from './components/Navigation'
import {Login} from './components/Login'
import {Logout} from './components/Logout'
import Profile from './components/Profile'
import Notes from './components/Notes'
import {EditNote} from './components/EditNote'

function App() {

  return (
    <div className='container-fluid'>
      <Router>
        <Nav />
        <Routes>
          <Route path="/" exact element={<Page />}/>
          <Route path="/login" element={<Login />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path="/profile" element={<Profile />}/>
          <Route path="/notes" element={<Notes />}/>
          <Route path="/edit/:id" element={<EditNote />}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
