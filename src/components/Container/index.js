import React, { Component } from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom'

import Client from '../Client';
import Login from '../Login';
import Create from '../Create';

class Container extends Component {

  render() {
    return(
      <BrowserRouter>
        <div>
          <Switch>
            <Route path='/create-school' render={ (props)=><Create {...props} />}/>  
            <Route path='/school/:id' render={ (props)=><Client {...props} />}/>  
            <Route path='/' render={ (props)=><Login {...props} />}/>  
          </Switch>      
        </div>
      </BrowserRouter>
    )
  }
}

export default Container;
