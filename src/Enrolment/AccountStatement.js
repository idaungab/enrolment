import React from "react";

import '.././style/soa.css';
 
export default class RegistrationCertificate extends React.Component {
  createTableSOACourses(){
        let table = [];
        
        this.props.coursesum.forEach((val,index) => {           
                table.push(
                    <tr key={val.oid}>
                        <td className="soacoursescourseno">{val.subjcode}</td>
                        <td className="soacoursesection">{val.section}</td>
                        <td className="soacourseslec">{val.lec}</td>                           
                        <td className="soacourseslab">{val.lab}</td>
                        <td className="soacoursesunit">{val.credit}</td>
                    </tr> 
                )                                                                                                                                        
        })
        return table;  
  }
  createTableSOAAssessment(){
    let table = [];
        
    this.props.assessment.forEach((val,index) => {           
            table.push(
                <tr key={val.ascode}>
                    <td className="soaassess">{val.asdesc}</td>
                    <td className="soaamount">{val.amount}</td>                    
                </tr> 
            )                                                                                                                                        
    })
    return table;
  }
  createTableSOASkedfees(){
    let table = [];
      
    this.props.feescheme.forEach((val,index) => {           
              table.push(
                <tr key={val.rank}>
                    <td className="twox">{val.sked}</td>
                    <td className="twox">{val.amount}</td>                    
                </tr> 
              );                                                                                                                            
     })
     return table;
  }
  createTableSOAPaymentHistory(){
    let table = [];
      
    this.props.paymenthistory.forEach((val,index) => {           
              table.push(
                <tr key={val.refrcpt}>
                    <td className="twox">{val.receiptdate}&nbsp;{val.refrcpt}</td>
                    <td className="twox">{val.amount}</td>                    
                </tr> 
              )                                                                                                                                        
     })
     return table; 
  }
  render() {    
    
    return (       
        <div className="soabody">
            <div className="head">
                <div className="heading">                
                    <p>Caraga State University</p>
                    <p>Ampayon, Butuan City<br/>http://www.carsu.edu.ph</p>                     
                </div>
                <div className="heading">
                    <h6 className="rheadingcontent1">CERTIFICATE OF REGISTRATION</h6>
                    <p className="rheadingcontent2">Statement of Account</p>                      
                </div>                           
            </div>
            <hr/>                      
            <div className="studentdata">
                <b className="datafield">ID No.</b>
                <b className="datafield">Last Name</b>
                <b className="datafield">First Name</b>
                <b className="datafield">Ext Name</b>
                <b className="datafield">Middle Name</b>         

                {/* {this.assignStudinfo()} */}
                {/* {this.assignStudinfo2()} */}
                <b className="datafield2">SY</b>
                <b className="datafield2">Sem</b>
                <b className="datafield2">Program</b>
                <b className="datafield2">Year</b>
                <b className="datafield2">Sex</b>
                <b className="datafield2">Date</b>
                <b className="datafield2">GPA</b>
                <b className="datafieldscholarship">Scholarship</b>
                <b className="datafield2">Status</b>                             
            </div>  
            <hr/> 
            <div className="divisions">
                <div className="soafees">
                    <div className="soaassessment">
                        <table>
                            <caption align="bottom">
                                Note: Assessment is subject for changes.
                            </caption>
                            <tbody>
                                <tr>
                                    <th className="soaassess">Assessment of fees</th>
                                    <th className="soaamount">Amount</th>                               
                                </tr>
                                {this.createTableSOAAssessment()}
                            </tbody>
                        </table> 
                        <b className="soatotalassessment">Total Assessment:</b><b className="soatotalunitvalue">0</b><br/>
                    </div>
                    <div className="soafeesked">
                        <table>                           
                            <tbody>
                                <tr>
                                    <th className="soaschedfees">Schedule of fees</th>
                                    <th className="soaschedamount">Amount</th>                               
                                </tr>
                                {this.createTableSOASkedfees()}
                            </tbody>
                        </table> 
                    </div>
                    <div className="soapaymenthistory">
                        <table>                           
                            <tbody>
                                <tr>
                                    <th className="soadateor">Date & OR #</th>
                                    <th className="soapayhistamount">Amount</th>                               
                                </tr>
                                {this.createTableSOAPaymentHistory()}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="soacourses">
                    <table>                     
                        <tbody>
                            <tr>
                                <th className="soacoursescourseno">CourseNo</th>
                                <th className="soacoursesection">Section</th>
                                <th className="soacourseslec">Lec</th>
                                <th className="soacourseslab">Lab</th>
                                <th className="soacoursesunit">Unit</th>
                            </tr>
                            {this.createTableSOACourses()}
                        </tbody>
                    </table> 
                </div>  
                <div>
                    <div className="soaoversignature"/><div className="soaoversignature"/><br/><br/>
                    <p className="soasigabovename">Student</p> <p className="soasigabovename">Encoder</p> 
                </div>
            </div>
        </div>
    );    
  }
}