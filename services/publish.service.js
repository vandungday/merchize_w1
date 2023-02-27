const connectRabbitMQ = require('../connections/rabbitmq');

exports.createUser = async ({ newUser }) => {
  const { connection, channel } = await connectRabbitMQ();
  const exchange = 'user_events';
  console.log(newUser);
  const key = 'user_created';
  const message = JSON.stringify({
    id: newUser._id,
    username: newUser.username,
    password: newUser.password,
  });

  channel.assertExchange(exchange, 'fanout', { durable: true });
  

  channel.publish(exchange, key, Buffer.from(message));

  console.log(`Sent ${key} event with message: ${message}`);
  setTimeout(function (){
    connection.close();
  },2000)
};

exports.updateUser = async ({ user }) => {
  const { connection, channel } = await connectRabbitMQ();
  const exchange = 'user_events';
  const key = 'user_modified';

  const message = JSON.stringify({
    id: user._id,
    username: user.username,
    password: user.password,
  });

  channel.assertExchange(exchange, 'fanout', { durable: true });

  channel.publish(exchange, key, Buffer.from(message));

  console.log(`Sent ${key} event with message: ${message}`);

  setTimeout(function (){
    connection.close();
  },2000)
};

exports.deleteUser = async ({ user }) => {
  const { connection, channel } = await connectRabbitMQ();
  const exchange = 'user_events';
  const key = 'user_deleted';

  const message = JSON.stringify({
    id: user._id,
  });

  channel.assertExchange(exchange, 'fanout', { durable: true });

  channel.publish(exchange, key, Buffer.from(message));

  console.log(`Sent ${key} event with message: ${message}`);
  setTimeout(function (){
    connection.close();
  },2000)
};
