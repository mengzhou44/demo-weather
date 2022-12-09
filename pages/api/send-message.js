import { insertMessage } from './utils/db/messages';
import { sendEMail } from './utils/send-contact-us-email';

const SendMessage = async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { firstName, lastName, email, phone, message } = req.body;
      if (!lastName) {
        res.send({ done: false, message: 'Last name is required.' });
      }
      else if (!firstName) {
        res.send({ done: false, message: 'First name is required.' });
      } else if (!email) {
        res.send({ done: false, message: 'Email is required.' });
      } else if (!phone) {
        res.send({ done: false, message: 'Phone is required.' });
      } else if (!message) {
        res.send({ done: false, message: 'Message is required.' });
      } else {
        await insertMessage({ firstName, lastName, email, phone, message });
        await sendEMail({ lastName, firstName, email, phone, message });
        res.send({ done: true })
      }

    } catch (err) {
      console.log(`Something wenty wrong while saving the message ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};

export default SendMessage;

