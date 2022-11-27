import dotenv  from 'dotenv'
import  jwt from 'jsonwebtoken';

dotenv.config();

function generatePublicJWT() {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
      iat: Math.floor(Date.now() / 1000),
      'https://hasura.io/jwt/claims': {
        'x-hasura-allowed-roles': ['public'],
        'x-hasura-default-role': 'public',
      },
    },
    process.env.JWT_SECRET
  );
}


function generateUserJWT() {
  const metadata = {
    issuer: 'did:ethr:0x82b92bb1A7414B8D8569446BC2A8a5C2eEeBa41a',
    publicAddress: '0x82b92bb1A7414B8D8569446BC2A8a5C2eEeBa41a',
    email: 'mengzhouaws@gmail.com',
  };
  return jwt.sign(
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
}

let token = generatePublicJWT();
console.log(`************************* PUBLIC *********************`)
console.log(`Bearer ${token}`);

console.log(`************************* USER *********************`);
token = generateUserJWT();
console.log(`Bearer ${token}`);
