import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import * as BooksAPI from './BooksAPI';

//This component is responsible for rendering the search page
//It uses Link component to navigate to the main page
////It also passes several props to Book component, including:
// - bookID - reference to the bookId of a corresponding book from books array that is fetched in the App
// - shelf - reference to the shelf of a corresponding book from books array that is fetched in the App

class BookSearch extends Component {

	state = { 
		searchBooks: null // null indicates that no search was carried out yet, while [] below stands for search that gave no results
		// error: null
	}

 // this method takes querry as an argument and handles the search request
	handleSearch(query) {
    let queryTrimmed = query.trim();
    if (queryTrimmed.length < 1) {
    	this.setState({ searchBooks: [] });
    	return;
    }
		console.log(queryTrimmed);

		// fetcg request to the backend server 
    BooksAPI.search(queryTrimmed).then((searchBooks) => {
    	// console.log(searchBooks);

    	// handling the incorrect query / query that returns no results
    	if (searchBooks.error === 'empty query') {
    		this.setState({ searchBooks: [] });
    		console.log(this.state.searchBooks);
    		return;
    	}

    	// checking if the books from search results are already on the main page
    	// and changing their properties accordingly so that the same shelf status
    	// appears for the book both on main and search pages
    	for (let book of searchBooks ) {
    		for (let b of this.props.books) {
    			if (book.id === b.id) {
    				book.shelf = b.shelf;
    				book.bookId = b.bookId;
    			}
    		}
    	}
    	// setting searchBooks in the state
    	this.setState({ searchBooks });
	  }).catch((error) => {
	  	console.log(error);
	  });
  }

  // this method handles the cases when a book has no authors
  handleAuthors(arr) {
  	if (typeof arr === 'undefined') {
  		return 'Unknown';
  	}
  	return arr.join(', ');
  }
 
  // this method handles the cases when a book has no thumbnail
  handleThumbnail(arr) {
  	if (typeof arr === 'undefined' || arr.thumbnail === 'undefined') {
  		return;
  	}
  	return arr.thumbnail;
  }

  // addBookFromSearchPage = (book, bookshelf) => {
  // 	this.props.addBook(book, bookshelf);
  //   // BooksAPI.update(prevState.books[i], bookshelf);
  // }

	render() {
		return(
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input type="text" placeholder="Search by title or author" onChange={(e) => this.handleSearch(e.target.value)}/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
					{ // with this ternary we handling 3 scenarios of rendering search page
						// - nothing if no search was carried out
						// - default string if no results were returned
						// - search results if everything worked well
						this.state.searchBooks === null ? '' : 
						(this.state.searchBooks.length === 0 ? (<h3 className="no-search-results">Sorry, you search returned no books</h3>) :
							this.state.searchBooks.map((book)=> {
								if (typeof book.shelf === 'undefined') {
									book.shelf = 'none';
								}
								console.log(book.shelf);
								return (
									<li key={book.id}>
										<Book 
											shelf={book.shelf}
											changeShelf={this.props.changeShelf} 
											addBook={this.props.addBook} 
											bookTitle={book.title} 
											by={this.handleAuthors(book.authors)} 
											backgroundImage={this.handleThumbnail(book.imageLinks)} 
											page="search"
											book={book}/> 
									</li>
								)
							})
						)
					}
					</ol>
				</div>
			</div>
		);
	}
}



export default BookSearch;