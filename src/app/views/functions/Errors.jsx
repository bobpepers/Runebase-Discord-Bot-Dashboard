import React, {
  useEffect,
  useState,
} from 'react';
import { styled } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import CircularProgress from '@mui/material/CircularProgress';
import {
  Grid,
  Pagination,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Moment from 'react-moment';
import { withRouter } from '../../hooks/withRouter';
import {
  fetchErrorsAction,
} from '../../actions/errors';

const PREFIX = 'Errors';

const classes = {
  card: `${PREFIX}-card`,
  bullet: `${PREFIX}-bullet`,
  title: `${PREFIX}-title`,
  pos: `${PREFIX}-pos`
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

const renderItems = (data) => {
  const parent = [];
  data.map((error) => {
    parent.push(
      <Grid container key={error.id}>
        <Grid item xs={1} align="center">
          {error.id}
        </Grid>
        <Grid item xs={2}>
          <Moment interval={1000} fromNow>{error.createdAt}</Moment>
        </Grid>
        <Grid item xs={2} align="center">
          {error.type}
        </Grid>
        <Grid item xs={7} align="center">
          {error.error}
        </Grid>
      </Grid>,
    );
    return true;
  });
  return parent;
}

const Errors = function (props) {
  const {
    auth,
    errors,
  } = props;
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const totalPages = errors && errors.count
    ? Math.ceil(errors.count / rowsPerPage)
    : 0;

  useEffect(() => {
    if (auth.authenticated) {
      dispatch(fetchErrorsAction(
        (page - 1) * rowsPerPage,
        rowsPerPage,
      ));
    }
  }, [
    auth,
    page,
  ]);

  useEffect(
    () => {
      console.log(page);
      console.log(totalPages);
    },
    [
      auth,
      errors,
      page,
    ],
  );

  const handleChangePage = (
    event,
    value,
  ) => {
    setPage(value);
  }

  const handleNextPage = () => {
    if (totalPages > page) {
      setPage(page + 1)
    }
    console.log(page);
    console.log(totalPages);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
    }
    console.log(page);
    console.log(totalPages);
  };

  return (
    <Root className="height100 content">
      <Grid
        container
        spacing={0}
        style={{ marginTop: '5px' }}
      >
        <Grid item xs={12}>
          <Grid
            container
            item
            xs={12}
            className="shadow-w index600 glassHeaderActivity"
            style={{ marginTop: '40px' }}
          >
            <Grid item xs={2} mx="auto">
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
            <Grid item xs={2}>
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
            <Grid container item xs={12} className="shadow-w pl-20 glassHeader">
              {
                errors
                && errors.data
                  ? renderItems(errors.data)
                  : <CircularProgress />
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Root>
  );
}

Errors.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
})

export default (withRouter(connect(mapStateToProps, null)(Errors)));
