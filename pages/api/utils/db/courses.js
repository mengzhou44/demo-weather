import { queryHasura } from './query-hasura';

export async function getCourses() {
  const operationsDoc = `
  query  getCourses {
    courses {
      id
      category
      name
    }
  }
`;

  const response = await queryHasura(operationsDoc, 'getCourses');
  return response?.data?.courses;
}


