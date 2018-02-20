import React from 'react';
import {BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import axios from 'axios';
import Modal from 'react-modal';

import Button from '.././Layout/Button';
import DropdownList from '.././Layout/DropList';
import Input from '.././Layout/BasicInput';
import Select from '.././Layout/Select';

import '.././style/enroll.css';
import '.././style/bootstrap.min.css';
import 'fixed-data-table-2/dist/fixed-data-table.css';
import 'react-bootstrap-table/dist/react-bootstrap-table.min.css';

class Enrolment extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      block:[],
      curriculum:[],
      major:[],
      majorValue:"",
      maxload:"",
      modalIsOpen1: true,
      modalIsOpen2:false,
      options: ['IDNo','First Name','Last Name'],
      schosta:[],
      schocsta:"",
      searchData:"",
      sem:['1st','2nd','SUM'],
      status:[],
      studid:"",
      studname:"",
      sy:['2017-2018','2018-2019'],
      year:[]
    }
  }

  closeModal(){
    this.setState({
      modalIsOpen1: false,
      modalIsOpen2:false });
  }

  render(){
    const customStyles1 = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
    const customStyles2 = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : '10%',
        bottom                : '-5%',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };

    return(
      <div>
          <div className="SearchPage">
            <Modal
              isOpen={this.state.modalIsOpen1}
              onRequestClose={this.closeModal}
              closeTimeoutMS={200}
              contentLabel="Add Program"
              ariaHideApp={false}
              style={customStyles1}
              overlayClassName="Overlay">
                  <DropdownList
                    data={this.state.options}
                    name=""
                    label="Select Option" />
                  <Input
                      name="searchdata"
                      label=""
                      placeholder=""
                      value={this.state.searchData}/>
              </Modal>
          </div>
          <div>
              <Modal
                isOpen={this.state.modalIsOpen2}
                onRequestClose={this.closeModal}
                closeTimeoutMS={200}
                contentLabel="Add Program"
                ariaHideApp={false}
                style={customStyles2}
                overlayClassName="Overlay">

                  <div className="PosComponent">
                    <div className="LComponent">
                      <DropdownList
                        data={this.state.sy}
                        name="sy"
                        label="SY"/>
                    </div>
                    <div className="RComponent">
                      <DropdownList
                        data={this.state.sem}
                        name="sem"
                        label="Sem"/>
                    </div>
                    {/* <div>
                      <Input
                        name="idno"
                        label="ID Number"
                        placeholder=""
                        value={this.state.studid}/>
                      <DropdownList
                        data={this.state.major}
                        name="major"
                        label="Major"/>
                      <DropdownList
                        data={this.state.year}
                        name="year"
                        label="Year"/>
                      <DropdownList
                        data={this.state.block}
                        name="block"
                        label="Block"/>
                      <DropdownList
                        data={this.state.status}
                        name="status"
                        label="Status"/>
                      <DropdownList
                        data={this.state.schosta}
                        name="scholarshipstatus"
                        label="Scholarship Status"/>
                    </div>
                    <div className="RComponent">
                      <DropdownList
                        data={this.state.sem}
                        name="sem"
                        label="Sem"/>

                      <Input
                        name="studname"
                        label="Name"
                        placeholder=""
                        value={this.state.studname}/>

                        <Input
                          name="majorValue"
                          label=""
                          placeholder=""
                          value={this.state.majorValue}/>

                        <DropdownList
                          data={this.state.curriculum}
                          name="curriculum"
                          label="Curriculum"/>

                        <Input
                          name="maxload"
                          label="Max Load"
                          placeholder=""
                          value={this.state.maxload}/>
                        <Input
                          name="scholasticstatus"
                          label="Scholastic Status"
                          placeholder=""
                          value={this.state.schocsta}/>
                    </div> */}
                  </div>
                    <Button
                      btnName={<i className="fa fa-plus">Save</i>} />
                    <Button
                      btnName={<i className="fa fa-plus">Cancel</i>} />
                    <Button
                      btnName={<i className="fa fa-plus">Continue</i>} />
              </Modal>
            </div>
          </div>
    );
  }
}
export default Enrolment;
