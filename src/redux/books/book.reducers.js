const initialState = {
    books: [
        {
            id: 1611811006089,
            title: 'Book 2',
            description: 'Book 2 description',
            author: 'Author 2',
            count: 20
        },
        {
            id: 1613817006089,
            title: 'Book 1',
            description: 'Book 1 description',
            author: 'Author 1',
            count: 30
        },
    ]
}

export default function BOOK_REDUCER(state = initialState, action) {
    switch (action.type) {
        case 'books/add':
            var books = [...state.books]
            books.push({...action.payload, id: new Date().getTime() });
            return {
                ...state,
                books
            }
        case 'books/edit':

            var allBooks = [...state.books];
            var updatedBook = action.payload;
            console.log({updatedBook});

            allBooks.forEach(book => {
                if(book.id === updatedBook.id){
                    book['author'] = updatedBook['author'];
                    book['description'] = updatedBook['description'];
                    book['count'] = updatedBook['count'];
                    book['title'] = updatedBook['title'];
                }
                return book
            })
            console.log('updated books', {allBooks});

            return {
                ...state,
                books: allBooks
            }
        default:
            return state;
    }
}