const _ = require('lodash');

const user1 = [4.75, 4.5, 5, 4.25, 4];
const user2 = [4, 3, 5, 2, 1];


const pearsonCoeff = (x, y) =>
  // numerator ~ top half
  (
    _.chain(x)
      .map((num, index) => num * y[index])
      .reduce((a, b) => a + b)
      .value()
    - (x.reduce((a, b) => a + b) * y.reduce((a, b) => a + b)) / x.length
  )

  // divide
  /

  // denominator ~ bottom half
  (
    Math.sqrt(
      _.chain(x)
        .map((num) => Math.pow(num, 2))
        .reduce((a, b) => a + b)
        .value()
      - (Math.pow(x.reduce((a, b) => a + b), 2) / x.length)
    )
    * Math.sqrt(
        _.chain(y)
          .map((num) => Math.pow(num, 2))
          .reduce((a, b) => a + b)
          .value()
        - (Math.pow(y.reduce((a, b) => a + b), 2) / y.length)
      )
  )
  .toFixed(3);


console.log(
  pearsonCoeff(user1, user2) // => 1.000
);
