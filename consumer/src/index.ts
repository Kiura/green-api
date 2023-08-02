import { connectToRabbitMQ } from './rabbitmq-connection';

(async () => {
  const queueName = 'click-events';

  const rabbitConnection = await connectToRabbitMQ();

  console.log('Successfully connected to RabbitMQ server!');

  const channel = await rabbitConnection.createChannel();

  await channel.assertQueue(queueName, {
    durable: false,
  });
  await channel.prefetch(1);

  await channel.consume(queueName, async (message) => {
    if (!message) {
      console.error('Consumer cancelled by server!');
      return;
    }

    const data = JSON.parse(message.content.toString());

    console.table(data);

    // TODO: process the data

    const someProcessedData = 'some data';

    channel.sendToQueue(message.properties.replyTo, Buffer.from(someProcessedData), {
      correlationId: message.properties.correlationId,
    });

    channel.ack(message);
  });
})();
