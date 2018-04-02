import React from 'react';
import axios from 'axios';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
// import ReactTooltip from 'react-tooltip';
import Modal from 'react-modal';

import Button from '../.././Layout/Button';
import Input from '../.././Layout/BasicInput';

// import addIcon from '../.././images/icons/add.svg';
// import editIcon from '../.././images/icons/edit.svg';
// import cancelIcon from '../.././images/icons/cancel.svg';

import '../.././style/college.css';
import '../.././style/bootstrap.min.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min';

class College extends React.Component{
  constructor(props){
    super();
    this.state ={
      college : [],
      isActive:true,
      updateColcode:"",
      updateCollege:"",
      colcodeNew:"",
      modalIsOpen:false,
      showAddButton: false,
      showEditButton: false,
      url: "http://192.168.5.146:3000/"
    }

  }
  componentDidMount(){
    console.log('COMPONENT HAS MOUNTED');
    //Get COLLEGE data for selection in department entry
      axios.get(this.state.url + 'college')
      .then(response => {
        console.log(response);
        this.setState({college: response.data});
        console.log(this.state.college);
      })
      .catch(error => {
        console.log(error);
        alert("Error occured!");
      });
  }

  handleColcodeChange(e){
    this.setState({updateColcode: e.target.value});
  }

  handleCollegeChange(e){
    this.setState({updateCollege: e.target.value});
  }

  addCollege(e){
      e.preventDefault();
      let college = {
        colcode: this.state.updateColcode,
        college: this.state.updateCollege,
        empid: "M01 - 002"
      };
      axios.post(this.state.url + 'addCollege', college)
        .then(response => {
          console.log(response);
          let col= this.state.college;
          col.push(college);
          this.setState({ college: col });
          alert("Data successfully added!");
        })
        .catch( error => {
          console.log(error);
          alert("Error occured! ID already exist or server error");
        });
  }

  saveCollegeEdit(e){
    e.preventDefault();
    let j=0;
    let college = {
      colcode: this.state.colcodeNew,
      colcodeNew:this.state.updateColcode,
      college: this.state.updateCollege,
      empid: "M01 - 002"
    };
    let colCode = this.state.college.map(obj => obj.colcode);

    for(var i=0; i< this.state.college.length;i++){
      if(college.colcode === colCode[i]){
        j=i;
      }
    }
    axios.post(this.state.url + 'updateCollege', college)
      .then(response => {
        console.log(response);
        let col = this.state.college;
        col.splice(j,1, college);
        this.setState({
          college: col,
          modalIsOpen:false
        });
        alert('Data updated');
      })
      .catch(error => {
        console.log(error.response);
        console.log(college);
        alert('Error occured!');
      });
  }

  handleRowSelect(row, isSelected, e){
        this.setState({
          modalIsOpen:true,
          showAddButton:false,
          showEditButton:true,
          updateColcode: row.colcode,
          colcodeNew:row.colcode,
          updateCollege: row.college
        });
  }
  openModalForAdding(){
    this.setState({
      modalIsOpen:true,
      showAddButton:true,
      showEditButton:false,
      updateColcode:"",
      updateCollege:""
    });
  }

  // openModalForEditing(){
  //   this.setState({
  //     modalIsOpen:true,
  //     showAddButton:false,
  //     showEditButton:true
  //   });
  // }

  closeModal(){
    this.setState({modalIsOpen: false});
  }

  render(){
    // let college = this.state.coldept;
    // const col = this.state.college.map(obj => obj.college );
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
        // <div className="row">
        //   <div className="Entry">
        <div>
        <div>
              {/* <img src={addIcon}
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
                </ReactTooltip> */}
            <Button
              btnName={<i className="fa fa-plus fa-3x"> Add Record </i>}
              onClick={this.openModalForAdding.bind(this)}/>

              <div className="CollegeFieldsPage">
                <Modal
                   isOpen={this.state.modalIsOpen}
                   onRequestClose={this.closeModal}
                   closeTimeoutMS={200}
                   contentLabel="Add Program"
                   ariaHideApp={false}
                   style={customStyles}
                   overlayClassName="Overlay">

                    <Input
                     name="colcode"
                     label="College code"
                     placeholder="Enter college code"
                     value={this.state.updateColcode}
                     onChange={this.handleColcodeChange.bind(this)} />
                   <Input
                     name="college"
                     label="College"
                     placeholder="Enter college name"
                     value={this.state.updateCollege}
                     onChange={this.handleCollegeChange.bind(this)} /><br/>

                  {this.state.showAddButton &&
                    <Button
                      btnName={<i className="fa fa-plus"> Add </i>}
                      onClick={this.addCollege.bind(this)}/> }

                  {this.state.showEditButton &&
                    <Button
                      btnName={<i className="fa fa-floppy-o">Save</i>}
                      onClick={this.saveCollegeEdit.bind(this)}/> }
                   <Button
                     btnName={<i className="fa fa-times" aria-hidden="true">Close</i>}
                     onClick={this.closeModal.bind(this)}/>
               </Modal>
              </div>
            </div>
            <div className="DataView">
                <BootstrapTable
                  data={this.state.college}
                  height={480}
                  pagination
                  selectRow={selectRow}>
                    <TableHeaderColumn dataField='colcode' isKey width="100">Code</TableHeaderColumn>
                    <TableHeaderColumn dataField='college' width="170">College</TableHeaderColumn>
                </BootstrapTable>
            </div>
          </div>
    );
  }
}
export default College;
