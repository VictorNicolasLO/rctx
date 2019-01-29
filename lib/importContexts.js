import { combineContexts } from './combineContexts';
import React from 'react';
export const importContexts = (Component, contexts) => {
  const MainContextComponent = combineContexts(contexts);
  const ComponentWithContexts = props => {
    return (
      <MainContextComponent>
        <Component {...props} />
      </MainContextComponent>
    );
  };
  return ComponentWithContexts;
};
