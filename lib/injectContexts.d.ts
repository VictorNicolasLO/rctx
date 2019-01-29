import React, { Component } from 'react';
import { Rctx } from './createContext';

export declare function injectContexts(
  Component: React.Component,
  contexts: Array<Rctx>
): React.Component;
