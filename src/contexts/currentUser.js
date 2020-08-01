import React, { createContext, useReducer } from 'react'

export const CurrentUserContext = createContext()

export const LOADING_TYPE = 'LOADING'
export const SET_AUTHORIZED_TYPE = 'SET_AUTHORIZED'
export const SET_UNAUTHORIZED_TYPE = 'SET_UNAUTHORIZED'

const initialState = {
  isLoading: false,
  isLoggedIn: false,
  currentUser: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case LOADING_TYPE:
      return {
        ...state,
        isLoading: true,
      }

    case SET_AUTHORIZED_TYPE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: true,
        currentUser: action.payload,
      }

    case SET_UNAUTHORIZED_TYPE:
      return {
        ...state,
        isLoading: false,
        isLoggedIn: false,
        currentUser: null,
      }

    default:
      return state
  }
}

export const CurrentUserProvider = ({ children }) => {
  const value = useReducer(reducer, initialState)

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  )
}
