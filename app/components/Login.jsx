import React from 'react';
import WhoAmI from './WhoAmI';

import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  margin: '10px'
};

export const Login = ({ login }) => (
  <div>
    <form onSubmit={evt => {
      evt.preventDefault();
      login(evt.target.username.value, evt.target.password.value);
    } }>
    <div>
      <TextField 
        name="username"
        floatingLabelText="UserName"/>
    </div>
    <div>
      <TextField
        name="password"
        type="password"
        floatingLabelText="Password"/>
    </div>
      <br/>
      <RaisedButton
        label="Sign Up"
        primary={ true }
        type="submit"
        style={ styles }
        />
        <RaisedButton
        label="Login"
        primary={ true }
        type="submit"
        style={ styles }
        />
      <br/>
    </form>
  </div>
);

import { login } from 'APP/app/reducers/auth';
import { connect } from 'react-redux';

export default connect(state => ({}), { login })(Login);

