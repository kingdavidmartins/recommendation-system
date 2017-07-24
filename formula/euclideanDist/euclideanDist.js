const _ = require('lodash');

// case example 1 [2 Dimensional data set]
const hailey = [4, 4];
const veronica = [5, 3];
const jim = [4, 72];
const joe = [23, 2];

// case example 2 [N Dimensional data set]
const h = [4, 1, 4, 4, 1];
const j = [4.5, 4, 5, 4, 4];
const a = [3, 43, 2, 5, 7, 9, 23.7, 27, 9, 7, 1, 6, 9, 53.4];
const b = [63.7, 3, 6, 112.45, 8, 21.5, 7, 5, 1.89, 4, 6, 8, 5, 8];
const c = [3, 5, 7, 89, 4, 8, 5, 9];
const d = [3, 5, 7, 88.99, 4, 8, 6, 9];

// Euclidean distance of set with N Dimensions
const euclideanDist = (user1, user2) =>
  Math
    .sqrt(
      _.chain(user1)
        .map((value, index) =>
          Math.pow((user1[index] - user2[index]), 2))
        .reduce((a, b) => a + b)
        .value())
    .toFixed(3);

console.log(

  // 2 D pair
  euclideanDist(hailey, veronica), // => 1.414
  euclideanDist(hailey, jim), // => 68.000
  euclideanDist(joe, veronica), // => 18.028
  euclideanDist(jim, joe), // => 72.533

  // N D pair
  euclideanDist(h, j), // => 4.387
  euclideanDist(a, b), // => 141.180
  euclideanDist(c, d) // => 1.000
);
