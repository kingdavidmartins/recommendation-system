const _ = require('lodash');
const fs = require('fs');
const users = JSON.parse(fs.readFileSync('movieLenTransform100k.txt', 'utf8'));

// function to compute the minkowski distance
const minkowskiDist = (user1, user2, p) =>
  Math
    .pow(
      _.chain(user1)
        .map((value, index) =>
          Math.pow(Math.abs(user1[index] - user2[index]), p))
        .reduce((a, b) => a + b)
        .value(), 1/p)
    .toFixed(3);


// function that maps the user's rating number
const userRating = (usrName) => _.map(usrName, (rating) => rating.number);


// match users ratings
const syncRatings = (userConst, user2) => {
  let evenSync = _.find(users, { name: user2})
      .ratings
      .filter((obj) =>
        _.find(users, { name: userConst})
          .ratings
          .map((cObj) => cObj.movie)
          .indexOf(obj.movie) !== -1);
  return [
    _.find(users, { name: userConst})
      .ratings
      .filter((value) =>
            _.map(evenSync, (mObj) => mObj.movie)
            .indexOf(value.movie) !== -1),
    evenSync
  ];

};


// filter out unrelated ratings then compare the distance
const syncUserDist = (mainUser, passedUserName, p) =>
  minkowskiDist(
    userRating(syncRatings(mainUser, passedUserName)[0]),
    userRating(syncRatings(mainUser, passedUserName)[1]),
    p);


// sort the distance from least to greatest
const simUserSort = (mainUser, userSet, p) =>
  _.chain(userSet)
    .filter((obj) => obj.name !== mainUser && isNaN(syncUserDist(mainUser, obj.name, p)) === false)
    .map((obj) =>
      [
        obj.name,
        syncUserDist(mainUser, obj.name, p)
      ]
    )
    .value()
    .sort((a, b) => a[1] - b[1]);


// filter out the users cannot recommend since the user listened to all the band the mainUser listened to
const getSimNewRatings = (mUser, p) =>
  _.chain(simUserSort(mUser, users, p)
    .map((value) => value[0]))
    .filter((possibleUser) =>
      _.find(users, {name: possibleUser})
        .ratings
        .map((obj) => obj.movie)
        .filter((artist) =>
          _.find(users, {name: mUser})
            .ratings
            .map((mainObj) => mainObj.movie)
            .indexOf(artist) === -1)
        .length > 0)
    .value()[0];


const pearsonCoeff = (x, y) =>
  (
    _.chain(x)
      .map((num, index) => num * y[index])
      .reduce((a, b) => a + b)
      .value()
    - (x.reduce((a, b) => a + b) * y.reduce((a, b) => a + b)) / x.length)
    /
    (
      Math.sqrt(
        _.chain(x)
          .map((num) => Math.pow(num, 2))
          .reduce((a, b) => a + b)
          .value()
        - (Math.pow(x.reduce((a, b) => a + b), 2) / x.length))
      * Math.sqrt(
          _.chain(y)
            .map((num) => Math.pow(num, 2))
            .reduce((a, b) => a + b)
            .value()
          - (Math.pow(y.reduce((a, b) => a + b), 2) / y.length))
      );


const pearson = (user1, user2) =>
  pearsonCoeff(
    userRating(syncRatings(user1, user2)[0]),
    userRating(syncRatings(user1, user2)[1])
  );


// recommend artist the user never listened to based on the nearest neighbor likes sorted from highest rating to lowesrt
const recommend = (mUser, userSet, p) =>
_.find(userSet, {name: getSimNewRatings(mUser, p)})
  .ratings
  .filter((obj) =>
    _.find(userSet, {name: mUser})
      .ratings
      .map((mainObj) => mainObj.movie)
      .indexOf(obj.movie) === -1)
  .map((obj) => [obj.movie, obj.number.toFixed(3)])
  .sort((a, b) => b[1] - a[1]);

console.log(
  recommend(13, users, 2)
);
