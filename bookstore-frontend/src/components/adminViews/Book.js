import React, { useState, useEffect } from "react";
import BookCreateForm from "./createForms/BookCreateForm";
import BookUpdateForm from "./updateForms/BookUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Book() {
  const [books, setBooks] = useState([]);
  const [showingCreateNewBookForm, setShowingCreateNewBookForm] =
    useState(false);
  const [bookCurrentlyBeingUpdated, setBookCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Book";

  function getBooks() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((booksFromServer) => {
        setBooks(booksFromServer);
        console.log(booksFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteBook(bookId) {
    const deleteURL = url + "/" + bookId;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onBookDeleted(bookId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getBooks();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = books.slice(indexofFirst, indexOfLast);
  const total = books.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...books].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setBooks(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...books].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setBooks(sorted);
      setSortOrder("ASC");
    }
  };
  const sortingNumbers = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...books].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setBooks(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...books].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setBooks(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewBookForm === false &&
        bookCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewBookForm(true)}>
              Dodaj novu knjigu
            </button>
          </div>
        )}
      {books.length > 0 &&
        showingCreateNewBookForm === false &&
        bookCurrentlyBeingUpdated === null &&
        renderBooksTable()}

      {showingCreateNewBookForm && (
        <BookCreateForm onBookCreated={onBookCreated} />
      )}

      {bookCurrentlyBeingUpdated !== null && (
        <BookUpdateForm
          book={bookCurrentlyBeingUpdated}
          onBookUpdated={onBookUpdated}
        />
      )}
    </section>
  );

  function renderBooksTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("bookId")}>
                  ID <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("title")}>
                  Naziv <img src={sortIcon} />
                </th>
                <th scope="col">Žanr</th>
                <th scope="col">Autor</th>
                <th scope="col">Zaposleni</th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((book) => (
                <tr key={book.bookId}>
                  <th scope="row">{book.bookId}</th>
                  <td>{book.title}</td>
                  <td>{book.genre.genreName}</td>
                  <td>
                    {book.author.authorFirstName +
                      " " +
                      book.author.authorLastName}
                  </td>
                  <td>{book.user.userName + ""}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() => setBookCurrentlyBeingUpdated(book)}
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteBook(book.bookId);
                          }}
                        >
                          obriši
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination perPage={perPage} total={total} paginate={paginate} />
        </div>
      </section>
    );
  }

  function onBookCreated(createdBook) {
    setShowingCreateNewBookForm(false);
    if (createdBook === null) {
      return;
    }

    window.location.reload();
  }

  function onBookUpdated(updatedBook) {
    setBookCurrentlyBeingUpdated(null);

    if (updatedBook === null) {
      return;
    }

    let booksCopy = [...books];
    const index = booksCopy.findIndex((booksCopyBook) => {
      if (booksCopyBook.bookId === updatedBook.bookId) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy[index] = updatedBook;
    }

    setBooks(booksCopy);

    window.location.reload();
  }

  function onBookDeleted(deletedBookId) {
    let booksCopy = [...books];

    const index = booksCopy.findIndex((booksCopyBook) => {
      if (booksCopyBook.bookId === deletedBookId) {
        return true;
      }
    });

    if (index !== -1) {
      booksCopy.splice(index, 1);
    }

    setBooks(booksCopy);
  }
}
export default Book;
