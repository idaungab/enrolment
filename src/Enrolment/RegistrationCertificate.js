import React from "react";

import logo from '.././assets/csulogo.JPG';
import '.././style/cor.css';
 
export default class RegistrationCertificate extends React.Component {
  render() {
    return (
        <div className="body">
            <div className="head">
                <div className="heading">
                    <h5>Caraga State University</h5>
                    <p>Ampayon, Butuan City<br/>https://www.carsu.edu.ph</p>                     
                </div>
                <div className="heading">
                    <h6 className="rheadingcontent1">CERTIFICATE OF REGISTRATION</h6>
                    <p className="rheadingcontent2">Student's Copy</p>                      
                </div>
                <hr/>            
            </div>                        
            <div className="studentdata">
                <b className="datafield">ID No.</b>
                <b className="datafield">Last Name</b>
                <b className="datafield">First Name</b>
                <b className="datafield">Ext Name</b>
                <b className="datafield">Middle Name</b>
                <div className="studentdatarow">
                    <p className="datarow">131-001852</p>
                    <p className="datarow">Oliva</p>
                    <p className="datarow">brice liam</p>
                    <p className="datarow"></p>
                    <p className="datarow">Acojedo</p>                    
                </div>
                    <b className="datafield2">SY</b>
                    <b className="datafield2">Sem</b>
                    <b className="datafield2">Program</b>
                    <b className="datafield2">Year</b>
                    <b className="datafield2">Sex</b>
                    <b className="datafield2">Date</b>
                    <b className="datafield2">GPA</b>
                    <b className="datafieldscholarship">Scholarship</b>
                    <b className="datafield2">Status</b>
                <div className="studentdatarow">
                    <p className="datarow2">2017-2018</p>
                    <p className="datarow2">2nd</p>
                    <p className="datarow2">bsit</p>
                    <p className="datarow2">4</p>
                    <p className="datarow2">male</p>  
                    <p className="datarow2">5/18/2018</p>
                    <p className="datarow2">1.00</p>       
                    <p className="datarowscholarship">CHED-tulong-dunong</p>
                    <p className="datarow2">old</p>           
                </div>
            </div>
            <div className="courses">
                <table>
                    <tr>
                        <th className="twox">CourseNo</th>
                        <th className="twox">Section</th>
                        <th className="fourx">Description Title</th>
                        <th className="threex">Time</th>
                        <th className="twox">Days</th>
                        <th className="twox">Bldg</th>
                        <th className="onex">Room</th>
                        <th className="onex">Unit</th>
                    </tr>
                    <tr>
                        <td className="twox">IT100</td>
                        <td className="twox">YJH</td>
                        <td className="fourx"></td>
                        <td className="threex">8:00 AM-5:00PM</td>
                        <td className="twox">mtwthf</td>
                        <td className="twox">nsb</td>
                        <td className="onex">cl1</td>
                        <td className="onex">3</td>
                    </tr>
                    <tr>
                        <td className="twox">IT100</td>
                        <td className="twox">YJH</td>
                        <td className="fourx"></td>
                        <td className="threex">8:00 AM-5:00PM</td>
                        <td className="twox">mtwthf</td>
                        <td className="twox">nsb</td>
                        <td className="onex">cl1</td>
                        <td className="onex">3</td>
                    </tr>
                    <tr>
                        <td className="twox">IT100</td>
                        <td className="twox">YJH</td>
                        <td className="fourx"></td>
                        <td className="threex">8:00 AM-5:00PM</td>
                        <td className="twox">mtwthf</td>
                        <td className="twox">nsb</td>
                        <td className="onex">cl1</td>
                        <td className="onex">3</td>
                    </tr>
                </table>
            </div>
            <hr/>
            <div className="SOA">
                <h5>STATEMENT OF ACCOUNT</h5>
                <table>
                    <tr>
                        <th className="fourx">Assessment of fees</th>
                        <th className="twox">Amount</th>                        
                    </tr>
                    <tr>
                        <td className="fourx">Athletics</td>
                        <td className="twox">240.00</td>                        
                    </tr>                                  
                </table>
               <div className="countersigns">
                    <div className="oversignature"></div><div className="oversignature"></div><div className="oversignature"></div><br/>
                    <p className="sigabovename">Signature Above Printed Name</p>                    
                    <p className="adviser">Adviser</p>
                    <p className="designate">University Registrar- Designate</p>
                </div>
            </div>           
            <div className="summary">
                <div className="Hbrokenline"/>
                <div className="Lsummary">
                    <div className="summaryheading">
                        <h5>Caraga State University</h5>
                        <p>Ampayon, Butuan City<br/>https://www.carsu.edu.ph <b className="copy">Registrar's Copy</b></p>
                        <div className="summarylinebelowhead"></div>                                            
                    </div>
                    <div className="summaryheading2">
                        <b>ID No:</b><div className="summaryfieldline"></div>
                    </div>
                    
                </div>
                {/* <div className="vl"></div> */}
                <div className="Rsummary">
                    <div className="summaryheading">
                        <h5>Caraga State University</h5>
                        <p>Ampayon, Butuan City<br/>https://www.carsu.edu.ph <b className="copy">Adviser's Copy</b></p>
                        <div className="summarylinebelowhead"></div>                                                                
                    </div>
                    <div className="summaryheading2">
                        <b className="summaryfield">ID No:</b><div className="summaryfieldline"></div>&nbsp;&nbsp;&nbsp;
                        <b className="summaryfield">Status:</b><div className="summaryfieldline"></div>
                    </div>
                    <div>
                    <b className="summaryfield">Name:</b><div className="summaryfieldline"></div>
                    <p>LAST&nbsp;&nbsp;&nbsp;FIRST&nbsp;&nbsp;&nbsp;MI</p>
                    </div>
                </div>
            </div>                                      
        </div>
    );    
  }
}