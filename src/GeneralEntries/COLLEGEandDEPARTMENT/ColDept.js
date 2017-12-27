import React from 'react';
// import {Table, Column, Cell} from 'fixed-data-table-2';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import ReactTooltip from 'react-tooltip';

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

class ColDept extends React.Component{

  constructor(props){
    super();
    this.state ={
      college : [],
      coldept: [],
      isActive:true,
      updateColcode:"",
      updateCollege:"",
      updateDeptcode:"",
      updateDeptname:"",
      updateDeptcollege:"--Select",
      updateDeptempid:"",
      url: "http://192.168.5.146:3000/"
    }
  }
  componentDidMount(){

    console.log('COMPONENT HAS MOUNTED');

    //fetch PROGRAM data for table display
    fetch(this.state.url + 'COLLEGEandDEPARTMENT')
      .then(response => response.json())
          .then(data => {
            this.setState({
              coldept: data
            })
            console.log(data);
           })
           .catch( error => console.log('Error Fetch: college ' + error))

    //fetch COLLEGE data for selection in department entry
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

  handleColcodeChange(e){
    this.setState({updateColcode: e.target.value});
  }

  handleCollegeChange(e){
    this.setState({updateCollege: e.target.value});
  }

  handleDeptcodeChange(e){
    this.setState({updateDeptcode: e.target.value});
  }

  handleDeptnameChange(e){
    this.setState({updateDeptname:e.target.value});
  }

  addCollege(e){
      e.preventDefault();
          axios.post(this.state.url + 'addCollege',{
              colcode: this.state.updateColcode,
              college: this.state.updateCollege,
              empid: "M01 - 002"
            })
            .then(function (response){
              console.log(response);
            })
            .catch(function (error){
              console.log(error);
            })
  }

  saveEditCollege(e){
    e.preventDefault();
    let college = {
      colcode: this.state.updateColcode,
      college: this.state.updateCollege,
      empid: "M01 - 002"
    };
    axios.post(this.state.url + 'updateCollege', college)
      .then(response => {
        console.log(response);
        alert('Data updated');
      })
      .catch(error => {
        console.log(error.response);
        console.log(college);
      });
  }

  saveDepartmentEdit(e){
    e.preventDefault();
  }

  handleRowSelect(row, isSelected, e){
      this.setState({
        // updateColcode: row.colcode,
        // updateCollege: row.college
        updateDeptcode: row.deptcode,
        updateDeptname:row.deptname,
        updateDeptcollege:row.college
      });
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
    axios.post(this.state.url + 'addDepartment',
        department
      )
      .then(response => {
        console.log(response);
        console.log(this.state.updateDeptcollege);
      })
      .catch(error => {
        console.log(error.response);
        console.log(department);
      });
  }

  render(){
    let college = this.state.coldept;
    const col = this.state.college.map(obj => obj.college );
    const selectRow = {
          mode:'radio',
          bgColor: '#80d8ff',
          onSelect: this.handleRowSelect.bind(this)
    };

    return(
      <div className="row">

        <img src={addIcon} data-tip data-for='add-icon' onClick={this.openModalForAdding.bind(this)}/>
          <ReactTooltip id='add-icon' type='info' effect='float'>
            <span>Add</span>
          </ReactTooltip>

        <img src={editIcon} data-tip data-for='edit-icon' alt="Edit" onClick={this.openModalForEditing.bind(this)} />
          <ReactTooltip id='edit-icon' type='info' effect='float'>
            <span>Edit</span>
          </ReactTooltip>

        <img src={cancelIcon} data-tip data-for='cancel-icon' />
          <ReactTooltip id='cancel-icon' type='info' effect='float'>
            <span>Cancel</span>
          </ReactTooltip>

        <div className="UpperEntry">
          <h4>COLLEGE ENTRY</h4>
          <Input name="colcode" label="College code" type="text" placeholder="Enter college code"  value={this.state.updateColcode} onChange={this.handleColcodeChange.bind(this)} />
          <Input name="college" label="College" type="text" placeholder="Enter college name"  value={this.state.updateCollege} onChange={this.handleCollegeChange.bind(this)} />
          <Button btnName="Add" onClick={this.addCollege.bind(this)}/>
          <Button btnName="Save" onClick={this.saveEditCollege.bind(this)}/>
        </div>

        <div className="UpperEntry">
          <h4>DEPARTMENT ENTRY</h4>
          <DropdownList data={col} name="college" label="College" value={this.state.updateDeptcollege} onChange={value => this.setState({ updateDeptcollege: value })} />
        </div>

        <div className="UpperEntry">
          <Input name="deptcode" label="Department code" type="text" placeholder="Enter department code" value={this.state.updateDeptcode} onChange={this.handleDeptcodeChange.bind(this)} />
          <Input name="deptname" label="Department name" type="text" placeholder="Enter department name" value={this.state.updateDeptname} onChange={this.handleDeptnameChange.bind(this)} />
          <Select label="Active" checked={this.state.isActive} onChange={this.handleSelectChange.bind(this)} />
          <Button btnName="Add department" onClick={this.addDepartment.bind(this)}/>
          <Button btnName="Save" onClick={this.saveDepartmentEdit.bind(this)}/>
        </div>

        <div className="Table">
          {/* <Table
              rowsCount={college.length}
              rowHeight={50}
              width={1050}
              height={600}
              headerHeight={50}>
              <Column
                header={<Cell>DEPARTMENT CODE</Cell>}
                width={200}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.coldept[props.rowIndex].deptcode}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>DEPARTMENT NAME</Cell>}
                width={200}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.coldept[props.rowIndex].deptname}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>COLLEGE CODE</Cell>}
                width={150}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.coldept[props.rowIndex].colcode}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>COLLEGE</Cell>}
                width={600}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.coldept[props.rowIndex].college}
                  </Cell>
                )}
              />

            </Table> */}
            {/* <BootstrapTable
              data={this.state.college}
              height={600}
              selectRow={selectRow}>
                <TableHeaderColumn dataField='colcode' isKey width="170">Code</TableHeaderColumn>
                <TableHeaderColumn dataField='college' width="170">College</TableHeaderColumn>
            </BootstrapTable> */}
            <BootstrapTable
              data={this.state.coldept}
              height={600}
              selectRow={selectRow}>
                <TableHeaderColumn dataField='deptcode' isKey width="170">DeptCode</TableHeaderColumn>
                <TableHeaderColumn dataField='college' width="170">College</TableHeaderColumn>
                <TableHeaderColumn dataField='deptname' width="170">Department</TableHeaderColumn>
            </BootstrapTable>
        </div>
      </div>
    );
  }
}
export default ColDept;
