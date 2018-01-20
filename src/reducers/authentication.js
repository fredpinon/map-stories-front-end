const authentication = (state = {}, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS':
      return {
        ...state,
        ...action.response.entities.editors[action.response.result],
      };
    case 'LOGOUT_USER':
      return {};
    default:
      return state;
  }
};

export default authentication;
