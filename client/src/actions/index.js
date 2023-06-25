import streams from '../apis/streams';
import history from '../history';
import {
    SIGN_IN,
    SIGN_OUT,
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    DELETE_STREAM,
    EDIT_STREAM,
} from './types';

// Receive the userId from the component and add it to the payload
export const signIn = userId => {
    return {
        type: SIGN_IN,
        payload: userId,
    };
};

export const signOut = () => {
    return {
        type: SIGN_OUT,
    };
};

// Create One Stream
// POST request with axios making an async action creator with redux-thunk
// The getState() function allows is to reach into the Redux store and pull out some piece of information
export const createStream = formValues => async (dispatch, getState) => {
    // Pull out the userId from auth
    const { userId } = getState().auth;
    // Post the values of the form along with the userId that created the stream
    const response = await streams.post('/streams', { ...formValues, userId });

    // Manually dispatch the action
    dispatch({ type: CREATE_STREAM, payload: response.data });

    // Programmatic navigation to get the user back to the root route (redirect) after creating the stream.
    history.push('/');
};

// Fetch All Streams
export const fetchStreams = () => async dispatch => {
    const response = await streams.get('/streams');

    dispatch({ type: FETCH_STREAMS, payload: response.data });
};

// Fetch One Stream
export const fetchStream = id => async dispatch => {
    const response = await streams.get(`/streams/${id}`);

    dispatch({ type: FETCH_STREAM, payload: response.data });
};

// Edit One Stream
export const editStream = (id, formValues) => async dispatch => {
    const response = await streams.patch(`/streams/${id}`, formValues);

    dispatch({ type: EDIT_STREAM, payload: response.data });

    // Programmatic navigation to get the user back to the root route (redirect) after editing the stream.
    history.push('/');
};

// Delete One Stream
export const deleteStream = id => async dispatch => {
    await streams.delete(`/streams/${id}`);

    dispatch({ type: DELETE_STREAM, payload: id });

    // Programmatic navigation to get the user back to the root route (redirect) after deleting the stream.
    history.push('/');
};
