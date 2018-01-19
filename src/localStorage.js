export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify({
      entities: state.entities,
      authentication: state.authentication
    });
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
}
