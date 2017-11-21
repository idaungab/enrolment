import React from 'react';

import '.././style/App.css';
import '.././style/bootstrap.css';

class Search extends React.Component{
  render(){
    return(
      <form className="Search">
        <input id={this.props.name} placeholder={this.props.placeholder} value={this.props.value} onChange={this.props.onChange} />
      </form>
    );
  }
}

export default Search;
