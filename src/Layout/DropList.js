import React from 'react';
import { DropdownList } from 'react-widgets';

import 'react-widgets/dist/css/react-widgets.css';
import '.././style/App.css';
import '.././style/bootstrap.css';

class DropList extends React.Component{
  render(){
    return(
      <div className="DropList">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <DropdownList
            defaultValue={"--Select"}
            data={this.props.data}
            id={this.props.name}
        />

      </div>
    );
  }
}
export default DropList;
