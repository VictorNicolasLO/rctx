import React, { Component } from 'react';
import { ContextStore } from './ContextStore';

export class ContextComponent extends Component {
  Context: React.Context<any>;
  store: ContextStore;
}
