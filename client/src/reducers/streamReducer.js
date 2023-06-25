import _ from 'lodash';
import {
    CREATE_STREAM,
    FETCH_STREAMS,
    FETCH_STREAM,
    EDIT_STREAM,
    DELETE_STREAM,
} from '../actions/types';

// Object based reducer using key interpolation to dynamically set a key value pair
const streamReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_STREAM:
            return { ...state, [action.payload.id]: action.payload }; // Creating a single record
        case FETCH_STREAMS:
            // Mapkeys will take an array and return an object with the keys of the ids of the streams and the value of the whole stream object
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        case FETCH_STREAM:
            return { ...state, [action.payload.id]: action.payload }; // Fetching a single record
        case EDIT_STREAM:
            return { ...state, [action.payload.id]: action.payload }; // Edit a single record
        case DELETE_STREAM:
            // Delete a single record by passing the state object to the omit method and the key that we want to drop off
            // No need to reference id since the payload is the id. _.omit will return a new object.
            return _.omit(state, action.payload);
        default:
            return state;
    }
};

export default streamReducer;
