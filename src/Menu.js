import React from 'react';
import { NavLink, BrowserRouter,Switch, Route } from 'react-router-dom';

import Button from './Layout/Button';
import Program from './GeneralEntries/Program/Program';
import ColDept from './GeneralEntries/COLLEGEandDEPARTMENT/ColDept';

import './style/font-awesome.min.css';
import './style/App.css';
export default class Menu extends React.Component{

  render(){
    return(
      <BrowserRouter>
        <div className="Menu">
          <Button btnName="Program" onclick={this.onProgramClick}>
            <i className="fa fa-chevron-right"></i>
            <NavLink to="/program"></NavLink>
          </Button>

          <Button btnName="College&Department" onclick={this.onColdeptClick}>
            <i className="fa fa-chevron-right"></i>
            <NavLink to="/coldept"></NavLink>
          </Button>

          <Switch>
            <Route path="/program" exact component={Program} />
            <Route path="/coldept" exact component={ColDept} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
