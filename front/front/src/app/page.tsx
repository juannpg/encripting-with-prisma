"use client";

import { useState } from 'react';

function App() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const register = async () => {
    const response = await fetch('http://localhost:4000/api/routers/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email
      })
    });
    const log = await response.json();
    console.log(log);

    if (response.status === 200) {
      alert('Registered');
      window.location.href='/login'
    } else {
      alert('Error ' + log.message + ' || ' + log.error );
      window.location.reload();
    };
  }

  return (
    <div className="main h-screen flex flex-col items-center justify-center bg-red-100">
      <h1>Register</h1>
      <input
        type="text"
        name="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="mb-4"
        placeholder='Username'
      />
      <input
        type="text"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className='mb-4'
        placeholder='Email'
      />
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => register()}
      >Register</button>
      <a href='login'>login</a>
    </div>
  );
}

export default App;