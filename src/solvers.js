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
  let count = 0;
  let recur = function(row) {
    for (let i = 0; i < n; i++) {
      board.togglePiece(row, i);
      count++;
      if (!board.hasAnyRooksConflicts()) {
        if (row === n - 1) {
          break;
        } else {
          recur(row + 1);
        }
        if (count === n) {
          break;
        }
      }
      board.togglePiece(row, i);
      count--;
    }
  };
  recur(0);
  solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  if (n === 1) {
    return 1;
  }
  let availableSpaces = Array(n).fill(1).map(a => Array(n).fill(0));

  let recur = function(row) {
    for (let i = 0; i < n; i++) {
      if (availableSpaces[row][i] === 0) {

        availableSpaces[row] = availableSpaces[row].map(function(elem, index, array) {
          return elem + 1;
        });
        availableSpaces = availableSpaces.map(function(elem, index, array) {
          elem[i]++;
          return elem;
        });
        if (row === n - 1) {
          solutionCount++;
        } else {
          recur(row + 1);
        }

        availableSpaces[row] = availableSpaces[row].map(function(elem, index, array) {
          return elem - 1;
        });
        availableSpaces = availableSpaces.map(function(elem, index, array) {
          elem[i]--;
          return elem;
        });
      }
    }
  };

  recur(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  if (n === 0) {
    return [];
  }
  var solution = undefined; //fixme
  let board = new Board({n: n});
  let count = 0;
  let recur = function(row) {
    for (let i = 0; i < n; i++) {
      board.togglePiece(row, i);
      count++;
      if (!board.hasAnyQueensConflicts()) {
        if (row === n - 1) {
          break;
        } else {
          recur(row + 1);
        }
        if (count === n) {
          break;
        }
      }
      board.togglePiece(row, i);
      count--;
    }
  };
  recur(0);
  solution = board.rows();

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0; //fixme
  if (n <= 1) {
    return 1;
  }

  let availableSpaces = Array(n).fill(1).map(a => Array(n).fill(0));

  let recur = function(row) {
    for (let i = 0; i < n; i++) {
      if (availableSpaces[row][i] === 0) {

        availableSpaces[row] = availableSpaces[row].map(function(elem, index, array) {
          return elem + 1;
        });
        availableSpaces = availableSpaces.map(function(elem, index, array) {
          elem[i]++;
          return elem;
        });

        let colIdx = i + 1;
        for (let j = row + 1; j < n && colIdx < n; j++) {
          availableSpaces[j][colIdx]++;
          colIdx++;
        }
        colIdx = i - 1;
        for (let j = row + 1; j < n && colIdx > -1; j++) {
          availableSpaces[j][colIdx]++;
          colIdx--;
        }
        colIdx = i + 1;
        for (let j = row - 1; j > -1 && colIdx < n; j--) {
          availableSpaces[j][colIdx]++;
          colIdx++;
        }
        colIdx = i - 1;
        for (let j = row - 1; j > -1 && colIdx > -1; j--) {
          availableSpaces[j][colIdx]++;
          colIdx--;
        }

        if (row === n - 1) {
          solutionCount++;
        } else {
          recur(row + 1);
        }

        availableSpaces[row] = availableSpaces[row].map(function(elem, index, array) {
          return elem - 1;
        });
        availableSpaces = availableSpaces.map(function(elem, index, array) {
          elem[i]--;
          return elem;
        });

        colIdx = i + 1;
        for (let j = row + 1; j < n && colIdx < n; j++) {
          availableSpaces[j][colIdx]--;
          colIdx++;
        }
        colIdx = i - 1;
        for (let j = row + 1; j < n && colIdx > -1; j++) {
          availableSpaces[j][colIdx]--;
          colIdx--;
        }
        colIdx = i + 1;
        for (let j = row - 1; j > -1 && colIdx < n; j--) {
          availableSpaces[j][colIdx]--;
          colIdx++;
        }
        colIdx = i - 1;
        for (let j = row - 1; j > -1 && colIdx > -1; j--) {
          availableSpaces[j][colIdx]--;
          colIdx--;
        }
      }
    }
  };

  recur(0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
