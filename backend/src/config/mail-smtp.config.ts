import { MailerOptions } from '@nestjs-modules/mailer';

export default<MailerOptions> {
  transport: {
    host: 'smtp-mail.outlook.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_SENDER_PASSWORD,
    },
  },
};
