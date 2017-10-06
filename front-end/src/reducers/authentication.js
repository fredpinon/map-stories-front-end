const authentication = (state = {}, action) => {
  switch (action.type) {
    case 'USER_CREDENTIALS':
      return {
        ...state,
        token: action.payload.token,
        editorId: action.payload.editorId
      };
    default:
      return state;
  }
};

export default authentication;
