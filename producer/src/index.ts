import express from 'express';
import dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';
import { Connection } from 'amqplib';
import { connectToRabbitMQ } from './rabbitmq-connection';

dotenv.config();

let rabbitConnection: Connection;
const queueName = 'click-events';

const HOST = process.env.HOST || 'http://localhost';
const PORT = parseInt(process.env.PORT || '4500');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  return res.json({ success: true });
});

app.post('/click', async (req, res) => {
  const { clickInfo } = req.body;

  const correlationId = uuidv4();

  const data = {
    clickInfo,
    correlationId,
  };

  const channel = await rabbitConnection.createChannel();

  const q = await channel.assertQueue('', {
    exclusive: true,
  });

  channel.sendToQueue(queueName, Buffer.from(JSON.stringify(data)), {
    correlationId,
    replyTo: q.queue,
  });

  await channel.consume(
    q.queue,
    async (message) => {
      if (!message || message.properties.correlationId != correlationId) {
        return;
      }

      return res.json({ message: message.content.toString() });
    },
    {
      noAck: true,
    },
  );
});

app.listen(PORT, async () => {
  rabbitConnection = await connectToRabbitMQ();

  console.log(`Application started on URL ${HOST}:${PORT}`);
});
