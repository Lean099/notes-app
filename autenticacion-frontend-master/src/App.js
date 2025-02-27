import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';


import Page from './Components/page'
import {Login} from './Components/login'
import {Logout} from './Components/logout'
import Profile from './Components/profile'
import Notes from './Components/notes'
import Nav from './Components/navigation'
import {EditNote} from './Components/editNote'

// Usar esto para probar antes del npm start export NODE_OPTIONS=--openssl-legacy-provider

function App() {
  return (
    <Router>
        <Nav />
        <Route path="/" exact component={Page}/>
        <Route path="/login" component={Login}/>
        <Route path="/logout" component={Logout}/>
        <Route path="/profile" component={Profile}/>
        <Route path="/notes" component={Notes}/>
        <Route path="/edit/:id" component={EditNote}/>
    </Router>
  );
}

export default App;
