import { queryHasura } from './query-hasura';

export async function getCourses(token) {
  const operationsDoc = `
  query  getCourses {
    courses {
      active
      category
      description
      id
      name
      teacher
      imageUrl
    }
  }
`;

  const response = await queryHasura(operationsDoc, 'getCourses', null, token);
  return response?.data?.courses;
}
 

