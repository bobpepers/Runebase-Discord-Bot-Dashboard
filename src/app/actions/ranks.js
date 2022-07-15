import axios from '../axios';
import {
  FETCH_RANKS_BEGIN,
  FETCH_RANKS_SUCCESS,
  FETCH_RANKS_FAIL,
  UPDATE_RANK,
  REMOVE_RANK,
  ADD_RANK,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchRanksAction(
  serverId,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_RANKS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/ranks`, {
      serverId,
    }).then((response) => {
      dispatch({
        type: FETCH_RANKS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_RANKS_FAIL,
        payload: error,
      });
    });
  }
}

export function removeRankAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/rank/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_RANK,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function addRankAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/rank/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_RANK,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}

export function updateRankAction(
  id,
  level,
  name,
  expNeeded,
  roleId,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/rank/update`, {
      id,
      level,
      name,
      expNeeded,
      roleId,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_RANK,
          payload: response.data.result,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
