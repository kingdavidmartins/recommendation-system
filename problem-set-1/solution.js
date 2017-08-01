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

// simUserSort is a function that takes 3 arguments. the 1st is mainUser
// which is user you want to compare to the different set of users. The 2nd is
// the userSet. The 3rd is p which stands for the correlation coefficient which will be passed
// through when using the minkowskiDist() function. It will return an 2 Dimensional with each element represendting an array with 2 elements.
// the 1st element standing for the name of the user from the set.
// the 2nd element standing for the distance from the mainUser from the user ~ (which is represented by the name in the 1st eleent)
// the every element is then sorted from least to greatest which make the 1st element the nearest neighbor
const simUserSort = (mainUser, userSet, p) =>
  _.chain(userSet)
    .filter((obj) => obj.name !== mainUser)
    .map((obj) =>
      [
        obj.name,
        minkowskiDist(
          userRating(syncRatings(mainUser, obj.name)[0]),
          userRating(syncRatings(mainUser, obj.name)[1]),
          p)
      ]
    )
    .value()
    .sort((a, b) => a[1] - b[1]);

// TEST 1
/*
  manhattan(users['Hailey'], users['Veronica']) ==> 2.0
  manhattan(users['Hailey'], users['Jordyn']) == > 7.5
>>> */
console.log(

);
console.log(
  'Manhattan Distance'
);
console.log(
  simUserSort('Hailey', users, 1)
);

console.log(
  '\n\n'
);

console.log(
  'Euclidean Distance'
);
console.log(
  simUserSort('Hailey', users, 2)
);
