import data from "./data.mjs";

const [rawStacks, moves] = data.split("\n\n");

class supplyStacks {
  constructor(stacks, moves) {
    this.unformattedStacks = stacks;
    this.moves = moves;
    this._setRotatedStacks();
  }

  _setRotatedStacks() {
    const colWidth = 4;
    const rotatedStack = [];
    const rows = this.unformattedStacks.split("\n");

    for (let z = rows.length - 2; z >= 0; z--) {
      const row = rows[z];
      let thisCol = 9;
      for (let i = row.length - 1; i >= 0; i -= colWidth) {
        if (!Array.isArray(rotatedStack[thisCol])) {
          rotatedStack[thisCol] = [];
        }

        const thisCell = row[i - 1];
        if (thisCell !== " ") rotatedStack[thisCol].push(thisCell);
        thisCol--;
        if (thisCol === 0) thisCol = 9;
      }
    }

    this.stacks = rotatedStack;
  }

  processMoves(moveWholeGroup) {
    const movesArr = this.moves.split("\n").map((move) => {
      const [moveStmt, fromStmt] = move.split(" from ");
      const [origin, destination] = fromStmt.split(" to ");
      return {
        numCrates: moveStmt.replace("move ", ""),
        origin,
        destination,
      };
    });
    if (!moveWholeGroup) {
      movesArr.forEach(({ numCrates, origin, destination }) => {
        let cratesRemaining = Number(numCrates);
        while (cratesRemaining > 0) {
          const crate = this.stacks[origin].pop();
          this.stacks[destination].push(crate);
          cratesRemaining--;
        }
      });
    } else {
      movesArr.forEach(({ numCrates, origin, destination }) => {
        const cratesToMove = this.stacks[origin].splice(
          this.stacks[origin].length - Number(numCrates)
        );
        this.stacks[destination].push(...cratesToMove);
      });
    }
  }

  get firstRow() {
    const firstRow = [];
    for (let i = 1; i < this.stacks.length; i++) {
      firstRow.push(this.stacks[i][this.stacks[i].length - 1]);
    }
    return firstRow.join("");
  }
}

// Part 1

const stacks = new supplyStacks(rawStacks, moves);
stacks.processMoves();
const firstRow = stacks.firstRow;

console.log("First row contents for part 1: ", firstRow);

// Part 2

const stacksPartTwo = new supplyStacks(rawStacks, moves);
stacksPartTwo.processMoves(true);
const firstRowPartTwo = stacksPartTwo.firstRow;

console.log("First row contents for part 2: ", firstRowPartTwo);
