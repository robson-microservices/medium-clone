import React, { useState, useEffect, useContext } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useFetch } from 'hooks/useFetch'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { CurrentUserContext } from 'contexts/currentUser'
import ErrorMessage from '../components/ErrorMessage'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [success, isSuccess] = useState(false)
  const [{ loading, response, error }, doFetch] = useFetch('/users/login')
  const [, setToken] = useLocalStorage('token')

  const [, setCurrentUser] = useContext(CurrentUserContext)

  const handleLogin = async (event) => {
    event.preventDefault()

    setCurrentUser((state) => ({
      ...state,
      isLoading: true,
    }))

    doFetch({
      method: 'post',
      data: {
        user: { email, password },
      },
    })
  }

  useEffect(() => {
    if (!response) {
      return
    }
    setToken(response.user.token)
    isSuccess(true)
    setCurrentUser((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }))
  }, [response, setCurrentUser, setToken])

  if (success) {
    return <Redirect to="/" />
  }

  return (
    <div className="auth-page">
      <div className="container page">
        <div className="row">
          <div className="col-md-6 offset-md-3 col-xs-12">
            <h1 className="text-xs-center">Login</h1>
            <p className="text-xs-center">
              <Link to="/signup">Need an account?</Link>
            </p>
            {error && <ErrorMessage errors={error.errors} />}
            <form onSubmit={handleLogin}>
              <fieldset>
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
                    Sign in
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

export default Login
