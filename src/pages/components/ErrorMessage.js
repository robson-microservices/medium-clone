import React from 'react'

const ErrorMessage = ({ errors }) => {
  const errs = Object.keys(errors).map((name) => {
    const messages = errors[name].join(' ')
    return `${name} ${messages}`
  })
  return (
    <ul className="error-messages">
      {errs.map((error) => {
        return <li key={error}>{error}</li>
      })}
    </ul>
  )
}

export default ErrorMessage
