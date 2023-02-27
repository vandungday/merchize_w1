const amqp = require('amqplib');

const connectRabbitMQ = async () => {
  try {
    const connection = await amqp.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();
    console.log(`[RABBITMQ] connected`);

    return { connection, channel };
  } catch (err) {
    console.log('[ERROR RABBITMQ]: ', err);
  }
};

module.exports = connectRabbitMQ
