import amqplib from 'amqplib';

export const connectToRabbitMQ = async () => {
  return amqplib.connect('amqp://localhost');
};
