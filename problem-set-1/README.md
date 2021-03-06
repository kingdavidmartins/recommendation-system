# Problem Set 1 - Recommendation Engine's

## Intro
Finally, we are going to put this all the formula's together to make recommendations. Given a collection of users that rated bands. Let's say I want to
make recommendations for userX. I want apply the appropriate formula to find the nearest neighbor—userZ in this case. I will
then find bands that userZ has rated but userX has not. Also, I will assume that userX
would have rated the bands the same as (or at least very similar to) userZ. For example,
userX has not rated the great band Phoenix. userZ has rated Phoenix a '4' so we will
assume userX is likely to enjoy the band as well. You will be tasked with solving these type problems, which will teach you how to make recommendations.


#### Problem - Test 1
Write a function that returns the Manhattan distance between the following 2 user's
  - Hailey & Veronica
  - Hailey & Jordy

###### Example:
```javascript
  manhattan(users['Hailey'], users['Veronica']) ==> 2.0
  manhattan(users['Hailey'], users['Jordyn']) == > 7.5
```

###### Solution - Test 1
```javascript
  console.log(`Manhattan Distance between Hailey & Veronica ==> ${syncUserDist('Hailey', 'Veronica', 1)}`); // => 2.0
  console.log(`Manhattan Distance between Hailey & Jordyn ==> ${syncUserDist('Hailey', 'Jordyn', 1)}`); // => 7.5
```

#### Problem - Test 2
Write a function that returns an array/set of users with their name and ratings compared
to Hailey sorted by the ratings from least to greatest

###### Example:
```javascript
    computeNearestNeighborManhattan('Hailey', users) => [(2.0, 'Veronica'), (4.0, 'Chan'),(4.0, 'Sam'), (4.5, 'Dan'), (5.0, 'Angelica'), (5.5, 'Bill'), (7.5, 'Jordyn')];
```

###### Solution - Test 2
```javascript
  console.log(`Manhattan Distance of Hailey related to all the other users ${simUserSort('Hailey', users, 1)}`); // => [ [ 'Veronica', '2.000' ], [ 'Chan', '4.000' ], [ 'Sam', '4.000' ], [ 'Dan', '4.500' ], [ 'Angelica', '5.000' ], [ 'Bill', '5.500' ], [ 'Jordyn', '7.500' ] ]
```

#### Problem 1
Write a function that returns recommendations for Hailey. As in artist her nearest neighbor
would recommend to her if they personally knew each other

###### Example:
```javascript
    recommend('Hailey', users) =>  [('Phoenix', 4.0), ('Blues Traveler', 3.0), ('Slightly Stoopid', 2.5)]
```

###### Solution 1
```javascript
  console.log(recommend('Hailey', users, 1)); // => [ [ 'Phoenix', 4 ], [ 'Blues Traveler', 3 ], [ 'Slightly Stoopid', 2.5 ] ]
```

#### Problem 2
Write a function that returns recommendations for Chan. As in artist her nearest
neighbor would recommend to her if they personally knew each other


###### Example:
```javascript
    recommend('Chan', users) => [('The Strokes', 4.0), ('Vampire Weekend', 1.0)]
```

###### Solution 2
```javascript
  console.log(recommend('Chan', users, 1)); // => [ [ 'The Strokes', '4.000' ], [ 'Vampire Weekend', '1.000' ] ]
```

#### Problem 3
Write a function that returns recommendations for Sam. As in artist her nearest
neighbor would recommend to her if they personally knew each other

###### Example:
```javascript
    recommend('Sam', users) => // [ [ 'Deadmau5', '1.000' ] ]
```

###### Solution 3
```javascript
  console.log(recommend('Sam', users, 1)); // => [ [ 'Deadmau5', '1.000' ] ]
```

#### Problem 4
Write a function that returns the Pearson Correlation Coefficient for the following users
  - Angelica and Bill
  - Angelica and Hailey
  - Angelica and Jordyn

###### Example:
```javascript
  pearson(users['Angelica'], users['Bill']) ==> -0.90405349906826993
  pearson(users['Angelica'], users['Hailey']) ==> 0.42008402520840293
  pearson(users['Angelica'], users['Jordyn']) ==> 0.76397486054754316
```

###### Solution 4
```javascript
  console.log(pearson('Angelica', 'Bill')); // ==> -0.9040534990682699
  console.log(pearson('Angelica', 'Hailey')); // ==> 0.42008402520840293
  console.log(pearson('Angelica', 'Jordyn')); // ==> 0.76397486054754316
);
```

# References
[Guide to Data Mining](http://guidetodatamining.com)
