# Problem Set 1 - Recommendation Engine's

## Intro
Finally, we are going to put this all the formula's together to make recommendations. Given a collection of users that rated bands. Let's say I want to
make recommendations for userX. I want apply the appropriate formula to find the nearest neighbor—userZ in this case. I will
then find bands that userZ has rated but userX has not. Also, I will assume that userX
would have rated the bands the same as (or at least very similar to) userZ. For example,
userX has not rated the great band Phoenix. userZ has rated Phoenix a '4' so we will
assume userX is likely to enjoy the band as well. You will be tasked with solving these type problems, which will teach you how to make recommendations.


Problem
---------

Problem -Test 1
```
Test 1: Write a function that returns the Manhattan distance between the follwoing 2 user's
  - Hailey & Veronica
  - Hailey & Jordyn

Example:
  manhattan(users['Hailey'], users['Veronica']) ==> 2.0
  manhattan(users['Hailey'], users['Jordyn']) == > 7.5
```

Problem -Test 1
```
Test 2: Write a function that returns an array/set of users with their name and ratings compared to Hailey sorted by the ratings from least to greatest

Example:
  computeNearestNeighborManhattan("Hailey", users) =>> [(2.0, ''Veronica'), (4.0, 'Chan'),(4.0, 'Sam'), (4.5, 'Dan'), (5.0, 'Angelica'), (5.5, 'Bill'), (7.5, 'Jordyn')]
```

Solution
---------

Solution - Test 1
```javascript
console.log(
  'Manhattan Distance between Hailey & Veronica ==> '
    + minkowskiDist(
        userRating(syncRatings('Hailey', 'Veronica')[0]),
        userRating(syncRatings('Hailey', 'Veronica')[1]),
        1) // => 2.0
    + '\n'
    +

  'Manhattan Distance between Hailey & Jordyn ==> '
    + minkowskiDist(
        userRating(syncRatings('Hailey', 'Jordyn')[0]),
        userRating(syncRatings('Hailey', 'Jordyn')[1]),
        1) // => 7.5
    + '\n\n'
);
```

Solution - Test 2
```javascript
console.log(
  simUserSort('Hailey', users, 1) // => [ [ 'Veronica', '2.000' ], [ 'Chan', '4.000' ], [ 'Sam', '4.000' ], [ 'Dan', '4.500' ], [ 'Angelica', '5.000' ], [ 'Bill', '5.500' ], [ 'Jordyn', '7.500' ] ]
);
```




# References
[Guide to Data Mining](http://guidetodatamining.com)
