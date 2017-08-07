const _ = require('lodash');

const Angelica = [3.5, 2, 0, 4.5, 5, 1.5, 2.5, 2];
const Veronica = [3, 0, 0, 5, 4, 2.5, 3, 0];

const cosineSim = (user1, user2) =>
  (
    // numerator ~ top half
    _.chain(user1)
      .map((num, index) => num * user2[index])
      .reduce((a, b) => a + b)
      .value()
    /
    // denominator ~ bottom half
    (
      Math.sqrt(
        _.chain(user1)
          .map((num) => Math.pow(num, 2))
          .reduce((a, b) => a + b)
          .value())
      *
      Math.sqrt(
        _.chain(user2)
          .map((num) => Math.pow(num, 2))
          .reduce((a, b) => a + b)
          .value())
    )
  )
  .toFixed(3);

console.log(
  cosineSim(Angelica, Veronica) // => 0.9246279432210068
);
