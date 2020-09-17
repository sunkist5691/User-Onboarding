import React,  { useState } from 'react';
import './App.css';
import Form from './components/Form'
import UserList from './components/UserList'

function App() {

  const [user, setUsers] = useState([])

  const addUserList = (info) => {
    setUsers([...user, info])
  }

  return (
    <div className="App">
      <h1>Sign Up</h1>
      <Form addUserList={addUserList} />

      {
        user.map( (eachUser) => {

          return <UserList key={eachUser.id} user={eachUser}/>

        })
      }

    </div>
  );
}

export default App;
