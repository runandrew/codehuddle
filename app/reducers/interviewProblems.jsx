
// Required libraries
import Immutable from 'immutable';
import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const SET_PROBLEMS = 'SET_PROBLEMS';
const UPDATE_PROBLEM = 'UPDATE_PROBLEM';

/* ------------   ACTION CREATORS     ------------------ */
export const setProblems = problems => ({
  type: SET_PROBLEMS,
  problems
});

export const updateProblem = problem => {
  return {
    type: UPDATE_PROBLEM,
    problem
  };
};

/* ------------       REDUCER     ------------------ */
const initialProblemData = Immutable.fromJS(
  []
);

export default function reducer (problemData = initialProblemData, action) {
  switch (action.type) {
    case SET_PROBLEMS:
      return Immutable.fromJS(action.problems);
    case UPDATE_PROBLEM:
      return problemData.setIn([action.problem.index, 'interviewProblems'],
        Immutable.fromJS(action.problem.data));
    default: return problemData;

  }
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchProblems = interviewID => {
  return dispatch => {
    return axios.get(`/api/interviews/${interviewID}/problems`)
    .then(response => {
      console.log("inside fetchProblems: ", response.data);
      return dispatch(setProblems(response.data));
    })
    .catch(console.error);
  };
};

export const setCandidateRating = (interviewID, problemID, rating) => {
  axios.put(`/api/interviewProblems/${interviewID}/problems/${problemID}`, {
    candidateRating: +rating
  });
};

export const setProblemStatus = (interviewID, problemID, index, status) => {
  return dispatch => {
    return axios.put(`/api/interviewProblems/${interviewID}/problems/${problemID}`, {
      status: status
    })
    .then(response => {
      return dispatch(updateProblem({data: response.data, index: index}));
    })
    .catch(console.error);
  };
};

export const setInterviewerRating = (interviewID, problemID, index, rating) => {
  return dispatch => {
    return axios.put(`/api/interviewProblems/${interviewID}/problems/${problemID}`, {
      interviewerRating: +rating
    })
    .then(response => {
      return dispatch(updateProblem({data: response.data, index: index}));
    })
    .catch(console.error);
  };
};
