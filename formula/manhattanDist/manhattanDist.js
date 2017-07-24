// case example 1 [2 Dimensional data set]
const hailey = [4, 4];
const veronica = [5, 3];
const jim = [4, 72];
const joe = [23, 2];

const manhattanDist = (user1, user2) =>
  Math.abs(user1[0] - user2[0])
  + Math.abs(user1[1] - user2[1])

console.log(
  manhattanDist(hailey, veronica), // => 2
  manhattanDist(hailey, jim), // => 68
  manhattanDist(joe, veronica), // => 19
  manhattanDist(jim, joe) // => 89
  );
