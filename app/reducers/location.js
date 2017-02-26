export const location = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_LOCATION':
      console.log('location reducer hit');
      return {
        location: action.location,
      };
    default:
      return location;
  }
};

export const addWatcher = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_WATCHER':
      console.log('location add watch reducer hit', action);
      return {
        watcherSub: action.watcherSub,
      };
    default:
      return addWatcher;
  }
};