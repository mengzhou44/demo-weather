import { getCourses } from '../utils/db/admin';
import { isManagerRole} from '../utils/verify-token';

 const Courses = async (req, res) => {
  if (req.method === 'GET') {
    try {         
      const { token } = req.cookies;
       const isManager = await isManagerRole(token)
       
       if (isManager === true) {
          const courses = await getCourses(token);
           res.send({done: true, data:courses});
       } else {
          throw new Error("Only manager can add/remove courses")
       }
    } catch (err) {
      console.log(`Something wenty wrong while getting courses ${err}`);
      res.status(500).send({ done: false, message: err.message});
    }
  } else {
    res.status(400).send({ done: false, message: "bad request!" });
  }
};


export default Courses;




//      
//       res.status(200).send({ done: true });
//     } catch (err) {
//       console.log(`Something wenty wrong  ${err}`);
//       res.status(500).send({ done: false });
//     }
//   } else {
//     res.status(400).send({ done: false });
//   }
// };

// export default Enroll;



