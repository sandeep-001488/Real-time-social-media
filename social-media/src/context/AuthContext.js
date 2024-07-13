import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INITIAL_STATE = {
  user: {
    _id:"6686d017251823f8f450990a",
    username:"SandeepSanu",
    email:"sandeep12@gmail.com",
    isAdmin:true,
    profilePicture:"my_pic2.jpg",
    coverPicture:"tejas.jpg",
    desc:"Hello ones! Admin here",
    city:"Jamui",
    from:"Garhi",
    relationship:1

  },
  isFetching: false,
  error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({children}) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);


  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
