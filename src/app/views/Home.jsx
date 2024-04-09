import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Divider,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';

import ActivityContainer from '../containers/Activity';
import ActivityFilter from '../containers/filters/ActivityFilter';

import { withRouter } from '../hooks/withRouter';
import { fetchNodeStatusAction } from '../actions/nodeStatus';
import { fetchBlockNumberAction } from '../actions/blockNumber';
import { startSyncAction } from '../actions/startSync';
import { fetchLiabilityAction } from '../actions/liability';
import { patchPartnersAction } from '../actions/patchPartners';
import { fetchBalanceAction } from '../actions/balance';

const PREFIX = 'Home';

const classes = {
  card: `${PREFIX}-card`,
  bullet: `${PREFIX}-bullet`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`,
};

const Root = styled('div')({
  [`& .${classes.card}`]: {
    minWidth: 275,
    margin: '50px',
  },
  [`& .${classes.bullet}`]: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  [`& .${classes.title}`]: {
    fontSize: 14,
  },
  [`& .${classes.pos}`]: {
    marginBottom: 12,
  },
});

const Home = function (props) {
  const {
    auth,
    nodeStatus,
    liability,
    balance,
    patchPartners,
    faucetBalance,
    blockNumber,
    startSync,
  } = props;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const refreshStats = () => {
    if (auth.authenticated) {
      dispatch(fetchNodeStatusAction());
      dispatch(fetchLiabilityAction());
      dispatch(fetchBalanceAction());
      dispatch(fetchBlockNumberAction());
    }
  }

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchNodeStatusAction());
      dispatch(fetchLiabilityAction());
      dispatch(fetchBalanceAction());
      dispatch(fetchBlockNumberAction());
    }
  }, [
    auth,
    startSync,
  ]);

  useEffect(
    () => {
      console.log(auth);
    },
    [
      auth,
      nodeStatus,
      liability,
      balance,
      faucetBalance,
      blockNumber,
    ],
  );

  const patchPartnersFunction = () => {
    dispatch(patchPartnersAction())
  }
  const startSyncFunction = () => {
    dispatch(startSyncAction())
  }

  const [userId, setUserId] = useState('');
  const [activityType, setActivityType] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(50);

  return (
    <Root className="height100 content">
      <Grid
        container
        spacing={1}
        justifyContent="center"
        className="zindexOne"
      >
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Status
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {nodeStatus.data
              && nodeStatus.data.peers
              ? `${nodeStatus.data.peers.length} peers`
              : 'offline'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Liability
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {liability.data
              && liability.data
              && liability.data.amount
              ? `${liability.data.amount / 1e8} ${window.myConfig.ticker}`
              : `0 ${window.myConfig.ticker}`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Balance
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {balance.data
              && balance.data
              && balance.data.amount
              ? `${balance.data.amount} ${window.myConfig.ticker}`
              : `0 ${window.myConfig.ticker}`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Difference
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {balance.data
              && balance.data.amount
              && liability.data
              && liability.data.amount
              ? `${((Number(balance.data.amount) - (Number(liability.data.amount) / 1e8))).toFixed(8)} ${window.myConfig.ticker}`
              : `0 ${window.myConfig.ticker}`}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            Node blockNumber
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {blockNumber.data
              && blockNumber.data
              ? `${blockNumber.data.node}`
              : '0'}
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          sm={6}
          md={4}
          lg={3}
          xl={3}
          className="zindexOne"
          justifyContent="center"
        >
          <Typography
            variant="h6"
            gutterBottom
            component="div"
            align="center"
          >
            DB blockNumber
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            component="div"
            align="center"
          >
            {blockNumber.data
              && blockNumber.data
              ? `${blockNumber.data.db}`
              : '0'}
          </Typography>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        style={{
          marginTop: '5px',
          marginBottom: '5px',
        }}
      >
        <Divider
          style={{ width: '100%' }}
        />

        <Grid
          align="center"
          justifyContent="center"
          item
          xs={4}
        >
          {
            patchPartners.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => patchPartnersFunction()}
              >
                Patch Partners
              </Button>
            )
          }
        </Grid>
        <Grid
          align="center"
          justifyContent="center"
          item
          xs={4}
        >
          {
            blockNumber.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => refreshStats()}
              >
                Refresh Stats
              </Button>
            )
          }

        </Grid>
        <Grid
          align="center"
          justifyContent="center"
          item
          xs={4}
        >
          {
            startSync.isFetching ? (
              <CircularProgress />
            ) : (
              <Button
                variant="contained"
                onClick={() => startSyncFunction()}
              >
                Start Sync
              </Button>
            )
          }

        </Grid>

      </Grid>

      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Divider
          style={{ width: '100%' }}
        />
        <Grid item xs={12}>
          <h3>Activity</h3>
        </Grid>
        <Grid item xs={12}>
          <ActivityFilter
            userId={userId}
            setUserId={setUserId}
            activityType={activityType}
            setActivityType={setActivityType}
          />
        </Grid>

        <Grid item xs={12}>
          <ActivityContainer
            userId={userId}
            activityType={activityType}
            rowsPerPage={rowsPerPage}
          />
        </Grid>
      </Grid>
    </Root>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  nodeStatus: state.nodeStatus,
  liability: state.liability,
  balance: state.balance,
  patchPartners: state.patchPartners,
  faucetBalance: state.faucetBalance,
  blockNumber: state.blockNumber,
  startSync: state.startSync,
})

export default (withRouter(connect(mapStateToProps, null)(Home)));
