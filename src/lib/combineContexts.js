import React, { Component } from 'react';

export const combineContexts = contextList => {
  class MainContextComponent extends Component {
    constructor(props) {
      super(props);
      this.mergedContexts = this.buildContexts(contextList);
    }

    buildContexts(contexts, data = {}, i = 0) {
      if (contexts[i]) {
        const ContextComponent = contexts[i].CtxComponent;
        const result = (
          <ContextComponent>
            {this.buildContexts(contexts, data, i + 1)}
          </ContextComponent>
        );
        return result;
      } else {
        const result = this.props.children;
        return result;
      }
    }

    render() {
      return this.mergedContexts;
    }
  }
  return MainContextComponent;
};
