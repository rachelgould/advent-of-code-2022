import data from "./data.mjs";

class FileTraversal {
  constructor(commands) {
    this.CAPACITY = 70000000;
    this.commandLines = commands.split("\n");
    this.folders = this._listFoldersAndSizes();
  }

  sumFolderSizesSmallerThanMax(maxSize) {
    let sum = 0;
    Object.keys(this.folders).forEach((folder) => {
      if (this.folders[folder] <= maxSize) {
        sum += this.folders[folder];
      }
    });
    return sum;
  }

  smallestFolderGreaterThanSize(minSize) {
    const folderSizes = Object.values(this.folders).sort((a, b) => a - b);
    for (let i = 0; i < folderSizes.length; i++) {
      if (folderSizes[i] >= minSize) return folderSizes[i];
    }
  }

  get totalDiskSpaceUsed() {
    return this.folders["/"];
  }

  get freeDiskSpace() {
    return this.CAPACITY - this.totalDiskSpaceUsed;
  }

  _listFoldersAndSizes() {
    let currentFolderPath = [];
    const folderSizes = {};
    this.commandLines.forEach((line) => {
      const commandParts = line.split(" ");
      if (commandParts[0] === "$") {
        const command = commandParts[1];
        const dest = commandParts[2];
        if (command === "cd") {
          if (dest === "..") {
            currentFolderPath.pop();
          } else if (dest !== "/") {
            currentFolderPath.push(dest);
          } else {
            currentFolderPath = ["/"];
          }
        }
      } else if (commandParts[0] !== "dir") {
        currentFolderPath.forEach((folder, i) => {
          const fullFolderName = currentFolderPath.slice(0, i + 1).join("_");
          if (!folderSizes[fullFolderName]) {
            folderSizes[fullFolderName] = 0;
          }
          folderSizes[fullFolderName] += parseInt(commandParts[0]);
        });
      }
    });
    return folderSizes;
  }
}

const fs = new FileTraversal(data);
const sum = fs.sumFolderSizesSmallerThanMax(100000);

console.log("Part 1 answer: ", sum);

const spaceNeeded = 30000000 - fs.freeDiskSpace;
const smallestFolderSize = fs.smallestFolderGreaterThanSize(spaceNeeded);

console.log("Part 2 answer: ", smallestFolderSize);
