import { queryHasura } from "./query-hasura";

export async function createRegistration(registration) {
  const operationsDoc = `
      mutation insertRegistration(
        $address: String!,
        $birthDate: date!,
        $city: String!,
        $country: String!,
        $coursesRequest: String!,
        $currentGrade: String!,
        $email: String!,
        $ethnicity: String!,
        $firstName: String!,
        $gender: String!,
        $lastName:  String!,
        $parentName:  String!,
        $parentEmail:  String!,
        $parentPhone:  String!,
        $parentSignature:  String!,
        $phone:  String!, 
        $state:  String!,
        $studentSignature:  String!, 
        $zipCode:  String!
      ) {
        insert_registration(objects: {
            address:  $address,
            birthDate: $birthDate, 
            city:  $city,
            country:  $country,
            coursesRequest:  $coursesRequest, 
            currentGrade: $currentGrade, 
            email: $email, 
            ethnicity: $ethnicity, 
            firstName: $firstName, 
            gender: $gender,  
            lastName: $lastName, 
            parentName: $parentName, 
            parentEmail: $parentEmail, 
            parentPhone: $parentPhone, 
            parentSignature: $parentSignature, 
            phone: $phone, 
            state: $state, 
            studentSignature: $studentSignature, 
            zipCode: $zipCode}) {
            affected_rows
        }
      }
`;
 
  const response = await queryHasura(
    operationsDoc,
    'insertRegistration',
    registration,
  );
  if (response?.errors?.length ?? 0 > 0) {
    throw new Error(JSON.stringify(response.errors[0]));
  }
  return response;
}

