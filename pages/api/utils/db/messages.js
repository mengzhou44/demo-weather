import { queryHasura } from './query-hasura'; 

export async function insertMessage({lastName, firstName,  email, phone, message}) {
    const operationsDoc = `
    mutation insertMessage ($firstName: String!, $lastName: String!, $email: String!, $phone: String!, $message: String!) {
      insert_messages_one(object: {lastName: $lastName, firstName: $firstName,  email: $email, phone: $phone, message: $message,}) {
        id
      }
    }    
  `;
  
    const response = await queryHasura(
      operationsDoc,
      'insertMessage',
      {lastName, firstName, email, phone, message }
    );
     if (response.errors && response.errors.length>0) {
         console.log({length:response.errors.length})
         console.log(JSON.stringify(response.errors[0], 4))
         throw new Error(response.errors[0])
     }
  }
  