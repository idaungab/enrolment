import React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';
// import ReactTooltip from 'react-tooltip';
// import Immutable from 'immutable';
import Time from 'react-time';

import Button from '.././Layout/Button';
import DropdownList from '.././Layout/DropList';
import Input from '.././Layout/BasicInput';
// import Select from '.././Layout/Select';

import {GetStudent, GetSysem, GetSemStudents, GetScholar, GetProgram, GetCurriculum,GetStudenttag} from '.././serverquest/getRequests';

import '.././style/enroll.css';
import '.././style/bootstrap.min.css';
import 'react-widgets/dist/css/react-widgets.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Enrolment extends React.Component{
  
  constructor(props){
    let juan ='try daw';
    super(props);
    this.state = {
      block:[],
      blockValue:"",
      category: ['IDNO','FIRST NAME','LAST NAME'],
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
      gpa:"",
      major:[],
      majorValue:"",
      majorDesc:"",
      majorcurr:[],
      maxload:"",
      modalIsOpen1: true,
      modalIsOpen2:false,
      modalIsOpen3:false,
      program:[],
      scholar:[],
      schosta:[],
      schostaValue:"",
      schocsta:"",
      searchData:"",
      searchOutput:[],
      sem:[],
      semValue:"",
      semstudent:[],
      status:[],
      statusValue:"OLD",
      student:[],
      studSelected:[],
      studenttag:[],
      studid:"",
      studname:"",
      sy:[],
      syValue:"",
      sysem:[],
      updateCategory:"--Select",
      url:"http://192.168.5.146:3000/",
      year:[],
      yearValue:""
    };

    this.evalSemStudent = this.evalSemStudent.bind(this);
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
        GetStudenttag()
      ]).then( axios.spread(function (
         student, 
         sysem, 
         semstudent,
         scholar,
         program,
         curriculum,
         studenttag){
            that.setState({
              student:  student.data,
              sysem:  sysem.data,
              semstudent: semstudent.data,
              scholar: scholar.data,
              program: program.data,
              curriculum: curriculum.data,
              studenttag: studenttag.data
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
    this.setState({schocsta: e.target.value})
  }


//*** Enroll new Student ***//
  newEnroll(){
    let currcode = this.state.curriculum.map(obj => obj.progcode);
    let curr = this.state.curriculum.map(obj => obj.yearcreated);
    let prog = this.state.program.map(obj => obj.progcode);
    let col = this.state.program.map(obj => obj.college);
    let major = this.state.majorValue;
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

  //***YearLevelList */
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
    
}
//*** End for Enrolling new student***//

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
                                    this.setState({modalIsOpen2: true});
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
    let params = {studid, sem , sy};
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
          ifFound = true;   
          this.setState({
                modalIsOpen3:true,
                majorValue: semstudent[i].studmajor,
                gpa: semstudent[i].gpa,
                yearValue: semstudent[i].studlevel,
                curriculumValue:semstudent[i].cur_year,
                statusValue: semstudent[i].status,
                maxload: semstudent[i].maxload,
                blockValue: semstudent[i].block,
                schocsta: semstudent[i].standing
              });
              console.log(semstudent[i].cur_year);

      //*** If student's major is ELEM or HS */
          // if( semstudent[i].studmajor === 'ELEM' || semstudent[i] === 'HS'){

          // }
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
      // else if(studid === semstudid[i]){
      //   var syrsem = sy+sem;
      //     for(var y=0;y < this.state.sysem.length; y++){
      //       if(syr[y]+sm[y] < syrsem){
      //         console.log('kini kini');
      //       }
      //     }
      // }
    }
//*** If student searched not yet encoded for enrolment  */
    if(!ifFound){
       console.log('wala nagequal');
      for(var x=0; x < studenttag.length; x++){
        if(studid === studtagid[x] && sy === studtagsy[x] && sem === studtagsem[x] ){
          this.setState({
              statusValue: studenttag[x].status
          });
        }
      }

      axios.get(this.state.url + 'whenNotFoundinStudenttag',
      {params:{
        studid: studid,
        sem: sem,
        sy: sy
      }})
      .then(response => {
        console.log(response);
        // res = response.data;
        // console.log(res);
      })
      .catch(error => {
        console.log(error.response);
      });
//*** Check latest prior sems without DRP ALL grades */
          if(res !== null || res !== " "){
            console.log('naay unod');
          } else{
            console.log('naay result');
          }
    }
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
      searchOutput:[]});
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

    let now = new Date();

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
                <p className="TimeText">Date: <Time value={now} format="MM/DD/YYYY"/></p>
                  <DropdownList
                    data={this.state.category}
                    name="category"
                    label="Category"
                    value={this.state.updateCategory}
                    onChange={value => this.setState({ updateCategory: value })}/>
              </div>&nbsp;
              <div className="SearchPage">
                <p className="TimeText">Server Time: <Time value={now} format="HH:mm a"/></p>
                  <Input
                      name="searchdata"
                      label="Search"
                      placeholder=""
                      value={this.state.searchData}
                      onChange={this.handleSearchInputChange.bind(this)}/><br/>
              </div><br/>
              <div className="SearchButtons">
                  <Button
                        className="newBtn"
                        btnName={<i className="fa fa-edit">Add new</i>}
                        onClick={this.newEnroll.bind(this)} />
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

                    <p className="TimeText">Date: &nbsp;&nbsp;&nbsp;
                          <Time value={now} format="MM/DD/YYYY"/><br/>Server Time: &nbsp;&nbsp;
                          <Time value={now} format="HH:mm a"/>
                    </p>

                    <div className="LComponent">
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
                        data={this.state.block}
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
                        onChange={value => this.setState({ schostaValue: value })}/>

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
                      btnName={<i className="fa fa-save">Save</i>} />&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-times">Cancel</i>}
                      onClick={this.closeModal3.bind(this)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-arrow-right">Continue</i>} />
              </Modal>
              {/* </div> */}
            </div>
    );
  }
}
export default Enrolment;
