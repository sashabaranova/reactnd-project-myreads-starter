import React, { Component } from 'react';
import Book from './Book';

//This is the component responsible for rendering instances of bookshelves
//It passes several props to Book component, including:
// - bookID - reference to the bookId of a corresponding book from books array that is fetched in the App
// - shelf - reference to the shelf of a corresponding book from books array that is fetched in the App

//If an empty books array is passed to Bookshelf from ListShelves, a default <h3> with information is rendered 

class Bookshelf extends Component {

	render() {
		return (
			<div className="bookshelf">
        <h2 className="bookshelf-title">{this.props.bookshelfName}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
						{this.props.books.length === 0 ? (<h3 className="bookshelf-empty">You don't have any books on this shelf yet.</h3>) :
							this.props.books.map((book) => (
							<li key={book.title}>
								<Book shelf={book.shelf} bookId={book.bookId} changeShelf={this.props.changeShelf} bookTitle={book.title} by={book.authors[0]} backgroundImage={book.imageLinks.thumbnail}/>
							</li>
						))}
          </ol>
        </div>
      </div>  
		);
	}
}

export default Bookshelf;
