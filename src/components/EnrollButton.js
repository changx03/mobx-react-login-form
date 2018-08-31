import { Button, CircularProgress, Typography } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { Fragment } from 'react';

const EnrollButton = observer(({ store }) => {
  const isEnrolling = store.enrollmentStatus === 'pending';
  const failed = store.enrollmentStatus === 'failed';
  const disabled = isEnrolling || !!store.errors;
  console.log(isEnrolling, store.errors, disabled);
  return (
    <Fragment>
      <Button
        variant="raised"
        color="primary"
        style={{ marginTop: 20 }}
        disabled={disabled}
        onClick={() => store.enroll()}
      >
        Enroll
        {isEnrolling ? (
          <CircularProgress
            style={{ color: 'white', marginLeft: 10 }}
            size={20}
            variant="indeterminate"
          />
        ) : null}
      </Button>
      {failed ? (
        <Typography color="secondary" variant="subheading">
          Failed to enroll
        </Typography>
      ) : null}
    </Fragment>
  );
});

export default EnrollButton;
