import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [];
  });
  const [newUser, setNewUser] = useState("");
  const [editingUserId, setEditingUserId] = useState(null);
  const [editingUserName, setEditingUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [selectedUser, setSelectedUser] = useState(null);
  const [userToDelete, setUserToDelete] = useState(null);

  useEffect(() => {
    if (users.length === 0) {
      axios
        .get("https://jsonplaceholder.typicode.com/users")
        .then((response) => {
          setUsers(response.data);
        })
        .catch((error) => console.error("Error fetching users:", error));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  const handleAddUser = () => {
    if (newUser.trim()) {
      const newUserObject = {
        id: Date.now(),
        name: newUser,
      };
      setUsers([...users, newUserObject]);
      setNewUser("");
    }
  };

  const handleDeleteUser = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    if (selectedUser && selectedUser.id === id) {
      setSelectedUser(null);
    }
    setUserToDelete(null);
  };

  const handleEditUser = (id) => {
    const user = users.find((user) => user.id === id);
    if (user) {
      setEditingUserId(id);
      setEditingUserName(user.name);
    }
  };

  const handleSaveEdit = () => {
    setUsers(users.map((user) => (user.id === editingUserId ? { ...user, name: editingUserName } : user)));
    setEditingUserId(null);
    setEditingUserName("");
  };

  const handleCancelEdit = () => {
    setEditingUserId(null);
    setEditingUserName("");
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleSelectUser = (id) => {
    const user = users.find((user) => user.id === id);
    setSelectedUser(user);
  };

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : "light-theme"}`}>
      <h1>User List</h1>
      <button onClick={toggleTheme} className="theme-toggle">
        Switch to {isDarkTheme ? "Light" : "Dark"} Theme
      </button>
      <div className="input-container">
        <input
          type="text"
          placeholder="Enter new user name"
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
        />
        <button onClick={handleAddUser} className="add-button">Add User</button>
      </div>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search users"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <ul className="user-list">
        {filteredUsers.map((user) => (
          <li key={user.id} className="user-item">
            {editingUserId === user.id ? (
              <div className="edit-container">
                <input
                  type="text"
                  value={editingUserName}
                  onChange={(e) => setEditingUserName(e.target.value)}
                />
                <button onClick={handleSaveEdit} className="save-button">Save</button>
                <button onClick={handleCancelEdit} className="cancel-button">Cancel</button>
              </div>
            ) : (
              <>
                <span onClick={() => handleSelectUser(user.id)} className="user-name">
                  {user.name}
                </span>
                <button onClick={() => handleEditUser(user.id)} className="edit-button">Edit</button>
                <button onClick={() => setUserToDelete(user)} className="delete-button">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>

      {selectedUser && (
        <div className="user-details">
          <h2>User Details</h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>ID:</strong> {selectedUser.id}</p>
          <p><strong>Email:</strong> {selectedUser.email || "N/A"}</p>
          <p><strong>Phone:</strong> {selectedUser.phone || "N/A"}</p>
          <p><strong>Website:</strong> {selectedUser.website || "N/A"}</p>
          <button onClick={() => setSelectedUser(null)} className="close-button">Close</button>
        </div>
      )}

      {userToDelete && (
        <div className="modal-overlay">
          <div className="modal">
            <p>Are you sure you want to delete <strong>{userToDelete.name}</strong>?</p>
            <button
              onClick={() => handleDeleteUser(userToDelete.id)}
              className="delete-button"
            >
              Yes, Delete
            </button>
            <button
              onClick={() => setUserToDelete(null)}
              className="cancel-button"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
