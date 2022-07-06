import React, { useState, useEffect } from "react";
import BookSearchList from "./BookSearchList";
import Pagination from "../Pagination";
import ExpiryDate from "./ExpiryDate";
import { isValid } from "date-fns";

function BookSearch({ details }) {
  const [searchField, setSearchField] = useState("");
  const userId = {
    userId: localStorage.getItem("userId"),
  };
  const [isValid, setIsValid] = useState([]);
  const expiryDate = ExpiryDate(userId);

  useEffect(() => {
    const now = new Date();
    const expiryDateFormat = new Date(expiryDate);
    if (expiryDateFormat.getTime() > now.getTime()) {
      setIsValid(true);
    } else setIsValid(false);
  }, [expiryDate]);

  const filteredBooks = details.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchField.toLowerCase()) ||
      book.author.authorFirstName
        .toLowerCase()
        .includes(searchField.toLowerCase()) ||
      book.author.authorLastName
        .toLowerCase()
        .includes(searchField.toLowerCase())
    );
  });

  const handleChange = (e) => {
    setSearchField(e.target.value);
  };

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage] = useState(4);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = filteredBooks.slice(indexofFirst, indexOfLast);
  const total = filteredBooks.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  function searchList() {
    return isValid ? (
      <section className="books">
        <div className="container">
          <BookSearchList filteredBooks={current} />
          <div className="d-flex justify-content-center">
            <Pagination perPage={perPage} total={total} paginate={paginate} />
          </div>
        </div>
      </section>
    ) : (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <div className="d-flex justify-content-center align-items-center">
          <h3>Trenutno nemate važeću članarinu!</h3>
        </div>
        <div className="d-flex justify-content-center align-items-center">
          <p>
            Kliknite <a href="/user-membershiptypes">ovde</a> da kupite
            članarinu.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section>
      <br />
      <div className="search">
        <input
          className="center-block"
          placeholder="Pretraga knjiga"
          onChange={handleChange}
        />
      </div>
      {searchList()}
    </section>
  );
}

export default BookSearch;
