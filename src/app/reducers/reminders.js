import {
  FETCH_REMINDERS_BEGIN,
  FETCH_REMINDERS_SUCCESS,
  FETCH_REMINDERS_FAIL,
  UPDATE_REMINDER,
  REMOVE_REMINDER,
  ADD_REMINDER,
} from '../actions/types/index';

const initialState = {
  isFetching: false, // Default to fetching..
  error: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_REMINDER:
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
    case REMOVE_REMINDER:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload.id),
        isFetching: false,
      };
    case UPDATE_REMINDER:
      return {
        ...state,
        data: state.data.map(
          (channel) => (channel.id === action.payload.id
            ? { ...action.payload }
            : channel),
        ),
        isFetching: false,
        error: null,
      };
    case FETCH_REMINDERS_BEGIN:
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    case FETCH_REMINDERS_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isFetching: false,
      };
    case FETCH_REMINDERS_FAIL:
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
