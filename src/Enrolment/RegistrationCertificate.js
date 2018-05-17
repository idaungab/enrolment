import React from "react";

import logo from '.././assets/csulogo.JPG';
import '.././style/cor.css';
 
export default class RegistrationCertificate extends React.Component {
  render() {
    return (
        <div className="body">
            <div className="head">
                <div className="heading">
                    <h4>Caraga State University</h4>
                    <h6>Ampayon, Butuan City</h6>        
                    <h6>https://www.carsu.edu.ph</h6>                
                </div>
                <div className="heading">
                    <h5 className="rheadingcontent1">CERTIFICATE OF REGISTRATION</h5>
                    <h6 className="rheadingcontent2">Student's Copy</h6>                      
                </div>
                <hr/>            
            </div>            
            <div>
                <div className="subheading">
                    <h6>ID No.</h6>
                    <h6>Last Name</h6>
                    <h6>First Name</h6>
                    <h6>Ext Name</h6>
                    <h6>Middle Name</h6>
                </div>               
                <h6>SY</h6>
                <h6>Sem</h6>
                <h6>Program</h6>
                <h6>Year</h6>
                <h6>Sex</h6>
                <h6>Date</h6>
                <h6>GPA</h6>
                <h6>Scholarship</h6>
                <h6>Status</h6>
            </div>          
        </div>
    );    
  }
}