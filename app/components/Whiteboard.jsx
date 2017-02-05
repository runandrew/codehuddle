import React from 'react';
import {connect} from 'react-redux';
//import {Layer, Rect, Stage, Line, Group, Image} from 'react-konva';
import Konva from 'react-Konva';
import Immutable from 'immutable';

const DEFAULT_STROKE_SIZE = 4;


// ----------------Whiteboard Container-------------- //

export class Whiteboard extends React.Component {
  constructor (props) {
    super(props);
    this.drawing = false;
    this.lastPx = this.props.lastDraw.lastPx;
    this.currentPx = this.props.lastDraw.currentPx;
    this.color = this.props.lastDraw.color;
    this.strokeWidth = this.props.lastDraw.strokeWidth;

    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleColorChange = this.handleColorChange.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleErase = this.handleErase.bind(this);
  }

  handleMouseDown (event) {
    this.drawing = true;
    document.body.style.cursor = 'pointer';
    // Update current mouse position
    this.drawing = true;
    this.currentPx.x = event.evt.offsetX;
    this.currentPx.y = event.evt.offsetY;
  }

  handleColorChange (event) {
    //this.drawing = true;
    // Update current mouse position
    this.color = event.target.attrs.fill;
    this.strokeWidth = DEFAULT_STROKE_SIZE;
  }

  handleClear () {
    this.props.clearHistory();
  }

  handleErase () {
    this.color = "white";
    this.strokeWidth = 10;
  }

  handleMouseMove (event) {
    if (!this.drawing) return; // Short circuit if mouse button isn't down
    // Update last and current mouse positions
    //document.body.style.cursor = 'pointer';
    this.lastPx = {x: this.currentPx.x, y: this.currentPx.y};
    this.currentPx = {x: event.evt.offsetX, y: event.evt.offsetY};

    // Send dispatch out for new coordinates
    this.props.setCoordinates(this.lastPx, this.currentPx, this.color, this.strokeWidth);
  }

  handleMouseUp () {
    this.drawing = false;
    document.body.style.cursor = 'default';
  }

  render () {
    let history = this.props.drawingHistory;
    let show = (history.length !== 0);
    return (
      <Konva.Stage width={700} height={700} onContentMouseUp = {this.handleMouseUp}
            onContentMouseDown = {this.handleMouseDown}
            onContentMouseMove = {this.handleMouseMove} >
        <Konva.Layer >
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
          })
          }
          <Konva.Group>
                <Konva.Rect
                    ref="rect"
                    x={0}
                    y={0}
                    width="30"
                    height="30"
                    fill="green"
                    onClick={this.handleColorChange}
                />
                <Konva.Rect
                    ref="rect"
                    x={30}
                    y={0}
                    width="30"
                    height="30"
                    fill="red"
                    onClick={this.handleColorChange}
                />
                <Konva.Rect
                    ref="rect"
                    x={0}
                    y={30}
                    width="30"
                    height="30"
                    fill="blue"
                    onClick={this.handleColorChange}
                />
                <Konva.Rect
                    ref="rect"
                    x={30}
                    y={30}
                    width="30"
                    height="30"
                    fill="purple"
                    onClick={this.handleColorChange}
                />
                <Konva.Rect
                    ref="rect"
                    x={0}
                    y={60}
                    width="30"
                    height="30"
                    fill="black"
                    onClick={this.handleColorChange}
                />
                <Konva.Rect
                    ref="rect"
                    x={30}
                    y={60}
                    width="30"
                    height="30"
                    fill="yellow"
                    onClick={this.handleColorChange}
                />
                <Konva.Text
                    ref="rect"
                    x={30}
                    y={90}
                    width="30"
                    height="10"
                    text="Clear"
                    fontSize={12}
                    fontFamily="Calibri"
                    onClick={this.handleClear}
                />
                <Konva.Text
                    ref="rect"
                    x={0}
                    y={90}
                    width="30"
                    height="10"
                    text="Erase"
                    fontSize={12}
                    fontFamily="Calibri"
                    onClick={this.handleErase}
                />
          </Konva.Group>
        </Konva.Layer>
      </Konva.Stage>

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
    setCoordinates: (lastPx, currentPx, color, strokeWidth) => {
      dispatch(setCoordinates(lastPx, currentPx, color, strokeWidth));
    },
    clearHistory: () => {
      dispatch(clearHistory());
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Whiteboard);
