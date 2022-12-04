import data from "./data.mjs";

const dataByElf = data.split("\n\n");
const getElfTotal = (elfData) =>
  elfData
    .split("\n")
    .map((s) => Number(s))
    .reduce((p, n) => p + n, 0);

const getHighestFood = () => {
  let max = 0;
  dataByElf.forEach((elf) => {
    const thisElfTotal = getElfTotal(elf);
    if (thisElfTotal > max) max = thisElfTotal;
  });
  return max;
};

const foodOfTopElves = (topNumber) => {
  const elfTotals = [];
  dataByElf.forEach((elf) => {
    const thisElfTotal = getElfTotal(elf);
    elfTotals.push(thisElfTotal);
  });
  return elfTotals
    .sort((a, b) => b - a)
    .slice(0, topNumber)
    .reduce((p, n) => p + n, 0);
};

// Part 1
const answerOne = getHighestFood();
console.log("Highest food of a single elf: ", answerOne);

// Part 2
const num = 3;
const answerTwo = foodOfTopElves(num);
console.log(`Food of top ${num} elves: ${answerTwo}`);
