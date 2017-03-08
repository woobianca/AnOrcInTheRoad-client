export const updateParty = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_PARTY':
    console.log('UPDATE PARTY: ', action);
      return action.party;
    default:
      return state;
  }
};

export const createInvite = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_INVITE':
      return [
        ...state,
        action.invite,
      ];
    default:
      return state;
  }
};
