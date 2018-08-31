import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import EnrollmentComplete from './components/EnrollmentComplete';
import UserEnrollmentForm from './components/UserEnrollmentForm';

@inject('store')
@observer
export default class App extends Component {
  render() {
    const { store } = this.props;
    return store.enrollmentStatus === 'completed' ? (
      <EnrollmentComplete />
    ) : (
      <UserEnrollmentForm />
    );
  }
}
