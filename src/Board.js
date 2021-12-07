import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {

  static defaultProps = {
    nrows: 5,
    ncols: 5
  }

  constructor(props) {
    super(props);
    this.state = { hasWon: false, board: this.createBoard() }
    // TODO: set initial state
    this.createBoard = this.createBoard.bind(this);
    this.randomBool = this.randomBool.bind(this);
    this.flipCellsAround = this.flipCellsAround.bind(this);
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    let board = [];
    // TODO: create array-of-arrays of true/false values
    for (let i = 0; i < this.props.nrows; i++) {
      let row = [];
      for (let j = 0; j < this.props.ncols; j++) {
        row.push(this.randomBool());
      }
      board.push(row);
    }
    console.log(board);
    return board
  }

  randomBool() {
    let val = Math.random();
    if (val > 0.3) return true
    else return false;
  }
  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let newBoard = this.state.board;
    let [x, y] = coord.split("-").map(Number);

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      console.log("INSIDE");
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x);

    // TODO: flip this cell and the cells around it

    // win when every cell is turned off
    // TODO: determine is the game has been won

    // this.setState({ board, hasWon });
    this.setState({ board: newBoard });
  }


  /** Render game board or winning message. */

  render() {
    let tableContent = [];
    let row = [];
    for (let y = 0; y < this.props.nrows; y++) {
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(<Cell key={`${x}-${y}`} isLit={this.state.board[x][y]} flipCellsAround={() => this.flipCellsAround(`${x}-${y}`)} />);
      }
      tableContent.push(<tr key={y}>{row}</tr>);
      row = [];
    }

    return (
      <div className="Board">
        <h1>LIGHTS OUT</h1>
        <table>
          <tbody>
            {tableContent}
          </tbody>
        </table>
      </div>
    )
  }
}


export default Board;
