import { insertMessage } from './utils/db/messages';
import { sendEMail } from './utils/send-email';

const SendMessage =  async (req, res) => {
  if (req.method === 'POST') {
    try {

        const { name, email, message } = req.body;

        if (!name) {
          res.send({ done: false, message: 'Name is required.' });
        } else if (!email) {
          res.send({ done: false, message: 'Email is required.' });
        }  else if (!message) {
          res.send({ done: false, message: 'Message is required.' });
        } else {
          await insertMessage({name,email, message});
          await sendEMail({name,email, message});
          res.send({done:true})
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

