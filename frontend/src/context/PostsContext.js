import { createContext, useReducer } from "react";

export const PostsContext = createContext();

export const postsReducer = (state, action) => {
  switch (action.type) {
    // differnt cases for the types
    case "SET_POSTS":
      return {
        posts: action.payload,
        // payload is an array of all the posts
      };
    case "CREATE_POST":
      return {
        posts: [action.payload, ...state.posts],
        // new array, action payload is a single workout, spread the previous state of array of wrokouts
      };
    case "UPDATE_POST":
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload._id) {
          return action.payload;
        }
        return post;
      });
      return {
        ...state,
        posts: updatedPosts,
      };

    case "DELETE_POST":
      return {
        posts: state.posts.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const PostsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(postsReducer, {
    // similar to usestate
    posts: null,
  });

  return (
    <PostsContext.Provider value={{ ...state, dispatch }}>
      {children}
      {/* represents the app component */}
    </PostsContext.Provider>
  );
};
