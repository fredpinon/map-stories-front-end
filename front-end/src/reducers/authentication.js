const authentication = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CREDENTIALS':
      return {
        ...state,
        token: action.payload.userCredentials.token,
        email: action.payload.userCredentials.email,
        name: action.payload.userCredentials.name,
        picture: action.payload.userCredentials.picture,
      };
    default:
      return state;
  }
};

export default authentication;
