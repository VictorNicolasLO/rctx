import React, { Component } from 'react';

export class ContextComponent extends Component {
  Context = undefined;
  store = undefined;
  constructor(props) {
    super(props);
    console.log('contectComponent initialized');
  }

  render() {
    if (!this.Context) {
      return '';
    }
    return (
      <this.Context.Provider value={this.state}>
        {this.props.children}
      </this.Context.Provider>
    );
  }
}
