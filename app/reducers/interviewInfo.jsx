
// Required libraries
import Immutable from 'immutable';
import axios from 'axios';
import { browserHistory } from 'react-router';

/* -----------------    ACTIONS     ------------------ */
const SET_INTERVIEW = 'SET_INTERVIEW';

/* ------------   ACTION CREATORS     ------------------ */
export const setInterview = interview => ({
  type: SET_INTERVIEW,
  interview
});

/* ------------       REDUCER     ------------------ */
const initialInterviewData = Immutable.fromJS(
  {}
);

export default function reducer (interviewData = initialInterviewData, action) {
  let newInterviewData;
  switch (action.type) {
    case SET_INTERVIEW:
      newInterviewData = Immutable.fromJS(action.interview);
      break;

    default: return interviewData;

  }

  return newInterviewData;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchInterview = interviewID => {
  return dispatch => {
    return axios.get(`/api/interviews/${interviewID}`)
    .then(response => {
      return dispatch(setInterview(response.data));
    })
    .catch(console.error);
  };
};

export const createInterviewAndRedirect = (userID) => {
  axios.post(`/api/interviews`, { interviewer_id: userID })
  .then(response => response.data)
  .then(data => browserHistory.push(`/InterviewerDashboard/${data.id}`))
  .catch(console.error);
}
