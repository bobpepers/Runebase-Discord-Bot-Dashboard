import axios from '../axios';
import {
  FETCH_ACTIVITY_BEGIN,
  FETCH_ACTIVITY_SUCCESS,
  FETCH_ACTIVITY_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchActivityAction(
  userId,
  activityType,
  offset,
  limit,
) {
  return function (dispatch) {
    dispatch({
      type: FETCH_ACTIVITY_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/activity`, {
      userId,
      activityType,
      offset,
      limit,
    }).then((response) => {
      dispatch({
        type: FETCH_ACTIVITY_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_ACTIVITY_FAIL,
        payload: error,
      });
    });
  }
}
