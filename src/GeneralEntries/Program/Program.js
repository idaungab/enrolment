import React from 'react';
// import {Table, Column, Cell} from 'fixed-data-table-2';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';
import ReactTooltip from 'react-tooltip';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
// import Header from '../.././Layout/Header';
import Input from '../.././Layout/BasicInput';
// import Search from '../.././Layout/Search';
import Select from '../.././Layout/Select';

import addIcon from '../.././images/icons/add.svg';
import editIcon from '../.././images/icons/edit.svg';
import cancelIcon from '../.././images/icons/cancel.svg';

import '../.././style/program.css';
import '../.././style/bootstrap.min.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Program extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      program: [],
      department:[],
      deptData:[],
      searchTerm:"",
      isUndergrad:false,
      isMasteral:false,
      isDoctorate:false,
      isActive: true,
      programCode:"",
      programdesc:"",
      major:"",
      deptListData:"--Select",
      modalIsOpen: false,
      shorthand:"",
      showSaveButton: false,
      showAddButton:false,
      url:"http://192.168.5.146:3000/"
    }
}

  componentDidMount(){
    console.log('COMPONENT HAS MOUNTED');
    //GET PROGRAM data
      axios.get(this.state.url + 'program')
      .then(response => {
        console.log(response);
        this.setState({program: response.data});
        console.log(this.state.program);
      })
      .catch(error => {
        console.log(error);
        alert("Error occured!");
      });
 // GET DEPARTMENT data
      axios.get(this.state.url + 'departmentName')
      .then(response => {
        console.log(response);
        this.setState({department: response.data});
        console.log(this.state.program);
      })
      .catch(error => {
        console.log(error);
        alert("Error occured!");
      });
  }

  handleProgcodechange(e){
    this.setState({programCode: e.target.value.toUpperCase()});
  }

  handleProgramChange(e){
    this.setState({programdesc:e.target.value.toUpperCase()});
  }

  handleMajorChange(e){
    this.setState({major: e.target.value});
  }
  //get data searched
  handleSearchChange(e){
    this.setState({searchTerm: e.target.value});
  }
  //change in selected level options
  handleRadioChange(r){
    this.setState({radioValue: r.target.value});
  }

  handleIsactiveChange(event){
    this.setState({isActive: event.target.checked});
  }

  handleIsundergradChange(e){
    this.setState({isUndergrad:e.target.checked});
  }

  handleIsmasteralChange(e){
    this.setState({isMasteral:e.target.checked});
  }

  handleIsdoctorateChange(e){
    this.setState({isDoctorate:e.target.checked});
  }

  handleShorthandChange(e){
    this.setState({shorthand: e.target.value});
  }

  addProgram(e){
        // e.preventDefault();
    let program = {
      progcode:this.state.programCode,
      progdesc:this.state.programdesc,
      is_active:this.state.isActive,
      undergrad:this.state.isUndergrad,
      progdept:this.state.deptListData,
      major:this.state.major,
      masteral:this.state.isMasteral,
      phd:this.state.isDoctorate,
      shorthand:this.state.shorthand
    };

    if((this.state.isUndergrad && this.state.isMasteral && this.state.isDoctorate) ||
       (this.state.isUndergrad && this.state.isMasteral) ||
       (this.state.isUndergrad && this.state.isDoctorate) ||
       (this.state.isDoctorate && this.state.isMasteral)){
         alert("Error: Multiple entry for Academic degree! (Check only one) ");
    }else{
      axios.post(this.state.url + 'addProgram', program)
        .then(response => {
          console.log(response);
          let prog = this.state.program;
          prog.push(program);
          this.setState({
            program: prog,
            modalIsOpen:false});
          alert("Data successfully added!");
        })
        .catch(error => {
          console.log(error.response);
          console.log(program);
          alert("Error occured! ID already exist or error on server!")
        });

    }
  }

  saveEdit(e){
    e.preventDefault();
    let program = {
      progcode:this.state.programCode,
      progdesc:this.state.programdesc,
      is_active:this.state.isActive,
      undergrad:this.state.isUndergrad,
      progdept:this.state.deptListData,
      major:this.state.major,
      masteral:this.state.isMasteral,
      phd:this.state.isDoctorate,
      shorthand:this.state.shorthand
    };
    let j=0;
    let progCode = this.state.program.map(obj => obj.progcode);
    for(var i=0; i< this.state.program.length; i++){
      if(program.progcode === progCode[i]){
        j=i;
      }
    }
    if((this.state.isUndergrad && this.state.isMasteral && this.state.isDoctorate) ||
       (this.state.isUndergrad && this.state.isMasteral) ||
       (this.state.isUndergrad && this.state.isDoctorate) ||
       (this.state.isDoctorate && this.state.isMasteral)){
         alert("Error: Multiple entry for Academic degree! (Check only one) ");
    }else{
          axios.post(this.state.url + 'updateProgram', program )
            .then(response => {
              console.log(response);
              let prog = this.state.program;
              prog.splice(j,1,program);
              this.setState({
                program: prog,
                modalIsOpen: false
              });
              alert('Data updated');
            })
            .catch(error => {
              console.log(error.response);
              console.log(program);
              alert("Error occured!");
            });
      }
  }

  handleRowSelect(row, isSelected, e){
        let departCode = this.state.department.map(obj => obj.deptcode);
        let departName = this.state.department.map(obj => obj.deptname);

        for(var i=0; i < this.state.department.length; i++){
           if(departCode[i] === row.progdept){
             this.setState({deptListData: departName[i]});
           }
        }
        this.setState({
          modalIsOpen:true,
          showSaveButton:true,
          showAddButton:false,
          programCode: row.progcode,
          programdesc: row.progdesc,
          major: row.major,
          isUndergrad: row.undergrad,
          isMasteral:row.masteral,
          isDoctorate: row.phd,
          isActive:row.is_active,
          shorthand:row.shorthand
        });

        if(row.major === null){
          this.setState({major: ""});
        }
  }

openModalForAdding(){
  this.setState({
    modalIsOpen:true,
    editBtnState:false,
    programCode: "",
    programdesc: "",
    major: "",
    isActive:true,
    deptListData:"--Select",
    showAddButton:true,
    showSaveButton:false,
    shorthand:""
  });
}

// openModalForEditing(){
//   this.setState({
//     modalIsOpen:true,
//     showSaveButton:true,
//     showAddButton:false
//   });
// }
  
// cellButton(cell,row,enumObject,rowIndex){ 
//         let departCode = this.state.department.map(obj => obj.deptcode);
//         let departName = this.state.department.map(obj => obj.deptname);
//         for(var i=0; i < this.state.department.length; i++){
//            if(departCode[i] === row.progdept){
//              this.setState({deptListData: departName[i]});
//            }
//         }
//         this.setState({
//           programCode: row.progcode,
//           programdesc: row.progdesc,
//           major: row.major,
//           isUndergrad: row.undergrad,
//           isMasteral:row.masteral,
//           isDoctorate: row.phd,
//           isActive:row.is_active,
//           shorthand:row.shorthand
//         });

//         if(row.major === null){
//           this.setState({major: ""});
//         }

//   return(
//     <Button
//             btnName={<i className="fa fa-edit fa-3x"> Edit </i>}
//             onClick={this.openModalForEditing().bind(this)}/>
//   )
// }

closeModal(){
  this.setState({modalIsOpen: false});
}

  render(){
        const depart = this.state.department.map(obj => obj.deptname );
        const selectRow = {
              mode:'radio',
              bgColor: '#80d8ff',
              hideSelectColumn:true,
              clickToSelect:true,
              onSelect: this.handleRowSelect.bind(this)
        };
        const customStyles = {
          content : {
            top                   : '50%',
            left                  : '50%',
            right                 : '50%',
            bottom                : 'auto',
            marginRight           : '-30%',
            transform             : 'translate(-50%, -50%)'
          }
        };

        return(
          <div>
            <Button
              btnName={<i className="fa fa-plus fa-3x"> Add Record </i>}
              onClick={this.openModalForAdding.bind(this)}/>
            <div className="float-right">
              <Button
                btnName={<i className="fa fa-edit fa-3x"> Search </i>} />
            </div>
            {/* <Button
              btnName={<i className="fa fa-refresh fa-3x"></i>}
              onClick={this.openModalForEditing.bind(this)}/> */}
            <div>
                <div className="ProgFieldsPage">
                   <Modal
                      isOpen={this.state.modalIsOpen}
                      onRequestClose={this.closeModal}
                      closeTimeoutMS={200}
                      contentLabel="Add Program"
                      ariaHideApp={false}
                      style={customStyles}
                      overlayClassName="Overlay">

                        <DropdownList
                          data={depart}
                          name="department"
                          label="Department"
                          value={this.state.deptListData}
                          onChange={value => this.setState({ deptListData: value })} /><br/>

                        <Input
                          name="programCode"
                          label="Program Code: "
                          placeholder="Program Code"
                          value={this.state.programCode}
                          onChange={this.handleProgcodechange.bind(this)}/>

                        <Select
                            label="Active"
                            checked={this.state.isActive}
                            onChange={this.handleIsactiveChange.bind(this)}/><br/>

                        <Input
                          name="program"
                          label="Program"
                          placeholder="Program"
                          value={this.state.programdesc}
                          onChange={this.handleProgramChange.bind(this)} /><br/>

                        <Input
                          name="major"
                          label="Major"
                          placeholder="Major"
                          value={this.state.major}
                          onChange={this.handleMajorChange.bind(this)}/><br/>

                        <Input
                          name="shorthand"
                          label="Shorthand"
                          placeholder="Shorthand"
                          value={this.state.shorthand}
                          onChange={this.handleShorthandChange.bind(this)}/><br/>

                        <Select
                          label="Undergraduate"
                          checked={this.state.isUndergrad}
                          onChange={this.handleIsundergradChange.bind(this)}/>

                        <Select
                          label="Masteral"
                          checked={this.state.isMasteral}
                          onChange={this.handleIsmasteralChange.bind(this)}/>

                        <Select
                          label="Doctorate"
                          checked={this.state.isDoctorate}
                          onChange={this.handleIsdoctorateChange.bind(this)}/><br/>

                        {this.state.showAddButton &&
                          <Button
                            btnName={<i className="fa fa-plus fa-3x"> Add</i>}
                            onClick={this.addProgram.bind(this)} />}

                        {this.state.showSaveButton &&
                          <Button
                            btnName={<i className="fa fa-floppy-o fa-3x">Save Changes</i>}
                            onClick={this.saveEdit.bind(this)} />}

                        <Button
                            btnName={<i className="fa fa-times" aria-hidden="true">Close</i>}
                            onClick={this.closeModal.bind(this)} />
                    </Modal>
                  </div>
            </div>
            <div className="DataView">
                <BootstrapTable
                  data={this.state.program}
                  height={400}
                  selectRow={selectRow}
                  pagination>
                    <TableHeaderColumn
                      dataField='progcode'
                      isKey
                      filter={ { type: 'RegexFilter', delay: 1000 } }
                      width="160">CODE</TableHeaderColumn>
                    <TableHeaderColumn
                      dataField='progdesc'
                      width="500">PROGRAM</TableHeaderColumn>
                    <TableHeaderColumn
                      dataField='major'
                      width="150">MAJOR</TableHeaderColumn>
                    <TableHeaderColumn
                      dataField='progdept'
                      width="170">DEPARTMENT</TableHeaderColumn>
                    {/* <TableHeaderColumn
                      dataField='button'
                      dataFormat={this.cellButton.bind(this)}/> */}
                </BootstrapTable>
            </div>
          </div>
    );
  }
}


export default Program;
