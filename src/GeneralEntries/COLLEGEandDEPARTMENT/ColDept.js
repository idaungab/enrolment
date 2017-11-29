import React from 'react';
import {Table, Column, Cell} from 'fixed-data-table-2';

import '../.././style/App.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';

import DropdownList from '../.././Layout/DropList';
import Input from '../.././Layout/BasicInput';

class ColDept extends React.Component{

  constructor(props){
    super();

    this.state ={
      college : [],
      coldept: []
    }
  }
  componentDidMount(){

    console.log('COMPONENT HAS MOUNTED');
    //fetch PROGRAM data
    fetch('http://192.168.5.146:3000/COLLEGEandDEPARTMENT')
      .then(response => response.json())
          .then(data => {
            this.setState({
              coldept: data
            })
            console.log(data);
           })
           .catch( error => console.log('Error Fetch: college ' + error))

     fetch('http://192.168.5.146:3000/college')
       .then(response => response.json())
           .then(data => {
             this.setState({
               college: data
             })
             console.log(data);
            })
            .catch( error => console.log('Error Fetch: college ' + error))
  }


  render(){
    let college = this.state.coldept;
    const col = this.state.college.map(obj => obj.college );

    return(
      <div className="row">
        <div className="UpperEntry">
          <h4>COLLEGE ENTRY</h4>
          <Input name="colcode" label="College code" type="text" placeholder="Enter college code"  />
          <Input name="college" label="College" type="text" placeholder="Enter college name"  />
        </div>
        <div className="UpperEntry">
          <h4>DEPARTMENT ENTRY</h4>
          <DropdownList data={col} name="college" label="College" />
          <Input name="deptcode" label="Department code" type="text" placeholder="Enter department code"  />
          <Input name="deptname" label="Department name" type="text" placeholder="Enter department name"  />
        </div>
        <div className="DataView">
          {/* <TabularData  rowsCount={program.length} data={program} twidth={1050} header1="CODE" header2="PROGRAM" header3="MAJOR" header4="DEPARTMENT"/> */}
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
