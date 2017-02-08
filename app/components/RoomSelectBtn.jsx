import React from 'react';
import Faker from 'faker';

import RaisedButton from 'material-ui/RaisedButton';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

const roomName = Faker.fake("{{name.prefix}}{{hacker.adjective}}{{hacker.noun}}{{random.word}}{{random.number}}");

const styles = {
  button: {
    margin: 12
  },
  exampleImageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  }
};

export default () => {
	return (
		<div id="join-room-btns">
			<RaisedButton
				label="Go!"
				labelPosition="before"
				secondary={true}
				icon={<ArrowRight />}
				style={styles.button}
				href={ `/interviewRoom/${ roomName }` }
			/>
    </div>
	);
};