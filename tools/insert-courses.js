import dotenv  from 'dotenv'
import  fetch from 'node-fetch';

dotenv.config();

const courses = [
    {
      category: "A-History/Social Sciences",
      name: "World History"
    },
    {
     category: "A-History/Social Sciences",
     name: "US History"
   },
   {
     category: "A-History/Social Sciences",
     name: "US Government and Politics*"
   },
   {
     category: "A-History/Social Sciences",
     name: "Economics*"
   },
   {
     category: "A-History/Social Sciences",
     name: "AP US History"
   },
   {
     category: "A-History/Social Sciences",
     name: "AP US Government and Politics*"
   },
 
   {
     category: "A-History/Social Sciences",
     name: "AP Comparative Government and Politics"
   },
   
   {
     category: "A-History/Social Sciences",
     name: "AP Macroeconomics*"
   },
   {
     category: "A-History/Social Sciences",
     name: "AP Microeconomics*"
   },
   {
     category: "A-History/Social Sciences",
     name: "AP psychology*"
   },
   {
     category: "B-English",
     name: "English 9"
   },
   {
     category: "B-English",
     name: "English 9 with Romeo and Juliet"
   },
   {
     category: "B-English",
     name: "English 10"
   },
   {
     category: "B-English",
     name: "English 11"
   },
   {
     category: "B-English",
     name: "English 12"
   },
   {
     category: "B-English",
     name: "AP English Language and Composition"
   },
   {
     category: "B-English",
     name: "AP English Literature and Composition"
   },
   {
     category: "C-Mathematics",
     name: "Algebra 1"
   },
   {
     category: "C-Mathematics",
     name: "Geometry"
   },
   {
     category: "C-Mathematics",
     name: "Algebra 2"
   },
   {
     category: "C-Mathematics",
     name: "Pre-Calculus"
   },
   {
     category: "C-Mathematics",
     name: "Statistics"
   },
   {
     category: "C-Mathematics",
     name: "AP Statistics"
   },
   {
     category: "C-Mathematics",
     name: "AP Calculus AB"
   },
   {
     category: "D-Sciences",
     name: "Biology"
   },
   {
     category: "D-Sciences",
     name: "Chemistry"
   },
   {
     category: "D-Sciences",
     name: "Physics"
   },
   {
     category: "D-Sciences",
     name: "Environmental Science"
   },
   {
     category: "D-Sciences",
     name: "AP Biology"
   },
   {
     category: "D-Sciences",
     name: "AP Chemistry"
   },
   {
     category: "D-Sciences",
     name: "AP Environmental Science"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Chinese Language and Culture 1"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Chinese Language and Culture 2"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Chinese Language and Culture 3"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Spanish Literature and Culture 1"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Spanish Literature and Culture 2"
   },
   {
     category: "E-World Languages and Cultures",
     name: "Spanish Literature and Culture 3"
   },
   {
     category: "E-World Languages and Cultures",
     name: "AP Chinese Language and Culture"
   },
   {
     category: "E-World Languages and Cultures",
     name: "AP Spanish Literature and Culture"
   },
   {
     category: "F-Visual & Performing Arts",
     name: "Art Appreciation*"
   },
   {
     category: "F-Visual & Performing Arts",
     name: "Music Appreciation"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Psychology*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Sociology*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Multicultural Studies*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Economics and Personal Finance"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Financial Literacy*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Creative Writing*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Media Literacy*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Reading Skills and Strategies*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Writing Skills and Strategies*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Personal Communication"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Health*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Computer Science Essentials"
   },
   {
     category: "G-College Preparatory Electives",
     name: "College and Career Preparation 1*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "College and Career Preparation 2*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Accounting 1"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Accounting 2"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Business Applications*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Computer Applications*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Human Resources Principles"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Information Technology Applications*"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Introduction to Business and Technology"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Legal Environment of Business"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Principles of Business, Marketing, and Finance"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Principles of Health Science"
   },
   {
     category: "G-College Preparatory Electives",
     name: "Principles of Information Technology"
   },
 ]

async function insertCourses() {
    for(let course of courses) {
       await insertCourse(course)
    }
}

insertCourses()



async function insertCourse({category, name}) {
    const operationsDoc = `
    mutation insertCourse ($category: String!, $name: String!) {
      insert_courses_one(object: {category: $category, name: $name}) {
        id
      }
    }    
  `;
  
    const response = await queryHasura(
      operationsDoc,
      'insertCourse',
      {category, name }
    );
     if (response.errors && response.errors.length>0) {
         console.log({length:response.errors.length})
         console.log(JSON.stringify(response.errors[0], 4))
         throw new Error(response.errors[0])
     }
}


async function queryHasura(
  operationsDoc,
  operationName,
  variables,
) {

  const result = await fetch(process.env.HASURA_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      'x-hasura-admin-secret': process.env.HASURA_ADMIN_SECRET
    },
    body: JSON.stringify({
      query: operationsDoc,
      variables,
      operationName
    }),
  });

  return await result.json();
}
 