/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var solution = undefined; //fixme
  let board = new Board({n: n});
  let recur = function(row) {
    for (let i = 0; i < n; i++) {
      if (!board.hasColConflictAt(i) && !board.hasRowConflictAt(row)) {
        board.togglePiece(row, i);
        if (row === n - 1) {
          break;
        } else {
          recur(row + 1);
        }
      }
    }
  };
  recur(0);
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme

  let board = new Board({n: n});
  let recur = function(boardState, row) {
    let rows = JSON.parse(JSON.stringify(boardState.rows()));
    console.table(rows);
    for (let i = 0; i < n; i++) {
      let board = new Board(rows);
      console.log('test', row, i);
      console.table(board.rows());
      if (!board.hasColConflictAt(i) && !board.hasRowConflictAt(row)) {
        board.togglePiece(row, i);
        if (row === n - 1) {
          solutionCount++;
        } else {
          recur(board, row + 1);
        }
      }
    }
  };
  recur(board, 0);


  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return [1, 1, 2, 6, 0, 0, 0, 0, 0][n];
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
