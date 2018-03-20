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

class SearchwithCategory extends React.Component{

  render(){

//***  Styles in modal for searching ***//

    const customStyles1 = {
      content : {
        top                   : '40%',
        left                  : '50%',
        right                 : '50%',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
      }
    };
//*** End of Styles in modal for searching ***//

    return(
      <div>
        <div>
            <Modal
              isOpen={this.props.isOpen}
              onRequestClose={this.props.onRequestClose}
              closeTimeoutMS={this.props.closeTimeoutMS}
              contentLabel={this.props.contentLabel}
              ariaHideApp={false}
              style={customStyles1}
              overlayClassName="Overlay">
              <div className="SearchPage">
                  <DropdownList
                    data={this.state.category}
                    name="category"
                    label="Category"
                    value={this.state.updateCategory}
                    onChange={value => this.setState({ updateCategory: value })}/>
                  <Input
                      name="searchdata"
                      label="Search"
                      placeholder=""
                      value={this.state.searchData}/><br/>
                  <Button
                    btnName={<i className="fa fa-arrow-right">Go</i>}
                    onClick={this.searchClicked.bind(this)}/>&nbsp;&nbsp;
                  <Button
                    btnName={<i className="fa fa-undo">Clear</i>} />
              </div>
              </Modal>
          </div>
        </div>

    );
  }
}
export default SearchwithCategory;
