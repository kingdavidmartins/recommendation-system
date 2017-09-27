const _ = require('lodash');
const users = require('./users');

const adjustedCosineSim = (userSet) => {
  let average = userSet
                  .map(usr =>
                    usr
                      .ratings
                      .map(rating => rating.number)
                      .reduce((a, b) => a + b))
                  .map((sum, index) => sum/userSet[index].ratings.length);

  let formatUsrSet = userSet
                      .map((user, index) =>
                        JSON.parse(
                          JSON.stringify({
                            name: user.name,
                            averRating: average[index],
                            ratings: user.ratings
                          })
                        ));

  let allUniqueNames = [];

  formatUsrSet
    .forEach(user =>
      user
        .ratings
        .forEach(rating =>
          (allUniqueNames.indexOf(rating.artist) === -1)
            ? allUniqueNames.push(rating.artist)
            : null ));



  return allUniqueNames;
}


console.log(adjustedCosineSim(users));
