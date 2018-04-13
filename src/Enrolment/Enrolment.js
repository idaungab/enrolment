import React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';
import dateformat from 'dateformat';

// import Clock from '.././Layout/Clock';
import Button from '.././Layout/Button';
import DropdownList from '.././Layout/DropList';
import Input from '.././Layout/BasicInput';
import Input1 from '.././Layout/forenroll/BasicInput';
import ShortInput from '.././Layout/forenroll/ShortInput';
// import Select from '.././Layout/Select';

import {GetStudent, GetSysem, GetSemStudents, GetScholar, GetProgram, GetCurriculum,GetRegistration,GetStudenttag,GetScholarsDetail} from '.././serverquest/getRequests';

import '.././style/enroll.css';
import '.././style/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Enrolment extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      block:[],
      blockValue:"",
      category: ['IDNO','FIRST NAME','LAST NAME'],
      coursenodesc:"",
      courseno:[],
      coursenoValue:"",
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
      gpa:"0",
      laboratory:"",
      lecture:"",
      major:[],
      majorValue:"",
      majorDesc:"",
      majorcurr:[],
      maxload:"0",
      modalIsOpen1: true,
      modalIsOpen2:false,
      modalIsOpen3:false,
      program:[],
      registration:[],
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
      status:[],
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
      updateCategory:"--Select",
      url:"http://192.168.5.146:3000/",
      year:[],
      yearValue:"1"
    };

    this.evalSemStudent = this.evalSemStudent.bind(this);
    this.yearLevelList = this.yearLevelList.bind(this);
  }
  
  componentDidMount(){

      var that = this;
      axios.all([
        GetStudent(), 
        GetSysem(), 
        GetSemStudents(), 
        GetScholar(),
        GetProgram(),
        GetCurriculum(),
        GetRegistration(),
        GetStudenttag(),
        GetScholarsDetail()
      ]).then( axios.spread(function (
         student, 
         sysem, 
         semstudent,
         scholar,
         program,
         curriculum,
         registration,
         studenttag,
         scholarsdetail){
            that.setState({
              student:  student.data,
              sysem:  sysem.data,
              semstudent: semstudent.data,
              scholar: scholar.data,
              program: program.data,
              curriculum: curriculum.data,
              registration: registration.data,
              studenttag: studenttag.data,
              scholarsdetail: scholarsdetail.data
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


//*** Enroll new Student ***//

  newEnroll(){
  
    // ### Check grant of signed in user Ln 470- 502

        this.setState({
          disableMajor:false,
          disableYear: false,
          disableBlock:false,
          disableStatus:false,
          disableSchostat:false,
          disableCurr:false,
          modalIsOpen3:true,
          block:[],
          status:[],
          studid:"",
          studname:""
        });
}

//*** End for Enrolling new student***//

//*** Save Student information to enroll*/
saveClicked(){
  let studid = this.state.studid;
  let sy = this.state.syValue;
  let sem = this.state.semValue;
  let regparams = { 
    studid: studid,
    sy: sy,sem:sem, 
    block: this.state.blockValue,
    progcode:this.state.majorValue,
    year: this.state.yearValue
  };
  let params={
    studid:this.state.studid,
    sy:this.state.syValue, 
    sem: this.state.semValue 
  };
  var now = new Date();

      axios.post(this.state.url + 'checkStudentPayment', params)
        .then(response => { 
          console.log(response);
        })
        .catch(error => {
          console.log(error.response);
        });

      if(this.state.majorValue === "" || this.state.yearValue ===""){
        alert("Warning: Input program and yearlevel to proceed.");
      }else{
          let regdate = dateformat(now, "yyyy-mm-dd");
          axios.post(this.state.url + 'checkOfferedtoStudent', regparams)
          .then(response => { 
            console.log(response);
          })
          .catch(error => {
            console.log(error.response);
          });
      }
}

//*** End of saving student information */

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
                                    alert("ID doesn't exist");
                                  }else{
                                    this.setState({
                                      searchOutput:stud[j],
                                      studid: stud[j].studid,
                                      studname: stud[j].lastname + ', ' + stud[j].firstname + ' ' + stud[j].middlename 
                                    });
                                    this.evalSemStudent(defaultsem,defaultsy,stud[j].studid);
                                    // this.yearLevelList();
                                  }
/* END of ID Selection */         break;

/* Last Name Selected */
                      case 'LAST NAME':
                                  let studln = this.state.student.map(obj => obj.lastname);
                                  let searchln = this.state.searchOutput;
                                  var ln = 0;
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
                                    alert("Student doesn't exist");
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
                                      alert("Student doesn't exist");
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
    let clerparams = {studid: studid};
    let j=0;
    let ifFound=false;
    
    var curryears = [], res= [];
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
          console.log("danhi");
                    ifFound = true;   
                    this.setState({
                          majorValue: semstudent[i].studmajor,
                          gpa: semstudent[i].gpa,
                          yearValue: semstudent[i].studlevel,
                          curriculumValue:semstudent[i].cur_year,
                          statusValue: semstudent[i].status,
                          maxload: semstudent[i].maxload,
                          blockValue: semstudent[i].block,
                          schocsta: semstudent[i].standing,
                          disableMajor:true,
                          disableYear:true,
                          disableBlock:true,
                          disableStatus:true,
                          disableSchostat:true,
                          disableCurr:true
                        
                        });
                        console.log(semstudent[i].cur_year);

                //*** If student's major is ELEM or HS */
                    if( semstudent[i].studmajor === 'ELEM' || semstudent[i] === 'HS'){
                        console.log("Secondary pa");
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
                            schostaValue: scholar[s]
                          });
                      }
                    }
              //*** Retrieve data for curriculum correspods to student's major    
                    for(var c=0; c < curr.length; c++){
                      if(semstudent[i].studmajor === currcode[c]){
                        curryears[j] = curr[c];
                        j++;
                      }      
                    }
                    this.setState({
                      majorcurr: curryears
                    });
                }
      
                
    }
//*** If student searched not yet encoded for current enrolment check students maybe enrolled in previous sems */
    if(!ifFound){
          console.log("dadto");
                for(var x=0; x < studenttag.length; x++){
                  if(studid === studtagid[x] && sy === studtagsy[x] && sem === studtagsem[x] ){
                    this.setState({
                        statusValue: studenttag[x].status
                    });
                    console.log(this.state.statusValue);
                  }
                }

                axios.post(this.state.url + 'whenNotFoundinStudenttag', params)
                .then(response => { 
                  this.setState({
                    majorValue: response.data[0].studmajor,
                    curriculumValue: response.data[0].cur_year,
                    schocstaValue: response.data[1][0].standing,
                    gpa: response.data[2][0].gpa,
                    statusValue:'OLD'
                  });
                })
                .catch(error => {
                  console.log(error.response);
                });

                // for(var x=0; x < this.state.program.length; x++){
                //   if(progcode[x] === this.state.majorValue){
                //     this.setState({
                //       majorDesc: progdesc[x]
                //     });
                //   }
                //   console.log("dadto");
                // }
                
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
                    this.setState({ schostaValue: scholar[l]});
                  }
                }         
    } 

    this.yearLevelList();
    axios.post(this.state.url + 'checkClearance', clerparams)
    .then(response => { 
      console.log(response.data.cleared);
      if(response.data.cleared=== "true"){
        alert(response.data.message);
        this.setState({
          modalIsOpen3:true 
        }); 
        console.log("dari");
      }else{
        alert(response.data.message);
        console.log("danhi");
        this.setState({
          modalIsOpen3:false 
        }); 
      }
    })
    .catch(error => {
      console.log(error.response);
    });
}
//*** END of retrieval of record of student searched ***//

//*** Call when a row is selected from multiple search result ***//
  rowSelect(row){
    let sy = this.state.syValue;
    let sem = this.state.semValue;

    this.setState({
      modalIsOpen3:true,
      studid: row.studid,
      studname: row.lastname + ', ' + row.firstname + ' ' + row.middlename
    });
    this.evalSemStudent(sem,sy,row.studid);
  }
//*** END of row selection ***//

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
            disableBlock:false, 
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
          axios.post(this.state.url + 'getBlocks', params)
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

//*** To clear search input ***//
  clearClicked(){
    this.setState({searchData: ""});
  }

//*** End of clearing search input***//

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
      modalIsOpen3: false,
      modalIsOpen2:false,
      searchOutput:[]
      // majorValue:"",
      // yearValue:"",
      // block:[],
      // blockValue:"",
      // statusValue:"",
      // majorDesc:"",
      // curriculumValue:""
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

//*** For Selecting row ***//
  const options = {
    mode:'radio',
      bgColor: '#18ffff',
      hideSelectColumn:true,
      clickToSelect:true,
      onSelect: this.rowSelect.bind(this)
  };
//*** End for Selecting row ***//

    let syr = this.state.sysem.map(obj => obj.sy);
    var schoolyr = syr.filter((v,i,a) => a.indexOf(v) === i);

    let sm = this.state.sysem.map(obj => obj.sem);
    var semester = sm.filter((v,i,a) => a.indexOf(v) === i );

    let block = this.state.block.map(obj => obj.block);

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
                
              <div className="SearchPage">
                <p className="TimeText">Server Date and Time:</p>
                  <DropdownList
                    data={this.state.category}
                    name="category"
                    label="Category"
                    value={this.state.updateCategory}
                    onChange={value => this.setState({ updateCategory: value })}/>
              </div>&nbsp;
              <div className="SearchPage">
                <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p>
                  <Input
                      name="searchdata"
                      label="Search"
                      placeholder=""
                      value={this.state.searchData}
                      onChange={this.handleSearchInputChange.bind(this)}/><br/>
              </div><br/>
              <div className="SearchButtons">
                  {/* <Button
                        className="newBtn"
                        btnName={<i className="fa fa-edit">Add new</i>}
                        onClick={this.newEnroll.bind(this)} /> */}
                  <Button
                        btnName={<i className="fa fa-arrow-right">Go</i>}
                        onClick={this.searchClicked.bind(this)}/>&nbsp;&nbsp;

                  <Button
                    btnName={<i className="fa fa-undo">Clear</i>}
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
                btnName={<i className="fa fa-times">Close</i>}
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
                        onChange={value => this.setState({ majorValue: value})}/>
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
                        onChange={value => this.setState({ blockValue: value })}  />
                      <DropdownList
                        disabled={this.state.disableStatus}
                        data={this.state.status}
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
                      <p className="TimeText"> {dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p>
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
                    <Button
                      btnName={<i className="fa fa-save">Save</i>} 
                      onClick={this.saveClicked.bind(this) }/>&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-times">Cancel</i>}
                      onClick={this.closeModal3.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-arrow-right">Continue</i>} />
              </Modal>
              {/* </div> */}
              <div className="CoursesAdding">
                  <p className="TimeText">Server Date and Time:</p>
                  <p className="TimeText">{dateformat(now, "dddd, mmmm d, yyyy, h:MM:ss TT")}</p>
                  <h3>COURSES CONTROL</h3>
                   <div className="CourseControl">
                   <h5>Offered Courses</h5>
                       <div className="firstdiv">
                          <DropdownList
                                data={this.state.courseno}
                                name="courseno"
                                label="Course Number"
                                value={this.state.coursenoValue}
                                onChange={value => this.setState({ coursenoValue: value })}/>
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
                        
                        {/* <BootstrapTable
                            // data={this.state.semstudent}
                            height={300}>
                              <TableHeaderColumn
                                // dataField='studid'
                                isKey
                                width="50">COURSE NO</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='lastname'
                                width="30">SECTION</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='firstname'
                                width="50">DAYS</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="100">TIME</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="30">SLOT</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="30">TYPE</TableHeaderColumn>
                          </BootstrapTable> */}
                  </div>

                  <div className="EnrollCourses">
                   <h5>Enroll Courses</h5>
                       <div className="firstdiv">
                          <DropdownList
                                data={this.state.courseno}
                                name="courseno"
                                label="Course Number"
                                value={this.state.coursenoValue}
                                onChange={value => this.setState({ coursenoValue: value })}/>
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
                        
                        {/* <BootstrapTable
                            // data={this.state.semstudent}
                            height={300}>
                              <TableHeaderColumn
                                // dataField='studid'
                                isKey
                                width="50">COURSE NO</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='lastname'
                                width="30">SECTION</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='firstname'
                                width="50">DAYS</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="100">TIME</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="30">SLOT</TableHeaderColumn>
                              <TableHeaderColumn
                                // dataField='middlename'
                                width="30">TYPE</TableHeaderColumn>
                          </BootstrapTable> */}
                  </div>
              </div>                          
            </div>
    );
  }
}
export default Enrolment;
