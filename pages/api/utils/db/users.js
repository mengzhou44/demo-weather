import { queryHasura } from "./query-hasura";

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
  const response = await queryHasura(
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



