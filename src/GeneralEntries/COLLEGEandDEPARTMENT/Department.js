import React from 'react';
import update from 'immutability-helper';
// import {Table, Column, Cell} from 'fixed-data-table-2';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';
import Select from '../.././Layout/Select';

import addIcon from '../.././images/icons/add.svg';
import editIcon from '../.././images/icons/edit.svg';
import cancelIcon from '../.././images/icons/cancel.svg';

import '../.././style/App.css';
import '../.././style/bootstrap.min.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Department extends React.Component{
  constructor(props){
    super();
    this.state ={
      department: [],
      college:[],
      isActive:true,
      updateDeptcode:"",
      deptcodeDisable:false,
      updateDeptname:"",
      updateDeptcollege:"--Select",
      updateDeptempid:"",
      modalIsOpen:false,
      showAddButton:false,
      showEditButton:false,
      url: "http://192.168.5.146:3000/"
    }
    this.saveDepartmentEdit = this.saveDepartmentEdit.bind(this);
  }
  componentDidMount(){
    console.log('COMPONENT HAS MOUNTED');

    //fetch PROGRAM data for table display
    fetch(this.state.url + 'department')
      .then(response => response.json())
          .then(data => {
            this.setState({
              department: data
            })
            console.log(data);
           })
           .catch( error => console.log('Error Fetch: college ' + error))

   fetch(this.state.url + 'college')
     .then(response => response.json())
         .then(data => {
           this.setState({
             college: data
           })
           console.log(data);
          })
          .catch( error => console.log('Error Fetch: college ' + error))
  }

  handleSelectChange(event){
    this.setState({isActive: event.target.checked});
    console.log(event.target.checked);
  }

  handleDeptcodeChange(e){
    this.setState({updateDeptcode: e.target.value});
  }

  handleDeptnameChange(e){
    this.setState({updateDeptname:e.target.value});
  }

  addDepartment(e){
    e.preventDefault();
    let department = {
      deptcode:this.state.updateDeptcode,
      deptname:this.state.updateDeptname,
      active:this.state.isActive,
      college: this.state.updateDeptcollege,
      empid: "F76 - 002"
    };
    axios.post(this.state.url + 'addDepartment', department )
      .then(response => {
        console.log(response);
        let dept = this.state.department;
        dept.push(department);
        this.setState({ department: dept});
        alert("Data successfully added!");
      })
      .catch(error => {
        console.log(error.response);
        console.log(department);
        alert("Error occure!");
      });
  }

  saveDepartmentEdit(e){
    e.preventDefault();
    let j=0;
    let department = {
      deptcode:this.state.updateDeptcode,
      deptname:this.state.updateDeptname,
      active:this.state.isActive,
      college: this.state.updateDeptcollege,
      empid: "F76 - 002"
    };
    let deptCode = this.state.department.map(obj => obj.deptcode);

    for(var i=0; i<this.state.department.length;i++){
      if(department.deptcode === deptCode[i]){
        j=i;
      }
    }

    axios.post(this.state.url + 'updateDepartment', department)
      .then(response => {
        console.log(response);
        let dept = this.state.department;
        dept.splice(j, 1, department);
        this.setState({
          department: dept,
          modalIsOpen:false
        });
        alert('Data updated');
      })
      .catch(error => {
        console.log(error.response);
        console.log(department);
        alert('Error occured!');
      });
  }

  handleRowSelect(row, isSelected, e){
    let colCode = this.state.college.map(obj => obj.colcode);
    let colName = this.state.college.map(obj => obj.college);

    for(var i=0; i < this.state.college.length; i++){
       if(colCode[i] === row.college){
         this.setState({updateDeptcollege:colName[i]});
       }
    }
    console.log(row);
      this.setState({
        updateDeptcode: row.deptcode,
        updateDeptname:row.deptname,
        isActive: row.active
      });
  }

  openModalForAdding(){
    this.setState({
      modalIsOpen:true,
      showAddButton: true,
      showEditButton: false,
      updateDeptcode:"",
      updateDeptname:"",
      updateDeptcollege:"--Select"
    });
  }

  openModalForEditing(){
    this.setState({
      modalIsOpen:true,
      showEditButton: true,
      showAddButton: false,
      deptcodeDisable:true
    });
  }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  render(){
    let department = this.state.department;
    const col = this.state.college.map(obj => obj.college );
    const selectRow = {
          mode:'radio',
          bgColor: '#80d8ff',
          onSelect: this.handleRowSelect.bind(this)
    };

    return(
      <div className="row">
        <div className="Entry">
            <img src={addIcon}
              data-tip
              data-for='add-icon'
              onClick={this.openModalForAdding.bind(this)}/>
              <ReactTooltip id='add-icon' type='info' effect='float'>
                <span>Add</span>
              </ReactTooltip>

            <img src={editIcon} data-tip
              data-for='edit-icon'
              alt="Edit"
              onClick={this.openModalForEditing.bind(this)} />
              <ReactTooltip id='edit-icon' type='info' effect='float'>
                <span>Edit</span>
              </ReactTooltip>

            <img src={cancelIcon}
              data-tip
              data-for='cancel-icon' />
              <ReactTooltip id='cancel-icon' type='info' effect='float'>
                <span>Cancel</span>
              </ReactTooltip>

            <div>
              <Modal
                 isOpen={this.state.modalIsOpen}
                 onRequestClose={this.closeModal}
                 closeTimeoutMS={200}
                 contentLabel="Add Department"
                 ariaHideApp={false}
                 className="Modal"
                 overlayClassName="Overlay">

                 <DropdownList
                   data={col}
                   name="college"
                   label="College"
                   value={this.state.updateDeptcollege}
                   onChange={value => this.setState({ updateDeptcollege: value })} />
                 <Input
                   name="deptcode"
                   label="Department code"
                   placeholder="Enter department code"
                   value={this.state.updateDeptcode}
                   onChange={this.handleDeptcodeChange.bind(this)} />
                 <Input
                   name="deptname"
                   label="Department name"
                   placeholder="Enter department name"
                   value={this.state.updateDeptname}
                   onChange={this.handleDeptnameChange.bind(this)} />
                 <Select
                   label="Active"
                   checked={this.state.isActive}
                   onChange={this.handleSelectChange.bind(this)} />
                {this.state.showAddButton &&
                  <Button
                    btnName={<i className="fa fa-plus"> Add </i>}
                    onClick={this.addDepartment.bind(this)}/> }
                {this.state.showEditButton &&
                  <Button
                    btnName={<i className="fa fa-floppy-o">Save</i>}
                    onClick={this.saveDepartmentEdit}/> }
                 <Button
                   btnName={<i className="fa fa-times" aria-hidden="true">Close</i>}
                   onClick={this.closeModal.bind(this)}/>
             </Modal>
            </div>
          </div>
        <div className="DataView">
            <BootstrapTable
              data={this.state.department}
              height={480}
              pagination
              selectRow={selectRow}
              pagination>
                <TableHeaderColumn dataField='deptcode' isKey width="100">DeptCode</TableHeaderColumn>
                <TableHeaderColumn dataField='deptname' width="170">Department</TableHeaderColumn>
                <TableHeaderColumn dataField='college' width="100">College</TableHeaderColumn>
                <TableHeaderColumn dataField='active' width="100">Active</TableHeaderColumn>
                <TableHeaderColumn dataField='empid' width="120">Employee ID</TableHeaderColumn>
            </BootstrapTable>
        </div>
      </div>
    );
  }
}
export default Department;
