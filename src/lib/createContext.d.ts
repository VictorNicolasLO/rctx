import React, { Children, Context } from 'react';
import { ContextStore } from './ContextStore';
import { ContextComponent } from './ContextComponent';

export declare interface Rctx {
  context: Context<any>;
  CtxComponent: React.Component;
}

export declare interface CreateContextComponentOptions {
  store: ContextStore;
}

export declare function createContext(
  ContextComponent: ContextComponent,
  options: CreateContextComponentOptions
): Rctx;
