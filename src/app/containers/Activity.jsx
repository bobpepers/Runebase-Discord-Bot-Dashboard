import React, {
  useEffect,
  useState,
} from 'react';
import {
  connect,
  useDispatch,
} from 'react-redux';
import {
  Grid,
  CircularProgress,
} from '@mui/material';
import { io } from 'socket.io-client';
import { fetchActivityAction } from '../actions/activity';
import ActivityComponent from '../components/Activity';
import { withRouter } from '../hooks/withRouter';
import { INSERT_ACTIVITY } from '../actions/types/index';

const ActivityContainer = function (props) {
  const {
    auth,
    activity,
    userId,
    activityType,
    rowsPerPage,
  } = props;
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchActivityAction(
        userId,
        activityType,
        (page - 1) * rowsPerPage,
        rowsPerPage,
      ));
    }
  }, [
    auth,
    userId,
    activityType,
    page,
    rowsPerPage,
  ]);

  useEffect(() => {
    const socket = io(window.myConfig.wsEndPoint, {
      path: '/socket.io',
    });

    socket.on('updateActivity', (data) => {
      if (page === 1) {
        if (
          userId === ''
          && activityType === ''
        ) {
          dispatch({
            type: INSERT_ACTIVITY,
            payload: data.activity,
          });
        }
        if (userId !== '') {
          if (data.activity.userId.includes(userId)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
        if (activityType !== '') {
          if (data.activity.activity.includes(activityType)) {
            dispatch({
              type: INSERT_ACTIVITY,
              payload: data.activity,
            });
          }
        }
      }
    });

    return () => socket.disconnect();
  }, []);

  useEffect(() => { }, [activity]);

  const { data: activityData, count: activityCount, isFetching } = activity || {};
  const isLoading = isFetching || !activityData;

  return (
    <Grid container>

      <Grid item xs={12}>
        {
          isLoading ? (
            <CircularProgress />
          ) : (
            <ActivityComponent
              activity={activityData || []}
              totalCount={activityCount || 0}
              activitiesPerPage={rowsPerPage}
              page={page}
              setPage={setPage}
            />
          )
        }
      </Grid>
    </Grid>
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  activity: state.activity,
})

export default withRouter(connect(mapStateToProps, null)(ActivityContainer));
