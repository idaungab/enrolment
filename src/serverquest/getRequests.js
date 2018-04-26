import axios from 'axios';

var url = "http://192.168.5.146:3000/";

export function GetStudent(){
    return axios.get(url + 'studentData');
}
export function GetSysem(){
    return axios.get(url + 'sysem');
}
export function GetSemStudents(){
    return axios.get(url + 'semStudents');
}
export function GetScholar(){
    return axios.get(url + 'scholar');
}
export function GetProgram(){
    return axios.get(url + 'programLimitDetail');
}
export function GetCurriculum(){
    return axios.get(url + 'curriculum');
}
export function GetStudenttag(){
    return axios.get(url + 'getfromStudenttag');
}
export function GetBlock(){
    return axios.get(url + 'getBlocks');
}
export function GetScholarsDetail(){
    return axios.get(url + 'scholarsDetail');
}
export function GetRegistration(){
    return axios.get(url + 'getRegistration');
}
export function GetStatus(){
    return axios.get(url + 'getStatus');
}
export function GetCourses(){
    return axios.get(url + 'getCourses');
}