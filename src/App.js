import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './App.css';

function App() {
  return (
    <div className="App">
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
