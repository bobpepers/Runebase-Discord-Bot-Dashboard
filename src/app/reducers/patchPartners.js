import {
  PATCH_PARTNERS_BEGIN,
  PATCH_PARTNERS_SUCCESS,
  PATCH_PARTNERS_FAIL,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
  case PATCH_PARTNERS_BEGIN:
    return {
      ...state,
      isFetching: true,
      error: null,
    };
  case PATCH_PARTNERS_SUCCESS:
    return {
      ...state,
      data: action.payload,
      isFetching: false,
    };
  case PATCH_PARTNERS_FAIL:
    console.log('Error: ', action.error);
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};
