'use strict';

// Required libraries
import React from 'react';
import { browserHistory, Router, Route } from 'react-router';
import { connect } from 'react-redux';

// Required files
import Login from './components/Login';
import WhoAmI from './components/WhoAmI';
import Home from './components/splash/Home';
import InterviewRoom from './components/interview-room/InterviewRoom';
import FeedbackCandidate from './components/FeedbackCandidate';
import InterviewerDashboard from './components/InterviewerDashboard';
import ShowProblemSet from './components/ShowProblemSet';
import InterviewPlanning from './components/InterviewPlanning';
import Signup from './components/Signup';

// Helper functions
import { socketsJoinRoom } from 'APP/app/sockets';
import { fetchProblems } from 'APP/app/reducers/interviewProblems';
import { fetchAllInterviews } from 'APP/app/reducers/allInterviews';
import { fetchInterview } from 'APP/app/reducers/interviewInfo';

/* -----------------    COMPONENT     ------------------ */
const Routes = ({ interviewOnEnter, feedbackCandidateOnEnter, interviewDashboardOnEnter, interviewPlanningOnEnter, showProblemSetOnEnter }) => (
  <Router history={ browserHistory }>
    <Route path="/" component={ Home } />
    <Route path="/interviewRoom/:room" component={ InterviewRoom } onEnter={ interviewOnEnter }/>
    <Route path="/interviewerDashboard" component={ InterviewerDashboard } onEnter={ interviewDashboardOnEnter }/>
    <Route path="/feedbackCandidate/:interviewID" component={ FeedbackCandidate } onEnter={ feedbackCandidateOnEnter } />
    <Route path="/interviewPlanning/:interviewID" component={ InterviewPlanning } onEnter={ interviewPlanningOnEnter } />
    <Route path="/showProblems/:interviewID" component={ ShowProblemSet } onEnter={ showProblemSetOnEnter } />
    <Route path="/login" component={ Login }/>
    <Route path="/signup" component={ Signup }/>
  </Router>
);

/* -----------------    CONTAINER     ------------------ */

const mapProps = (state) => ({
  user: state.auth
});

const mapDispatch = (dispatch, ownProps) => ({
  feedbackCandidateOnEnter: (nextState) => {
    dispatch(fetchProblems(nextState.params.interviewID));
  },
  interviewOnEnter: (nextState) => {
    socketsJoinRoom(nextState.params.room);
    if (nextState.location.query) {
      dispatch(fetchProblems(+nextState.location.query.id));
    }
  },
  interviewDashboardOnEnter: (nextState) => {
    dispatch(fetchAllInterviews(nextState.params.userID));
  },
  interviewPlanningOnEnter: (nextState) => {
    dispatch(fetchInterview(nextState.params.interviewID));
  },
  showProblemSetOnEnter: (nextState) => {
    dispatch(fetchProblems(nextState.params.interviewID));
  }
});

export default connect(mapProps, mapDispatch)(Routes);
