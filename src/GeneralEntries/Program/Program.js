import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import axios from 'axios';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';
import RadioButton from '../.././Layout/RadioButtonGroup';
import Search from '../.././Layout/Search';
import Select from '../.././Layout/Select';

import '../.././style/App.css';
import '../.././style/bootstrap.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';


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

  render(){
    let program = this.state.program;
    const depart = this.state.department.map(obj => obj.deptname );

    return(
      <div className="row">
        <div className="Entry">
            <DropdownList
              data={depart}
              name="department"
              label="Department"
              value={this.state.deptListData}
              onChange={value => this.setState({ deptListData: value })} />

            <Input
              name="programCode"
              label="Program Code: "
              type="text"
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
              type="text"
              placeholder="Program"
              value={this.state.programdesc}
              onChange={this.handleProgramChange.bind(this)} />

            <Input
              name="major"
              label="Major"
              type="text"
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

            <Button
              btnName="Edit" />

            <Button
              btnName="Save" />

            <Button
              btnName="Cancel" />
        </div>
        <div className="DataView">
          <Search
            name="search"
            placeholder="Search program. . ."
            value={this.state.searchTerm}
            onChange={this.handleSearchChange.bind(this)} />
          {/* <TabularData  rowsCount={program.length} data={program} twidth={1050} header1="CODE" header2="PROGRAM" header3="MAJOR" header4="DEPARTMENT"/> */}
          <Table
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
            </Table>
        </div>
      </div>
    );
  }
}

export default Program;
