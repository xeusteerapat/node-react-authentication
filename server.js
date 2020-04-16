const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const couterRoute = require('./routes/counters');
const userRoute = require('./routes/users');

const db = require('./models');

require('./config/passport/passport');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use('/counters', couterRoute);
app.use('/users', userRoute);

db.sequelize.sync({ force: false }).then(() => {
  app.listen(8000, () => {
    console.log('Server listening on port 8000');
  });
});
