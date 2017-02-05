import React from 'react';
import WhoAmI from './WhoAmI';

export const Login = ({ login }) => (
  <div>
    <form onSubmit={evt => {
      evt.preventDefault();
      login(evt.target.username.value, evt.target.password.value);
    } }>
      <label>Username
        <input name="username"/>
      </label>
      <label>Password
        <input name="password" type="password"/>
      </label>
      <input type="submit" value="Login" />
    </form>
    <WhoAmI/>
  </div>
);

import {login} from 'APP/app/reducers/auth';
import {connect} from 'react-redux';

export default connect(
  state => ({}),
  {login},
)(Login);
