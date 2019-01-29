import React, { Component } from 'react';

const createRender = (
  contexts,
  contextNames,
  Component,
  props,
  data = {},
  i = 0
) => {
  if (contextNames[i]) {
    const name = contextNames[i];
    const ContextConsumer = contexts[name].context.Consumer;
    return (
      <ContextConsumer>
        {value => {
          data[name] = value;
          return createRender(
            contexts,
            contextNames,
            Component,
            props,
            data,
            i + 1
          );
        }}
      </ContextConsumer>
    );
  } else {
    return <Component {...data} {...props} />;
  }
};

export const injectContexts = (Component, contexts) => {
  const contextNames = Object.keys(contexts);

  class WithContextComponent extends React.Component {
    constructor(props) {
      super(props);
      this.renderCreated = createRender(
        contexts,
        contextNames,
        Component,
        props
      );
    }
    render() {
      return this.renderCreated;
    }
  }

  return WithContextComponent;
};
