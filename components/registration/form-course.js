import { useState } from 'react';
import styles from './form3.module.css'

function FormCourse({data, onNext, onPrev}) {
 
    const [currentGrade, setCurrentGrade] = useState(data.currentGrade??'');
    const [coursesRequest, setCoursesRequest] = useState(data.coursesRequest??'');
   
    const [message, setMessage] = useState('');

    const validateInputs = () => {
       if (!currentGrade){
         setMessage('Current grade is required!')
         return false
       }else  if (!coursesRequest){
         setMessage('Courses request is required!')
         return false
       }

      setMessage('');
      return true;
    };

    const handleCurrentGradeTextChange = (e) => {
        setCurrentGrade(e.target.value);
    };
 
    const handleCoursesRequestTextChange = (e) => {
      setCoursesRequest(e.target.value);
   };

    return <>
       <div className={styles.inputs}>
          <div className={styles.field}>
            <label htmlFor="currentGrade">Current Grade *</label>
            <input
              id="currentGrade"
              type="text"
              value={currentGrade}
              onChange={handleCurrentGradeTextChange}
            ></input>
          </div>
 
          <div className={styles.field}>
            <label htmlFor="coursesRequest">Courses Request *</label>
            <input
              id="coursesRequest"
              type="text"
              value={coursesRequest}
              onChange={handleCoursesRequestTextChange}
            ></input>
          </div>

          <p>{message}</p>

          <div className={styles.buttons}>
            <button onClick={()=> onPrev()}>Prev</button>
            <button onClick={()=> {
                 if (validateInputs()) {
                     onNext({currentGrade, coursesRequest})
                 }
            }}>Next</button>
          </div>    
        </div>
    </>
}
export default FormCourse