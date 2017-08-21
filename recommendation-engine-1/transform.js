const fs = require('fs');
const _ = require('lodash');

const objify = (obj) => JSON.parse(obj);
const structNewObj = (value) => JSON.parse(JSON.stringify(value));

// reads movieLenRaw100k.js process and writes to movieLenTransform100k.txt
fs.readFile('movieLenRaw100k.js', 'utf8' , (err, data) => {
  let newData = _.chain(Array(671).fill())
    .map((value, index) =>
      structNewObj({
        name: index + 1,
        ratings: []
      }))
    .value();

    // process and push to newData
  _.chain(objify(data))
    .forEach((obj, index) =>
      _.find(newData, {name: obj.userId})
        .ratings
        .push(
          structNewObj({
            movie: obj.movieId,
            number: obj.rating
          })))
    .value()

  // write newData to movieLenTransform100k.txt
  fs.writeFile('movieLenTransform100k.txt', JSON.stringify(newData), (err) =>
    console.log(err ? `Err: ${err}` : `movieLenTransform100k was saved`));
});
