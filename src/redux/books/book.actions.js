

function addBookState (book) {
    return {
        type: 'books/add',
        payload: book
    }
}

function editBookState (book) {
    return {
        type: 'books/edit',
        payload: book
    }
}

export const saveBook = (book) => {
    return function (dispatch) {
        dispatch(addBookState(book))
    }
}

export const editBook = (book) => {
    console.log({book});
    return function (dispatch) {
        dispatch(editBookState(book))
    }
}