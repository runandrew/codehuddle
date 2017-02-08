// Required libraries
import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

// Required files
import InterviewList from './InterviewList';

/* -----------------    COMPONENT     ------------------ */

export const InterviewerDashboard = ({ interviewProblems, user, createInterviewAndRedirect }) => {
  return (
    <div>
      <h3>Welcome, { user && user.name }</h3>
      <InterviewList />
      <FloatingActionButton onClick={ createInterviewAndRedirect }>
        <ContentAdd />
      </FloatingActionButton>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { createInterviewAndRedirect } from 'APP/app/reducers/interviewInfo';

const mapState = (state) => {
  return {
    user: state.auth,
    createInterviewAndRedirect: () => {
      createInterviewAndRedirect(state.auth.id);
    }
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewerDashboard);
