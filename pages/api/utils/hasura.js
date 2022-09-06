export async function createUser(token, user) {
  const operationsDoc = `
  mutation createUser(
     $issuer: String!, 
     $email: String!, 
     $publicAddress: String!, 
     $firstName: String!, 
     $lastName: String!, 
     ) {
    insert_users(objects: {
        email: $email, 
        issuer: $issuer, 
        publicAddress: $publicAddress,
        firstName: $firstName,
        lastName: $lastName,
    }) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

  const { issuer, email, publicAddress, firstName, lastName } = user;
  const response = await queryHasuraGQL(
    operationsDoc,
    'createUser',
    {
      issuer,
      email,
      publicAddress,
      firstName,
      lastName,
    },
    token
  );
  if (response?.errors?.length ?? 0 > 0) {
    throw new Error(JSON.stringify(response.errors[0]));
  }
  console.log({ response });
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
    }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'isNewUser',
    {
      issuer,
    },
    token
  );
  return response?.data?.users?.length === 0;
}

async function queryHasuraGQL(operationsDoc, operationName, variables, token) {
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
