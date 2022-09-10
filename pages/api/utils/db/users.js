import { queryHasuraGQL } from "./query-hasura-GQL";

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
  return response;
}

export async function isNewUser(token, issuer) {
  const operationsDoc = `
  query isNewUser($issuer: String!) {
    users(where: {issuer: {_eq: $issuer}}) {
      id
      email
      issuer
      firstName
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
  const isNew = response?.data?.users?.length === 0;
  let res = {
    isNew,
  };
  if (isNew === false) {
    res.firstName = response.data.users[0].firstName;
  }
  return res;
}


