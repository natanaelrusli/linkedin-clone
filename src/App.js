import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { login, logout, selectUser } from './features/userSlice';
import Feed from './Feed';
import { auth } from './firebase';
import Header from './Header';
import Login from './Login';
import Sidebar from './Sidebar';
import Widgets from './Widgets';

function App() {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  // How to keep user logged in after refresh
  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if (userAuth) {
        dispatch(login({
          email : userAuth.email,
          uid : userAuth.uid,
          displayName : userAuth.displayName,
          photoUrl : userAuth.photoURL,
        }))
      } 
      else if (userAuth === false) {
        dispatch(logout())
      }
    })
  },[dispatch])

  return (
    <div className="app">

      {user.user === null ? 
        (<React.Fragment>
        <div className="app__body">
          <Login/> 
        </div> 
        </React.Fragment>)
        : (
        <React.Fragment>
          <Header/>
          <div className="app__body">
            <Sidebar />
            <Feed />
            <Widgets/>
          </div>
        </React.Fragment>
      )}
      
      
       
    </div>
  );
}

export default App;
