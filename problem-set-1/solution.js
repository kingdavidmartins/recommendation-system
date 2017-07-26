const users = require('./users');

// Basic Hello world for all the users lol
console.log(
  users.map(x => `Hello ${x.name}`)
);
