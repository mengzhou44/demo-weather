import { enrollCourse, isCourseEnrolled } from '../utils/db/courses';
import { verifyToken } from '../utils/verify-token';

function isNumeric(value) {
    return /^\d+$/.test(value);
}

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const { token } = req.cookies;
      const userId = await verifyToken(token);
      if (!userId) {
        throw new Error('token is invalid!');
      }
      const { courseId } = JSON.parse(req.body);
      if (!isNumeric(courseId)) {
         throw new Error(`course ${courseId} is invalid!`)
      }
      const enrolled = await isCourseEnrolled(courseId, userId, token);

      if (enrolled === true) {
         throw new Error('course is enrolled!')
      }

      await enrollCourse(courseId, userId, token);
      res.status(200).send({ done: true });
    } catch (err) {
      console.log(`Something wenty wrong  ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};
