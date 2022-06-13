import axios from '../axios';
import {
  FETCH_ITEMQUALITY_BEGIN,
  FETCH_ITEMQUALITY_SUCCESS,
  FETCH_ITEMQUALITY_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemQualityAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMQUALITY_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/quality`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_ITEMQUALITY_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMQUALITY_FAIL,
          payload: error,
        });
      });
  }
}
