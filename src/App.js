import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Button from './components/Button';
import ChooseView from './views/ChooseView';
import LoginView from './views/LoginView';
import AddView from './views/AddView';
import PickView from './views/PickView';
import { auth, generateUserDocument } from './firebase';
import Header from './components/Header';

function App() {
  const [view, setView] = useState('loginView');
  const [currentUser, setCurrentUser] = useState();
  const [signedIn, setSignedIn] = useState(false);

  const changeView = (viewName, force) => {
    if (signedIn || force) { 
      setView(viewName);
    } else {
      setView('loginView');
    }
  };

  const signOut = () => {
    auth.signOut().then(() => {
      console.log("Sign out successful");
    }).catch((err) => {
      console.error("Sign out error: ", err);
    });
    setSignedIn(false);
    changeView('loginView');
  };

  useEffect(() => {
    auth.onAuthStateChanged( async userAuth => {
      if(userAuth) {
        const user = await generateUserDocument(userAuth);
        user.onSnapshot((snapshot) => {
          setCurrentUser({
              id: userAuth.uid,
              ...snapshot.data(),
          });
          setSignedIn(true);
        });
      }
      setCurrentUser(userAuth);
    });
  }, []);

  return (
    <div className="h-screen bg-gradient-to-b from-teal-400 to-blue-500">
      <Header changeView={changeView} signOut={signOut} />

      {/* <div>
        Temporary awesome buttons for debug
        <Button onClick={() => changeView('loginView')}>
          Test Login
        </Button>
        <Button onClick={() => changeView('chooseView')}>
          Test Choose
        </Button>
        <Button onClick={() => changeView('addView')}>
          Test Add
        </Button>
        <Button onClick={() => changeView('pickView')}>
          Test Pick
        </Button>
      </div> */}
      { view === 'loginView' ? <LoginView changeView={changeView} /> : null }
      { view === 'chooseView' ? <ChooseView changeView={changeView} /> : null }
      { view === 'addView' ? <AddView changeView={changeView} currentUser={currentUser} /> : null }
      { view === 'pickView' ? <PickView changeView={changeView} currentUser={currentUser} /> : null }  
    </div>
  );
}

export default App;
