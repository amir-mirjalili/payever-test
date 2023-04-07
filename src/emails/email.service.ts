import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientRMQ } from '@nestjs/microservices';
import { RmqEmailSvcOptions } from './configs/rmq-email-svc.options';

@Injectable()
export class EmailService implements OnModuleInit {
  @Client(RmqEmailSvcOptions)
  private readonly emailClient: ClientRMQ;

  async onModuleInit() {
    await this.emailClient
      .connect()
      .then(() => {
        console.log('slack notified!');
      })
      .catch((er) => {
        console.log('err in slack', er);
      });
  }
  async send(email: string, userName: string) {
    try {
      this.emailClient.emit('send-email', {
        email,
        userName,
      });
      console.log(`email sent to ${email}`);
    } catch (e) {
      console.log(e);
    }
  }
}
