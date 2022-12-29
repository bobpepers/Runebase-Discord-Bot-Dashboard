import axios from '../axios';
import {
  FETCH_REMINDERS_BEGIN,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAIL,
  UPDATE_REMINDER,
  REMOVE_REMINDER,
  ADD_REMINDER,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchReminders() {
  return function (dispatch) {
    dispatch({
      type: FETCH_REMINDERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/reminders`).then((response) => {
      dispatch({
        type: FETCH_REMINDERS_SUCCESS,
        payload: response.data.result,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_REMINDERS_FAIL,
        payload: error,
      });
    });
  }
}

export function removeReminder(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/reminder/remove`, {
      id,
    }).then((response) => {
      dispatch({
        type: REMOVE_REMINDER,
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

export function addReminder(obj) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/reminder/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_REMINDER,
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

export function updateReminder(
  id,
  message,
  cron,
  embed,
  enabled,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/reminder/update`, {
      id,
      message,
      cron,
      embed,
      enabled,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_REMINDER,
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
