import { queryHasuraGQL } from './query-hasura-GQL';

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
    }
  }
`;

  const response = await queryHasuraGQL(operationsDoc, 'getCourses');
  return response?.data?.courses;
}

export async function getCourseByUserId(id, userId, token) {
  console.log({ id, userId, token });
  const operationsDoc = `
  query getCourseByUserId($id: Int!, $userId: String!) {
        enrollments_by_pk(courseId: $id , userId: $userId) {
            courseId
            enrolledDate
            userId
        }
        courses_by_pk(id: $id) {
            active
            category
            description
            id
            name
            teacher
        }
  }
`;

  const response = await queryHasuraGQL(
    operationsDoc,
    'getCourseByUserId',
    { id, userId },
    token
  );

  let course = {
    ...response?.data?.courses_by_pk,
  };

  if (response?.data?.enrollments_by_pk) {
    course.isEnrolled = true;
  } else {
    course.isEnrolled = false;
  }
  return course;
}

export async function getCourse(id) {
  const operationsDoc = `
  query getCourse ($id: Int!)  {
    courses_by_pk(id: $id) {
      active
      category
      description
      id
      name
      teacher
    }
  }
`;

  const response = await queryHasuraGQL(operationsDoc, 'getCourse', { id });
  return response?.data?.courses_by_pk;
}
