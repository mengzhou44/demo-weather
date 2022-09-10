import jwt from 'jsonwebtoken';
import { magicAdmin } from './utils/magic';
import { isNewUser } from './utils/hasura';
import { setTokenCookie } from './utils/cookies';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { authorization } = req.headers;
      const didToken = authorization.split(' ')[1];
      const metadata = await magicAdmin.users.getMetadataByToken(didToken);

      const token = jwt.sign(
        {
          ...metadata,
          exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
          iat: Math.floor(Date.now() / 1000),
          'https://hasura.io/jwt/claims': {
            'x-hasura-allowed-roles': ['user'],
            'x-hasura-default-role': 'user',
            'x-hasura-user-id': metadata.issuer,
          },
        },
        process.env.JWT_SECRET
      );

      const { isNew, firstName } = await isNewUser(token, metadata.issuer);
      if (isNew === true) {
        res.send({ done: false, message: 'Please sign up first!' });
      } else {
        setTokenCookie(token, res);
        res.send({ done: true, firstName });
      }
    } catch (err) {
      console.log(`Something wenty wrong while logging ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};
