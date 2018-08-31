import { TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import React from 'react';

const InputField = observer(({ store, field, label, type }) => {
  const errors = store.errors && store.errors[field];
  const hasError = !!errors;

  return (
    <TextField
      fullWidth
      type={type}
      value={store[field]}
      label={label}
      error={hasError}
      onChange={e => store.setField(field, e.target.value)}
      margin="normal"
      helperText={errors ? errors[0] : null}
    />
  );
});

export default InputField;
