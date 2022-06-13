import axios from '../axios';
import {
  FETCH_ITEMTYPE_BEGIN,
  FETCH_ITEMTYPE_SUCCESS,
  FETCH_ITEMTYPE_FAIL,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchItemTypeAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_ITEMTYPE_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/item/types`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_ITEMTYPE_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_ITEMTYPE_FAIL,
          payload: error,
        });
      });
  }
}
