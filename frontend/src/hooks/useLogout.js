import { useAuthContext } from "./useAuthContext";
import { usePostsContext } from "./usePostsContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchPosts } = usePostsContext();

  const logout = () => {
    // remove user from storage
    localStorage.removeItem("user");

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
    dispatchPosts({ type: "SET_POSTS", payload: null });
    // dont need a payload to set to null
  };
  // when we logout we clear the global logout state with the null payload

  return { logout };
};
