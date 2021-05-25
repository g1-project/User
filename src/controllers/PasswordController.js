import User from '../models/User.js';
import crypto from 'crypto';
import RecoverPassword from '../models/RecoverPassword.js';
import mailer from '../modules/mailer.js';
import bcrypt from 'bcrypt';

const saltRounds = process.env.SALT_ROUNDS;

export default {
  async sendMailForgot(request, response) {
    const { useremail } = request.body;

    const user = await User.findOne({ where: { useremail } });

    if (!user) {
      return response.status(400).json({ error: 'Usuario não encontrado' });
    }

    const token = crypto.randomBytes(2).toString('hex');

    const expires_date = new Date();
    expires_date.setHours(expires_date.getHours() + 1);

    await RecoverPassword.create({
      useremail,
      token,
      expires: expires_date,
      created_at: new Date(),
    });

    await mailer.sendMail({
      subject: 'Recuperação de senha',
      from: 'suporte.lend.it@gmail.com',
      to: useremail,
      html: `
      <html>
        <strong>${token}</strong>
        Este é seu token
      </html>
       `,
    });

    return response.status(200).send();
  },

  async resetPassword(request, response) {
    const { newPassword, token } = request.body;

    const { useremail } = await RecoverPassword.findOne({ where: { token } });

    const salt = bcrypt.genSaltSync(saltRounds);

    const hashedPassword = bcrypt.hashSync(newPassword, salt);

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          useremail,
        },
      }
    );

    await RecoverPassword.destroy({ where: { token } });

    return response.status(200).send();
  },
};
