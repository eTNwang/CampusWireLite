import React, { useState } from 'react'
import axios from 'axios'
import Button from 'react-bootstrap/Button'
import {
  BrowserRouter as Router,
  Link,
  useHistory,
  useNavigate,
} from 'react-router-dom'

const Signup = () => {
  const [username, changeusername] = useState('')
  const [password, changepassword] = useState('')
  const [signedup, setsignedup] = useState(false)
  const [msg, setMsg] = useState('')
  const navigate = useNavigate()
  const signup = async () => {
    try {
      await axios.post('/account/signup', { username, password })
      setMsg(`${username} was signed up successfully`)
      setsignedup(true)
    } catch (e) {
      alert(`an error occurred`)
      setsignedup(false)
    }
  }

  return (
    <div>
      <>
        <h1>Sign Up</h1>
        <form>
          <input placeholder="Username" onChange={e => changeusername(e.target.value)} />
          <input placeholder="Password" onChange={e => changepassword(e.target.value)} />
          <Button
            onClick={() => {
              signup(username, password); if (signedup) {
                navigate('/')
              }
            }}
          >
            Submit
          </Button>
        </form>
        <p>
          {' '}
          {msg}
          {' '}
        </p>
        <p><Link to="/login"> Already Have an Account? Log In Here!</Link></p>
        <p><Link to="/"> Back to Main Menu</Link></p>
      </>
    </div>
  )
}

export default Signup
