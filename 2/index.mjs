import data from "./data.mjs";

const rounds = data.split("\n");

// Part 1
function getFinalScore() {
  let score = 0;
  rounds.forEach((round) => {
    const [oMove, yMove] = round.split(" ");
    const shapeScore = {
      X: 1,
      Y: 2,
      Z: 3,
    };
    score += shapeScore[yMove];
    score += getWinnerScore(oMove, yMove);
  });
  return score;
}

function getWinnerScore(oMove, yMove) {
  const scores = {
    A: {
      X: 3,
      Y: 6,
      Z: 0,
    },
    B: {
      X: 0,
      Y: 3,
      Z: 6,
    },
    C: {
      X: 6,
      Y: 0,
      Z: 3,
    },
  };
  return scores[oMove][yMove];
}

console.log("Part 1 Final score: ", getFinalScore());

// Part 2
function getFinalScoreTwo() {
  let score = 0;
  rounds.forEach((round) => {
    const [oMove, outcome] = round.split(" ");
    const outcomeScores = {
      X: 0,
      Y: 3,
      Z: 6,
    };
    score += outcomeScores[outcome];
    score += getMoveScoreByOutcome(oMove, outcome);
  });
  return score;
}

function getMoveScoreByOutcome(oMove, outcome) {
  const scores = {
    A: {
      X: 3,
      Y: 1,
      Z: 2,
    },
    B: {
      X: 1,
      Y: 2,
      Z: 3,
    },
    C: {
      X: 2,
      Y: 3,
      Z: 1,
    },
  };
  return scores[oMove][outcome];
}

console.log("Part 2 Final score: ", getFinalScoreTwo());
