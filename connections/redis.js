const { createClient } = require('redis');

const connectRedis = ()=>{
    const client = createClient({
        url: process.env.REDIS_URI,
      });
      
    client.on('connect', () => console.log('[REDIS] connected'));
    
    client.on('error', (err) => console.log('[ERROR REDIS]', err));
    
    client.connect();

  return client;
}

module.exports = connectRedis;

