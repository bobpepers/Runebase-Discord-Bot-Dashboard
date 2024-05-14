import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import { connect, useDispatch } from 'react-redux';
import {
  Grid,
  FormControl,
  CircularProgress,
  TextField,
} from '@mui/material';
import { withRouter } from '../../hooks/withRouter';
import { fetchConditionAction, removeConditionKeyAction } from '../../actions/condition';
import ConditionTable from '../../components/management/ConditionTable';

const PREFIX = 'Condition';

const classes = {
  formControl: `${PREFIX}-formControl`,
  selectEmpty: `${PREFIX}-selectEmpty`,
};

const Root = styled('div')((
  {
    theme,
  },
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

const ConditionView = function (props) {
  const { condition } = props;
  const dispatch = useDispatch();
  const [key, setKey] = useState('');
  const [username, setUsername] = useState('');
  const [discordUserId, setDiscordUserId] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);

  useEffect(() => dispatch(
    fetchConditionAction(),
  ), []);

  const handleChangeId = (event) => {
    setKey(event.target.value);
  };

  const handleChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleChangeDiscordUserId = (event) => {
    setDiscordUserId(event.target.value);
  };

  useEffect(() => { }, [condition]);

  const removeConditionKey = (
    conditionKey,
  ) => {
    dispatch(removeConditionKeyAction(conditionKey))
  };

  return (
    <Root className="height100 content">
      <Grid container>
        <Grid item xs={12}>
          <h3>Daily Energy</h3>
        </Grid>
        <Grid container item xs={12}>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="key"
                value={key}
                label="key"
                variant="filled"
                onChange={handleChangeId}
              />
            </FormControl>
          </Grid>
          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="userId"
                value={discordUserId}
                label="Discord User Id"
                variant="filled"
                onChange={handleChangeDiscordUserId}
              />
            </FormControl>
          </Grid>

          <Grid container item xs={12} md={4}>
            <FormControl variant="outlined" className={classes.formControl}>
              <TextField
                name="username"
                value={username}
                label="username"
                variant="filled"
                onChange={handleChangeUsername}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          {
            condition && condition.isFetching
              ? (<CircularProgress />)
              : (
                <ConditionTable
                  defaultPageSize={page}
                  page={page}
                  setPage={setPage}
                  rowsPerPage={rowsPerPage}
                  setRowsPerPage={setRowsPerPage}
                  totalCount={condition && condition.count && condition.count}
                  removeConditionKey={removeConditionKey}
                  conditionRecords={condition
                    && condition.data
                    ? condition.data
                    : []}
                />
              )
          }

        </Grid>
      </Grid>
    </Root>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  condition: state.condition,
})

export default withRouter(connect(mapStateToProps, null)(ConditionView));
