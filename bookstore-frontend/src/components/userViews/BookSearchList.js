import React from "react";
import BookCard from "./BookCard";

function BookSearchList({ filteredBooks }) {
  const filtered = filteredBooks.map((book) => (
    <div className="col-lg-3 col-6">
      <div className="inner">
        <BookCard key={book.bookId} book={book} />
      </div>
    </div>
  ));
  return <div className="row">{filtered}</div>;
}

export default BookSearchList;
