import { Grid, Typography } from '@material-ui/core';
import { inject } from 'mobx-react';
import React, { Component } from 'react';
import CenteredGridItem from './CenteredGridItem';
import EmailInputField from './EmailInputField';
import EnrollButton from './EnrollButton';
import InputField from './InputField';

@inject(stores => {
  console.log(stores);
  return ({ store: stores.store });
})
export default class UserEnrollmentForm extends Component {
  render() {
    const { store } = this.props;

    return (
      <form>
        <Grid container direction="column">
          <CenteredGridItem>
            <Typography variant="title">Enroll user</Typography>
          </CenteredGridItem>
          <CenteredGridItem>
            <EmailInputField store={store} />
          </CenteredGridItem>
          <CenteredGridItem>
            <InputField
              type={'password'}
              field={'password'}
              label={'Password'}
              store={store}
            />
          </CenteredGridItem>
          <CenteredGridItem>
            <InputField
              type={'text'}
              field={'firstName'}
              label={'First Name'}
              store={store}
            />
          </CenteredGridItem>

          <CenteredGridItem>
            <InputField
              type={'text'}
              field={'lastName'}
              label={'Last Name'}
              store={store}
            />
          </CenteredGridItem>

          <CenteredGridItem>
            <EnrollButton store={store} />
          </CenteredGridItem>
        </Grid>
      </form>
    );
  }
}
