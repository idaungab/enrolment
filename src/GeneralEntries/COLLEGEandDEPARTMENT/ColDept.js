import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';
import axios from 'axios';

import '../.././style/App.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';
import Select from '../.././Layout/Select';

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
      updateDeptcollege:"",
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

  render(){
    let college = this.state.coldept;
    const col = this.state.college.map(obj => obj.college );

    return(
      <div className="row">
        <div className="UpperEntry">
          <h4>COLLEGE ENTRY</h4>
          <Input name="colcode" label="College code" type="text" placeholder="Enter college code"  value={this.state.updateColcode} onChange={this.handleColcodeChange.bind(this)} />
          <Input name="college" label="College" type="text" placeholder="Enter college name"  value={this.state.updateCollege} onChange={this.handleCollegeChange.bind(this)} />
          <Button btnName="Add" onClick={this.addCollege.bind(this)}/>
        </div>
        <div className="UpperEntry">
          <h4>DEPARTMENT ENTRY</h4>
          <DropdownList data={col} name="college" label="College" />
        </div>
        <div className="UpperEntry">
          <Input name="deptcode" label="Department code" type="text" placeholder="Enter department code" ref="deptcode" />
          <Input name="deptname" label="Department name" type="text" placeholder="Enter department name" ref="deptname" />
          <Select label="Active" checked={this.state.isActive} onChange={this.handleSelectChange.bind(this)} />
        </div>
        <div className="DataView">
          <Table
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

            </Table>
        </div>
      </div>
    );
  }
}
export default ColDept;
