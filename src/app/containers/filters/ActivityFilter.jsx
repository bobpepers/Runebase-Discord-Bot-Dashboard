import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import {
  Grid,
  FormControl,
  TextField,
} from '@mui/material';
const PREFIX = 'ActivityFilter';

const classes = {
  formControl: `${PREFIX}-formControl`,
  selectEmpty: `${PREFIX}-selectEmpty`
};

const StyledGrid = styled(Grid)((
  {
    theme
  }
) => ({
  [`& .${classes.formControl}`]: {
    margin: theme.spacing(1),
    minWidth: 120,
    width: '100%',
  },

  [`& .${classes.selectEmpty}`]: {
    marginTop: theme.spacing(2),
  }
}));

const ActivityFilter = function (props) {
  const {
    id,
    setId,
    spender,
    setSpender,
    earner,
    setEarner,
    type,
    setType,
    amount,
    setAmount,
  } = props;



  const handleChangeId = (event) => {
    console.log(event);
    setId(event.target.value);
  };

  const handleChangeSpender = (event) => {
    setSpender(event.target.value);
  };

  const handleChangeEarner = (event) => {
    setEarner(event.target.value);
  };
  const handleChangeType = (event) => {
    setType(event.target.value);
  };
  const handleChangeAmount = (event) => {
    setAmount(event.target.value);
  };

  return (
    <StyledGrid container item xs={12}>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="id"
            value={id}
            label="id"
            variant="filled"
            onChange={handleChangeId}
          />
        </FormControl>
      </Grid>

      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="spender"
            value={spender}
            label="spender"
            variant="filled"
            onChange={handleChangeSpender}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="earner"
            value={earner}
            label="earner"
            variant="filled"
            onChange={handleChangeEarner}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="type"
            value={type}
            label="type"
            variant="filled"
            onChange={handleChangeType}
          />
        </FormControl>
      </Grid>
      <Grid container item xs={12} md={4}>
        <FormControl variant="outlined" className={classes.formControl}>
          <TextField
            name="amount"
            value={amount}
            label="amount"
            variant="filled"
            onChange={handleChangeAmount}
          />
        </FormControl>
      </Grid>
    </StyledGrid>
  );
}

export default ActivityFilter;
