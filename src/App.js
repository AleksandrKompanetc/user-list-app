import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserName, setEditingUserName] = useState("");

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

  const handleEditUser = (id) => {
    const user = users.filter((user) => user.id === id);
    if (user) {
      setEditingUserId(id);
      setEditingUserName(user.name);
    }
  } 

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editingUserId ? {...user, name: editingUserName} : user)));
    setEditingUserId(null);
    setEditingUserName("");
  }

  return (
    <div className="App">
      <h1>User List</h1>
      <div className='input-container'>
        <input 
          type="text"
          placeholder='Enter new user name...'
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)} 
        />
        <button onClick={handleAddUser} className='add-button'>Add User</button>
      </div>
      <ul className='user-list'>
        {users.map((user) => (
          <li key={user.id} className='user-item'>
            {editingUserId === user.id ? (
              <div className='edit-container'>
                <input 
                  type="text"
                  value={editingUserName}
                  onChange={(e) => setEditingUserName(e.target.value)}
                />
                <button onClick={handleSaveEdit} className='save-button'>Save</button>
                <button onClick={handleCancelEdit} className='cancelEdit'>Cancel</button>
              </div>
            ) : (
              <>
                {user.name}
                <button onClick={() => handleEditUser(user.id)} className='edit-button'>Edit</button>
                <button onClick={() => handleDeleteUser(user.id)} className='delete-button'>Delete</button>
              </>
            )}
            {/* {user.name} <button onClick={() => handleDeleteUser(user.id)} className='delete-button'>Delete</button> */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
