// Required libraries
import React from 'react';

// Required files
import InterviewList from './InterviewList';

/* -----------------    COMPONENT     ------------------ */

export const InterviewerDashboard = ({ interviewProblems, user }) => {
  return (
    <div>
      <h3>Welcome, { user && user.name }</h3>
      <InterviewList />
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files

const mapState = (state) => {
  return {
    user: state.auth
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewerDashboard);
