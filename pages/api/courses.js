import { getCourses } from './utils/db/courses';

 const Courses = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const courses = await getCourses();
      res.send(courses);
    } catch (err) {
      console.log(`Something wenty wrong ${err}`);
      res.status(500).send({ done: false });
    }
  } else {
    res.status(400).send({ done: false });
  }
};


export default Courses;