import React from "react";
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import logo from '.././assets/csulogo.JPG';
import '.././style/cor.css';
 
export default class RegistrationCertificate extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            totalunit: "",
            count:0
        }
    }

    mainContent(){
        let content = [];

        content.push(
            <div>
            <div className="head">
                <div className="heading">                
                    <h5>Caraga State University</h5>
                    <p>Ampayon, Butuan City<br/>https://www.carsu.edu.ph</p>                     
                </div>
                <div className="heading">
                    <h6 className="rheadingcontent1">CERTIFICATE OF REGISTRATION</h6>
                    <p className="rheadingcontent2">Student's Copy</p>                      
                </div>                           
            </div>  
            <hr/>                      
            <div className="studentdata">
                <b className="datafield">ID No.</b>
                <b className="datafield">Last Name</b>
                <b className="datafield">First Name</b>
                <b className="datafield">Ext Name</b>
                <b className="datafield">Middle Name</b>         

                {this.assignStudinfo()}

                <b className="datafield2">SY</b>
                <b className="datafield2">Sem</b>
                <b className="datafield2">Program</b>
                <b className="datafield2">Year</b>
                <b className="datafield2">Sex</b>
                <b className="datafield2">Date</b>
                <b className="datafield2">GPA</b>
                <b className="datafieldscholarship">Scholarship</b>
                <b className="datafield2">Status</b>
                {this.assignStudinfo2()}
            </div>
            <div className="courses">
                <table>
                    <caption align="bottom">
                        Reminder: (1)Asterisk course is requested.(2) OR# is your password for the Student Online Service account.<b className="totalunit">Total Unit:</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b className="totalunitvalue">{this.state.totalunit}</b><br/>
                        ENROLMENT VALIDATED ON:
                    </caption>
                    <tbody>
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
                        {this.createTableCourses()}
                    </tbody>
                </table>                
            </div><br/>
            <hr/>
            <div className="SOA">
                <h6>STATEMENT OF ACCOUNT</h6>
                <div className="assessment">
                        <div className="assess">
                            <table>
                                <caption align="bottom">Note: Assessment is subject for changes.                                    
                                </caption>
                                <tbody>                        
                                    <tr>
                                            <th className="fourx">Assessment of fees</th>
                                            <th className="twox">Amount</th>                        
                                    </tr>      
                                    {this.createTableAsess1()}                                                             
                                </tbody>                                                
                            </table>
                            <table>
                                <caption align="bottom">        
                                        <b className="totalunit">Total Assessment:</b><b className="totalunitvalue"></b><br/>                                                           
                                </caption>                                                                    
                                <tbody>                        
                                    <tr>
                                            <th className="fourx">Assessment of fees</th>
                                            <th className="twox">Amount</th>                        
                                    </tr>                                              
                                    {this.createTableAsess2()}                     
                                </tbody>                                                
                            </table>
                        </div>
                        <div className="fees">
                            <b>Schedule of Fees</b>                       
                            <div className="sched">
                                <table>                                    
                                    <tbody>
                                        <tr>
                                                <th className="threex">Schedule</th>
                                                <th className="twox">Amount</th>                        
                                        </tr>
                                        {this.createTableFeesched()}
                                    </tbody>
                                </table>                        
                            </div>
                            <b>Payment History</b>
                            <div className="history">
                                <table>                                                                       
                                    <tbody>
                                        <tr>
                                            <th className="threex">Date & OR #</th>
                                            <th className="twox">Amount</th>                        
                                        </tr>
                                        {this.createTablePaymenthistory()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>                    
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
                    <b className="summaryfield">ID No:</b><div className="summaryfieldline"></div>&nbsp;&nbsp;&nbsp;
                    <b className="summaryfield">Status:</b><div className="summaryfieldline"></div>
                </div>
                <div>
                    <b className="summaryfield">Name:</b><div className="summaryfieldlineName"></div><br/>
                    <p className="namelabelsLAST">LAST</p><p className="namelabelsFIRST">FIRST</p><p className="namelabelsmiddle">MI</p>
                </div>
                <div>
                    <b className="summaryfield">Sem & SY:</b><div className="summaryfieldlineshort"></div>
                    <b className="summaryfield">Date:</b><div className="summaryfieldlineshort"></div>
                    <b className="summaryfield">GPA:</b><div className="summaryfieldlineshort"></div>
                </div>
                <div>
                    <b className="summaryfield">Program & Yr:</b><div className="summaryfieldline"></div>&nbsp;&nbsp;&nbsp;
                    <b className="summaryfield">Scholarship:</b><div className="summaryfieldline"></div>                        
                </div>
                <div>
                    <table>
                        <caption align="bottom">Reminder: (1)Asterisk course is requested.
                            <b className="totalunit">Total Unit:</b><b className="totalunitvalue">0</b><br/>
                        </caption> 
                        <tbody>
                            <tr>
                                <th className="twox">CourseNo</th>
                                <th className="twox">Section</th>
                                <th className="fourx">Descriptive Title</th>                          
                                <th className="onex">Unit</th>
                            </tr>
                            {this.createTableCoursesSummary()}                                                               
                        </tbody>                        
                    </table>
                </div>                                             
                <p className="validated">ENROLMENT VALIDATED ON: </p><p className="by">BY:</p><br/>                    
                <div className="oversignature"/><br/>
                <p className="sigabovename">Signature Above Printed Name</p>           
            </div>
            <div className="vl"></div>
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
                    <b className="summaryfield">Name:</b><div className="summaryfieldlineName"></div><br/>
                    <p className="namelabelsLAST">LAST</p><p className="namelabelsFIRST">FIRST</p><p className="namelabelsmiddle">MI</p>
                </div>
                <div>
                    <b className="summaryfield">Sem & SY:</b><div className="summaryfieldlineshort"></div>
                    <b className="summaryfield">Date:</b><div className="summaryfieldlineshort"></div>
                    <b className="summaryfield">GPA:</b><div className="summaryfieldlineshort"></div>
                </div>
                <div>
                    <b className="summaryfield">Program & Yr:</b><div className="summaryfieldline"></div>&nbsp;&nbsp;&nbsp;
                    <b className="summaryfield">Scholarship:</b><div className="summaryfieldline"></div>                        
                </div>
                <div>
                    <table>
                        <caption align="bottom">Reminder: (1)Asterisk course is requested.
                            <b className="totalunit">Total Unit:</b><b className="totalunitvalue">0</b><br/>
                        </caption>                            
                        <tbody>
                            <tr>
                                <th className="twox">CourseNo</th>
                                <th className="twox">Section</th>
                                <th className="fourx">Descriptive Title</th>                          
                                <th className="onex">Unit</th>
                            </tr>
                            {this.createTableCoursesSummary()}                                    
                        </tbody>                      
                    </table>                        
                </div>                    
                <p className="validated">ENROLMENT VALIDATED ON: </p><p className="by">BY:</p><br/>
                <div className="oversignature"/><div className="oversignature"/><br/>
                <p className="adviser">Adviser</p><p className="sigabovename2">Signature Above Printed Name</p>
            </div>
        </div>
    </div> 
        )
        return content;
    }
    assignStudinfo(){
        let data= [];
        this.props.studinfo.map((val) => {
           data.push(
            <div className="studentdatarow" key={val.studid}>
                <p className="datarow">{val.studid}</p>
                <p className="datarow">{val.lastname}</p>
                <p className="datarow">{val.firstname}</p>
                <p className="datarow">{val.extname}</p>
                <p className="datarow">{val.middlename}</p>
            </div>
           )
        })
        return data;
    }
    assignStudinfo2(){
        let data= [];
        this.props.studinfo.map((val) => {
           data.push(
            <div className="studentdatarow" key={val.studid}>                   
                    <p className="datarow2">{val.sy}</p>
                    <p className="datarow2">{val.sem}</p>
                    <p className="datarow2">{val.studmajor}</p>
                    <p className="datarow2">{val.studlevel}</p>
                    <p className="datarow2">{val.sex}</p>  
                    <p className="datarow2">{val.datevalidated}</p>
                    <p className="datarow2">{val.gpa}</p>       
                    <p className="datarowscholarship">{val.scholar}</p>
                    <p className="datarow2">{val.status}</p>  
            </div>
           )
        })
        return data;
    }
 
createTableCourses(){
    let table = [];
    let tu = 0;
    let x= this.props.courses.length;
    let j = 0;
    if(x < 13){
        this.props.courses.forEach((val,index) => {           
            table.push(
              <tr key={val.description}>
                  <td className="twox">{val.subjcode}</td>
                  <td className="twox">{val.section}</td>
                  <td className="fourx">{val.description}</td>
                  <td className="threex">{val.skedtime}</td>
                  <td className="twox">{val.days}</td>
                  <td className="twox">{val.bldg}</td>
                  <td className="onex">{val.room}</td>
                  <td className="onex">{val.credit}</td>
              </tr> 
            )                                                                            
        })
    }else{
        for(var i=0; i < 17; i++){
            table.push(
                <tr key={this.props.courses.description}>
                    <td className="twox">{this.props.courses[i].subjcode}</td>
                    <td className="twox">{this.props.courses[i].section}</td>
                    <td className="fourx">{this.props.courses[i].description}</td>
                    <td className="threex">{this.props.courses[i].skedtime}</td>
                    <td className="twox">{this.props.courses[i].days}</td>
                    <td className="twox">{this.props.courses[i].bldg}</td>
                    <td className="onex">{this.props.courses[i].room}</td>
                    <td className="onex">{this.props.courses[i].credit}</td>
                </tr> 
            )
            j = i;               
        }console.log(j);
        // for(var y=j; y < x; y++){
        //     table.push(
        //         <tr key={this.props.courses.description}>
        //             <td className="twox">{this.props.courses[y].subjcode}</td>
        //             <td className="twox">{this.props.courses[y].section}</td>
        //             <td className="fourx">{this.props.courses[y].description}</td>
        //             <td className="threex">{this.props.courses[y].skedtime}</td>
        //             <td className="twox">{this.props.courses[y].days}</td>
        //             <td className="twox">{this.props.courses[y].bldg}</td>
        //             <td className="onex">{this.props.courses[y].room}</td>
        //             <td className="onex">{this.props.courses[y].unit}</td>
        //         </tr> 
        //     )
        // }
        //console.log(y);
    }
       
     return table;                                      
}
createTableAsess1(){
    let table = [];   
        for(var i=0; i < 10; i++){
            table.push(
                <tr key={this.props.assessment.ascode}>
                    <td className="fourx">{this.props.assessment[i].asdesc}</td>
                    <td className="twox">{this.props.assessment[i].amount}</td>                                                                
                </tr> 
            )
        }
     return table;                                      
}
createTableAsess2(){
    let table = [];
    let s = this.props.assessment.length;     
        for(var i=10; i < s; i++){
            table.push(
                <tr key={this.props.assessment.ascode}>
                    <td className="fourx">{this.props.assessment[i].asdesc}</td>
                    <td className="twox">{this.props.assessment[i].amount}</td>                                                                
                </tr> 
            )
        }
        // this.setState({count: i});
        console.log(i);
     return table;                                      
}
createTableFeesched(){
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
createTablePaymenthistory(){
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
createTableCoursesSummary(){
    let table = [];
      
    this.props.coursesum.forEach((val,index) => {           
              table.push(
                <tr key={val.oid}>
                    <td className="twox">{val.subjcode}</td>
                    <td className="twox">{val.section}</td>
                    <td className="fourx">{val.description}</td>                           
                    <td className="onex">{val.credit}</td>
                </tr> 
              )                                                                                                                                        
     })
     return table;                                      
}
  render() {    
    
    return (       
        <div className="body">            
                    {this.mainContent()}                             
        </div>
    );    
  }
}