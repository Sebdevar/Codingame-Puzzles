const Directions = {
  'U': [0, -1],
  'D': [0, 1],
  'L': [-1, 0],
  'R': [1, 0],
  'UR': [1, -1],
  'DR': [1, 1],
  'UL': [-1, -1],
  'DL': [-1, 1],
};

const searchLimits = {
  minX: 0,
  maxX: 0,
  minY: 0,
  maxY: 0,
}

let input = readline().split(' ');

searchLimits.maxX = parseInt(input[0]) - 1; // width of the building.
searchLimits.maxY = parseInt(input[1]) - 1; // height of the building.
parseInt(readline()); // maximum number of turns before game over.
input = readline().split(' ');
let currentX = parseInt(input[0]);
let currentY = parseInt(input[1]);

const getNextX = direction => {
  switch(Directions[direction][0]) {
    case 0:
      searchLimits.minX = searchLimits.maxX = currentX
      return currentX
    case 1:
      searchLimits.minX = currentX
      return Math.ceil((searchLimits.maxX - currentX) / 2) + currentX
    case -1:
      searchLimits.maxX = currentX
      return Math.floor((currentX - searchLimits.minX) / 2) + searchLimits.minX
    default:
      return 0
  }
}

const getNextY = direction => {
  switch(Directions[direction][1]) {
    case 0:
      searchLimits.minY = searchLimits.maxY = currentY
      return currentY
    case 1: {
      searchLimits.minY = currentY
      return Math.ceil((searchLimits.maxY - currentY) / 2) + currentY
    }
    case -1:
      searchLimits.maxY = currentY
      return Math.floor((currentY - searchLimits.minY) / 2) + searchLimits.minY
    default:
      return 0
  }
}

// game loop
while (true) {
  const bombDirection = readline(); // the direction of the bombs from batman's current location (U, UR, R, DR, D, DL, L or UL)
  currentX = getNextX(bombDirection)
  currentY = getNextY(bombDirection)
  console.log(currentX, currentY)
}
