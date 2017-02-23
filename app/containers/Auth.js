import { connect } from 'react-redux';
import { userLogin } from '../actions/actions';
import Login from '../components/Login';
import { socket, _handleAuth0Redirect } from '../main';
import jwtDecoder from 'jwt-decode';
import Exponent from 'exponent';


let redirectUri;
if (Exponent.Constants.manifest.xde) {
  redirectUri = `exp://u3-8hi.woobianca.app.exp.direct/+/redirect`;
} else {
  redirectUri = `${Exponent.Constants.linkingUri}/redirect`;
}

const auth0ClientId = 'vDeBBemEERpMdpAG24zlAdIg2CCIWiQ2';
const auth0Domain = 'https://originalorcs.auth0.com';

async function loginWithAuth0() {
  const redirectionURL = `${auth0Domain}/authorize` + this._toQueryString({
    client_id: auth0ClientId,
    response_type: 'token',
    scope: 'openid nickname picture user_id',
    redirect_uri: redirectUri,
    state: redirectUri,
  });
  Exponent.WebBrowser.openBrowserAsync(redirectionURL);
};

async function handleAuth0Redirect(event) {
  if (!event.url.includes('+/redirect')) {
    return;
  }
  Exponent.WebBrowser.dismissBrowser();
  const [, queryString] = event.url.split('#');
  const responseObj = queryString.split('&').reduce((map, pair) => {
    const [key, value] = pair.split('=');
    map[key] = value; // eslint-disable-line
    return map;
  }, {});
  const encodedToken = responseObj.id_token;
  const decodedToken = jwtDecoder(encodedToken);
  return {username: decodedToken.nickname, 
    user_pic: decodedToken.picture,
    auth_id: decodedToken.user_id;
  }
};

_toQueryString(params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

const mapStateToProps = (state) => {
  return {
    auth_id: state.auth_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onConsole: () => {
      console.log('MAP DISPATCH PROPS')
    },
    onLogin: () => {
      loginWithAuth0()
    },
    handleAuth0Redirect: (event) => {
      if (!event.url.includes('+/redirect')) {
        return;
      }
      Exponent.WebBrowser.dismissBrowser();
      const [, queryString] = event.url.split('#');
      const responseObj = queryString.split('&').reduce((map, pair) => {
        const [key, value] = pair.split('=');
        map[key] = value; // eslint-disable-line
        return map;
      }, {});
      const encodedToken = responseObj.id_token;
      const decodedToken = jwtDecoder(encodedToken);
      const username = decodedToken.nickname, 
      const user_pic = decodedToken.picture,
      const auth_id = decodedToken.user_id;

      dispatch (
        userLogin({ username, user_pic, auth_id })
      )
      socket.emit('get character', {auth_id});
    },
  };
};

const Auth = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

export default Auth;
