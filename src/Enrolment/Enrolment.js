import React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';
import Immutable from 'immutable';
// import { DropdownList } from 'react-widgets';

import Button from '.././Layout/Button';
import DropdownList from '.././Layout/DropList';
import Input from '.././Layout/BasicInput';
import Select from '.././Layout/Select';

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
      category: ['IDNO','FIRST NAME','LAST NAME'],
      curriculum:[],
      major:[],
      majorValue:"",
      maxload:"",
      modalIsOpen1: true,
      modalIsOpen2:false,
      modalIsOpen3:false,
      schosta:[],
      schocsta:"",
      searchData:"",
      searchOutput:[],
      sem:['1st','2nd','SUM'],
      semstudent:[],
      status:[],
      student:[],
      studSelected:[],
      studid:"",
      studname:"",
      defaultsy:"",
      sy:"",
      defaultsem:"",
      sysem:[],
      updateCategory:"--Select",
      url:"http://192.168.5.146:3000/",
      year:[]
    }
  }

  componentDidMount(){

      axios.get(this.state.url + 'studentData')
      .then(response => {
        console.log(response);
        this.setState({student: response.data});
      //this.setState({student: Immutable.fromJS(response.data).toList });
        console.log(this.state.student);
      })
      .catch(error => {
        console.log(error);
        alert("Error occured!");
      });

      axios.get(this.state.url + 'sysem')
      .then(response => {
        console.log(response);
        this.setState({sysem: response.data});
        console.log(this.state.sysem);
      })
      .catch(error => {
        console.log(error);
        alert("Error occured!");
      });

      axios.get(this.state.url + 'semStudents')
      .then(response => {
        console.log(response);
        this.setState({semstudent: response.data});
      //this.setState({student: Immutable.fromJS(response.data).toList });
        console.log(this.state.semstudent);
      })
      .catch(error => {
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
    this.setState({studname: e.target.value});
  }

//*** Enroll new Student ***//
  newEnroll(){
    this.setState({
      modalIsOpen3:true,
      block:[],
      category: ['IDNO','FIRST NAME','LAST NAME'],
      sem:['1st','2nd','SUM'],
      status:[],
      studid:"",
      studname:""
    });
  }
//*** End for Enrolling new student***//

//*** Searching ***//

  searchClicked(){
   let category = this.state.updateCategory;      /* Selected Category data*/
   let search = this.state.searchData.trim().toUpperCase();
   let stud = this.state.student;
   let j=0;
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
                                      modalIsOpen3:true,
                                      studid: stud[j].studid,
                                      studname: stud[j].lastname + ', ' + stud[j].firstname + ' ' + stud[j].middlename });
                                      this.evalSemStudent();
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
  evalSemStudent(){
    let {sem} = this.state;
    let {sy} = this.state;
    let {studid} = this.state;
    let semstudid = this.state.semstudent.map(obj => obj.studid);
    let semstudsem = this.state.semstudent.map(obj => obj.sem);
    let semstudsy = this.state.semstudent.map(obj => obj.sy);
    let {studSelected} =this.state;

    for(var i; i < this.semstudent.length; i++){
      if(studid === semstudid[i] && sy === semstudsy[i] && sem === semstudsem[i]){

      }
    }
  
    
  }
//*** END of retrieval of record of student searched ***//

//*** Call when a row is selected from multiple search result ***//
  rowSelect(row){

    this.setState({
      modalIsOpen3:true,
      studid: row.studid,
      studname: row.lastname + ', ' + row.firstname + ' ' + row.middlename
    });
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
        right                 : '50%',
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
      onSelect: this.rowSelect .bind(this)
  };
//*** End for Selecting row ***//
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
                  <Button
                    className="newBtn"
                    btnName={<i className="fa fa-edit">Add new</i>}
                    onClick={this.newEnroll.bind(this)} />
                  <DropdownList
                    data={this.state.category}
                    name="category"
                    label="Category"
                    value={this.state.updateCategory}
                    onChange={value => this.setState({ updateCategory: value })}/>
                  <Input
                      name="searchdata"
                      label="Search"
                      placeholder=""
                      value={this.state.searchData}
                      onChange={this.handleSearchInputChange.bind(this)}/><br/>
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
                      <DropdownList
                        defaultValue={defaultsy}
                        disabled
                        data={schoolyr}
                        name="sy"
                        label="SY"
                        value={defaultsy}
                        onChange={value => this.setState({ sy: value })}/>
                      <Input
                        name="idno"
                        label="ID Number"
                        placeholder=""
                        value={this.state.studid}
                        onChange={this.handleStudentIDChange.bind(this)}/>
                      <DropdownList
                        data={this.state.major}
                        name="major"
                        label="Major"/>
                      <DropdownList
                        data={this.state.year}
                        name="year"
                        label="Year"/>
                      <DropdownList
                        data={this.state.block}
                        name="block"
                        label="Block"/>
                      <DropdownList
                        data={this.state.status}
                        name="status"
                        label="Status"/>
                      <DropdownList
                        data={this.state.schosta}
                        name="scholarshipstatus"
                        label="Scholarship Status"/>
                    </div>
                    <div className="RComponent">
                      <DropdownList
                        disabled
                        defaultValue={defaultsem}
                        data={sem}
                        name="sem"
                        label="Sem"
                        value={defaultsem}
                        onChange={value => this.setState({ sem: value })}/>
                      <Input
                          name="studname"
                          label="Name"
                          placeholder=""
                          value={this.state.studname}
                          onChange={this.handleStudentNameChange.bind(this)}/> <br/>

                      <Input
                        name="majorValue"
                        label="Description"
                        placeholder=""
                        value={this.state.majorValue}/>

                      <DropdownList
                        data={this.state.curriculum}
                        name="curriculum"
                        label="Curriculum"/>

                      <Input
                        name="maxload"
                        label="Max Load"
                        placeholder=""
                        value={this.state.maxload}/><br/><br/>
                      <Input
                        name="scholasticstatus"
                        label="Scholastic Status"
                        placeholder=""
                        value={this.state.schocsta}/><br/>
                    </div>
                    <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-save">Save</i>} />&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-times">Cancel</i>}
                      onClick={this.closeModal3.bind(this)}/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <Button
                      btnName={<i className="fa fa-arrow-right">Continue</i>} />
              </Modal>
              {/* </div> */}
            </div>
    );
  }
}
export default Enrolment;
