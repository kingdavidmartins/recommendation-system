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
const userRating = (usrName) =>
  usrName
    .map((obj) => obj.number);

// syncRatings is a function that take 2 arguments: (userConst, user2)
// userConst: is the consistent user that will be compared with all other users in the set
// user2: is all the different users that will be compared against the consistent user
// syncRatings is a function that compares all ratings of the potential users with N Dimensions
// by filtering the ratings that does not match the comparator
// i.e if { user: john, ratings: [ {artist: a, number: 4}, {artist: b, number: 3} ]}
// and { user: doe, ratings: [ {artist: a, number: 1}]}
// I will only wnat to check the minkowski distance of what they both rated
// which should end up computing the minkowski distance their 2 ratings: [ {artist: a, number: 1}]
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

const simUserSort = (mainUser, userSet, p) =>
  _.chain(userSet)
    .filter((obj) => obj.name !== mainUser)
    .map((obj) =>
      minkowskiDist(
        userRating(syncRatings('Hailey', obj.name)[0]),
        userRating(syncRatings('Hailey', obj.name)[1]),
        1))
    .value()
    .sort((a, b) => a - b);

// logs minkowski distance of all the users in order from least to greatest
console.log(
  simUserSort('Hailey', users, 1)
);
