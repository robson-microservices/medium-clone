import { useState, useEffect } from 'react'

export const useLocalStorage = (key, initialValue = '') => {
  const [value, setValue] = useState(() => {
    return localStorage.getItem(key)
  })

  useEffect(() => {
    localStorage.setItem(key, value)
  }, [key, value])

  return [value, setValue]
}
