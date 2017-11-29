import React from 'react';

import '.././style/App.css';
import '.././style/bootstrap.css';

class Select extends React.Component{
  render(){
    return(
      <div>
        <input type="checkbox" onChange={this.props.onChange} checked={this.props.checked} />
        <label>{this.props.label}</label>
      </div>
    );
  }
}
export default Select;
