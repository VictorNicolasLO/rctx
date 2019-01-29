import React, { Component } from 'react';

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var combineContexts = function combineContexts(contextList) {
  var MainContextComponent = function (_Component) {
    inherits(MainContextComponent, _Component);

    function MainContextComponent(props) {
      classCallCheck(this, MainContextComponent);

      var _this = possibleConstructorReturn(this, (MainContextComponent.__proto__ || Object.getPrototypeOf(MainContextComponent)).call(this, props));

      _this.mergedContexts = _this.buildContexts(contextList);
      return _this;
    }

    createClass(MainContextComponent, [{
      key: 'buildContexts',
      value: function buildContexts(contexts) {
        var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

        if (contexts[i]) {
          var ContextComponent = contexts[i].CtxComponent;
          var result = React.createElement(
            ContextComponent,
            null,
            this.buildContexts(contexts, data, i + 1)
          );
          return result;
        } else {
          var _result = this.props.children;
          return _result;
        }
      }
    }, {
      key: 'render',
      value: function render() {
        return this.mergedContexts;
      }
    }]);
    return MainContextComponent;
  }(Component);

  return MainContextComponent;
};

var ContextComponent = function (_Component) {
  inherits(ContextComponent, _Component);

  function ContextComponent(props) {
    classCallCheck(this, ContextComponent);

    var _this = possibleConstructorReturn(this, (ContextComponent.__proto__ || Object.getPrototypeOf(ContextComponent)).call(this, props));

    _this.Context = undefined;
    _this.store = undefined;

    console.log('contectComponent initialized');
    return _this;
  }

  createClass(ContextComponent, [{
    key: 'render',
    value: function render() {
      if (!this.Context) {
        return '';
      }
      return React.createElement(
        this.Context.Provider,
        { value: this.state },
        this.props.children
      );
    }
  }]);
  return ContextComponent;
}(Component);

var ContextStore = function () {
  function ContextStore(defaultData) {
    classCallCheck(this, ContextStore);
    this.data = {};

    if (defaultData) this.data = defaultData;
  }

  createClass(ContextStore, [{
    key: "set",
    value: function set$$1(data, key) {
      if (!this.data[key]) {
        this.data[key] = {};
      }
      this.data[key] = _extends({}, this.data[key], data);
    }
  }, {
    key: "get",
    value: function get$$1(key) {
      if (!this.data[key]) {
        this.data[key] = {};
      }
      return this.data[key];
    }
  }]);
  return ContextStore;
}();

function createContext(ContextComponent) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var store = options.store;


  var context = React.createContext({});

  var NewCtx = function (_ContextComponent) {
    inherits(NewCtx, _ContextComponent);

    function NewCtx(props) {
      classCallCheck(this, NewCtx);

      var _this = possibleConstructorReturn(this, (NewCtx.__proto__ || Object.getPrototypeOf(NewCtx)).call(this, props));

      _this.store = store;
      _this.Context = context;

      _this.store = store;
      if (_this.store) {
        console.log(props.children.props.contextKey);
        var _store = _this.store.get(props.children.props.contextKey);
        _this.contextKey = props.contextKey;
        _this.state = _extends({}, _this.state, _store, _this);
      } else _this.state = _extends({}, _this.state, _this);
      return _this;
    }

    createClass(NewCtx, [{
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.store) {
          this.store.set(this.state, this.props.children.props.contextKey);
        }
      }
    }]);
    return NewCtx;
  }(ContextComponent);

  return { context: context, CtxComponent: NewCtx };
}

var importContexts = function importContexts(Component$$1, contexts) {
  var MainContextComponent = combineContexts(contexts);
  var ComponentWithContexts = function ComponentWithContexts(props) {
    return React.createElement(
      MainContextComponent,
      null,
      React.createElement(Component$$1, props)
    );
  };
  return ComponentWithContexts;
};

var createRender = function createRender(contexts, contextNames, Component$$1, props) {
  var data = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var i = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;

  if (contextNames[i]) {
    var name = contextNames[i];
    var ContextConsumer = contexts[name].context.Consumer;
    return React.createElement(
      ContextConsumer,
      null,
      function (value) {
        data[name] = value;
        return createRender(contexts, contextNames, Component$$1, props, data, i + 1);
      }
    );
  } else {
    return React.createElement(Component$$1, _extends({}, data, props));
  }
};

var injectContexts = function injectContexts(Component$$1, contexts) {
  var contextNames = Object.keys(contexts);

  var WithContextComponent = function (_React$Component) {
    inherits(WithContextComponent, _React$Component);

    function WithContextComponent(props) {
      classCallCheck(this, WithContextComponent);

      var _this = possibleConstructorReturn(this, (WithContextComponent.__proto__ || Object.getPrototypeOf(WithContextComponent)).call(this, props));

      _this.renderCreated = createRender(contexts, contextNames, Component$$1, props);
      return _this;
    }

    createClass(WithContextComponent, [{
      key: 'render',
      value: function render() {
        return this.renderCreated;
      }
    }]);
    return WithContextComponent;
  }(React.Component);

  return WithContextComponent;
};

export { combineContexts, ContextComponent, ContextStore, createContext, importContexts, injectContexts };
//# sourceMappingURL=index.es.js.map
