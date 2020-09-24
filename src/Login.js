import  React, { useState } from 'react';

// can export immediately in function components as opposed toa
// arrow function component
export default function Login() {
  const [username, setUsername]= useState("");
  const [password, setPassword]= useState("");
  const [user, setUser] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault();
    const userData = {
      username,
      password
    }
    setUser(userData)
    // on submit clear out the data
    setUsername("")
    setPassword("")

  }

  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <h2>Login here:</h2>
      <form
      onSubmit={handleSubmit}

        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={ (event) => setUsername(event.target.value)}
          />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={ (event) => setPassword(event.target.value)}/>
      <button
        type="submit"
        >Submit</button>
      </form>
      <p>{user && JSON.stringify(user, null, 2)}</p>
      </div>
  )
}