const bcrypt = require('bcryptjs');

var password = "hello";
// bcrypt.genSalt(10, (err, salt)=>{
//
//   console.log(salt);
//   bcrypt.hash(password, salt, (err, hash)=>{
//
//     console.log(hash);
//
//   });
//
// });

var hash = '$2a$10$pCcIlJf1AgulEq0bsksiYewt86/Z8/gwvbAygkKd2aIX9H6a3dv0K';

// bcrypt.compare(password, hash, function(err, res) {
// console.log(err);
//   console.log(res);
// }) ;

var aPromise = new Promise((resolve, reject)=>{
  bcrypt.compare(password, hash, function(err, res) {
    if(res) {
      resolve("hello");
    } else {
      reject();
    }
  });
});
