const amqp = require("amqplib");

let channel;

const connectRabbitMQ = async () => {

    const connection = await amqp.connect(
        process.env.RABBITMQ_URL
    );

    channel = await connection.createChannel();

    await channel.assertExchange(
        "movie_exchange",
        "topic",
        {
            durable: true,
        }
    );

    console.log("RabbitMQ Connected");
};

const publishEvent = async (
    routingKey,
    data
) => {

    channel.publish(
        "movie_exchange",
        routingKey,
        Buffer.from(
            JSON.stringify(data)
        )
    );

    console.log(
        `Published Event: ${routingKey}`
    );
};

const consumeEvent = async (
    queue,
    routingKey,
    callback
) => {

    await channel.assertQueue(queue);

    await channel.bindQueue(
        queue,
        "movie_exchange",
        routingKey
    );

    channel.consume(queue, (msg) => {

        if (msg) {

            const data = JSON.parse(
                msg.content.toString()
            );

            callback(data);

            channel.ack(msg);
        }
    });
};

module.exports = {
    connectRabbitMQ,
    publishEvent,
    consumeEvent,
};