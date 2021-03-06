const _ = require('lodash');

// case example 1 [N Dimensional data set]
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

// Manhattan distance of set with N Dimensions
const manhattanDist = (user1, user2) =>
  _.chain(user1)
    .map((value, index) =>
      Math.abs(user1[index] - user2[index]))
    .reduce((a, b) => a + b)
    .value()
    .toFixed(3);

// Minkowski distance of set with N Dimensions
const minkowskiDist = (user1, user2, p) =>
  Math
    .pow(
      _.chain(user1)
        .map((value, index) =>
          Math.pow(Math.abs(user1[index] - user2[index]), p))
        .reduce((a, b) => a + b)
        .value(), 1/p)
    .toFixed(3);



// if p in minkowski distance === 1. Then it represents the manhattan distance
// if p in minkowski distance === 2. Then it represents the euclidean distance
console.log(

  // N D pair test with manhattanDist
  minkowskiDist(h, j, 1) === manhattanDist(h, j), // => true ~ [because the both equal the same distance: 7.500]
  minkowskiDist(a, b, 1) === manhattanDist(a, b), // => true ~ [because the both equal the same distance: 330.860]
  minkowskiDist(c, d, 1) === manhattanDist(c, d), // => true ~ [because the both equal the same distance: 1.010]

  // N D pair test with euclideanDist
  minkowskiDist(h, j, 2) === euclideanDist(h, j), // => true ~ [because the both equal the same distance: 4.387]
  minkowskiDist(a, b, 2) === euclideanDist(a, b), // => true ~ [because the both equal the same distance: 141.180]
  minkowskiDist(c, d, 2) === euclideanDist(c, d) // => true ~ [because the both equal the same distance: 1.000]
);
