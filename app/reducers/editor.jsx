
// Required libraries
import Immutable from 'immutable';
import { socket } from 'APP/app/sockets';

/* -----------------    ACTIONS     ------------------ */
const SET_TEXT = 'SET_TEXT';
const SET_OPTIONS = 'SET_OPTIONS';
const SET_RANGE = 'SET_RANGE';
const SET_RANGE_HISTORY = 'SET_RANGE_HISTORY';

/* ------------   ACTION CREATORS     ------------------ */
export const setText = text => ({
  type: SET_TEXT,
  meta: {
    remote: true
  },
  text });

export const setOptions = options => ({
  type: SET_OPTIONS,
  meta: {
    remote: true
  },
  options
});

export const setRange = range => ({
  type: SET_RANGE,
  id: socket.id,
  meta: {
    remote: true
  },
  range
});

/* ------------       REDUCER     ------------------ */

const defaultRange = Immutable.fromJS(
  {
    default: {
      start: {
        column: 0,
        row: 0
      },
      end: {
        column: 0,
        row: 0
      }
    }
  }
);

const initialEditorData = Immutable.fromJS(
  {
    text: `const CodeHuddle = 'built with <3';`,
    options: {
      linting: true,
      showGutter: true,
      textSize: false,
      theme: false
    },
    ranges: defaultRange
  }
);

export default function reducer (editorData = initialEditorData, action) {
  let newEditorData = editorData;

  switch (action.type) {
    case SET_TEXT:
      newEditorData = newEditorData.setIn(['text'], action.text);
      break;

    case SET_OPTIONS:
      newEditorData = newEditorData.mergeIn(['options'], action.options);
      break;

    case SET_RANGE:
      const newRange = {};
      newRange[action.id] = action.range;
      newEditorData = newEditorData.mergeIn(['ranges'], newRange);
      break;

    case SET_RANGE_HISTORY:
      newEditorData = newEditorData.setIn(['ranges'], Immutable.fromJS(action.ranges));
      break;

    default: return editorData;

  }

  return newEditorData;
}

/* ------------       DISPATCHERS     ------------------ */

export const parseEvt = (checked, name) => {
  const status = {};
  status[name] = checked;
  return status;
};
