import { combineReducers } from 'redux';
import BOOK_REDUCER from './books/book.reducers';


const rootReducer = combineReducers({
    books: BOOK_REDUCER
});

export default rootReducer;