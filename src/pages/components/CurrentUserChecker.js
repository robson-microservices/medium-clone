import { useFetch } from 'hooks/useFetch'
import { useEffect, useContext } from 'react'
import { CurrentUserContext, LOADING_TYPE } from 'contexts/currentUser'
import { useLocalStorage } from 'hooks/useLocalStorage'
import { SET_AUTHORIZED_TYPE } from '../../contexts/currentUser'

const CurrentUserChecker = ({ children }) => {
  const [, dispatch] = useContext(CurrentUserContext)
  const [{ response }, doFetch] = useFetch('/user')
  const [token] = useLocalStorage('token')

  useEffect(() => {
    if (!token) {
      return
    }
    dispatch({ type: LOADING_TYPE })
    doFetch()
  }, [dispatch, doFetch, token])

  useEffect(() => {
    if (!response) {
      return
    }
    dispatch({ type: SET_AUTHORIZED_TYPE, payload: response.user })
  }, [dispatch, response])

  return children
}

export default CurrentUserChecker
