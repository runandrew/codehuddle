import React from 'react';
import {connect} from 'react-redux';
import {Layer, Rect, Stage, Line} from 'react-konva';
import Immutable from 'immutable';


// ----------------Whiteboard Container-------------- //

export class Whiteboard extends React.Component {
  constructor (props) {
    super(props);
    this.drawing = false;
    this.lastPx = this.props.lastDraw.lastPx;
    this.currentPx = this.props.lastDraw.currentPx;
    this.color = this.props.lastDraw.color;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  handleMouseDown (event) {
    this.drawing = true;
    // Update current mouse position
    this.drawing = true;
    this.currentPx.x = event.evt.offsetX;
    this.currentPx.y = event.evt.offsetY;
  }

  handleMouseMove (event) {
    if (!this.drawing) return; // Short circuit if mouse button isn't down
    // Update last and current mouse positions
    this.lastPx = {x: this.currentPx.x, y: this.currentPx.y};
    this.currentPx = {x: event.evt.offsetX, y: event.evt.offsetY};

    // Send dispatch out for new coordinates
    this.props.setCoordinates(this.lastPx, this.currentPx, this.color);
  }

  handleMouseUp () {
    this.drawing = false;
  }

  render () {
    let history = this.props.drawingHistory;
    let show = (history.length !== 0);
    return (
      <Stage width={700} height={700} onContentMouseUp = {this.handleMouseUp}
            onContentMouseDown = {this.handleMouseDown}
            onContentMouseMove = {this.handleMouseMove} >
        <Layer >
          {show && history.map((drawEvent, i) => {
            return (
              <Line stroke = {drawEvent.color}
                key = {i}
                points = {[drawEvent.lastPx.x, drawEvent.lastPx.y,
                  drawEvent.currentPx.x, drawEvent.currentPx.y]}
                strokeWidth = {4}
                lineCap = 'round'
                lineJoin = 'round'
              />
            );
          })
          }
        </Layer>
      </Stage>
    );
  }
}

/* -----------------    CONNECT CONTAINER     ------------------ */

import { setCoordinates, clearHistory } from '../reducers/whiteboard';

const mapStateToProps = (state) => {
  return {
    lastDraw: state.interview.whiteboard.get('lastDraw').toJS(),
    drawingHistory: state.interview.whiteboard.get('drawingHistory').toJS()
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCoordinates: (lastPx, currentPx, color) => {
      dispatch(setCoordinates(lastPx, currentPx, color));
    },
    clearHistory: () => {
      dispatch(clearHistory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
