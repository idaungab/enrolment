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
export function CheckClearanceStudentOffering(params){
    return axios.post(url + 'checkOfferingToStudentANDClearance', params)
}
export function EnrollCourse(params){
    return axios.post(url + 'enrollCourse', params);
}
export function VerificationCodeSub(params){
    return axios.post(url + 'verificationCodeSubmission', params);
}