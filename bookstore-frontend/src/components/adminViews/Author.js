import React, { useState, useEffect } from "react";
import AuthorCreateForm from "./createForms/AuthorCreateForm";
import AuthorUpdateForm from "./updateForms/AuthorUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Author() {
  const [authors, setAuthors] = useState([]);
  const [showingCreateNewAuthorForm, setShowingCreateNewAuthorForm] =
    useState(false);
  const [authorCurrentlyBeingUpdated, setAuthorCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Author";
  const token = localStorage.getItem("token");
  const bearerToken = "Bearer " + token;

  function getAuthors() {
    fetch(url, {
      method: "GET",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.json())
      .then((authorsFromServer) => {
        setAuthors(authorsFromServer);
        console.log(authorsFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteAuthor(authorId) {
    const deleteURL = url + "/" + authorId;
    fetch(deleteURL, {
      method: "DELETE",
      headers: {
        Authorization: bearerToken,
      },
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onAuthorDeleted(authorId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getAuthors();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = authors.slice(indexofFirst, indexOfLast);
  const total = authors.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...authors].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setAuthors(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...authors].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setAuthors(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewAuthorForm === false &&
        authorCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewAuthorForm(true)}>
              Dodaj novog autora
            </button>
          </div>
        )}
      {authors.length > 0 &&
        showingCreateNewAuthorForm === false &&
        authorCurrentlyBeingUpdated === null &&
        renderAuthorsTable()}

      {showingCreateNewAuthorForm && (
        <AuthorCreateForm onAuthorCreated={onAuthorCreated} />
      )}

      {authorCurrentlyBeingUpdated !== null && (
        <AuthorUpdateForm
          author={authorCurrentlyBeingUpdated}
          onAuthorUpdated={onAuthorUpdated}
        />
      )}
    </section>
  );

  function renderAuthorsTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("authorId")}>
                  ID <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("authorFirstName")}>
                  Ime <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("authorLastName")}>
                  Prezime <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((author) => (
                <tr key={author.authorId}>
                  <th scope="row">{author.authorId}</th>
                  <td>{author.authorFirstName}</td>
                  <td>{author.authorLastName}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() => setAuthorCurrentlyBeingUpdated(author)}
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteAuthor(author.authorId);
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

  function onAuthorCreated(createdAuthor) {
    setShowingCreateNewAuthorForm(false);
    if (createdAuthor === null) {
      return;
    }

    window.location.reload();
  }

  function onAuthorUpdated(updatedAuthor) {
    setAuthorCurrentlyBeingUpdated(null);

    if (updatedAuthor === null) {
      return;
    }

    let authorsCopy = [...authors];
    const index = authorsCopy.findIndex((authorsCopyAuthor) => {
      if (authorsCopyAuthor.authorId === updatedAuthor.authorId) {
        return true;
      }
    });

    if (index !== -1) {
      authorsCopy[index] = updatedAuthor;
    }

    setAuthors(authorsCopy);
  }

  function onAuthorDeleted(deletedAuthorId) {
    let authorsCopy = [...authors];

    const index = authorsCopy.findIndex((authorsCopyAuthor) => {
      if (authorsCopyAuthor.authorId === deletedAuthorId) {
        return true;
      }
    });

    if (index !== -1) {
      authorsCopy.splice(index, 1);
    }

    setAuthors(authorsCopy);
  }
}
export default Author;
