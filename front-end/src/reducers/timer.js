const timer = (state = {}, action) => {
  if (action.type === 'TIMER_EVENT') {
    return {
      ...state,
      time:  action.payload.time
    }
  }

  return state;
}

export default timer;
