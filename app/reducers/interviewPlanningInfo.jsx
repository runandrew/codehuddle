// Required libraries
import Immutable from 'immutable';
import axios from 'axios';
import {hashHistory} from 'react-router';

/* -----------------    ACTIONS     ------------------ */
const RECEIVE_INTERVIEWS = 'RECEIVE_INTERVIEWS';
const LOAD_PROBLEMS = 'LOAD_PROBLEMS';


/* ------------   ACTION CREATORS     ------------------ */

/** Need few routes
1. Interviews by userId (interviewers ID) and status
2. adding a new interview (should create a new user for the candidate? and then add )
**/

export const addInterview = (data) => {
  return dispatch => {
    return axios.post('/api/interviews/', data)
      .then(res => {
        console.log("adding interview: ", res);
      });
  };
};

export const addProblem = (problemId, interviewId) => {
  return dispatch => {
    return axios.put('/api/interviews/', data)
      .then(res => {
        console.log("adding interview: ", res);
      });
  };
};

export const loadProblems = problems => ({
  type: LOAD_PROBLEMS,
  problems
});

export const receiveProblems = (organization) => {
  return dispatch => {
    return axios.get(`/api/organizations/${organization}/problems`)
      .then(function (res) {
        return res.data;
    })
      .then(function (problems) {
        const action = loadProblems(problems);
        dispatch(action);
    })
    .catch(function (err) {
      console.error(err);
    });
  };

};


/* ------------       REDUCER     ------------------ */

const initialInterviewPlanningState = {
  problems: []
};

  export default function reducer (state = initialInterviewPlanningState, action) {

  const newState = Object.assign({}, state);
  switch (action.type) {
    case LOAD_PROBLEMS:
      newState.problems = action.problems;
      return newState;

    default: return newState;
  }
}

