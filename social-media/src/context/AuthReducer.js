
const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        isFetching: true,
        error: false
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload.user, // Extract user from action.payload
        isFetching: false,
        error: false
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        isFetching: false,
        error: true
      };
    default:
      return state;
  }
};
 export default AuthReducer