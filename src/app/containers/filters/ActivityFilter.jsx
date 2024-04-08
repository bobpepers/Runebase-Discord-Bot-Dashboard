import React from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  FormControl,
  TextField,
} from '@mui/material';

const PREFIX = 'ActivityFilter';

const classes = {
  formControl: `${PREFIX}-formControl`,
  selectEmpty: `${PREFIX}-selectEmpty`,
};

const StyledGrid = styled(Grid)((
  { theme },
) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },

  [`& .${classes.selectEmpty}`]: {
    marginTop: theme.spacing(2),
  },
}));

const ActivityFilter = function (props) {
  const {
    userId,
    setUserId,
    activityType,
    setActivityType,
  } = props;

  const handleChangeUserId = (event) => {
    setUserId(event.target.value);
  };

  const handleChangeType = (event) => {
    setActivityType(event.target.value);
  };

  return (
    <StyledGrid container item xs={12}>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="userId"
            value={userId}
            label="userId"
            variant="filled"
            onChange={handleChangeUserId}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="activityType"
            value={activityType}
            label="activityType"
            variant="filled"
            onChange={handleChangeType}
          />
        </FormControl>
      </Grid>
    </StyledGrid>
  );
}

export default ActivityFilter;
