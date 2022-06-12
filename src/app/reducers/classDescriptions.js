import {
  FETCH_CLASSDESCRIPTIONS_BEGIN,
  FETCH_CLASSDESCRIPTIONS_SUCCESS,
  FETCH_CLASSDESCRIPTIONS_FAIL,
  UPDATE_CLASSDESCRIPTION,
  REMOVE_CLASSDESCRIPTION,
  ADD_CLASSDESCRIPTION,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLASSDESCRIPTION:
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
    case REMOVE_CLASSDESCRIPTION:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isFetching: false,
      };
    case UPDATE_CLASSDESCRIPTION:
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
    case FETCH_CLASSDESCRIPTIONS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_CLASSDESCRIPTIONS_SUCCESS:
      return {
        ...state,
        data: action.payload.result,
        isFetching: false,
      };
    case FETCH_CLASSDESCRIPTIONS_FAIL:
      return {
        ...state,
        error: action.error,
        isFetching: false,
      };
    default:
      return state;
  }
};
