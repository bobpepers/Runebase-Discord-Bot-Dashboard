import {
  FETCH_CLASSES_BEGIN,
  FETCH_CLASSES_SUCCESS,
  FETCH_CLASSES_FAIL,
  UPDATE_CLASS,
  REMOVE_CLASS,
  ADD_CLASS,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASS:
      return {
        ...state,
        data: [
          {
            ...action.payload,
          },
          ...state.data,
        ],
        isFetching: false,
      };
    case REMOVE_CLASS:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isFetching: false,
      };
    case UPDATE_CLASS:
      return {
        ...state,
        data: state.data.map(
          (rank) => (rank.id === action.payload.id
            ? { ...action.payload }
            : rank),
        ),
        isFetching: false,
        error: null,
      };
    case FETCH_CLASSES_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_CLASSES_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isFetching: false,
      };
    case FETCH_CLASSES_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
