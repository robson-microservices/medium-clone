import { useState, useEffect } from 'react'
import axios from 'axios'

const BASE_URL_API = 'https://conduit.productionready.io/api'

export const useFetch = (url) => {
  const [response, setResponse] = useState(null)
  const [loading, isLoading] = useState(false)
  const [error, setError] = useState(null)
  const [options, setOptions] = useState(null)

  const doFetch = (options = {}) => {
    setOptions(options)
    isLoading(true)
  }

  useEffect(() => {
    if (!loading) {
      return
    }

    const fetch = async () => {
      try {
        const res = await axios(BASE_URL_API + url, options)
        setResponse(res.data)
      } catch (error) {
        setError(error.response.data)
      } finally {
        isLoading(false)
      }
    }

    fetch()
  }, [loading, options, url])

  return [{ loading, response, error }, doFetch]
}
