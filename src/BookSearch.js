import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import escapeRegExp from 'escape-string-regexp';

//This component is responsible for rendering the search page
//It uses Link component to navigate to the main page
////It also passes several props to Book component, including:
// - bookID - reference to the bookId of a corresponding book from books array that is fetched in the App
// - shelf - reference to the shelf of a corresponding book from books array that is fetched in the App

//For the search the Component introduces showingBooks variable; depending on the query (empty or not)
// showingBooks is an empty array or the filtered books array (filtered with the help of escapeRegExp by title and by author) 


class BookSearch extends Component {

	state = { query: '' }

	updateQuery(query) {
    this.setState({ query: query.trim() });
  }


	render() {

		let showingBooks;
		if (this.state.query) {
			const match = new RegExp(escapeRegExp(this.state.query), 'i');
			showingBooks = this.props.books.filter((book) => match.test(`${book.title} ${book.authors[0]}`));
		} else {
			showingBooks = [];
		}
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={(e) => this.updateQuery(e.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
					{showingBooks.map((book)=> (
						<li key={book.title}>
							<Book shelf={book.shelf} bookId={book.bookId} changeShelf={this.props.changeShelf} bookTitle={book.title} by={book.authors[0]} backgroundImage={book.imageLinks.thumbnail} />
						</li>
						))}
					</ol>
				</div>
			</div>
		);
	}
}



export default BookSearch;