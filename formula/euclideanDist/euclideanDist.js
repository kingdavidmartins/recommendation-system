// case example 1 [2 Dimensional data set]
const hailey = [4, 4];
const veronica = [5, 3];
const jim = [4, 72];
const joe = [23, 2];

const euclideanDist = (user1, user2) =>
  Math.sqrt(
    Math.pow((user1[0] - user2[0]), 2)
    + Math.pow((user1[1] - user2[1]), 2))

console.log(
  euclideanDist(hailey, veronica), // => 1.4142135623730951
  euclideanDist(hailey, jim), // => 68
  euclideanDist(joe, veronica), // => 18.027756377319946
  euclideanDist(jim, joe) // => 72.53275122315436
);
