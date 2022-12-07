import data from "./data.mjs";

function findMarker(inputString, length) {
  const input = inputString.split("");
  for (let i = 0; i < input.length; i++) {
    if (i + 1 < length) continue;

    const uniqueList = [];
    for (let z = i + 1 - length; z <= i; z++) {
      if (!uniqueList.includes(input[z])) {
        uniqueList.push(input[z]);
      }
    }

    if (uniqueList.length === length) return i + 1;
  }
}

console.log("The start of the sequence is at ", findMarker(data, 4));
console.log("The start of the message is at ", findMarker(data, 14));
