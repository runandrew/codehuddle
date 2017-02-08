// Required libraries
import React from 'react';
import RoomSelectBtn from '../RoomSelectBtn';

// Required files
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import NavigateNext from 'material-ui/svg-icons/image/navigate-next';
import Login from '../Login';
import ArrowDown from 'material-ui/svg-icons/hardware/keyboard-arrow-down';
import ArrowRight from 'material-ui/svg-icons/hardware/keyboard-arrow-right';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { open: false };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleOpen() {
    this.setState({open: true});
  }

  handleClose() {
    this.setState({open: false});
  }
  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />
    ];
    return (
      <div>
        <nav className="row">
          <div className="col-xs-12">
            <div className="right">
              <a href="/" className="text-space-leftRight text-space-upDown">Register Organization</a>
              <a href="/" className="text-space-leftRight text-space-upDown">Interviewer Sign-in</a>
            </div>
          </div>
        </nav>

        <section className="container" id="header">
          <div className="row">
            <div className="col-xs-12 center-content">
              <img className="animated fadeIn" id="header-icon" src="/images/code-outline.svg"/>
              <h1 className="animated fadeIn">Code Huddle</h1>
              <h4 className="animated fadeIn">Technical Interviews Done Right</h4>

              <div>
                <RaisedButton
                  className="animated fadeIn"
                  label="Get Started"
                  labelPosition="before"
                  icon={ <ArrowRight /> }
                  onTouchTap={ this.handleOpen }
                  backgroundColor="#2bbbad"
                  labelColor="white"
                  primary={ true }
                  style={{
                    animationDelay: '1s'
                  }}
                  >
                  <Dialog
                    actions={ actions }
                    modal={ false }
                    style={{ textAlign: 'center' }}
                    contentStyle={{ width: '37%' }}
                    open={ this.state.open }>
                    <h2>Create Random Room</h2>
                    <RoomSelectBtn/>
                    <br/>
                    <hr/>
                    <br/>
                    <h2>Interviewer Login</h2>
                    <Login/>
                  </Dialog>
                </RaisedButton>
              </div>
            </div>
          </div>
        </section>

        <section className="row marg-top" id="hipster">
        </section>

        <section className="row center-content row-padding" id="info">
          <div className="container">
            <div className="col-xs-12 col-lg-6">
              <h2>Ace Code Editor</h2>
              <p>Lorem ipsum dolor sit amet, et nibh nonummy lobortis ultricies, nisl morbi vivamus amet quo, amet ullamcorper lacus maecenas, egestas bibendum elit scelerisque mollis. Tempor est risus sociosqu luctus, turpis fusce facilisi ligula, volutpat ipsum morbi in, erat mauris suspendisse eros ante. Pede purus elit velit ut, ut interdum felis interdum tristique, odio eu ipsum cras, urna est litora in. Dolor sem ipsum amet vivamus, lectus nec fusce porta, felis quis tellus ligula. Augue odio fermentum turpis dignissim, hendrerit posuere libero convallis vel.</p>
            </div>
            <div className="col-xs-12 col-lg-6">
              <h2>Built-In Whiteboard</h2>
              <p>Lorem ipsum dolor sit amet, et nibh nonummy lobortis ultricies, nisl morbi vivamus amet quo, amet ullamcorper lacus maecenas, egestas bibendum elit scelerisque mollis. Tempor est risus sociosqu luctus, turpis fusce facilisi ligula, volutpat ipsum morbi in, erat mauris suspendisse eros ante. Pede purus elit velit ut, ut interdum felis interdum tristique, odio eu ipsum cras, urna est litora in. Dolor sem ipsum amet vivamus, lectus nec fusce porta, felis quis tellus ligula. Augue odio fermentum turpis dignissim, hendrerit posuere libero convallis vel.</p>
            </div>
          </div>
        </section>

        <section className="row marg-top" id="code">
        </section>

        <footer className="row">
          <div className="container">
            © 2017 Copyright Amrom Steinmetz, Amy Paschal, Andrew Garcia, Evan DiGiambattista, Surabhi Nigam
          </div>
        </footer>
      </div>
    );
    
  }
}
