import React, { Component } from "react";
import Cell from "./Cell";
import './Board.css';

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

  createBoard() {
    let board = [];
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

  flipCellsAround(coord) {
    let { ncols, nrows } = this.props;
    let newBoard = this.state.board;
    let [x, y] = coord.split("-").map(Number);
    let booleanBank = [];

    function flipCell(x, y) {
      // if this coord is actually on board, flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        newBoard[y][x] = !newBoard[y][x];
      }
    }

    flipCell(y, x);
    flipCell(y - 1, x);
    flipCell(y + 1, x);
    flipCell(y, x - 1);
    flipCell(y, x + 1);

    for (let z = 0; z < newBoard.length; z++) {
      for (let r of newBoard[z]) {
        booleanBank.push(r);
      }
    }
    if (!booleanBank.includes(true)) this.setState({ hasWon: true });
    this.setState({ board: newBoard });
  }

  render() {
    let tableContent = [];
    let row = [];
    for (let y = 0; y < this.props.nrows; y++) {
      for (let x = 0; x < this.props.ncols; x++) {
        row.push(<Cell key={`${x}-${y}`} isLit={!this.state.board[x][y]} flipCellsAround={() => this.flipCellsAround(`${x}-${y}`)} />);
      }
      tableContent.push(<tr key={y}>{row}</tr>);
      row = [];
    }

    if (this.state.hasWon) tableContent = <tr><td><div className="container"><h1 className="flux">YOU</h1><h1 className="neon">WIN!</h1></div></td></tr>

    return (
      <div className="Board">
        <div className="container">
          <div className="neon">Lights </div>
          <div className="flux">Out </div>
        </div>
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
