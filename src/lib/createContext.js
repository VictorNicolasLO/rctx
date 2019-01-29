import React, { Children } from 'react';

export function createContext(ContextComponent, options = {}) {
  const { store } = options;

  let context = React.createContext({});
  class NewCtx extends ContextComponent {
    constructor(props) {
      super(props);
      this.store = store;
      if (this.store) {
        console.log(props.children.props.contextKey);
        const store = this.store.get(props.children.props.contextKey);
        this.contextKey = props.contextKey;
        this.state = {
          ...this.state,
          ...store,
          ...this
        };
      } else
        this.state = {
          ...this.state,
          ...this
        };
    }

    componentWillUnmount() {
      if (this.store) {
        this.store.set(this.state, this.props.children.props.contextKey);
      }
    }

    store = store;
    Context = context;
  }

  return { context, CtxComponent: NewCtx };
}
