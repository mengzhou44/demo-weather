import { getCourses } from '../utils/db/courses';

export default async (req, res) => {
  if (req.method === 'GET') {
    try {
      const courses = await getCourses();
      res.send(courses);
    } catch (err) {
      console.log(`Something wenty wrong while logging ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};
