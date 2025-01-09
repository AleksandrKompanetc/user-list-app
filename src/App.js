import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState('');
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserName, setEditingUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

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
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null);
    }
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

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditingUserName("");
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  }

  const filteredUsers = users.filter((user) => user.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <h1>User List</h1>
      <button onClick={toggleTheme} className='theme-toggle'>
        Switch to {isDarkTheme ? "Light" : "Dark"} Theme
      </button>
      <div className='input-container'>
        <input 
          type="text"
          placeholder='Enter new user name...'
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)} 
        />
        <button onClick={handleAddUser} className='add-button'>Add User</button>
      </div>
      <div className='search-container'>
        <input 
          type="text"
          placeholder='Search users'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>
      <ul className='user-list'>
        {filteredUsers.map((user) => (
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
      {selectedUser && (
        <div className='user-details'>
          <h2>User Details</h2>
          <p><strong>Name:</strong>{selectedUser.name}</p>
          <button onClick={() => setSelectedUser(null)} className='close-button'>Close</button>
        </div>
      )}
    </div>
  );
}

export default App;
