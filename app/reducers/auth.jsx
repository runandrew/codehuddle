import axios from 'axios';
import {browserHistory} from 'react-router';

const reducer = (state = null, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return action.user;
  }
  return state;
};

const AUTHENTICATED = 'AUTHENTICATED';
export const authenticated = user => ({
  type: AUTHENTICATED, user
});

export const login = (username, password) =>
  dispatch =>
    // we'll need to change this to '/api/auth/local/login' if we implement OAuth
    axios.post('/api/auth/login',
      {username, password})
      .then(() => {
        dispatch(whoami());
        browserHistory.push('/');
      })
      .catch(() => {
        dispatch(whoami());
        console.log('login failure');  
      });

export const logout = () =>
  dispatch =>
    axios.post('/api/auth/logout')
      .then(() => dispatch(whoami()))
      .catch(() => dispatch(whoami()));

export const whoami = () =>
  dispatch =>
    axios.get('/api/auth/whoami')
      .then(response => {
        const user = response.data;
        dispatch(authenticated(user));
      })
      .catch(failed => dispatch(authenticated(null)));

export default reducer;
