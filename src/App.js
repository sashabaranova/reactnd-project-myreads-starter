import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import { Route } from 'react-router-dom';
import BookSearch from './BookSearch';
import ListShelves from './ListShelves';


class BooksApp extends React.Component {
  state = {
    books: []
  }
  //This method is responsible for triggering shelf change and is passed all the way down to the Book component 
  //both via ListShelves(+ its children) and BookSearch
  //The method updates the shelf value of a book
  changeShelf = (i, bookshelf) => {
    this.setState((prevState) => {
      console.log(bookshelf);

      if (i === undefined) {

      }
      prevState.books[i].shelf = bookshelf;
      // console.log(this.state.books);
      BooksAPI.update(prevState.books[i], bookshelf);
      return prevState;
    });
  }
  
  //fetch books from BooksAPI
  //set bookID (equal to it's array index) for each book object in the array to be able to get the needed book easily
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      for (let i = 0; i < books.length; i++) {
        books[i].bookId = i;
      }
      this.setState({ books });
      console.log(books);
    });
  }

  // this method is intended for adding a book from the search page to the shelves
  // and/or for updating the shelf from the search page
  addBook = (newBook, bookshelf) => {
    console.log(newBook, bookshelf);
    // checking if the book is already in the books array
    // and if it is, only calling changeShelf to set the new shelf value
    for (let book of this.state.books) {
      if (book.id === newBook.id) {
        this.changeShelf(newBook.bookId, bookshelf);
        return;
      }
    }
    // setting shelf and bookId for a new book;
    newBook.bookId = this.state.books.length;
    newBook.shelf = bookshelf;
    this.setState((prevState) => prevState.books.push(newBook));
    //sending the updated info to the backend server
    BooksAPI.update(newBook, bookshelf);
  }

  render() {
    return (
      <div className="app">
    {/*Enable navigation between two pages with Route*/}
        <Route exact path='/' render={() => (
          <ListShelves books={this.state.books} changeShelf={this.changeShelf.bind(this)}/>
        )}/>
         <Route path='/search' render={() => (
          <BookSearch books={this.state.books} changeShelf={this.changeShelf.bind(this)} addBook={this.addBook.bind(this)}/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
