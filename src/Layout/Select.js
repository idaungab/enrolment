import React from 'react';

import '.././style/App.css';
import '.././style/bootstrap.min.css';

class Select extends React.Component{
  render(){
    return(
      <div className="WithSelect">
        <input type="checkbox" onChange={this.props.onChange} checked={this.props.checked} ref={this.props.ref}/>
        <label>{this.props.label}</label>
      </div>
    );
  }
}
export default Select;
