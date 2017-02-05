// Required libraries
import React from 'react';

// Required files
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import Menu from 'material-ui/svg-icons/navigation/menu';
// import Refresh from 'material-ui/svg-icons/navigation/refresh';
import Close from 'material-ui/svg-icons/navigation/close';

import Whiteboard from '../Whiteboard';
import Editor from '../Editor';
import InterviewRoomOptions from '../InterviewRoomOptions';
import AlertError from 'material-ui/svg-icons/alert/error';
import Gesture from 'material-ui/svg-icons/content/gesture';


/* -----------------    COMPONENT     ------------------ */

export class InterviewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.iconStyles = {
      marginRight: 24,
      marginTop: 10
    };
    this.state = {
      open: false,
      WBOpen: false
    };
    this.handleTouch = this.handleTouch.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleWBOpen = this.handleWBOpen.bind(this);
    this.handleWBClose = this.handleWBClose.bind(this);
  }

  handleTouch() {
    this.setState({ open: !this.state.open });
  }
  handleClose() {
    this.setState({ open: false });
  }
  handleWBOpen() {
    this.setState({ WBOpen: !this.state.WBOpen });
  }
  handleWBClose() {
    this.setState({ WBOpen: false });
  }
  
  render() {
    return (
      <div id="ir-root" className="animated fadeIn">
        <AppBar
          title={ <a href="/">CodeHuddle</a> }
          iconElementLeft={ <IconButton><Menu onTouchTap={ this.handleTouch }/></IconButton> }
          iconElementRight={ <IconButton><Gesture onTouchTap={ this.handleWBOpen } style={ this.iconStyles }/></IconButton> }/>
        {/* Left Side Drawer */}
        <Drawer open={ this.state.open }
                width={ 200 }
                docked={ false }
                onRequestChange={(open) => this.setState({open})}>
          <IconButton><Close onTouchTap={ this.handleClose }/></IconButton>
          <InterviewRoomOptions/>
        </Drawer>
        {/* Right Side Drawer */}
        <Drawer
          open={ this.state.WBOpen }
          width={ 700 }
          openSecondary={ true }
          docked={ true }>
          <IconButton><Close onTouchTap={ this.handleWBClose }/></IconButton>
          <Whiteboard/>
        </Drawer>
        {/* Page Content */}
        <div id="ir-content">
          <Editor/>
        </div>
    </div>
    );
  }
}

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
