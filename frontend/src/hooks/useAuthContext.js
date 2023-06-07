import { AuthContext } from "../context/AuthContext"
import { useContext } from "react"

export const useAuthContext = () => {
  const context = useContext(AuthContext)

  if(!context) {
    throw Error('useAuthContext must be used inside an AuthContextProvider')
  }
// invoke this hook and destructure the user from the context object to use authcontext
  return context
}