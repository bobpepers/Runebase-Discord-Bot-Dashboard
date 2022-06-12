import axios from '../axios';
import {
  FETCH_CLASSES_BEGIN,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAIL,
  UPDATE_CLASS,
  REMOVE_CLASS,
  ADD_CLASS,
  ENQUEUE_SNACKBAR,
} from './types/index';
import { notistackErrorAdd } from './helpers/notistackError';

export function fetchClassesAction() {
  return function (dispatch) {
    dispatch({
      type: FETCH_CLASSES_BEGIN,
    });
    axios.post(`${window.myConfig.apiUrl}/management/classes`, {
      // id,
      // channelId,
      // channelName
    }).then((response) => {
      dispatch({
        type: FETCH_CLASSES_SUCCESS,
        payload: response.data,
      });
    }).catch((error) => {
      notistackErrorAdd(
        dispatch,
        error,
      );
      dispatch({
        type: FETCH_CLASSES_FAIL,
        payload: error,
      });
    });
  }
}

export function removeClassAction(id) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/remove`, { id })
      .then((response) => {
        dispatch({
          type: REMOVE_CLASS,
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

export function addClassAction(obj) {
  console.log(obj);
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/add`, obj)
      .then((response) => {
        dispatch({
          type: ADD_CLASS,
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

export function updateClassAction(
  id,
  name,
  strength,
  dexterity,
  vitality,
  energy,
  life,
  mana,
  stamina,
  description,
) {
  return function (dispatch) {
    axios.post(`${window.myConfig.apiUrl}/management/class/update`, {
      id,
      name,
      strength,
      dexterity,
      vitality,
      energy,
      life,
      mana,
      stamina,
      description,
    })
      .then((response) => {
        dispatch({
          type: UPDATE_CLASS,
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
