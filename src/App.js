import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then((response) => {
      setUsers(response.data)
    })
    .catch((error) => console.error('Error fetching users:', error));
  }, []);

  return (
    <div className="App">
      <h1>User List</h1>
      <div>
        <input 
          type="text"
          placeholder='Enter new user name...'
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)} 
        />
        <button>Add User</button>
      </div>
    </div>
  );
}

export default App;
