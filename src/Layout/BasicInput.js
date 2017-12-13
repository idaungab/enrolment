import React from 'react';

import 'react-widgets/dist/css/react-widgets.css';
import '.././style/bootstrap.min.css';
import '.././style/App.css';

class BasicInput extends React.Component{
  render(){
    return(
      <div className="BasicInput WithSelect">
        <label htmlFor={this.props.name}>{this.props.label}</label>
        <input id={this.props.name}
              autoComplete="false"
              required type={this.props.type}
              placeholder={this.props.placeholder}
              value={this.props.value}
              onChange={this.props.onChange}/>
      </div>
    );
  }
}

export default BasicInput;
