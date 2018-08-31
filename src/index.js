import { Provider } from 'mobx-react';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import UserLoginApp from './App';
import registerServiceWorker from './registerServiceWorker';
import { UserEnrollmentData } from './store';


class App extends Component {
  store = new UserEnrollmentData();

  componentWillUnmount() {
    this.store.cleanup();
  }

  render() {
    const stores = {
      store: this.store,
      store2: {}
    };
    return (
    <Provider {...stores}>
      <UserLoginApp />
    </Provider>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
