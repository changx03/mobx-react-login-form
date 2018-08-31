import { LinearProgress } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';
import InputField from './InputField';

const EmailInputField = observer(({ store }) => {
  const { validating } = store;
  return (
    <Fragment>
      <InputField type="text" store={store} field="email" label="Email" />
      {validating ? <LinearProgress variant="query" /> : null}
    </Fragment>
  );
});

export default EmailInputField;
