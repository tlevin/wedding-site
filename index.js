var Express = require('express');

var app = new Express();

var port = process.env.port || 3000;

app.use('/', Express.static('./public'))

app.listen(port, function(error) {
  if (error) {
    console.log('Error starting server');
  } else {
    console.log('Listening on port '+ port);
  }
})
