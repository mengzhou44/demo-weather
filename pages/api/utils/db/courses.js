import { queryHasuraGQL } from './query-hasura-GQL';

export async function getCourses() {
  const operationsDoc = `
  query  getCourses {
    courses {
      active
      category
      description
      id
    }
  }
`;

  const response = await queryHasuraGQL(operationsDoc, 'getCourses');
  return response?.data?.courses;
}
 