import axios from 'axios';

var url = "http://192.168.5.146:3000/";

export function GetBlocks(params){
    return  axios.post(url + 'getBlocks', params);
}
export function GetSections(params){
    return axios.post(url + 'getSections', params);
}
export function GetMaxload(params){
    return axios.post(url + 'getMaxload', params);
}
export function CancelEnrollCourse(params){
    return axios.post(url + 'cancelEnrollCourse', params);
}
export function DeleteStudentRec(params){
    return axios.post(url + 'deleteStudentrec',params);
}
// export function GetEnrolledCourses(){
//     return axios.post(url + 'getEnrolledCourses', params);
// }
export function CheckStudentOffering(params){
    return axios.post(url + 'checkOfferingToStudent', params);
}
export function EnrollCourse(params){
    return axios.post(url + 'enrollCourse', params);
}
export function VerificationCodeSub(params){
    return axios.post(url + 'verificationCodeSubmission', params);
}
export function EnrollStudent(params){
    return axios.post(url + 'InsertUpdateEnrollStudent', params);
}
export function OfferingToStudent(params){
    return axios.post(url + 'checkOfferedtoStudent', params);
}
export function Registration(params){
    return axios.post(url + 'zqryreg', params);
}
export function NotCollegeEvaluation(params){
    return axios.post( url + "evalIfNotELEMHS" , params);
}
export function FirstStudentDataRetrieve(params){
    return axios.post(url + 'whenNotFoundinStudenttag', params);
}
export function CheckStudentPayment(params){
    return axios.post(url + 'checkStudentPayment', params);
}
export function CheckClearance(params){
    return axios.post(url + 'checkClearance',params);
}
export function GeneralPercentageAverage(params){
    return axios.post(url + 'getGPA',params);
}
export function TuitionComputation(params){
    return axios.post(url + 'tuitionCompute',params);
}