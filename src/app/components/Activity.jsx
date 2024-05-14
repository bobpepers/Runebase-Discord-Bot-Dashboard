import React from 'react';
import {
  Grid,
  CircularProgress,
  Pagination,
} from '@mui/material';
import Moment from 'react-moment';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const renderItems = (
  data,
  navigate,
) => {
  const parent = [];
  data.map((activity) => {
    parent.push(
      <Grid
        container
        key={activity.id}
      >
        <Grid
          item
          container
          xs={12}
          style={{
            borderBottom: '2px dotted black',
          }}
        >

          <Grid
            item
            xs={2}
            lg={2}
            align="center"
          >
            <Moment interval={1000} fromNow>{Number(activity.timestamp)}</Moment>
          </Grid>
          <Grid
            item
            xs={2}
            lg={2}
            align="center"
          >
            {moment(activity.timestamp).utc().format('YYYY-MM-DD HH:mm:ss')}
          </Grid>
          <Grid
            item
            xs={4}
            lg={4}
            align="center"
          >
            {activity.username}
            {' '}
            (
            {activity.userId}
            )
          </Grid>
          <Grid
            item
            xs={4}
            lg={4}
            align="center"
          >
            {activity.activity}
          </Grid>
        </Grid>
      </Grid>,
    );
    return true;
  });
  return parent;
}

const ActivityComponent = function (props) {
  const {
    activity,
    totalCount,
    activitiesPerPage,
    page,
    setPage,
  } = props;

  const totalPages = totalCount
    ? Math.ceil(totalCount / activitiesPerPage)
    : 0;

  const handleNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1)
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
  };
  const handleChangePage = (
    event,
    value,
  ) => {
    setPage(value);
  }
  const navigate = useNavigate();

  return (
    <Grid
      container
      item
      xs={12}
      className="index600 glassHeaderActivity"
      style={{
        marginTop: '40px',
      }}
    >
      <Grid
        item
        xs={2}
        mx="auto"
      >
        <ArrowBackIcon
          onClick={handlePreviousPage}
          className={page > 1 ? 'previousArrowActive' : 'previousArrowDisabled'}
          style={{
            fontSize: '40px',
            float: 'left',
          }}
        />
      </Grid>
      <Grid
        item
        container
        xs={8}
        justifyContent="center"
      >
        <Pagination
          page={page}
          size="large"
          color="primary"
          count={totalPages}
          onChange={handleChangePage}
          hidePrevButton
          hideNextButton
        />
      </Grid>
      <Grid
        item
        xs={2}
      >
        <ArrowForwardIcon
          onClick={handleNextPage}
          className={totalPages > page ? 'nextArrowActive' : 'nextArrowDisabled'}
          style={{
            fontSize: '40px',
            float: 'right',
          }}
        />
        <Grid />
      </Grid>
      <Grid
        container
        item
        xs={12}
        className="glassHeader ml-20 mr-20"
      >
        {
          activity
            ? renderItems(
              activity,
              navigate,
            )
            : <CircularProgress />
        }
      </Grid>
    </Grid>
  )
}

export default ActivityComponent;
