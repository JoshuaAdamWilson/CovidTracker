import React, { useEffect } from 'react'
import Login from './components/login/Login';
import CasesAndDeaths from './components/cases/CasesAndDeaths';
import AllLinks from "./components/links/AllLinks"
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store'
import { loadUser } from './components/actions/auth'
import setAuthToken from './components/utils/setAuthToken';



const App = () => {
  useEffect(() => {
    const authAndLoad = async () => {
      if (localStorage.token) {
        setAuthToken(localStorage.token)
        store.dispatch( await loadUser())
      }
      
    }
    authAndLoad()
  }, [])

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <Login />
          <CasesAndDeaths />
          <AllLinks />
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
