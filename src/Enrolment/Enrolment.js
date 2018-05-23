import React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';
import dateformat from 'dateformat';
import ReactToPrint from "react-to-print";

// import Clock from '.././Layout/Clock';
import Button from '.././Layout/Button';
import DropdownList from '.././Layout/DropList';
import Input from '.././Layout/BasicInput';
import Input1 from '.././Layout/forenroll/BasicInput';
import ShortInput from '.././Layout/forenroll/ShortInput';
// import Select from '.././Layout/Select';

import COR from './RegistrationCertificate';

import {
  GetStudent, 
  GetSysem, 
  GetSemStudents, 
  GetScholar, 
  GetProgram, 
  GetCurriculum,
  GetRegistration,
  GetStatus,
  GetStudenttag,
  GetScholarsDetail,
  GetCourses
} from '.././serverquest/getRequests';
import {
  GetBlocks,
  GetSections,
  EnrollCourse,
  CancelEnrollCourse,
  DeleteStudentRec,
  GetMaxload,
  CheckStudentOffering,
  VerificationCodeSub,
  FirstStudentDataRetrieve,
  NotCollegeEvaluation,
  Registration,
  OfferingToStudent,
  EnrollStudent,
  CheckStudentPayment, 
  CheckClearance, 
  GeneralPercentageAverage,
  TuitionComputation,
  Skedfees,
  CORSOA
} from '.././serverquest/postRequests';

import '.././style/enroll.css';
import '.././style/bootstrap.min.css';
import '.././style/font-awesome.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Enrolment extends React.Component{  
  constructor(props){
    super(props);
    this.state = {
      assessment:[],
      block:[],
      blockValue:"",
      category: ['IDNO','FIRST NAME','LAST NAME'],
      cor:[],
      coursenodesc:"",
      enrollcoursenodesc:"",
      courseno:[],
      coursenoValue:"",
      courses: [],
      curriculum:[],
      curriculumValue:"",
      disableSy:false,
      disableSem:false,
      disableMajor:true,
      disableYear:true,
      disableBlock:true,
      disableStatus:true,
      disableSchostat:true,
      disableCurr:true,
      enrolledCourses:[],
      gpa:"0",
      isContinue: false,
      inputOR: false,
      laboratory:"",
      enrolllaboratory:"",
      lecture:"",
      enrolllecture:"",
      major:[],
      majorValue:"",
      majorDesc:"",
      majorcurr:[],
      maxload:"0",
      modalIsOpen1:false,
      modalIsOpen2:false,
      modalIsOpen3:false,
      modalIsOpen4:false,
      modalIsOpen5:false,
      modalIsOpenprint:true,
      orno:"",
      program:[],
      registration:[],
      removebutton:false,
      saving_mode:"",
      scholar:[],
      scholarsdetail:[],
      schosta:[],
      schostaValue:"",
      schocsta:"REGULAR",
      searchData:"",
      searchOutput:[],
      sem:[],
      semValue:"",
      semstudent:[],
      showSubmitVerCode:false,
      status:[],
      stat:[],
      statusValue:"",
      student:[],
      studSelected:[],
      studenttag:[],
      studid:"",
      studname:"",
      sy:[],
      syValue:"",
      sysem:[],
      unit:"",
      enrollunit:"",
      updateCategory:"--Select",
      url:"http://192.168.5.146:3000/",
      verificationCode:"",
      year:[],
      yearValue:"1"
    };
    this.evalSemStudent = this.evalSemStudent.bind(this);
    this.yearLevelList = this.yearLevelList.bind(this);
    this.handleCourseNumberChange = this.handleCourseNumberChange.bind(this);
  }
  
  componentDidMount(){
    console.log("mounted");
    var that = this;
      axios.all([
        GetStudent(), 
        GetSysem(), 
        GetSemStudents(), 
        GetScholar(),
        GetProgram(),
        GetCurriculum(),
        GetRegistration(),
        GetStatus(),
        GetStudenttag(),
        GetScholarsDetail(),
        GetCourses()
      ]).then( axios.spread(function (
         student, 
         sysem, 
         semstudent,
         scholar,
         program,
         curriculum,
         registration,
         status,
         studenttag,
         scholarsdetail,
         courses){
           console.log(status.data);
            that.setState({
              student:  student.data,
              sysem:  sysem.data,
              semstudent: semstudent.data,
              scholar: scholar.data,
              program: program.data,
              curriculum: curriculum.data,
              registration: registration.data,
              status: status.data,
              studenttag: studenttag.data,
              scholarsdetail: scholarsdetail.data,
              courses:courses.data
            });    
        }
      )).catch(error => {
          console.log(error);
          alert("Error occured!");
      });            
  }

  handleSearchInputChange(e){
    this.setState({searchData: e.target.value});
  }

  handleStudentIDChange(e){
    this.setState({studid: e.target.value});
  }

  handleStudentNameChange(e){
    this.setState({studname: e.target.value.toUpperCase()});
  }

  handleMajorDescChange(e){
    this.setState({ majorDesc: e.target.value});
  }

  handleMaxLoadChange(e){
    this.setState({ maxload: e.target.value});
  }

  handleSchocStatChange(e){
    this.setState({schocsta: e.target.value});
  }

  handleCourseDescriptionChange(e){
    this.setState({ coursenodesc: e.target.value });
  }

  handleLaboratoryChange(e){
    this.setState({ laboratory: e.target.value });
  }

  handleLectureChange(e){
    this.setState({ lecture: e.target.value });
  }

  handleUnitChange(e){
    this.setState({ unit: e.target.value });
  }
  handleEnrollLaboratoryChange(e){
    this.setState({ enrolllaboratory: e.target.value });
  }

  handleEnrollLectureChange(e){
    this.setState({ enrolllecture: e.target.value });
  }

  handleEnrollUnitChange(e){
    this.setState({ enrollunit: e.target.value });
  }

  handleVerificationCodeChange(e){
    this.setState({ 
      verificationCode: e.target.value,
      showSubmitVerCode:true
     });
  }
  handleORNOChange(e){
    this.setState({
      orno: e.target.value
    });
  }

//*** Searching ***//

  searchClicked(){
    let category = this.state.updateCategory;      /* Selected Category data*/
    let search = this.state.searchData.trim().toUpperCase();
    let stud = this.state.student;
    let j=0;
    var cnt = this.state.sysem.length;
  //*** Getting SY ***//
    var schoolyr= this.state.sysem.map(obj => obj.sy);
    var defaultsy = schoolyr[cnt-1];
    // console.log(defaultsy);
  //*** End of getting SY ***//

  //*** Getting SEM ***//
    var sem= this.state.sysem.map(obj => obj.sem);
    var defaultsem = sem[cnt-1];
    console.log(defaultsem);
  //*** End of getting SEM ***//

    this.setState({
      syValue: defaultsy,
      semValue: defaultsem
    });

            //** Search Category Switching
                  switch(category){
/* ID Selected */
                      case 'IDNO':
                                  let studid = this.state.student.map(obj => obj.studid);

                                  for(var i=0; i<this.state.student.length; i++){
                                    if(search === studid[i]){
                                      j=i;
                                    }
                                  }
                                  console.log(j);
                                  console.log(stud[j]);
                                  if(j <= 0){
                                    // axios.get(this.state.url + 'getIDSearchCategory',{params: {search: search}})
                                    // .then(response => {
                                    //   console.log(response.data);
                                    // })
                                    // .catch(error => {
                                    //   console.log(error);
                                    //   alert("Error occured!");
                                    // });
                                    alert("Sorry no record found!");
                                  }else{
                                    this.setState({
                                      searchOutput:stud[j],
                                      studid: stud[j].studid,
                                      studname: stud[j].lastname + ', ' + stud[j].firstname + ' ' + stud[j].middlename 
                                    });
                                    this.evalSemStudent(defaultsem,defaultsy,stud[j].studid);    
                                    var cor = this.state.cor;
                                    cor.push(stud[j].lastname, stud[j].firstname , stud[j].middlename);                                
                                    // this.yearLevelList();
                                  }
/* END of ID Selection */         break;

/* Last Name Selected */
                      case 'LAST NAME':
                                  let studln = this.state.student.map(obj => obj.lastname);
                                  let searchln = this.state.searchOutput;
                                  let ln=0;
                                  for(var l=0; l<this.state.student.length; l++){
                                    if(search === studln[l].trim().toUpperCase()){
                                      searchln.push(stud[l]);
                                      console.log(stud[l])
                                      j++;
                                      ln=l;
                                    }
                                    // console.log(/search/.test(studln[l].trim().toUpperCase()));
                                  }
                                  this.setState({searchOutput:searchln });

                                  if(j > 0){
                                    this.setState({
                                      majorValue:"",
                                      yearValue:"",
                                      block:[],
                                      blockValue:"",
                                      statusValue:"",
                                      majorDesc:"",
                                      modalIsOpen2: true});
                                    console.log(this.state.searchOutput);
                                  }else if(j <= 0){
                                    alert("Sorry no record found!");
                                  }
                                  // console.log(j)
                                  // console.log(stud[j].lastname);
                                  // axios.post(this.state.url + 'getLastNameSearchCategory',{params: {search: search}})
                                  // .then(response => {
                                  //   console.log(response);
                                  // })
                                  // .catch(error => {
                                  //   console.log(error.response);
                                  //   alert("Error occured!");
                                  // });
                                  break;
/* END of Last Name Selection */

/* First Name Selected */
                      case 'FIRST NAME':
                                    let studfn = this.state.student.map(obj => obj.firstname);
                                    let searchfn = this.state.searchOutput;

                                    for(var f=0; f<this.state.student.length; f++){
                                      if(search === studfn[f].trim().toUpperCase()){
                                        searchfn.push(stud[f]);
                                        console.log(stud[f])
                                        j++;
                                      }
                                    }
                                    this.setState({searchOutput:searchfn });

                                    if(j > 0){
                                      this.setState({modalIsOpen2: true});
                                      console.log(this.state.searchOutput);
                                    }else if(j <= 0){
                                      alert("Sorry no record found!");
                                    }
                                    // axios.post(this.state.url + 'getFirstNameSearchCategory', {params: {search: search}})
                                    // .then(response => {
                                    //   console.log(response);
                                    // })
                                    // .catch(error => {
                                    //   console.log(error.response);
                                    //   alert("Error occured!");
                                    // });
                                    break;
/* END of First Name Selection */
                    default: alert("Select category of data supplied.");
                  }
  }

//*** END of Searching ***//

//*** Save Student information to enroll*/
saveClicked(){
  let studid = this.state.studid;
  let sy = this.state.syValue;
  let sem = this.state.semValue;
  let enrolledCourses = this.state.enrolledCourses;
  var now = new Date();
  let regdate = dateformat(now, "yyyy-mm-dd");
  let regparams = { 
    studid: studid,
    sy: sy,
    sem:sem, 
    block: this.state.blockValue,
    progcode:this.state.majorValue,
    year: this.state.yearValue
  };
  let params={
    studid:this.state.studid,
    sy:this.state.syValue, 
    sem: this.state.semValue 
  };
  let enrollparams={
    studid: this.state.studid,
    sy: this.state.syValue,
    sem: this.state.semValue,
    major: this.state.majorValue,
    year: this.state.yearValue,
    scholarcode:this.state.scholarcode,
    scholastic_stat: this.state.schocstat,
    status: this.state.statusValue,
    cur_year: this.state.curriculumValue,
    block: this.state.blockValue,
    maxload: this.state.maxload,
    gpa: this.state.gpa,
    regdate: regdate,
    savemode: this.state.saving_mode
  };
  
      CheckStudentPayment(params)
        .then(response => { 
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });

      if(this.state.majorValue === '' || this.state.yearValue === ''){
        alert("Warning: Input program and yearlevel to proceed.");
      }else{
        EnrollStudent(enrollparams)
          .then(response => { 
            alert(response.data.message);
            if(response.data.status === "OK"){
              this.setState({isContinue: true});
            }
          })
          .catch(error => {
            console.log(error.response);
          });
          
        OfferingToStudent(regparams)
          .then(response => { 
            console.log(response);
            alert(response.data.message);
          })
          .catch(error => {
            console.log(error.response);
          });
      }

      if(this.state.majorValue !== 'ELEM' || this.state.majorValue !== 'HS'){
        Registration(params)
          .then(response => { 
            console.log(response);
            this.setState({enrolledCourses: response.data});
          })
          .catch(error => {
            console.log(error.response);
          });
      }     
}

//*** End of saving student information */

//*** Retrieving record of student searched ***//
  evalSemStudent(semVal,syVal,idVal){
    let currcode = this.state.curriculum.map(obj => obj.progcode);
    let curr = this.state.curriculum.map(obj => obj.yearcreated);
    let progcode = this.state.program.map(obj => obj.progcode);
    let progdesc = this.state.program.map(obj => obj.progdesc);
    let scholarcode = this.state.scholar.map(obj => obj.scholarcode);
    let scholar = this.state.scholar.map(obj => obj.scholar);
    let scholarsid = this.state.scholarsdetail.map(obj => obj.studid);
    let scholarscode = this.state.scholarsdetail.map(obj => obj.scholarcode);
    let schocode ="";
    let sem = semVal;
    let sy =syVal;
    let studid = idVal;
    let semstudent = this.state.semstudent;
    let semstudid = this.state.semstudent.map(obj => obj.studid);
    let semstudsem = this.state.semstudent.map(obj => obj.sem);
    let semstudsy = this.state.semstudent.map(obj => obj.sy);
    let {studenttag} = this.state;
    let studtagid = this.state.studenttag.map(obj => obj.studid);
    let studtagsy = this.state.studenttag.map(obj => obj.sy);
    let studtagsem = this.state.studenttag.map(obj => obj.sem);
    let {sysem} = this.state.sysem;
    let syr = this.state.sysem.map(obj => obj.sy);
    let sm = this.state.sysem.map(obj => obj.sem);
    let params = {studid: studid, sem: sem , sy: sy};
    let offerclerparams = {studid: studid, sem: sem , sy: sy, progcode: this.state.majorValue, year: this.state.curriculumValue}
    let j=0;
    let ifFound=false;
    var curryears = [], res= [];
    let stat = this.state.status.map(obj => obj.statusdesc);

    this.setState({stat: stat, major: progcode });
    // console.log(studenttag);
    // console.log(sem);
    // console.log(sy);
    // console.log(studid);
    // console.log(semstudent.length);
    // console.log(semstudid);
    // console.log(semstudsem);
    // console.log(semstudsy);
  
    for(var i=0; i < semstudent.length; i++){

//***** If student searched exists */
      if(studid === semstudid[i] && sem === semstudsem[i] && sy === semstudsy[i]){
         
                    ifFound = true;   
                    this.setState({
                          majorValue: semstudent[i].studmajor,
                          gpa: semstudent[i].gpa,
                          yearValue: semstudent[i].studlevel,
                          curriculumValue:semstudent[i].cur_year,
                          statusValue: semstudent[i].status,
                          //blockValue: semstudent[i].block,
                          // schocsta: semstudent[i].standing,
                          disableMajor:true,
                          disableYear:true,
                          disableBlock:true,
                          disableStatus:true,
                          disableSchostat:true,
                          disableCurr:true,
                          saving_mode: "UPDATE"},() => {
                            this.yearLevelList();
                          });
                        console.log(params);
                   
                //*** If student's major is ELEM or HS */
                    if( semstudent[i].studmajor === 'ELEM' || semstudent[i] === 'HS'){
                        console.log("Secondary pa");
                    }else{
                      NotCollegeEvaluation(params)
                        .then(response => { 
                          console.log(response);
                        })
                        .catch(error => {
                          console.log(error.response);
                        });
                    }
              //***Retrieve student's major description with progcode  */
                    for(var p=0; p < progcode.length; p++){
                      if( semstudent[i].studmajor === progcode[p]){
                        this.setState({
                          majorDesc: progdesc[p]
                        });
                      }
                    }

              //***Retrieve scholarship status with scholarcode */
                    for(var s=0; s < scholar.length; s++){
                      if(semstudent[i].scholarcode === scholarcode[s]){
                          this.setState({
                            schostaValue: scholar[s],
                            scholarcode: semstudent[i].scholarcode });
                      }
                    }
      }            
    }
//*** If student searched not yet encoded for current enrolment check students maybe enrolled in previous sems */
    if(!ifFound){
      
                for(var x=0; x < studenttag.length; x++){
                  if(studid === studtagid[x] && sy === studtagsy[x] && sem === studtagsem[x] ){
                    this.setState({
                        statusValue: studenttag[x].status
                    });
                    console.log(this.state.statusValue);
                  }
                }
                console.log("danhi");
                FirstStudentDataRetrieve(params)
                  .then(response => { 
                    this.setState({
                      majorValue: response.data[0].studmajor,
                      curriculumValue: response.data[0].cur_year,
                      schostaValue: response.data[1][0].standing,
                      gpa: response.data[2][0].gpa,
                      statusValue:'OLD',
                      saving_mode: "INSERT"
                    },() => {
                      this.yearLevelList();
                      for(var x=0; x < this.state.program.length; x++){
                        if(progcode[x] === this.state.majorValue){
                          this.setState({
                            majorDesc: progdesc[x]
                          });
                        }
                      }
                    });
                  })
                  .catch(error => {
                    console.log(error.response);
                  });
                                
                //##### Check grant to user logged in #####//
                
                //##### Enroll.pas Ln 1502-1519 #####/
                
                for( var v=0;v < this.state.scholarsdetail; v++){
                  console.log("nisulod man");                  
                  if( studid === scholarsid[v]){
                    schocode = scholarscode[v];
                    console.log(scholarscode[v]);
                  }
                  else{
                    schocode = '0';
                  }  
                }

                for(var l=0;l < this.state.scholar.length; l++){
                  if( schocode === scholarcode[l]){
                    this.setState({ schostaValue: scholar[l], 
                      scholarcode:scholarcode[l] },()=>{
                      });
                  }
                }         
    }

    this.yearLevelList();

//*** Get student's max load ***//    
    GetMaxload(params)          
    .then(response => { 
      console.log(response);
      this.setState({
        maxload : response.data[0].maxload,
        schocsta: response.data[1][0].status
      });
    })
    .catch(error => {
      console.log(error.response);
    });  

    CheckStudentOffering(offerclerparams)
    .then(response => { 
        console.log(response.data);        
        this.setState({
          modalIsOpen3:true,
          courseno: response.data.map(obj => obj.subjcode)
        });      
    })
    .catch(error => {
      console.log(error.response);
    });
}
//*** END of retrieval of record of student searched ***//

//**** Verification code submission ***/
vercodeSubmit(){
  let params = {
    studid: this.state.studid, 
    sy: this.state.syValue, 
    sem: this.state.semValue,
    vercode: this.state.verificationCode,
    maxload: this.state.maxload
  };

  VerificationCodeSub(params)
      .then(response => { 
        console.log(response);
        alert(response.data.message);
      })
      .catch(error => {
        console.log(error.response);
      });
}
//**** END of Verification code submission ***/

//***YearLevelList */
yearLevelList(){
  let major = this.state.majorValue;
  let prog = this.state.program.map(obj => obj.progcode);
  let col = this.state.program.map(obj => obj.college);
  let currcode = this.state.curriculum.map(obj => obj.progcode);
  let curr = this.state.curriculum.map(obj => obj.yearcreated);
  var j=0;
  var curryears = [];
  var params ={ progcode: this.state.majorValue, sy: this.state.syValue, sem: this.state.semValue };
          
  
          this.setState({
            disableMajor:false,
            disableYear: false,
            disableBlock:false,
            disableCurr:false,
            disableStatus: false
          });

          // if(grp_name === 'guidance'){
          //   this.setState({
          //     disableStatus: false,
          //     disableSchostat:false
          //   });
          // }

          for(var i=0; i < this.state.program.length; i++){
            if( prog[i] === major){
                if(col[i] === 'ELEM'){
                  this.setState({
                    year: ['1','2','3','4','5','6']
                  });
                }else if(col[i] === 'CEIT'){
                  this.setState({
                    year:['1','2','3','4','5']
                  });
                }else{
                  this.setState({
                    year:['1','2','3','4']
                  });
                }
            }
          }

          for(var c=0; c < curr.length; c++){
            if(major === currcode[c]){
              curryears[j] = curr[c];
              j++;
            }      
          }
          
          this.setState({
            modalIsOpen3:true,
            majorcurr: curryears
          });

          console.log(params);
          GetBlocks(params)
          .then(response => { 
              console.log(response);
              this.setState({
                block: response.data
              });
          })
          .catch(error => {
              console.log(error.response);
          });

}

//*** Call when a row is selected from multiple search result ***//
rowSelect(row){
  let sy = this.state.syValue;
  let sem = this.state.semValue;
  var cor = this.state.cor;
  
  cor.push( row.lastname ,row.firstname , row.middlename);

  this.setState({
    modalIsOpen3:true,
    modalIsOpen2:false,
    studid: row.studid,
    studname: row.lastname + ', ' + row.firstname + ' ' + row.middlename
  });
  this.evalSemStudent(sem,sy,row.studid);
}
//*** END of row selection ***//

//*****On Enrolled Courses row click  ***/
enrolledCoursesRowClicked(row){
  let studid = this.state.studid;
  let sy = this.state.syValue;
  let sem = this.state.semValue; 
  let subjcode = row.subjcode;
  let section = row.section;
  let enrolled = this.state.enrolledCourses;
  console.log(enrolled);

  let courseno = this.state.courses.map(obj => obj.courseno);
  let coursedesc = this.state.courses.map(obj => obj.description);
  let lab = this.state.courses.map(obj => obj.lab);
  let lec = this.state.courses.map(obj => obj.lec);
  let unit = this.state.courses.map(obj => obj.unit);
  let s = this.state.enrolledCourses.map(obj => obj.subjcode);

  let params = {studid: studid,sy:sy,sem:sem,subjcode:subjcode,section:section};
  var j=0;

  for(var i=0; i<this.state.enrolledCourses.length; i++){
    if(subjcode === s[i]){
      j=i;
      console.log(i);
    }
  }
console.log(j);
  CancelEnrollCourse(params)
  .then(response => { 
    console.log(response);
    console.log(enrolled,j);
    if(response.data.can_delete === "TRUE" ){
      alert(response.data.message);
      enrolled.splice(j,1);
      console.log(enrolled)
      this.setState({enrolledCourses: enrolled});     
    }else{
      this.setState({modalIsOpen4: true});         
    }
  })
  .catch(error => {
      console.log(error.response);
  });
  for(var z=0; z < this.state.courses.length; z++){   
    if(courseno[z] === row.courseno){
      //console.log(subjcode[z]);
      this.setState({
        enrolllaboratory: lab[z],
        enrolllecture: lec[z],
        enrollunit: unit[z],
        enrollcoursenodesc:  coursedesc[z]
      });
    }
  }
}
deleteConfirmed(){
  let studid = this.state.studid;
  let sy = this.state.syValue;
  let sem = this.state.semValue;
  let delparams = {studid: studid,sy:sy,sem:sem};

  DeleteStudentRec(delparams)
      .then(response => { 
        console.log(response);
        if(response.data.isdeleted=== "TRUE"){
          alert(response.data.message);              
        }else{
          alert("Deletion unsuccessful!");
        }        
      })
      .catch(error => {
          console.log(error.response);
      });   
}
//****End enrolled courses on row click  ***/

//*****On Offered Courses row click  ***/
offeredCoursesRowClicked(row){
  let studid = this.state.studid;
  let sy = this.state.syValue
  let sem = this.state.semValue; 
  let subjcode = this.state.coursenoValue;
  let section = row.section;
  let progcode = this.state.majorValue;
  let courseno = row.courseno;
  let maxload = this.state.maxload;
  let days = row.days;
  let time = row.skedtime;
  let cdesc = this.state.coursenodesc;
  let lab = this.state.lab;
  let lec = this.state.lec;
  let unit = this.state.unit;
  let enroll ={
    courseno: courseno,
    section: section,
    days:days,
    skedtime: time,
    cdesc: cdesc,
    lab: lab,
    lec: lec,
    unit: unit,
    subjcode: subjcode};
    console.log(time);
  let params = {
    studid: studid,
    sy:sy,
    sem:sem,
    subjcode:subjcode,
    section:section,
    progcode:progcode,
    courseno:courseno,
    maxload:maxload
  }
console.log(params);

  EnrollCourse(params)
  .then(response => { 
    console.log(response);
    alert(response.data.message);
    let e = this.state.enrolledCourses;
    if(response.data.add === "TRUE"){
      e.push(enroll);
      console.log(enroll);
      this.setState({
        enrollcoursenodesc: cdesc,
        enrolllaboratory: lab,
        enrolllecture: lec,
        enrollunit: unit
      });
    }
  })
  .catch(error => {
      console.log(error.response);
  });
  
}
//****End enrolled courses on row click  ***

//*** To clear search input ***//
  clearClicked(){
    this.setState({searchData: ""});
  }

//*** End of clearing search input***//

handleCourseNumberChange(){
  let sy = this.state.syValue;
  let sem = this.state.semValue;
  let subjcode = this.state.coursenoValue;
  let progcode = this.state.majorValue;
  let params= { sy: sy, sem:sem,subjcode:subjcode,progcode:progcode};

  GetSections(params)
  .then(response => { 
    console.log(response);
    if(response.data.haveSection === "FALSE"){
      alert("No available section for this course!");
      this.setState({offeredCourses: []});
    }else{
      this.setState({offeredCourses: response.data.result});
    }
  })
  .catch(error => {
      console.log(error.response);
  });
}

doneAddCourse(){
  this.setState({
    modalIsOpen1:true,
    modalIsOpen2:false,
    modalIsOpen3:false,
    isContinue:false,
    courseno: ""
  });
}

printClicked(){
  let param = {studid: this.state.studid, sy: this.state.syValue,sem: this.state.semValue,progcode: this.state.majorValue};
console.log(param);
  CheckClearance(param)
    .then(response => { 
      if(response.data.cleared === "true"){
        alert(response.data.message);
        this.GPA.bind(this);

        TuitionComputation(param)
          .then(response => { 
            console.log(response.data);              
              let totalpayable = response.data.totalpayable;            
              let params ={
                studid:this.state.studid, 
                sy:this.state.syValue,
                sem: this.state.semValue,
                totalpayable:totalpayable,
                username: "pacot" 
              };
              this.setState({ assessment: response.data.result});
              Skedfees(params)
                .then(response => { 
                  console.log(response.data);
                  this.setState({modalIsOpen5:true});                
                })
                .catch(error => {
                    console.log(error.response);
                });  
          })
          .catch(error => {
              console.log(error.response);
          });
        //**print
      }else{
        alert(response.data.message);
        //**do not print */
      }
    })
    .catch(error => {
        console.log(error.response);
    });

    
}

printCORSOAConfirm(){
  this.setState({ inputOR: true});
}

submitOR(){
  var now = new Date();
  let dateValidated = dateformat(now, "yyyy-mm-dd");
  let params={studid: this.state.studid,sy: this.state.syValue,sem: this.state.semValue, or:this.state.orno,current:'pacot',current_date:dateValidated};
  console.log("sulod man");
  CORSOA(params)
    .then(response => { 
      console.log(response.data);    
    })
    .catch(error => {
        console.log(error.response);
    });
}

GPA(){
    var cnt = this.state.sysem.length;
    var schoolyr= this.state.sysem.map(obj => obj.sy);
    var prevsy = schoolyr[cnt-2];
    var sem= this.state.sysem.map(obj => obj.sem);
    var prevsem = sem[cnt-2];
    let studid = this.state.studid;
    let params= { studid: studid, prevsy:prevsy, prevsem: prevsem};

    GeneralPercentageAverage(params)
      .then(response => { 
        console.log(response.data);
        alert(response.data.message);
      })
      .catch(error => {
          console.log(error.response);
      });

}

continueClicked(){
  this.setState({
    modalIsOpen3: false,
    modalIsOpen1:false
  });
}



//*** To close Modal ***//

  closeModal1(){
    this.setState({
      modalIsOpen1: false});
  }

  closeModal2(){
    this.setState({
      modalIsOpen2: false,
      searchOutput:[]});
  }
  closeModal3(){
    this.setState({
      modalIsOpen1:true,
      modalIsOpen3: false,
      modalIsOpen2:false,
      searchOutput:[],
      majorValue:"",
      yearValue:"",
      block:[],
      blockValue:"",
      statusValue:"",
      majorDesc:"",
      curriculumValue:""
    });
  }
  closeModal4(){
    this.setState({
      modalIsOpen4: false
    });
  }
  closeModal5(){
    this.setState({
      modalIsOpen5: false
    });
  }
  closePrintModal(){
    this.setState({
      modalIsOpenprint:false
    });
  }

//*** End of closing Modal ***//

  render(){

//***  Styles in modal for searching ***//

    const customStyles1 = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : '40%',
        bottom                : 'auto',
        marginRight           : '-30%',
        transform             : 'translate(-50%, -50%)'
      }
    };
//*** End of Styles in modal for searching ***//

//***  Styles in modal for multiple search results ***//
    const customStyles2 = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '50%',
        bottom                : 'auto%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
//*** End of Styles in modal for multiple search results ***//

//***  Styles in modal for data fields ***//
    const customStyles3 = {
      content : {
        top                   : '50%',
        left                  : '50%',
        right                 : '10%',
        bottom                : 'auto',
        marginRight           : '-20%',
        transform             : 'translate(-50%, -50%)'
      }
    };
//*** End of Styles in modal for data fields ***//

//***  Styles in modal for student deletion confirmation ***//

const customStyles4 = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : '40%',
    bottom                : 'auto',
    marginRight           : '-30%',
    transform             : 'translate(-50%, -50%)'
  }
};
//*** End of Styles in modal for student deletion confirmation ***//

//***  Styles in modal for COR printing confirmation ***//

const customStyles5 = {
  content : {
    top                   : '40%',
    left                  : '50%',
    right                 : '40%',
    bottom                : 'auto',
    marginRight           : '-30%',
    transform             : 'translate(-50%, -50%)'
  }
};
//*** End of Styles in modal for COR printing confirmation ***//


//*** For Selecting row ***//
  const options = {
    mode:'radio',
      bgColor: '#18ffff',
      hideSelectColumn:true,
      clickToSelect:true,
      onSelect: this.rowSelect.bind(this)
  };

  const options1 = {
    mode:'radio',
      bgColor: '#b2ebf2',
      hideSelectColumn:true,
      clickToSelect:true,
      onSelect: this.offeredCoursesRowClicked.bind(this)
  };

  const options2 = {
    mode:'radio',
      bgColor: '#ffab91',
      hideSelectColumn:true,
      clickToSelect:true,
      onSelect: this.enrolledCoursesRowClicked.bind(this)
  };
//*** End for Selecting row ***//

    let syr = this.state.sysem.map(obj => obj.sy);
    var schoolyr = syr.filter((v,i,a) => a.indexOf(v) === i);

    let sm = this.state.sysem.map(obj => obj.sem);
    var semester = sm.filter((v,i,a) => a.indexOf(v) === i );

    let block = this.state.block.map(obj => obj.block);
    let progcode = this.state.program.map(obj => obj.progcode);
    let progdesc = this.state.program.map(obj => obj.progdesc);
    let subjcode = this.state.courses.map(obj => obj.subjcode);
    let courseno = this.state.courses.map(obj => obj.courseno);
    let coursedesc = this.state.courses.map(obj => obj.description);
    let lab = this.state.courses.map(obj => obj.lab);
    let lec = this.state.courses.map(obj => obj.lec);
    let unit = this.state.courses.map(obj => obj.unit);   
    var now = new Date();

    return(
      <div>
        <div className="SearchModal">
            <Modal
              isOpen={this.state.modalIsOpen1}
              onRequestClose={this.closeModal1.bind(this)}
              closeTimeoutMS={200}
              contentLabel="Add Program"
              ariaHideApp={false}
              style={customStyles1}
              overlayClassName="Overlay">
              <p className="TimeText">Server Date and Time:</p>  
              <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy h:MM:ss TT")}</p>
              <div className="SearchPageLeft">                
                  <DropdownList
                    data={this.state.category}
                    name="category"
                    label="Category"
                    value={this.state.updateCategory}
                    onChange={value => this.setState({ updateCategory: value })}/> <br/>                                      
              </div>&nbsp;
              <div className="SearchPageRight">                
                  <Input
                      name="searchdata"
                      label="Search"
                      placeholder=""
                      value={this.state.searchData}
                      onChange={this.handleSearchInputChange.bind(this)}/><br/>
              </div><br/>
              <div className="SButtons">                  
                  <Button
                        className="SearchButtons"
                        primary={true}
                        btnName={<i className="fa fa-arrow-right">&nbsp;Go</i>}
                        onClick={this.searchClicked.bind(this)}/>&nbsp;&nbsp;

                  <Button
                    className="SearchButtons"
                    btnName={<i className="fa fa-undo">&nbsp;Clear</i>}
                    onClick={this.clearClicked.bind(this)} />
              </div>
            </Modal>
          </div>

          <div>
            <Modal
              isOpen={this.state.modalIsOpen2}
              onRequestClose={this.closeModal2.bind(this)}
              closeTimeoutMS={200}
              contentLabel="Choose student"
              ariaHideApp={false}
              style={customStyles2}
              overlayClassName="Overlay">

              <BootstrapTable
                data={this.state.searchOutput}
                selectRow={options}
                height={350}>
                  <TableHeaderColumn
                    dataField='studid'
                    isKey
                    width="100">Student ID</TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='lastname'
                    width="100">Lastname</TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='firstname'
                    width="100">Firstname</TableHeaderColumn>
                  <TableHeaderColumn
                    dataField='middlename'
                    width="100">Middlename</TableHeaderColumn>
              </BootstrapTable>

              <Button
                btnName={<i className="fa fa-times">&nbsp;Close</i>}
                onClick={this.closeModal2.bind(this)}/>

            </Modal>
          </div>
          {/* <div className="PosComponent"> */}
              <Modal
                isOpen={this.state.modalIsOpen3}
                onRequestClose={this.closeModal3.bind(this)}
                closeTimeoutMS={200}
                contentLabel="Add Program"
                ariaHideApp={false}
                style={customStyles3}
                overlayClassName="Overlay">

                    <div className="LComponent">
                      <p className="TimeText"> Server date and time:&nbsp; </p>
                      <DropdownList
                        disabled={this.state.disableSy}
                        data={schoolyr}
                        name="sy"
                        label="SY"
                        value={this.state.syValue}
                        onChange={value => this.setState({ syValue: value })}/>
                      <Input
                        name="idno"
                        label="ID Number"
                        placeholder=""
                        value={this.state.studid}
                        onChange={this.handleStudentIDChange.bind(this)}/>
                      <DropdownList
                        disabled={this.state.disableMajor}
                        data={this.state.major}
                        name="major"
                        label="Major"
                        value={this.state.majorValue}
                        onChange={value => this.setState({ majorValue: value},() =>{ 
                          for(var x=0; x < this.state.program.length; x++){
                            if(progcode[x] === this.state.majorValue){
                              this.setState({
                                majorDesc: progdesc[x],
                                blockValue:""
                              });
                            }
                          }
                          this.yearLevelList();
                        })}/>
                      <DropdownList
                        disabled={this.state.disableYear}
                        data={this.state.year}
                        name="year"
                        label="Year"
                        value={this.state.yearValue}
                        onChange={value => this.setState({ yearValue: value })}/>
                      <DropdownList
                        disabled={this.state.disableBlock}
                        data={block}
                        name="block"
                        label="Block"
                        value={this.state.blockValue}
                        onChange={value => this.setState({ blockValue: value }, () =>{
                          this.saveClicked.bind(this);
                        })}  />
                      <DropdownList
                        disabled={this.state.disableStatus}
                        data={this.state.stat}
                        name="status"
                        label="Status"
                        value={this.state.statusValue}
                        onChange={value => this.setState({statusValue: value })}  />
                      <DropdownList
                        disabled={this.state.disableSchostat}
                        data={this.state.schosta}
                        name="scholarshipstatus"
                        label="Scholarship Status"
                        value={this.state.schostaValue}
                        onChange={value => this.setState({ schostaValue: value})}  />
                    </div>
                    <div className="RComponent">
                      <p className="TimeText"> {dateformat(now, "dddd, mmmm d, yyyy h:MM:ss TT")}</p>
                      <DropdownList
                        disabled={this.state.disableSem}
                        data={semester}
                        name="sem"
                        label="Sem"
                        value={this.state.semValue}
                        onChange={value => this.setState({ semValue: value })}/>
                      <Input
                          name="studname"
                          label="Name"
                          placeholder=""
                          value={this.state.studname}
                          onChange={this.handleStudentNameChange.bind(this)}/>

                      <Input
                      className="MajorValueInput"
                        name="majorDesc"
                        label="Description"
                        placeholder=""
                        value={this.state.majorDesc}
                        onChange={this.handleMajorDescChange.bind(this)} />

                      <DropdownList
                        disabled={this.state.disableCurr}
                        data={this.state.majorcurr}
                        name="curriculum"
                        label="Curriculum"
                        value={this.state.curriculumValue}
                        onChange={value => this.setState({ curriculumValue: value })}/>

                      <Input
                        name="maxload"
                        label="Max Load"
                        placeholder=""
                        value={this.state.maxload}
                        onChange={this.handleMaxLoadChange.bind(this)} /><br/><br/><br/><br/>
                      <Input
                        name="scholasticstatus"
                        label="Scholastic Status"
                        placeholder=""
                        value={this.state.schocsta}
                        onChange={this.handleSchocStatChange.bind(this)}  />
                    </div>
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <div>
                        <Button
                          className="Modal2Buttons"
                          btnName={<i className="fa fa-floppy-o">&nbsp;Save</i>} 
                          onClick={this.saveClicked.bind(this) }/>&nbsp;&nbsp;
                        <Button 
                          className="Modal2Buttons"
                          btnName={<i className="fa fa-times">&nbsp;Cancel</i>}
                          onClick={this.closeModal3.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        {this.state.isContinue && 
                          <Button
                          className="Modal2Buttons"
                          btnName={<i className="fa fa-arrow-right">&nbsp;Continue</i>}
                          onClick={this.continueClicked.bind(this)} />
                        }
                    </div>
              </Modal>
              {/* </div> */}
              <div>
              <div className="CoursesAdding">
                  
                  <div className="infodiv">
                    <p className="TimeText">Server Date and Time:</p>
                    <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p><br/>
                    <h6>{this.state.studid}</h6>&nbsp;&nbsp;
                    <h6>{this.state.studname}</h6>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;                    
                    {/* <div>
                        <ReactToPrint
                          trigger={() => <Button
                                            className="CoursesButtons"
                                            btnName={<i className="fa fa-print">Print</i>}
                                            onClick={this.printClicked.bind(this)}/>}
                          content={() => this.print}
                        />
                        <COR ref= {p => (this.print = p)}/> 

                    </div> */}
                    <Button
                          className="CoursesButtons"
                          primary={true}
                          btnName={<i className="fa fa-print fa-3x">&nbsp;Print</i>}
                          onClick={this.printClicked.bind(this)}/>
                    <Button
                          className="CoursesButtons"
                          btnName={<i className="fa fa-check fa-lg buttonnames">&nbsp;Done</i>}
                          onClick={this.doneAddCourse.bind(this)}/>&nbsp;&nbsp;                    
                  </div>
                 
                  <h3>COURSES CONTROL</h3>
                   <div className="CourseControl">
                   <h5>Offered Courses</h5>
                       <div className="VerCode">
                          <Input
                                  name="vercode"
                                  label="Enter Verification Code:"
                                  placeholder=""
                                  value={this.state.verificationCode}
                                  onChange={this.handleVerificationCodeChange.bind(this)} />
                          <div className="VerCodeBtn">
                          {this.state.showSubmitVerCode &&
                                  <Button
                                    btnName={<i className="fa fa-floppy-o">&nbsp;Submit</i>}
                                    onClick={this.vercodeSubmit.bind(this)}/> }  
                        </div> 
                       </div>
                            
                       <div>
                          <div className="firstdiv">
                              <DropdownList
                                    data={this.state.courseno}
                                    name="courseno"
                                    label="Course Number"
                                    value={this.state.coursenoValue}
                                    onChange={value => this.setState({ coursenoValue: value }, () =>{                   
                                      for(var z=0; z < this.state.courses.length; z++){   
                                        if(subjcode[z] === this.state.coursenoValue){
                                          console.log(subjcode[z]);
                                          this.setState({
                                            laboratory: lab[z],
                                            lecture: lec[z],
                                            unit: unit[z],
                                            coursenodesc:  coursedesc[z]
                                          });
                                        }
                                      }
                                      this.handleCourseNumberChange();
                                    })}/>
                          </div>
                            
                          <div className="secdiv">
                              <Input1
                                  name="coursenodesc"
                                  label="Description"
                                  placeholder=""
                                  value={this.state.coursenodesc}
                                  onChange={this.handleCourseDescriptionChange.bind(this)} />
                          </div>
                          <div className="smalldiv">
                              <ShortInput
                                        name="lab"
                                        label="Laboratory"
                                        placeholder=""
                                        value={this.state.laboratory}
                                        onChange={this.handleLaboratoryChange.bind(this)} />
                          </div>
                          
                          <div className="smalldiv">
                                <ShortInput
                                    name="lec"
                                    label="Lecture"
                                    placeholder=""
                                    value={this.state.lecture}
                                    onChange={this.handleLectureChange.bind(this)} />
                          </div>
                          
                          <div className="smalldiv">
                                <ShortInput
                                    name="unit"
                                    label="Unit"
                                    placeholder=""
                                    value={this.state.unit}
                                    onChange={this.handleUnitChange.bind(this)} />  
                          </div> 
                            
                            <BootstrapTable
                                data={this.state.offeredCourses}
                                selectRow={options1}
                                height={300}>
                                  <TableHeaderColumn
                                    dataField='courseno'                                   
                                    width="50">COURSE NO</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='section'
                                    isKey
                                    width="50">SECTION</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='days'
                                    width="30">DAYS</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='skedtime'                               
                                    width="80">TIME</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='slots'
                                    width="30">SLOT</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='offering'
                                    width="30">TYPE</TableHeaderColumn>
                              </BootstrapTable>
                       </div>
                  </div>

                  <div className="EnrollCourses">
                   <h5>Enroll Courses</h5>                                        
                       <div className="secdiv">
                          <Input1
                              name="coursenodesc"
                              label="Description"
                              placeholder=""
                              value={this.state.enrollcoursenodesc}
                              onChange={this.handleCourseDescriptionChange.bind(this)} />
                       </div>
                       <div className="smalldiv">
                          <ShortInput
                                    name="lab"
                                    label="Laboratory"
                                    placeholder=""
                                    value={this.state.enrolllaboratory}
                                    onChange={this.handleEnrollLaboratoryChange.bind(this)} />
                       </div>
                       
                       <div className="smalldiv">
                            <ShortInput
                                name="lec"
                                label="Lecture"
                                placeholder=""
                                value={this.state.enrolllecture}
                                onChange={this.handleEnrollLectureChange.bind(this)} />
                       </div>

                       <div className="smalldiv">
                            <ShortInput
                                name="unit"
                                label="Unit"
                                placeholder=""
                                value={this.state.enrollunit}
                                onChange={this.handleEnrollUnitChange.bind(this)} />  
                       </div> 
                        
                       <BootstrapTable
                                data={this.state.enrolledCourses}
                                selectRow={options2}
                                height={300}>
                                  <TableHeaderColumn
                                    dataField='courseno'                                    
                                    width="30">COURSE NO</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='section'
                                    isKey
                                    width="40">SECTION</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='days'
                                    width="40">DAYS</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataField='skedtime'
                                    width="80">TIME</TableHeaderColumn>
                                  <TableHeaderColumn
                                    dataFormat={this.removeFormatter}
                                    width="30">ACTION</TableHeaderColumn>                                                                
                        </BootstrapTable>
                  </div>                  
              </div>   
              </div>                       
              <div className="confirmModal">
                  <Modal
                    isOpen={this.state.modalIsOpen4}
                    onRequestClose={this.closeModal4.bind(this)}
                    closeTimeoutMS={200}
                    contentLabel="Confirm"
                    ariaHideApp={false}
                    style={customStyles4}
                    overlayClassName="OverlayConfirm">
          
                    <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p>                                            
                    <div className="confirmdeleteHead">
                         <h4>Are you sure?</h4><br/>
                         <h6>You want to delete <b>STUDENT'S RECORD WITH ID {this.state.studid}</b>  for the current semester? </h6>             
                    </div>
                    <div>                        
                        <Button
                              className="ConfirmButtons"
                              btnName="No"
                              onClick={this.closeModal4.bind(this)}/>&nbsp;&nbsp;

                        <Button
                          className="ConfirmButtons"
                          btnName="Yes, delete it"
                          onClick={this.deleteConfirmed.bind(this)} />
                    </div>
                  </Modal>
              </div>
              <div>
                  <Modal
                    isOpen={this.state.modalIsOpen5}
                    onRequestClose={this.closeModal5.bind(this)}
                    closeTimeoutMS={200}
                    contentLabel="Confirm"
                    ariaHideApp={false}
                    style={customStyles5}
                    overlayClassName="Overlay">
          
                    <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p>                                            
                    <div className="confirmprintHead">
                         {/* <h4>Are you sure?</h4><br/> */}
                         <h6>Print student CORs and Statement of Account? </h6>             
                    </div>
                    <div>                        
                        <Button
                              className="ConfirmButtons"
                              btnName="No"
                              onClick={this.closeModal5.bind(this)}/>&nbsp;&nbsp;

                        <Button
                          className="ConfirmButtons"
                          btnName="Yes"
                          primary={true}
                          onClick={this.printCORSOAConfirm.bind(this)} />
                      
                          {this.state.inputOR &&
                            <div className="orno">
                                <Input
                                    name="orno"
                                    label="Enter ORNo. (Leave blank if scholar)"
                                    placeholder=""
                                    value={this.state.orno}
                                    onChange={this.handleORNOChange.bind(this)} />

                                <Button
                                  className="ConfirmButtons"
                                  btnName="Proceed"
                                  primary={true}
                                  onClick={this.submitOR.bind(this)} />
                            </div>
                          }                                            
                    </div>
                  </Modal>
                  <div>
                  <Modal
                    isOpen={this.state.modalIsOpenprint}
                    onRequestClose={this.closePrintModal.bind(this)}
                    closeTimeoutMS={200}
                    contentLabel="Print"
                    ariaHideApp={false}
                    className="Modal"
                    overlayClassName="Overlay">

                        <ReactToPrint
                          trigger={() => <Button
                                            className="CoursesButtons"
                                            primary={true}
                                            btnName={<i className="fa fa-print">&nbsp;Print</i>}/>}
                          content={() => this.print}
                        />
                        <COR ref= {p => (this.print = p)} assess={this.state.assessment}/> 
                    
                  </Modal>
              </div>
              </div>
            </div>
    );
  }
}
export default Enrolment;
