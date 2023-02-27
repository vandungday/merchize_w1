const amqplib = require('amqplib');
const UserRedisService = require('../services/user.redis.service');

const amqp_url_docker = process.env.RABBITMQ_URI;

const subCreate = async () =>{
    try {
        // 1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        // 2. create chanel
        const chanel = await conn.createChannel();


        // 3. create exchange
        const nameExchange = 'user_events'

        await chanel.assertExchange(nameExchange,'fanout', {
            durable: true
        })
        // 4. create queue

        const {queue} =  await chanel.assertQueue('user_created',{
            exclusive: true
        });

        // 5. bingding
            await chanel.bindQueue(queue, nameExchange);

            await chanel.consume(queue,async msg=>{
                const object = JSON.parse(msg.content.toString());
                await UserRedisService.createUser(object)

            },{
                noAck: true
            })  
    } catch (error) {
        console.log(`[ERROR]: ${error.message}`);
    }
}

const subUpdate = async () =>{
    try {
        // 1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        // 2. create chanel
        const chanel = await conn.createChannel();


        // 3. create exchange
        const nameExchange = 'user_events'

        await chanel.assertExchange(nameExchange,'fanout', {
            durable: true
        })
        // 4. create queue

        const {queue} =   await chanel.assertQueue('user_modified',{
            exclusive: true
        });

        // 5. bingding

            await chanel.bindQueue(queue, nameExchange);

            await chanel.consume(queue,async msg=>{
                const object = JSON.parse(msg.content.toString());
                await UserRedisService.updateUserById(object.id, object)
    
            },{
                noAck: true
            })  
    } catch (error) {
        console.log(`[ERROR]: ${error.message}`);
    }
}


const subDelete = async () =>{
    try {
        // 1. create connect
        const conn = await amqplib.connect(amqp_url_docker);
        // 2. create chanel
        const chanel = await conn.createChannel();
        // 3. create exchange
        const nameExchange = 'user_events'
        await chanel.assertExchange(nameExchange,'fanout', {
            durable: true
        })
        // 4. create queue
        const {queue} =   await chanel.assertQueue('user_deleted',{
            exclusive: true
        });
        // 5. bingding
            await chanel.bindQueue(queue, nameExchange);

            await chanel.consume(queue,async msg=>{
                const object = JSON.parse(msg.content.toString());
                await UserRedisService.deleteUserById(object.id)
    
            },{
                noAck: true
            })  

    } catch (error) {
        console.log(`[ERROR]: ${error.message}`);
    }
}

subCreate()
subUpdate()
subDelete()