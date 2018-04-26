import axios from 'axios';

var url = "http://192.168.5.146:3000/";

export function GetSections(params){
    return axios.post(url + 'getSections', params);
}
export function EnrollCourse(params){
    return axios.post(url + 'enrollCourse', params);
}
export function CancelEnrollCourse(params){
    return axios.post(url + 'cancelEnrollCourse', params);
}