import data from "./data.mjs";

const pairs = data.split("\n");

const destructurePair = (pair) =>
  pair.split(",").map((range) => range.split("-").map((s) => Number(s)));

// Part 1

const getNumContainedPairs = () => {
  let numContainedPairs = 0;
  pairs.forEach((pair) => {
    const [[aMin, aMax], [bMin, bMax]] = destructurePair(pair);
    if ((aMin >= bMin && aMax <= bMax) || (bMin >= aMin && bMax <= aMax)) {
      numContainedPairs++;
    }
  });
  return numContainedPairs;
};

console.log("Part 1 answer: ", getNumContainedPairs());

// Part 2

const getNumOverlappingPairs = () => {
  let num = 0;
  pairs.forEach((pair) => {
    const [[aMin, aMax], [bMin, bMax]] = destructurePair(pair);
    if (
      (aMin >= bMin && aMin <= bMax) ||
      (bMin >= aMin && bMin <= aMax) ||
      (aMax >= bMin && aMax <= bMax) ||
      (bMax >= aMin && bMax <= aMax)
    ) {
      num++;
    }
  });
  return num;
};

console.log("Part 2 answer: ", getNumOverlappingPairs());
