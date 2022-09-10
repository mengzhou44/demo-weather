const jwt = require('jsonwebtoken');

export async function queryHasuraGQL(
  operationsDoc,
  operationName,
  variables,
  token = generatePublicJWT()
) {
  const result = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-type': 'application/json',
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables: variables,
      operationName: operationName,
    }),
  });

  return await result.json();
}

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
