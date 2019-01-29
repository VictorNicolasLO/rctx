import { combineContexts } from './combineContexts';
import React from 'react';
import { Rctx } from './createContext';
export declare function importContexts(
  Component: React.Component,
  contexts: Array<Rctx>
): React.Component;
