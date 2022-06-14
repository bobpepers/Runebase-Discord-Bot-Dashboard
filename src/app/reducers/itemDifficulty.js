import {
  FETCH_ITEMDIFFICULTY_BEGIN,
  FETCH_ITEMDIFFICULTY_SUCCESS,
  FETCH_ITEMDIFFICULTY_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
  data: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ITEMDIFFICULTY_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
        data: null,
      };
    case FETCH_ITEMDIFFICULTY_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        count: action.payload.count,
        isFetching: false,
      };
    case FETCH_ITEMDIFFICULTY_FAIL:
      return {
        ...state,
        data: null,
        count: 0,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
