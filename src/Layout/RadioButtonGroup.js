import React from 'react';
import ReactRadioButtonGroup from 'react-radio-button-group';

import '.././style/App.css';

class RadioButtonGroup extends React.Component{
  render(){
    return(
      <div className="ReactRadioButtonGroup">
        <ReactRadioButtonGroup
            options={this.props.options}
            name={this.props.name}
            value={this.props.value}
            isStateful={true}
            onChange={this.props.onChange}
        />
      </div>
    );
  }
}

export default RadioButtonGroup;
