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

  const handleAddUser = () => {
    if (newUser.trim()) {
      const newUserObject = {
        id: Date.now(),
        name: newUser,
      }
      setUsers([...users, newUserObject]);
      setNewUser('');
    }
  }

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id))
  }

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
        <button onClick={handleAddUser}>Add User</button>
      </div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
