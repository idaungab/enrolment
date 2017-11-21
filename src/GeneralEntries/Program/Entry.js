import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';
import RadioButton from '../.././Layout/RadioButtonGroup';
import Search from '../.././Layout/Search';

import '../.././style/App.css';
import '../.././style/bootstrap.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';

class Entry extends React.Component{
  constructor(){
    super();
    this.state = {
      program: [],
      displayData: [],
      searchTerm:"",
      fruits:['Apple', 'Orange','Grapes'],
      radioValue:"Masteral"};

    this.handleChange = this.handleChange.bind(this);
    this.handleRadioChange = this.handleRadioChange.bind(this);
    this._rowGetter = this._rowGetter.bind(this);
  }

  componentDidMount(){

    console.log('COMPONENT HAS MOUNTED');

    fetch('http://192.168.5.146:3000/program')
      .then(response => response.json())
          .then(data => {
            this.setState({
              program: data
            })
            console.log(data);
           })
           .catch( error => console.log('Error Fetch: ' + error))


  }

  handleChange(e){
    this.setState({searchTerm: e.target.value});
  }

  handleRadioChange(r){
    this.setState({radioValue: r.target.value});
  }

_rowGetter(rowIndex){
  return this.state.program[rowIndex];
}

  render(){
    let program = this.state.program;
      console.log(this.state.program);
    return(
      <div className="row">
        <div className="Entry">
          <Search name="search" placeholder="Search program. . ."  value={this.state.searchTerm} onChange={this.handleChange}/>
          <DropdownList data={this.state.fruits} name="department" label="Department"/>
          <Input name="programCode" label="Program Code: " type="text" placeholder="Program Code" />
          <Input name="program" label="Program" type="text" placeholder="Program" />
          <Input name="major" label="Major" type="text" placeholder="Major"/>
          <RadioButton options={['Undergraduate','Masteral','Doctorate']} name="level" value={this.state.radioValue} onChange={this.handleRadioChange}/>
          <Button btnName="Add" />
          <Button btnName="Save" />
          <Button btnName="Cancel" />

        </div>
        <div className="DataView">
          {/* <TabularData  rowsCount={program.length} data={program} twidth={1050} header1="CODE" header2="PROGRAM" header3="MAJOR" header4="DEPARTMENT"/> */}
          <Table
              rowsCount={program.length}
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

export default Entry;
