import axios from '../axios';
import {
  FETCH_CLASSDESCRIPTIONS_BEGIN,
  FETCH_CLASSDESCRIPTIONS_SUCCESS,
  FETCH_CLASSDESCRIPTIONS_FAIL,
  UPDATE_CLASSDESCRIPTION,
  REMOVE_CLASSDESCRIPTION,
  ADD_CLASSDESCRIPTION,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchClassDescriptionsAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CLASSDESCRIPTIONS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/class/descriptions`, {
      // id,
      // channelId,
      // channelName
    }).then((response) => {
      dispatch({
        type: FETCH_CLASSDESCRIPTIONS_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_CLASSDESCRIPTIONS_FAIL,
        payload: error,
      });
    });
  }
}

export function removeClassDescriptionAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/description/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_CLASSDESCRIPTION,
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

export function addClassDescriptionAction(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/description/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_CLASSDESCRIPTION,
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

export function updateClassDescriptionAction(
  id,
  name,
  description,
  image,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/description/update`, {
      id,
      name,
      description,
      image,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_CLASSDESCRIPTION,
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
