import { queryHasura } from './query-hasura';
 

export async function insertMessage({name, email, message}) {
    const operationsDoc = `
    mutation insertMessage ($email: String!, $name: String!, $message: String!) {
      insert_messages_one(object: {email: $email, message: $message, name: $name}) {
        id
      }
    }    
  `;
  
    const response = await queryHasura(
      operationsDoc,
      'insertMessage',
      {name, email, message }
    );
     if (response.errors && response.errors.length>0) {
        console.log({length:response.errors.length})
         console.log(JSON.stringify(response.errors[0], 4))
         throw new Error(response.errors[0])
     }
  }
 
//   const operationsDoc = `
//   mutation enrollCourse ($courseId: Int!, $userId: String!) {
//    insert_enrollments_one(object: {courseId: $courseId, userId: $userId}) {
//      userId
//      courseId
//    }
//  }
// `;

//  await queryHasura(
//    operationsDoc,
//    'enrollCourse',
//    { courseId, userId },
//    token
//  );