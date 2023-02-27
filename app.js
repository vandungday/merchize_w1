const express = require('express');
require('dotenv').config();
const database = require('./connections/database');
const  connectRabbitMQ  = require('./connections/rabbitmq');

connectRabbitMQ();
database();

const port = process.env.PORT || 3030;
const app = express();
const router = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true, limit: '10kb' }));


router(app);
require('./swagger-setup')(app);


app.listen(port, (err) => {
  console.log(`App listening on port ${port}`);
});
