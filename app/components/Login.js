import React from 'react';
import { View, 
  ListView, 
  StyleSheet,
  Linking,
  Text,
  Button,
} from 'react-native';
// import jwtDecoder from 'jwt-decode';
// import Exponent from 'exponent';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 40,
  },
  button: {
    height: 60,
    borderColor: '#05A5D1',
    borderWidth: 2,
    backgroundColor: '#333',
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FAFAFA',
    fontSize: 20,
    fontWeight: '600',
  },
  createQuest: {
    paddingBottom: 20,
  },
});


class Login extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      username: undefined,
      user_pic: undefined,
      auth_id: undefined,
    };
    // this.props.loginWithAuth0 = this.props.loginWithAuth0.bind(this);
    // this.props.handleAuth0Redirect = this.props.handleAuth0Redirect.bind(this);
  }

  componentDidMount() {
    console.log('LOGIN MOUNTED');
    Linking.addEventListener('url', this.props.handleAuth0Redirect);
    console.log(this.props);
        console.log('PROPS LOGIN AUTH0', this.props.loginWithAuth0);

  }

  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.quests !== this.props.quests) {
  //     this.setState({
  //       elements: nextProps.quests,
  //       dataSource: this.state.dataSource.cloneWithRows(nextProps.quests),
  //     });
  //   }
  // }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Example: Auth0 login</Text>
        <Button title="Login with Auth0" onPress={() => { this.props.onConsole(); }} />
      </View>
    );
  }

}

// QuestList.propTypes = {
//   quests: React.PropTypes
//     .arrayOf(React.PropTypes.object).isRequired,
// };

export default Login;
