# Rctx

### Example

```jsx
//Test component
import { importContexts } from 'rctx';
import TestContext from './test-context.ctx';
const TestComponent = props => {
  const { testContext } = props;
  const { add } = testContext;
  return <div onClick={add}>hello world</div>;
};
export default injectContexts(TestComponent, {
  testContext: TestContext
});
```

```jsx
	//Test Context
import { ContextComponent createContext ContextStore } from  'rctx';
class  TestContext  extends  ContextComponent{
	state = {value:0}
	add  = () => {
		this.setState(prevState  => {
			return { value:  prevState.value  +  1 };
		});
	}
   }
export  default  createContext(TestContext, { store:  new  ContextStore() });
```

```jsx
//App
import TestContext from './test-context.ctx';
import { importContexts } from 'rctx';
class App extends Component {
  render() {
    return <TestComponent />;
  }
}

export default importContexts(App, [TestContext]);
```
