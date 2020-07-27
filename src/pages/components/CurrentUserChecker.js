import { useFetch } from 'hooks/useFetch'
import { useEffect, useContext } from 'react'
import { CurrentUserContext } from 'contexts/currentUser'
import { useLocalStorage } from 'hooks/useLocalStorage'

const CurrentUserChecker = ({ children }) => {
  const [, setCurrentUser] = useContext(CurrentUserContext)
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      setCurrentUser((state) => ({
        ...state,
        isLoggedIn: false,
      }))
      return
    }
    setCurrentUser((state) => ({
      ...state,
      isLoading: true,
    }))
    doFetch()
  }, [doFetch, setCurrentUser, token])

  useEffect(() => {
    if (!response) {
      return
    }
    setCurrentUser((state) => ({
      ...state,
      isLoading: false,
      isLoggedIn: true,
      currentUser: response.user,
    }))
  }, [response, setCurrentUser])

  return children
}

export default CurrentUserChecker
