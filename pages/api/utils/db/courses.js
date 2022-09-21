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
export async function isCourseEnrolled(courseId, userId, token) {
  const operationsDoc = `
  query isCourseEnrolled($courseId: Int!, $userId: String!) {
        enrollments_by_pk(courseId: $courseId, userId: $userId) {
            courseId
            enrolledDate
            userId
        }
  }
`;

  const response = await queryHasura(
    operationsDoc,
    'isCourseEnrolled',
    { courseId, userId },
    token
  );

  if (response?.data?.enrollments_by_pk) {
    return true;
  }
  return false;
}

export async function getCourseByUserId(courseId, userId, token) {
  const operationsDoc = `
  query getCourseByUserId($courseId: Int!) {
        courses_by_pk(id: $courseId) {
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

  const response = await queryHasura(
    operationsDoc,
    'getCourseByUserId',
    { courseId },
    token
  );

  let course = {
    ...response?.data?.courses_by_pk,
  };

  course.isEnrolled = await isCourseEnrolled(courseId, userId, token);

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
      imageUrl
    }
  }
`;

  const response = await queryHasura(operationsDoc, 'getCourse', { id });
  return response?.data?.courses_by_pk;
}

export async function enrollCourse(courseId, userId, token) {
  const operationsDoc = `
   mutation enrollCourse ($courseId: Int!, $userId: String!) {
    insert_enrollments_one(object: {courseId: $courseId, userId: $userId}) {
      userId
      courseId
    }
  }
`;

  await queryHasura(
    operationsDoc,
    'enrollCourse',
    { courseId, userId },
    token
  );
}
