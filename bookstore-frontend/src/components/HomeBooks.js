import React, { useState, useEffect } from "react";
import axios from "axios";
import BookImg from "../img/book.png";

function Home() {
  const url = "https://localhost:7178/api/Book";
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [url]);

  if (books) {
    return (
      <section className="books">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-6">
              <div className="inner">
                {books.map((book) => (
                  <article key={book.bookId}>
                    <img src={BookImg} className="img-fluid" alt="" />
                    <h3>{book.title}</h3>
                    <p>
                      {book.author.authorFirstName +
                        " " +
                        book.author.authorLastName}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  return <div></div>;
}
export default Home;
