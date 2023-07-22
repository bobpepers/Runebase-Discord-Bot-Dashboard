import axios from '../axios';
import {
  PATCH_PARTNERS_BEGIN,
  PATCH_PARTNERS_SUCCESS,
  PATCH_PARTNERS_FAIL,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function patchPartnersAction() {
  return function (dispatch) {
    dispatch({
      type: PATCH_PARTNERS_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/partners/patch`)
      .then((response) => {
        dispatch({
          type: PATCH_PARTNERS_SUCCESS,
          payload: response.data.result,
        });
        dispatch({
          type: ENQUEUE_SNACKBAR,
          notification: {
            message: 'Success: patch partners success',
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
        dispatch({
          type: PATCH_PARTNERS_FAIL,
          payload: error,
        });
      });
  }
}
