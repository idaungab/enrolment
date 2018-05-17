import React from 'react';
import 'react-bootstrap';

import '.././style/bootstrap.min.css';
import '.././style/App.css';

class Button extends React.Component{
  render(){
    return(
      <div className={this.props.className}>
        <button
          className="Button"
          onClick={this.props.onClick}
          data-primary={this.props.primary}
          disabled={this.props.disabled}>
          {this.props.btnName}
        </button>
      </div>
    );
  }
}
export default Button;
