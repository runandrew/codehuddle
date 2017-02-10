// Required libraries
import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import ActionFavorite from 'material-ui/svg-icons/action/favorite';
import ActionFavoriteBorder from 'material-ui/svg-icons/action/favorite-border';
import Visibility from 'material-ui/svg-icons/action/visibility';
import VisibilityOff from 'material-ui/svg-icons/action/visibility-off';
import Toggle from 'material-ui/Toggle';

/* -----------------    COMPONENT     ------------------ */

const styles = {
  block: {
    padding: 20,
    maxWidth: 250
  },
  checkbox: {
    marginBottom: 16
  }
};

export const InterviewRoomOptions = ({ options, setOptions }) => {
  return (
    <form>
      <fieldset>
        <Toggle
          label="Linting / Coloring / Indentation"
          labelPosition="right"
          onToggle={ () => setOptions(options.linting, "linting") }
          toggled={ options.linting }
          />

        <Toggle
          label="Gutter"
          labelPosition="right"
          onToggle={ () => setOptions(options.showGutter, "showGutter") }
          toggled={ options.showGutter }
          />

        <Toggle
          label="Text Size: Small / Large"
          labelPosition="right"
          onToggle={ () => setOptions(options.textSize, "textSize") }
          toggled={ options.textSize }
          />

        <Toggle
          label="Theme: Light / Dark"
          labelPosition="right"
          onToggle={ () => setOptions(options.theme, "theme") }
          toggled={ options.theme }
          />
      </fieldset>
    </form>
  );
};

/* -----------------    CONTAINER     ------------------ */

// Required libraries
import { connect } from 'react-redux';

// Required files
import { setOptions, parseEvt } from '../reducers/editor';

const mapState = (state) => {
  return {
    // options: state.interview.editor.options
    options: state.interview.editor.get('options').toJS()
  };
};

const mapDispatch = (dispatch) => {
  return {
    setOptions: (checked, name) => {
      dispatch(setOptions(parseEvt(!checked, name)));
    }
  };
};

export default connect(mapState, mapDispatch)(InterviewRoomOptions);
