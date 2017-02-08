// Required libraries
import React from 'react';
import Rating from 'react-rating';

// Required files

/* -----------------    COMPONENT     ------------------ */

export const RateProblem = ({ problem, handleRate, candidateRating }) => {
  return (
    <div>
      <p>Problem: <strong>{ problem.name }</strong></p>
      <Rating onChange={ handleRate } initialRate={ candidateRating || 0 }/>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { setCandidateRating } from 'APP/app/reducers/interviewProblems';

const mapState = (state, ownProps) => {
  const { candidateRating } = ownProps.problem.interviewProblems;
  return {
    candidateRating
  };
};

const mapDispatch = (dispatch, ownProps) => {
  const { problem_id, interview_id } = ownProps.problem.interviewProblems;
  return {
    handleRate: rating => {
      setCandidateRating(interview_id, problem_id, rating);
    }
  };
};

export default connect(mapState, mapDispatch)(RateProblem);
