
// Required libraries
import Immutable from 'immutable';
import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */
const SET_INTERVIEWS = 'SET_INTERVIEWS';

/* ------------   ACTION CREATORS     ------------------ */
export const setInterviews = interviews => ({
  type: SET_INTERVIEWS,
  interviews
});

/* ------------       REDUCER     ------------------ */
const initialInterviewsData = Immutable.fromJS(
  []
);

export default function reducer (interviewsData = initialInterviewsData, action) {
  let newInterviewsData;
  switch (action.type) {
    case SET_INTERVIEWS:
      newInterviewsData = Immutable.fromJS(action.interviews);
      break;

    default: return interviewsData;

  }

  return newInterviewsData;
}

/* ------------       DISPATCHERS     ------------------ */

export const fetchAllInterviews = userID => {
  return dispatch => {
    return axios.get(`/api/users/${userID}/interviews`)
    .then(response => {
      return dispatch(setInterviews(response.data));
    })
    .catch(console.error);
  };
};
