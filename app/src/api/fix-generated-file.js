var fs = require('fs');

function fix() {

  var fileDir = __dirname+"/api.ts";


  fs.readFile(fileDir, 'utf8', function(err, data) {
    if (err) {
      return console.log(err);
    }
    var result = data.replace(/ClientResponse/g, 'IncomingMessage');

    fs.writeFile(fileDir, result, 'utf8', function(err) {
      if (err) return console.log(err);
      else 
      console.log(fileDir +' successfully fixed');
    });
  });
}

fix();