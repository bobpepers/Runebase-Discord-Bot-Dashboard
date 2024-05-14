import axios from '../axios';
import {
  FETCH_CONDITION_BEGIN,
  FETCH_CONDITION_SUCCESS,
  FETCH_CONDITION_FAIL,
  UPDATE_CONDITION,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchConditionAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CONDITION_BEGIN,
    });
    axios.get(`${window.myConfig.apiUrl}/management/condition`)
      .then((response) => {
        dispatch({
          type: FETCH_CONDITION_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_CONDITION_FAIL,
          payload: error,
        });
      });
  }
}

export function removeConditionKeyAction(conditionKey) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/condition/remove`, {
      conditionKey,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_CONDITION,
          payload: {
            key: conditionKey, // Include the key in the payload
            result: response.data.result,
          },
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: `Success: deleted condition key: ${conditionKey}`,
            key: new Date().getTime() + Math.random(),
            options: {
              variant: 'success',
            },
          },
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
      });
  }
}
