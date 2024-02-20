import { useState } from 'react';



function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isValid, setIsValid] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };



  return (
    <div>
      {!isLoggedIn ? (
        <div>
          <h2>Login</h2>
          {!isValid && <p>Invalid username or password.</p>}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      ) : (
        <div>
          <h2>Welcome, {username}!</h2>
        </div>
      )}
    </div>
  );
}

export default App;
