import React, { useState } from 'react';
// useState does not merge all state like in a 
// class component
// thus we need to do stuff like ...form
// to manually merge
const initialFormState = {
  username: '',
  email: '',
  password: '',
};
// put initial state outside of component
// to be able to clear form upon submit
export default function Register() {
  // originally we had the form here in state
  // const [form, setForm] = useState({
  //   username: '',
  //   email: '',
  //   password: '',
  // });
  const [form, setForm] = useState(initialFormState);
  const [user, setUser] = useState(null)

  // reusable function for all three values
const handleChange =(event ) => {
  setForm({
    // do the state merge manually with spread operator
    ...form,// provide rest of contents of form here
    // then overwrite w each indiv value
    [event.target.name]: event.target.value
    //only updates one piece of state at a time
  })
  // no need for merge if for example all params
  // being updated at once, recall the position of x and y
  // in that object we update at same time
}
const handleSubmit = (event) => {
  event.preventDefault();
  setUser(form) // set the data
  setForm(initialFormState)//clear data from form once done
}
  return (
    <div
      style={{
        textAlign: 'center',
      }}>
      <h2>Register:</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        onChange={handleChange}
        value={form.username}
      />
        <input
        name="email"
        type="email"
        placeholder="Email address"
        onChange={handleChange}
        value={form.email}

      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        value={form.password}
      />
      <button
        type="submit"
        >Submit</button>
      </form>
      {user && JSON.stringify(user, null, 2)}
      </div>
  )
}