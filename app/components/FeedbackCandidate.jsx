// Required libraries
import React from 'react';
import Rating from 'react-rating';

// Required files
import RateProblem from './RateProblem';

/* -----------------    COMPONENT     ------------------ */

export const FeedbackCandidate = ({ interviewProblems }) => {
  return (
    <div>
      <p>We strive to deliver the best queality interviews. Please give us some feedback on our problems.</p>
      {
        interviewProblems.map((problem, idx) => {
          // const { problem_id, interview_id } = problem.interviewProblems;
          return (
              <RateProblem
                problem={ problem }
                key={ idx }
                />
          );
        })
      }
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files

const mapState = (state) => {
  return {
    interviewProblems: state.interview.interviewProblems.toJS()
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(FeedbackCandidate);
