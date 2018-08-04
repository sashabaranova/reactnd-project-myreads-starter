import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from './Bookshelf';

//ListShelves component is responsible for rendering all bookshelves on the main screen
//It uses its books prop to filter the books for each of the three shelves and passes a new books array into Bookshelves props

class ListShelves extends Component {
	render() {
		return(
			<div className="list-books">
				<div className="list-books-title">
					<h1>MyReads</h1>
				</div>
				<div className="list-books-content">
					<div>
						<Bookshelf 
							bookshelfName="Currently Reading" 
							books={this.props.books.filter((book) => book.shelf === 'currentlyReading')} 
							changeShelf={this.props.changeShelf}/>
						<Bookshelf 
							bookshelfName="Want to Read" 
							books={this.props.books.filter((book) => book.shelf === 'wantToRead')} 
							changeShelf={this.props.changeShelf}/>
						<Bookshelf 
							bookshelfName="Read" 
							books={this.props.books.filter((book) => book.shelf === 'read')} 
							changeShelf={this.props.changeShelf}/>
					</div>
				</div>
				<div className="open-search">
					<Link to='/search'>Add a book</Link>
				</div>
			</div>
		);
	}
}


export default ListShelves;

		