import React from 'react';
// import {Table, Column, Cell} from 'fixed-data-table-2';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Header from '../.././Layout/Header';
import Input from '../.././Layout/BasicInput';
import Search from '../.././Layout/Search';
import Select from '../.././Layout/Select';

import addIcon from '../../images/icons/add.svg';
import cancelIcon from '../../images/icons/cancel.svg';
import editIcon from '../../images/icons/edit.svg';
import saveIcon from '../../images/icons/save.svg';

import '../.././style/App.css';
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
      url:"http://192.168.5.146:3000/"
    }
}

//fetch program data
  componentDidMount(){

    console.log('COMPONENT HAS MOUNTED');
    //fetch PROGRAM data
    fetch('http://192.168.5.146:3000/program')
      .then(response => response.json())
          .then(data => {
            this.setState({
              program: data
            })
            console.log(data);
           })
           .catch( error => console.log('Error Fetch: program ' + error))


 // fetch DEPARTMENT data
    fetch('http://192.168.5.146:3000/departmentName')
      .then(response => response.json())
          .then(dept => {
            this.setState({
              department: dept
            })
            console.log(this.state.department);
           })
           .catch( error => console.log('Error Fetch: department ' + error))
  }

  addProgram(e){
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
      shorthand:"BSUNSA"
    };
    axios.post(this.state.url + 'addProgram',
        program
      )
      .then(response => {
        console.log(response);
        alert('New Data Added');
      })
      .catch(error => {
        console.log(error.response);
        console.log(program);
      });

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
      shorthand:"BSUNSA"
    };
    axios.post(this.state.url + 'updateProgram',
        program
      )
      .then(response => {
        console.log(response);
        alert('Data updated');
      })
      .catch(error => {
        console.log(error.response);
        console.log(program);
      });
  }

  handleProgcodechange(e){
    this.setState({programCode: e.target.value});
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

 handleRowSelect(row, isSelected, e){
   let departCode = this.state.department.map(obj => obj.deptcode);
   let departName = this.state.department.map(obj => obj.deptname);

   for(var i=0; i < this.state.department.length; i++){
      if(departCode[i] === row.progdept){
        this.setState({deptListData: departName[i]});
      }
   }

   this.setState({
     programCode: row.progcode,
     programdesc: row.progdesc,
     major: row.major,
     isUndergrad: row.undergrad,
     isMasteral:row.masteral,
     isDoctorate: row.phd,
     isActive:row.is_active
   });

   if(row.major === null){
     this.setState({major: ""});
   }
   console.log(row);
   console.log(isSelected);
   console.log(e);
 }

openModal(){
  this.setState({modalIsOpen:true});
   alert("Giclick");
}

closeModal(){
  this.setState({modalIsOpen: false});
}

  render(){

    const selectRow = {
          mode:'radio',
          bgColor: '#80d8ff',
          onSelect: this.handleRowSelect.bind(this)

    };
    const customStyles = {
   content : {
     top                   : '50%',
     left                  : '50%',
     right                 : 'auto',
     bottom                : 'auto',
     marginRight           : '-50%',
     transform             : 'translate(-50%, -50%)'
   }
 };
   const depart = this.state.department.map(obj => obj.deptname );

   console.log(this.state.modalIsOpen);

    return(
      <div className="row">
        <div className="Entry">
          <img src={addIcon} onClick={this.openModal.bind(this)}/>
          <img src={saveIcon} alt="Add" />
          <img src={editIcon} alt="Add" />
          <img src={cancelIcon} alt="Add" />
          {/*

          <Button
            btnName="Edit" />

          <Button
            btnName="Save"
            onClick={this.saveEdit.bind(this)} />

          <Button
            btnName="Cancel" /> */}

             <Modal
              isOpen={this.state.modalIsOpen}
              onRequestClose={this.closeModal}
              closeTimeoutMS={200}
              style={customStyles}
              contentLabel="Add Program"
              ariaHideApp={false}>
                <div>
                  <DropdownList
                    data={depart}
                    name="department"
                    label="Department"
                    value={this.state.deptListData}
                    onChange={value => this.setState({ deptListData: value })} />

                  <Input
                    name="programCode"
                    label="Program Code: "
                    placeholder="Program Code"
                    value={this.state.programCode}
                    onChange={this.handleProgcodechange.bind(this)}/>

                  <Select
                      label="Active"
                      checked={this.state.isActive}
                      onChange={this.handleIsactiveChange.bind(this)}/>

                  <Input
                    name="program"
                    label="Program"

                    placeholder="Program"
                    value={this.state.programdesc}
                    onChange={this.handleProgramChange.bind(this)} />

                  <Input
                    name="major"
                    label="Major"

                    placeholder="Major"
                    value={this.state.major}
                    onChange={this.handleMajorChange.bind(this)}/>

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
                    onChange={this.handleIsdoctorateChange.bind(this)}/>

                  <Button
                      btnName="Add"
                      onClick={this.addProgram.bind(this)}/>
                </div>

              </Modal>



        </div>
        <div className="DataView">
          {/* <Search
            name="search"
            placeholder="Search program. . ."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange.bind(this)} /> */}
          {/* <TabularData  rowsCount={program.length} data={program} twidth={1050} header1="CODE" header2="PROGRAM" header3="MAJOR" header4="DEPARTMENT"/> */}
          {/* <Table
              rowsCount={this.state.program.length}
              rowHeight={50}
              width={1050}
              height={600}
              headerHeight={50}>
              <Column
                header={<Cell>CODE</Cell>}
                width={150}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.program[props.rowIndex].progcode}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>PROGRAM</Cell>}
                width={600}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.program[props.rowIndex].progdesc}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>MAJOR</Cell>}
                width={150}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.program[props.rowIndex].major}
                  </Cell>
                )}
              />
              <Column
                header={<Cell>DEPARTMENT</Cell>}
                width={150}
                cell={props =>(
                  <Cell {...props}>
                    {this.state.program[props.rowIndex].progdept}
                  </Cell>
                )}
              />
            </Table> */}

            <BootstrapTable
              data={this.state.program}
              height={600}
              selectRow={selectRow}>
                <TableHeaderColumn dataField='progcode' isKey filter={ { type: 'RegexFilter', delay: 1000 } } width="130">CODE</TableHeaderColumn>
                <TableHeaderColumn dataField='progdesc' width="500">PROGRAM</TableHeaderColumn>
                <TableHeaderColumn dataField='major' width="170">MAJOR</TableHeaderColumn>
                <TableHeaderColumn dataField='progdept' width="130">DEPARTMENT</TableHeaderColumn>

            </BootstrapTable>
        </div>
      </div>
    );
  }
}

export default Program;
