import React from 'react';
import 'react-bootstrap';

import '.././style/bootstrap.css';
import '.././style/App.css';

class Button extends React.Component{
  render(){
    return(
      <div className="Button">
        <button>{this.props.btnName}</button>
      </div>

    );
  }
}
export default Button;
