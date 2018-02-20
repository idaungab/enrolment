import React from 'react';
import 'react-bootstrap';

import '.././style/bootstrap.min.css';
import '.././style/App.css';

class Button extends React.Component{
  render(){
    return(
      <div className="WithSelect">
        <button
          onClick={this.props.onClick}
          disabled={this.props.disabled}>
          {this.props.btnName}
        </button>
      </div>
    );
  }
}
export default Button;
