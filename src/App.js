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
  //This method is responsible for triggering shelfchange and is passed all the way down to the Book component 
  //both via ListShelves(+ its children) and BookSearch
  changeShelf = (i, bookshelf) => {
    this.setState((prevState) => {
      console.log(bookshelf);
      prevState.books[i].shelf = bookshelf;
      // console.log(this.state.books);
      return prevState;
    });
  }
  
  //fetch books from BooksAPI
  //set bookID (equal to it's array index) for each book object in the array to be able to get the needed book easily
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      for (let i = 0; i <books.length; i++) {
        books[i].bookId = i;
      }
      this.setState({ books });
      // console.log(books);
    });
  }

  render() {
    return (
      <div className="app">
    {/*Enable navigation between two pages with Route*/}
        <Route exact path='/' render={() => (
          <ListShelves books={this.state.books} changeShelf={this.changeShelf.bind(this)}/>
        )}/>
         <Route path='/search' render={() => (
          <BookSearch books={this.state.books} changeShelf={this.changeShelf.bind(this)}/>
        )}/>
      </div>
    );
  }
}

export default BooksApp;
