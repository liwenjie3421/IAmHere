import { combineReducers } from 'redux';
import home from './home.reducer';

export default function createReducer(asyncReducers) {
    return combineReducers({
        home,
        ...asyncReducers
    });
}