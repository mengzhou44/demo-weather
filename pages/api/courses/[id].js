import { getCourse, getCourseByUserId } from '../utils/db/courses';
import { verifyToken } from '../utils/verify-token';

const Course = async (req, res) => {
  if (req.method === 'GET') {
    const { id } = req.query;
    const { token } = req.cookies;
    if (token) {
      try {
        const userId = await verifyToken(token);
        if (!userId) {
          throw new Error('token is invalid!');
        }
        const course = await getCourseByUserId(id, userId, token);
        res.send(course);
      } catch (err) {
        console.log(`Something wenty wrong  ${err}`);
        res.status(500).send({ done: false });
      }
    } else {
      try {
        const course = await getCourse(id);
        res.send(course);
      } catch (err) {
        console.log(`Something wenty wrong while logging ${err}`);
        res.status(500).send({ done: false });
      }
    }
  } else {
    res.status(400).send({ done: false });
  }
};

export default Course