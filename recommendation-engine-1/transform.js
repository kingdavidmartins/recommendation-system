const fs = require('fs');
const _ = require('lodash');

const objify = (obj) => JSON.parse(obj);
const structNewObj = (value) => JSON.parse(JSON.stringify(value));


// reads movieLenRaw100k.js process and writes to movieLenTransform100k.txt
fs.readFile('movieLenRaw100k.js', 'utf8', (err, data) => {

  // grabs the last userId which represents the total amount of users the create array of user
  let totalUser = objify(data)[objify(data).length - 1].userId;

  let data100k = _.chain(Array(totalUser).fill())
    .map((value, index) =>
      structNewObj({
        name: index + 1,
        ratings: []
      }))
    .value();

    // process and push to data100k
  _.chain(objify(data))
    .forEach((obj, index) =>
      _.find(data100k, {name: obj.userId})
        .ratings
        .push(
          structNewObj({
            movie: obj.movieId,
            number: obj.rating
          })))
    .value()

  // write data100k to movieLenTransform100k.txt
  fs.writeFile('movieLenTransform100k.txt', JSON.stringify(data100k), (err) =>
    console.log(err ? `Err: ${err}` : `movieLenTransform100k was saved`));
});


// reads movieTitleRaw100k.js process and writes to movieTitleTransform100k.txt
fs.readFile('movieTitleRaw100k.js', 'utf8', (err, data) => {

  // transform movieTitleRaw100k to a obj with just movieId & name
  let movieTitleData = _.chain(objify(data))
    .map((obj) =>
      structNewObj({
        movieId: obj.movieId,
        name: obj.title
      }))
    .value();

  // write movieTitleData to movieTitleTransform100k.txt
  fs.writeFile('movieTitleTransform100k.txt', JSON.stringify(movieTitleData), (err) =>
    console.log(err ? `Err: ${err}` : `movieTitleTransform100k was saved`));
});


// reads movieLenRaw20M.js process and writes to movieLenTransform20M.txt
fs.readFile('movieLenRaw20M.js', 'utf8', (err, data) => {

  // grabs the last userId which represents the total amount of users the create array of user
  let totalUser = objify(data)[objify(data).length - 1].userId;

  let data20M = _.chain(Array(totalUser).fill())
    .map((value, index) =>
      structNewObj({
        name: index + 1,
        ratings: []
      }))
    .value();

    // process and push to data20M
  _.chain(objify(data))
    .forEach((obj, index) =>
      _.find(data20M, {name: obj.userId})
        .ratings
        .push(
          structNewObj({
            movie: obj.movieId,
            number: obj.rating
          })))
    .value()

  // write data20M to movieLenTransform20M.txt
  fs.writeFile('movieLenTransform20M.txt', JSON.stringify(data20M), (err) =>
    console.log(err ? `Err: ${err}` : `movieLenTransform20M was saved`));
});



// reads movieLenRaw26M.js process and writes to movieLenTransform26M.txt
fs.readFile('movieLenRaw26M.js', 'utf8' , (err, data) => {

  // grabs the last userId which represents the total amount of users the create array of user
  let totalUser = objify(data)[objify(data).length - 1].userId;

  let data26M = _.chain(Array(totalUser).fill())
    .map((value, index) =>
      structNewObj({
        name: index + 1,
        ratings: []
      }))
    .value();

    // process and push to data26M
  _.chain(objify(data))
    .forEach((obj, index) =>
      _.find(data26M, {name: obj.userId})
        .ratings
        .push(
          structNewObj({
            movie: obj.movieId,
            number: obj.rating
          })))
    .value()

  // write data26M to movieLenTransform26M.txt
  fs.writeFile('movieLenTransform26M.txt', JSON.stringify(data26M), (err) =>
    console.log(err ? `Err: ${err}` : `movieLenTransform26M was saved`));
});
