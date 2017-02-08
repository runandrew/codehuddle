import React from 'react';
import {connect} from 'react-redux';
import Konva from 'react-Konva';
import Immutable from 'immutable';
import {WhiteboardToolbar} from './WhiteboardToolbar';
import {DEFAULT_STROKE_SIZE, ERASER_STROKE_SIZE, BOARD_COLOR} from './WhiteboardConstants';

// ------------------------ Whiteboard Dumb Component ------------------------ //
export const Whiteboard = (props) => {
  let history = props.history;
  let show = (history.length !== 0);
  return (
      <Konva.Stage width={700} height={700} onContentMouseUp = {props.handleMouseUp}
            onContentMouseDown = {props.handleMouseDown}
            onContentMouseMove = {props.handleMouseMove} >
        <Konva.Layer >
           <Konva.Group>
            {show && history.map((drawEvent, i) => {
              return (
                <Konva.Line stroke = {drawEvent.color}
                  key = {i}
                  points = {[drawEvent.lastPx.x, drawEvent.lastPx.y,
                    drawEvent.currentPx.x, drawEvent.currentPx.y]}
                  strokeWidth = {drawEvent.strokeWidth}
                  lineCap = 'round'
                  lineJoin = 'round'
                />
              );
            })}
          </Konva.Group>
        </Konva.Layer>
      </Konva.Stage>
  );
};

// ------------------------ Whiteboard Container ------------------------ //
export class WhiteboardContainer extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      drawing: this.props.drawing,
      lastX: this.props.lastDraw.lastPx.x,
      lastY: this.props.lastDraw.lastPx.y,
      currentX: this.props.lastDraw.currentPx.x,
      currentY: this.props.lastDraw.currentPx.y,
      color: this.props.lastDraw.color,
      strokeWidth: this.props.lastDraw.strokeWidth
    };

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleErase = this.handleErase.bind(this);
  }

  handleMouseDown (event) {
    this.setState({
      drawing: true,
      currentX: event.evt.offsetX,
      currentY: event.evt.offsetY
    });
  }

  handleColorChange (color) {
    // Update current mouse position
    this.setState({
      color: color.hex,
      strokeWidth: DEFAULT_STROKE_SIZE
    });
  }

  handleClear () {
    this.props.clearHistory();
  }

  handleErase () {
    this.setState({
      color: BOARD_COLOR,
      strokeWidth: ERASER_STROKE_SIZE
    });
  }

  handleMouseMove (event) {
    if (!this.state.drawing) return; // Short circuit if mouse button isn't down
    // Update last and current mouse positions
    this.setState({
      lastX: this.state.currentX,
      lastY: this.state.currentY,
      currentX: event.evt.offsetX,
      currentY: event.evt.offsetY
    });

    // Send dispatch out for new coordinates (end of stroke)
    this.props.setCoordinates(
      {x: this.state.lastX, y: this.state.lastY},
      {x: this.state.currentX, y: this.state.currentY},
      this.state.color,
      this.state.strokeWidth
      );
  }

  handleMouseUp () {
    this.setState({drawing: false});
  }

  render () {
    return (
      <div>
        <WhiteboardToolbar
          color = {this.state.color}
          handleClose = {this.props.handleClose}
          handleColorChange = {this.handleColorChange}
          handleClear = {this.handleClear}
          handleErase = {this.handleErase}
        />
        <Whiteboard
          history = {this.props.drawingHistory}
          handleMouseUp = {this.handleMouseUp}
          handleMouseDown = {this.handleMouseDown}
          handleMouseMove = {this.handleMouseMove}
        />
      </div>
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { setCoordinates, clearHistory } from '../reducers/whiteboard';

const mapStateToProps = (state, ownProps) => {
  return {
    lastDraw: state.interview.whiteboard.get('lastDraw').toJS(),
    drawingHistory: state.interview.whiteboard.get('drawingHistory').toJS(),
    handleClose: ownProps.handleClose
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCoordinates: (lastPx, currentPx, color, strokeWidth) => {
      dispatch(setCoordinates(lastPx, currentPx, color, strokeWidth));
    },
    clearHistory: () => {
      dispatch(clearHistory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WhiteboardContainer);
