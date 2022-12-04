import data from "./data.mjs";

const packs = data.split("\n");

const alphabetArr = "abcdefghijklmnopqrstuvwxyz".split("");
const priorities = alphabetArr.concat(alphabetArr.map((l) => l.toUpperCase()));

// Part 1

const getPrioritySum = () => {
  let prioritySum = 0;
  packs.forEach((pack) => {
    const halfIndex = Math.min(pack.length / 2);
    const packArr = pack.split("");
    for (let i = 0; i < halfIndex; i++) {
      if (packArr.includes(packArr[i], halfIndex)) {
        prioritySum += priorities.indexOf(packArr[i]) + 1;
        break;
      }
    }
  });
  return prioritySum;
};

console.log("Priority sum is ", getPrioritySum());

// Part 2

const getGroupedPrioritySum = () => {
  let prioritySum = 0;
  for (let i = 0; i < packs.length; i += 3) {
    const pack = packs[i].split("");
    if (packs[i + 1] && packs[i + 2]) {
      for (let z = 0; z < pack.length; z++) {
        if (packs[i + 1].includes(pack[z]) && packs[i + 2].includes(pack[z])) {
          prioritySum += priorities.indexOf(pack[z]) + 1;
          break;
        }
      }
    }
  }
  return prioritySum;
};

console.log("Part 2 answer:", getGroupedPrioritySum());
