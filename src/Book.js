import React, { Component } from 'react';
// import SelectForm from './SelectForm';

//This component is responsible for rendering book instances
//via props Book gets changeChelf method all the way from the APP and uses it whenever a new option is chosen <select>
//updating the shelf value for the book object

class Book extends Component {

	render() {
		return (
			<div className="book">
        <div className="book-top">
          <div className="book-cover" style={{ width: 128, height: 188, backgroundImage: `url(${this.props.backgroundImage})` }}></div>               
					<div className="book-shelf-changer">
						<select 
							onChange={(event) => {
								// this.setState({ status: event.target.value });
								// console.log(this.props.changeShelf);
								this.props.changeShelf(this.props.bookId, event.target.value);
								// console.log(event.target.value);
								}}
							value={this.props.shelf}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
						</select>
					</div>
        </div>
        <div className="book-title">{this.props.bookTitle}</div>
        <div className="book-authors">{this.props.by}</div>
      </div>
		);
	}
}

export default Book;
