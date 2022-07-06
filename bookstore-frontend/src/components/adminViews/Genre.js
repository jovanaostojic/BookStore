import React, { useState, useEffect } from "react";
import GenreCreateForm from "./createForms/GenreCreateForm";
import GenreUpdateForm from "./updateForms/GenreUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Genre() {
  const [genres, setGenres] = useState([]);
  const [showingCreateNewGenreForm, setShowingCreateNewGenreForm] =
    useState(false);
  const [genreCurrentlyBeingUpdated, setGenreCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Genre";

  function getGenres() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((genresFromServer) => {
        setGenres(genresFromServer);
        console.log(genresFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteGenre(genreId) {
    const deleteURL = url + "/" + genreId;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onGenreDeleted(genreId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getGenres();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = genres.slice(indexofFirst, indexOfLast);
  const total = genres.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...genres].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setGenres(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...genres].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setGenres(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewGenreForm === false &&
        genreCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewGenreForm(true)}>
              Dodaj novi žanr
            </button>
          </div>
        )}
      {genres.length > 0 &&
        showingCreateNewGenreForm === false &&
        genreCurrentlyBeingUpdated === null &&
        renderGenresTable()}

      {showingCreateNewGenreForm && (
        <GenreCreateForm onGenreCreated={onGenreCreated} />
      )}

      {genreCurrentlyBeingUpdated !== null && (
        <GenreUpdateForm
          genre={genreCurrentlyBeingUpdated}
          onGenreUpdated={onGenreUpdated}
        />
      )}
    </section>
  );

  function renderGenresTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("genreId")}>
                  ID <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("genreName")}>
                  Naziv <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((genre) => (
                <tr key={genre.genreId}>
                  <th scope="row">{genre.genreId}</th>
                  <td>{genre.genreName}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() => setGenreCurrentlyBeingUpdated(genre)}
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteGenre(genre.genreId);
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

  function onGenreCreated(createdGenre) {
    setShowingCreateNewGenreForm(false);
    if (createdGenre === null) {
      return;
    }

    window.location.reload();
  }

  function onGenreUpdated(updatedGenre) {
    setGenreCurrentlyBeingUpdated(null);

    if (updatedGenre === null) {
      return;
    }

    let genresCopy = [...genres];
    const index = genresCopy.findIndex((genresCopyGenre) => {
      if (genresCopyGenre.genreId === updatedGenre.genreId) {
        return true;
      }
    });

    if (index !== -1) {
      genresCopy[index] = updatedGenre;
    }

    setGenres(genresCopy);
  }

  function onGenreDeleted(deletedGenreId) {
    let genresCopy = [...genres];

    const index = genresCopy.findIndex((genresCopyGenre) => {
      if (genresCopyGenre.genreId === deletedGenreId) {
        return true;
      }
    });

    if (index !== -1) {
      genresCopy.splice(index, 1);
    }

    setGenres(genresCopy);
  }
}
export default Genre;
