import { createContext, useReducer, useEffect } from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
  // take in previous state and action
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload }
    case 'LOGOUT':
      return { user: null }
    default:
      return state
      // return original state if no changes
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, { 
    // second argument is user state null
    user: null
  })
// state value will be provided to whole application, will wrap it in the App on app.js
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    // parse it bc it is a JSON string

    if (user) {
      dispatch({ type: 'LOGIN', payload: user }) 
      // dispatch the login action if it is true
    }
  }, [])

  console.log('AuthContext state:', state)
  
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      { children }
    </AuthContext.Provider>
  )

}