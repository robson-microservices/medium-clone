import { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { useLocalStorage } from 'hooks/useLocalStorage'

const BASE_URL_API = 'https://conduit.productionready.io/api'

export const useFetch = (url) => {
  const [response, setResponse] = useState(null)
  const [loading, isLoading] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)
  const [token] = useLocalStorage('token')

  const doFetch = useCallback((options = {}) => {
    setOptions(options)
    isLoading(true)
  }, [])

  useEffect(() => {
    if (!loading) {
      return
    }

    const requestOptions = {
      ...options,
      ...{
        headers: {
          authorization: token ? `Token ${token}` : '',
        },
      },
    }

    const fetch = async () => {
      try {
        const res = await axios(BASE_URL_API + url, requestOptions)
        setResponse(res.data)
      } catch (error) {
        setError(error.response.data)
      } finally {
        isLoading(false)
      }
    }

    fetch()
  }, [loading, options, token, url])

  return [{ loading, response, error }, doFetch]
}
