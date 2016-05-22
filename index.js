const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');

const app = express();
app.set('port', (process.env.PORT || 8081));

app.use(bodyParser.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api', routes);

const server = app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});

module.exports = app;