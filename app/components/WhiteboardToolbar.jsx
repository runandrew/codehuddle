// Required libraries
import React from 'react';
import { GithubPicker } from 'react-color';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import Popover from 'material-ui/Popover';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Close from 'material-ui/svg-icons/navigation/close';
import Stop from 'material-ui/svg-icons/av/stop';
import {PALETTE} from './WhiteboardConstants';

/* -----------------    COMPONENT     ------------------ */
//   <IconButton><Close onTouchTap={ this.handleWBClose }/></IconButton>
export class WhiteboardToolbar extends React.Component {
  // need color, strokewidth
  constructor (props) {
    super(props);
    this.state = {
      open: false
    };

    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handlePickerResult = this.handlePickerResult.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
  }

  handleTouchTap (event) {
    // This prevents ghost click.
    event.preventDefault();

    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handlePickerResult (color) {
    this.props.handleColorChange(color);
    this.handleRequestClose();
  }

  handleRequestClose () {
    this.setState({
      open: false
    });
  }

  render () {
    const handleClose = this.props.handleClose;
    const color = this.props.color;
    const handleClear = this.props.handleClear;
    const handleErase = this.props.handleErase;
    const tightStyle = {padding: '0px', border: '0px', margin: '0px'};
    return (
      <Toolbar>
        <ToolbarGroup firstChild={true}>
          <IconButton style={{marginRight: '25px'}}><Close onTouchTap={handleClose}/></IconButton>
          <RaisedButton
            onTouchTap={this.handleTouchTap}
            label="Change Color"
            primary={true}
            style={tightStyle}
          />
          <IconButton>><Stop color={color}/></IconButton>
          <Popover
            open={this.state.open}
            anchorEl={this.state.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'top'}}
            onRequestClose={this.handleRequestClose}
          >
            <GithubPicker
              color={color}
              colors={PALETTE}
              width={PALETTE.length * 25 + 20}
              onChangeComplete={this.handlePickerResult}/>
          </Popover>
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
        </ToolbarGroup>
        <ToolbarGroup>
          <RaisedButton label="Eraser" primary={true} onClick={handleErase}/>
          <RaisedButton label="Clear Board" primary={true} onClick={handleClear}/>
        </ToolbarGroup>
      </Toolbar>
    );
  }
}

/* {PALETTE.map((color, i) => {
          return (
            <RaisedButton
            key = {i}
            label='x'
            labelColor = {color}
            backgroundColor = {color}
            buttonStyle = {buttonStyle}
            onClick = {(event) => {
              console.log('in click handler');
              props.handleChangeColor(event);
            }
            }
            />
          );
        })}*/
