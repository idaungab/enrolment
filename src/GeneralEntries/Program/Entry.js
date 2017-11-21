import React from 'react';

import Button from '../.././Layout/Button';
import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';
import RadioButton from '../.././Layout/RadioButtonGroup';
import Search from '../.././Layout/Search';
import TabularData from '../.././Layout/FourColumnTable';

import '../.././style/App.css';
import '../.././style/bootstrap.css';

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
  }

  componentDidMount(){
    var that = this;
    console.log('COMPONENT HAS MOUNTED');

    fetch('http://192.168.5.146:3000/program')
      .then(response => response.json())
          .then(data => {
            this.setState({
              program: data
            })
           })
           .catch( error => console.log('Error Fetch: ' + error))

           console.log(this.state.program);
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
          <TabularData  rowsCount={program.length} data={program} twidth={1050} header1="CODE" header2="PROGRAM" header3="MAJOR" header4="DEPARTMENT"/>
        </div>

    <div>
      <ul>
        {program.map(prog => <li key={prog.progcode}> {prog.code} {prog.progdesc} {prog.progdept} {prog.college} </li>)}
      </ul>

    </div>

      </div>
    );
  }
}

export default Entry;
