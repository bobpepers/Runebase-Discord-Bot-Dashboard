import {
  FETCH_DAILY_ENERGY_BEGIN,
  FETCH_DAILY_ENERGY_SUCCESS,
  FETCH_DAILY_ENERGY_FAIL,
  UPDATE_DAILY_ENERGY,
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
  case FETCH_DAILY_ENERGY_BEGIN:
    return {
      ...state,
      isFetching: true,
      data: null,
      count: 0,
      error: null,
    };
  case FETCH_DAILY_ENERGY_SUCCESS:
    return {
      ...state,
      data: action.payload.result,
      count: action.payload.count,
      isFetching: false,
    };
  case FETCH_DAILY_ENERGY_FAIL:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case UPDATE_DAILY_ENERGY:
    return {
      ...state,
      data: state.data.filter((item) => item.key !== action.payload.key), // Remove the item with the specified key
    };
  default:
    return state;
  }
};
