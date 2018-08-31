import { Button, Paper, Typography } from '@material-ui/core';
import { CheckCircle } from '@material-ui/icons';
import { inject } from 'mobx-react';
import React, { Component } from 'react';
import CenteredGridItem from './CenteredGridItem';

@inject('store')
export default class EnrollmentComplete extends Component {
  render() {
    const { store } = this.props;

    return (
      <CenteredGridItem>
        <Paper elevation={2} style={{ textAlign: 'center', padding: 20 }}>
          <CheckCircle color={'primary'} />
          <Typography variant={'headline'} color={'primary'}>
            User Enrolled
          </Typography>

          <Button onClick={() => store.reset()}>Back to Enroll</Button>
        </Paper>
      </CenteredGridItem>
    );
  }
}
