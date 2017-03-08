import socket from '../socket/socket';
// import {  } from '../actions/actions';
import { connect } from 'react-redux';
import Party from '../components/Party';

const mapStateToProps = (state) => {
  return {
    user: state.user,
    party: state.party,
    invites: state.invites,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    // onAddFriend: ((char_id, target_name) => {
    //   socket.emit('add to party', char_id, target_name);
    // }),
    // fetchParty: (char_id => {
    //   socket.emit('get party', char_id);
    // }),
  };
};

const PartyCreate = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Party);

export default PartyCreate;