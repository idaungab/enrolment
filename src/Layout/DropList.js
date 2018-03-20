import React from 'react';
import { DropdownList } from 'react-widgets';

import 'react-widgets/dist/css/react-widgets.css';
import '.././style/App.css';
import '.././style/bootstrap.min.css';

class DropList extends React.Component{
  render(){
    return(
      <div className="DropList">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <DropdownList
            disabled={this.props.disabled}
            value={this.props.value}
            data={this.props.data}
            defaultValue={this.props.defaultValue}
            id={this.props.name}
            onChange={this.props.onChange}/>
      </div>
    );
  }
}
export default DropList;
