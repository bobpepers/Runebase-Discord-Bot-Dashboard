import axios from '../axios';
import {
  FETCH_SKILLTREE_BEGIN,
  FETCH_SKILLTREE_SUCCESS,
  FETCH_SKILLTREE_FAIL,
  UPDATE_SKILLTREE,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchSkilltreesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_SKILLTREE_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/skilltrees`, {

    })
      .then((response) => {
        dispatch({
          type: FETCH_SKILLTREE_SUCCESS,
          payload: response.data,
        });
      }).catch((error) => {
        notistackErrorAdd(
          dispatch,
          error,
        );
        dispatch({
          type: FETCH_SKILLTREE_FAIL,
          payload: error,
        });
      });
  }
}

export function updateSkillTreeAction(
  id,
  name,
  itemType,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/skilltree/update`, {
      id,
      name,
      itemType,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_SKILLTREE,
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
