// Required libraries
import React from 'react';

// Required files
import Whiteboard from '../Whiteboard';
import Editor from '../Editor';
import InterviewRoomOptions from '../InterviewRoomOptions';


/* -----------------    COMPONENT     ------------------ */

export const InterviewRoom = ({ AceEditor, onChange, text }) => {
  return (
    <div id="ir-root" className="animated fadeIn">
      <div className="row">
        <div id="ir-opts-col" className="col s12 l2">
          <InterviewRoomOptions/>
        </div>
        <div id="ir-editor-col" className="col s12 l5">
          <Editor />
        </div>
        <div id="ir-canvas-col" className="col s12 l5">
          <Whiteboard />
        </div>
      </div>
    </div>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

const mapState = (state) => {
  return {
  };
};

const mapDispatch = (dispatch) => {
  return {
  };
};

export default connect(mapState, mapDispatch)(InterviewRoom);
