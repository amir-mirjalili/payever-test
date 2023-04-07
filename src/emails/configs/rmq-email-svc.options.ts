import { ClientOptions, Transport } from '@nestjs/microservices';

export const RmqEmailSvcOptions: ClientOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [`amqp://localhost:5672`],
    queue: 'email',
    persistent: true,
  },
};
