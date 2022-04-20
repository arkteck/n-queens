// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


    /*
            _             _     _
        ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
        / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
        \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
        |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

    */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // get my rows
      var rows = this.rows();
      // access on row
      var currentRow = rows[rowIndex];
      // loop through the row
      for (let piece of currentRow) {
        // conditional to check if a peice exists
        if (piece === 1) {
          return true;
        }
      }


      //  if not found
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      // iterate through rows
      // if hasRowConflictAt return true
      // return true
      let rows = this.rows();
      for (let row of rows) {
        if (row.reduce((a, b) => a + b) > 1) {
          return true;
        }
      }

      // else
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let rows = this.rows();
      for (let row of rows) {
        if (row[colIndex]) {
          return true;
        }
      }
      return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let rows = this.rows();
      for (let i = 0; i < rows[0].length; i++) {
        let sum = 0;
        for (let j = 0; j < rows.length; j++) {
          sum += rows[j][i];
          if (sum > 1) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let rowIndex = 0;
      for (let i = majorDiagonalColumnIndexAtFirstRow; i < rows[0].length; i++) {
        if (rows[rowIndex][i] === 1) {
          return true;
        }
        rowIndex++;
        if (rowIndex > rows.length) {
          break;
        }
      }

      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let rows = this.rows();

      for (let i = 0; i < rows[0].length - 1; i++) {
        let sum = 0;
        let majorDiagonalColumnIndexAtFirstRow = i;
        let rowIndex = 0;
        for (let j = majorDiagonalColumnIndexAtFirstRow; j < rows[0].length; j++) {
          sum += rows[rowIndex][j];
          if (sum > 1) {
            return true;
          }
          rowIndex++;
          if (rowIndex > rows.length) {
            break;
          }
        }
      }

      for (let i = 1; i < rows.length - 1; i++) {
        let sum = 0;
        let majorDiagonalRowIndexAtFirstColumn = i;
        let colIndex = 0;
        for (let j = majorDiagonalRowIndexAtFirstColumn; j < rows.length; j++) {
          sum += rows[j][colIndex];
          if (sum > 1) {
            return true;
          }
          colIndex++;
          if (colIndex > rows[0].length) {
            break;
          }
        }
      }

      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let rows = this.rows();
      let rowIndex = 0;
      for (let i = minorDiagonalColumnIndexAtFirstRow; i > -1; i--) {
        if (rows[rowIndex][i] === 1) {
          return true;
        }
        rowIndex++;
        if (rowIndex > rows.length) {
          break;
        }
      }

      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let rows = this.rows();

      for (let i = 1; i < rows[0].length; i++) {
        let sum = 0;
        let minorDiagonalColumnIndexAtFirstRow = i;
        let rowIndex = 0;
        for (let j = minorDiagonalColumnIndexAtFirstRow; j > -1; j--) {
          sum += rows[rowIndex][j];
          if (sum > 1) {
            return true;
          }
          rowIndex++;
          if (rowIndex > rows.length) {
            break;
          }
        }
      }

      for (let i = 1; i < rows.length - 1; i++) {
        let sum = 0;
        let minorDiagonalRowIndexAtFirstColumn = i;
        let colIndex = rows[0].length - 1;
        for (let j = minorDiagonalRowIndexAtFirstColumn; j < rows.length; j++) {
          sum += rows[j][colIndex];
          if (sum > 1) {
            return true;
          }
          colIndex--;
          if (colIndex < 0) {
            break;
          }
        }
      }

      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
