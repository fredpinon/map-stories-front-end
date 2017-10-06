const defaultState = {
  entities: {}
}

const user = (state = defaultState, action) => {
  switch (action.type) {
    case 'FAKE_ACTION':
      return {};
    default:
      return state;
  }
};

export default user;
