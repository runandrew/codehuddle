// Required libraries
import Immutable from 'immutable';


/* -----------------    ACTIONS     ------------------ */
const LOAD_PROBLEMS_BY_ORG = 'LOAD_PROBLEMS_BY_ORG';
const UPDATE_PROBLEM_STATUS = 'UPDATE_PROBLEM_STATUS';


/* ------------   ACTION CREATORS     ------------------ */

export const loadProblemsByOrg = (organization) => {
  return {
    type: LOAD_PROBLEMS_BY_ORG
  };
};

export const updateProblemStatus = (index, status) => {
  return {
    type: LOAD_PROBLEMS_BY_ORG,
    payload: {index: index, status: status}
  };
};

/* ------------       REDUCER     ------------------ */
const initialProblemSet = Immutable.fromJS({
  problems: [
    {
      name: 'String search',
      description: 'You are attempting to find the index of the first appearance of one string (the needle) inside of another (the haystack).',
      solutions: [
        {
          description: 'function indexOf (needle, haystack) { \n  for (let hIdx = 0; hIdx + needle.length <= haystack.length; hIdx++) {\n    for (let nIdx = 0; nIdx < needle.length; nIdx++) {\n      if (haystack[hIdx + nIdx] !== needle[nIdx]) break; \n      if (nIdx + 1 === needle.length) return hIdx;\n    }\n  }\nreturn -1;\n}',
          bigO: 'O(m*n)'
        }
      ],
      difficulty: 'easy',
      status: 'planned'
    },
    {
      name: 'String permutations',
      description: 'Given a string, return an array of all the permutations of that string. The permutations of the string should be the same length as the original string (i.e. use each letter in the string exactly once) but do not need to be actual words. The array that is returned should only contain unique values and its elements should be in alphabetical order.',
      solutions: [
        {description: 'brute force solution.', bigO: 'O(n^2)'},
        {description: 'more clever solution', bigO: 'O(nlogn)'},
        {description: 'even more clever solution', bigO: 'O(n)'}
      ],
      difficulty: 'medium',
      status: 'planned'
    }
  ]
});

export default function reducer (problemSetState = initialProblemSet, action) {
  switch (action.type) {
    case LOAD_PROBLEMS_BY_ORG:
      let probs = problemSetState.toJS();
      console.log('in reducer, returing ', probs);
      return probs;

    case UPDATE_PROBLEM_STATUS:
      return problemSetState.getIn(['problems']).get(action.index).setIn(['status'], action.status);

    default:
      return problemSetState;
  }
}

/* ------------       DISPATCHERS     ------------------ */
