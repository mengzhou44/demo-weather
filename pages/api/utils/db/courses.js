import { queryHasura } from './query-hasura';

export async function getCourses() {
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

  const response = await queryHasura(operationsDoc, 'getCourses');
  return response?.data?.courses;
}

