import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
// update the authcontext with the users email which is default null

export const useSignup = () => {
  const [error, setError] = useState(null)
  // null to begin with is the inital state
  const [isLoading, setIsLoading] = useState(null)
  // will be true when start the request
  const { dispatch } = useAuthContext()
  const backendUrl = "https://brightside-production.up.railway.app"

  const signup = async (email, password) => {
    setIsLoading(true)
    setError(null)

    const response = await fetch(`${backendUrl}/api/user/signup`, {
      // proxy to localhost4000
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, password })
    })
    const json = await response.json()
    // async method that we get back response

    if (!response.ok) {
      setIsLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))
      // have to store strings inside local storage

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})
      // fires the LOGIN case from AuthContext.js

      // update loading state
      setIsLoading(false)
    }
  }

  return { signup, isLoading, error }
}