'use strict';
import React from 'react';

import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// For Material-UI: Provides `onTouchTap()` event; Much like an `onClick()` for touch devices.
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

// Material Theme Provider. Wraps everything in `render()` method below
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import store from './store';
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Splash from './components/splash/Splash';
import Home from './components/splash/Home';
import InterviewRoom from './components/interview-room/InterviewRoom';
import InterviewPlanning from './components/InterviewPlanning';
import { socketsJoinRoom } from 'APP/app/sockets';
import {receiveProblems} from './reducers/InterviewPlanning';

function interviewOnEnter (nextState) {
  const requestedRoom = nextState.params.room;
  socketsJoinRoom(requestedRoom);
}

function interviewPlanningOnEnter (nextState) {
  console.log("inside interviewPlanningOnEnter, the nextState is: ");
  store.dispatch(receiveProblems());
}

render(
  <MuiThemeProvider>
    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ Home } />
        <Route path="/interviewRoom/:room" component={InterviewRoom} onEnter={ interviewOnEnter }/>
        <Route path="/interviewPlanning" component={InterviewPlanning}/>
        <Route path="/login" component={Login}/>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.getElementById('main')
);
