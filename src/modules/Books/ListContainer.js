import { saveBook, editBook } from "../../redux/books/book.actions";
import { connect } from "react-redux";
import List from "./List";

const mapStateToProps = (state) => ({
    books: state.books.books
});

const mapDispatchToProps = {
    saveBook, 
    editBook
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);