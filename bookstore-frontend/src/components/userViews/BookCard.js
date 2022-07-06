import React from "react";
import BookImg from "../../img/book.png";

function BookCard({ book }) {
  return (
    <article key={book.bookId}>
      <img src={BookImg} className="img-fluid" alt="" />
      <h3>{book.title}</h3>
      <p>{book.author.authorFirstName + " " + book.author.authorLastName}</p>
      <div className="btns">
        <button>Preuzmi</button>
      </div>
    </article>
  );
}

export default BookCard;
