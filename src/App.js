import React, { useEffect, useState } from 'react';
import './App.css';
import LoginForm from './components/login/login';
import Main from './components/main/main';

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

  useEffect(() => {
    const userFromStorage = JSON.parse(localStorage.getItem("user"));
    if (userFromStorage) {
      setUser(userFromStorage);
    }
  }, []);

  return (
    <div className="App">
      {user ? <Main /> : <LoginForm />}
    </div>
  );
}

export default App;
