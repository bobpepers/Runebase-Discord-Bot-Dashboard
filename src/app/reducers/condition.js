import {
  FETCH_CONDITION_BEGIN,
  FETCH_CONDITION_SUCCESS,
  FETCH_CONDITION_FAIL,
  UPDATE_CONDITION,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (
  state = initialState,
  action,
) => {
  switch (action.type) {
  case FETCH_CONDITION_BEGIN:
    return {
      ...state,
      isFetching: true,
      data: null,
      count: 0,
      error: null,
    };
  case FETCH_CONDITION_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_CONDITION_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case UPDATE_CONDITION:
    return {
      ...state,
      data: state.data.filter((item) => item.key !== action.payload.key), // Remove the item with the specified key
    };
  default:
    return state;
  }
};
