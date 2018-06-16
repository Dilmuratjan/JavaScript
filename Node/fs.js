const fs = require('fs');

// fs.open('films.txt', 'r', (err, fd) => {
//   if (err) throw err;
//   console.log(fd);
//   fs.close(fd, (err) => {
//     if (err) throw err;
//   });
// });

fs.readFile('films.txt', 'utf8', (err, data) => {
  if (err) throw err;
  var list1 = data.replace(/\r/g,'').split('\n')
  console.log(list1, typeof list1);
});