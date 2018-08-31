import { Grid } from '@material-ui/core';
import React from 'react';

const CenteredGridItem = ({ children }) => {
  return (
      <Grid container justify={'center'}>
          <Grid item xs={6}>
              {children}
          </Grid>
      </Grid>
  );
}

export default CenteredGridItem;
