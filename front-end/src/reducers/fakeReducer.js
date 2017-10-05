const defaultState = {
  entities: {}
}

const fakeReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'FAKE_ACTION':
      return {};
    default:
      return state;
  }
};

export default fakeReducer;
