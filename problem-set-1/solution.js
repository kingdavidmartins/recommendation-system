const _ = require('lodash');
const users = require('./users');

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
const syncRatings = (userConst, user2) =>
  [
    _.find(users, { name: userConst})
      .ratings
      .filter((value) =>
        _.find(users, { name: user2})
          .ratings
          .filter((obj) =>
            _.find(users, { name: userConst})
              .ratings
              .map((cObj) => cObj.artist)
              .indexOf(obj.artist) !== -1)
          .map((mObj) => mObj.artist)
          .indexOf(value.artist) !== -1),
    _.find(users, { name: user2})
      .ratings
      .filter((obj) =>
        _.find(users, { name: userConst})
          .ratings
          .map((cObj) => cObj.artist)
          .indexOf(obj.artist) !== -1)
  ];

// filter out unrelated ratings then compare the distance
const syncUserDist = (mainUser, passedUserName, p) =>
  minkowskiDist(
    userRating(syncRatings(mainUser, passedUserName)[0]),
    userRating(syncRatings(mainUser, passedUserName)[1]),
    p);

// sort the distance from least to greatest
const simUserSort = (mainUser, userSet, p) =>
  _.chain(userSet)
    .filter((obj) => obj.name !== mainUser)
    .map((obj) =>
      [
        obj.name,
        syncUserDist(mainUser, obj.name, p)
      ]
    )
    .value()
    .sort((a, b) => a[1] - b[1]);

// filter out the users cannot recommend since the user listened to all the band the mainUser listened it to
const getSimNewRatings = (mUser) =>
  _.chain(
    simUserSort(mUser, users, 1)
      .map((value) => value[0]))
    .filter((possibleUser) =>
      _.find(users, {name: possibleUser})
        .ratings
        .map((obj) => obj.artist)
        .filter((artist) =>
          _.find(users, {name: mUser})
            .ratings
            .map((mainObj) => mainObj.artist)
            .indexOf(artist) === -1)
        .length > 0)
    .value()[0];

// recommend artist the user never listened to based on the nearest neighbor likes
const recommend = (mUser, userSet) =>
_.find(userSet, {name: getSimNewRatings(mUser)})
  .ratings
  .filter((obj) =>
    _.find(userSet, {name: mUser})
      .ratings
      .map((mainObj) => mainObj.artist)
      .indexOf(obj.artist) === -1)
  .map((obj) => [obj.artist, obj.number.toFixed(3)])
  .sort((a, b) => b[1] - a[1]);

/*
  Problem 2: Write a function that returns recommendations for Chan. As in artist her nearest neighbor would recommend to her if they personally knew each other

  Example:

    recommend('Chan', users) =>  [ [ 'The Strokes', '4.000' ], [ 'Vampire Weekend', '1.000' ] ]
*/

// Problem 2 - Solution
console.log(
  recommend('Chan', users) // => [ [ 'The Strokes', '4.000' ], [ 'Vampire Weekend', '1.000' ] ]
);
