import React, { useState, useEffect } from 'react'
import { useFetch } from 'hooks/useFetch'
import { Link, Redirect } from 'react-router-dom'
import { useLocalStorage } from 'hooks/useLocalStorage'
import ErrorMessage from '../components/ErrorMessage'

const Register = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, isSuccess] = useState(false)
  const [{ loading, response, error }, doFetch] = useFetch('/users')
  const [, setToken] = useLocalStorage('token')

  const handleSignup = async (event) => {
    event.preventDefault()
    doFetch({
      method: 'post',
      data: {
        user: { email, password, username },
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token)
    isSuccess(true)
  }, [response, setToken])

  if (success) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Sign Up</h1>
            <p className="text-xs-center">
              <Link to="/signin">Already have an account?</Link>
            </p>
            {error && <ErrorMessage errors={error.errors} />}
            <form onSubmit={handleSignup}>
              <fieldset>
                <fieldset className="form-group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Username"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Email"
                  />
                </fieldset>
                <fieldset className="form-group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="form-control form-control-lg"
                    placeholder="Password"
                  />
                </fieldset>
                <fieldset>
                  <button
                    disabled={loading}
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                  >
                    Sign Up
                  </button>
                </fieldset>
              </fieldset>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
