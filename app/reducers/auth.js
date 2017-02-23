const user = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      console.log('LOGIN auth reducer hit');
      return {
        username: action.username,
        user_pic: action.user_pic,
        auth_id: action.auth_id,
      };
    case 'USER_LOGOUT':
      console.log('LOGOUT auth reducer hit');
      return {};
    default:
      return user;
  }
};

const auth = (state = [], action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return [
        ...state,
        user(undefined, action),
      ];
    default:
      return state;
  }
};

export default auth;
