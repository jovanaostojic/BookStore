import React, { useState, useEffect } from "react";
import CountryCreateForm from "./createForms/CountryCreateForm";
import CountryUpdateForm from "./updateForms/CountryUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Country() {
  const [countries, setCountries] = useState([]);
  const [showingCreateNewCountryForm, setShowingCreateNewCountryForm] =
    useState(false);
  const [countryCurrentlyBeingUpdated, setCountryCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Country";

  function getCountries() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((countriesFromServer) => {
        setCountries(countriesFromServer);
        console.log(countriesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteCountry(countryId) {
    const deleteURL = url + "/" + countryId;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onCountryDeleted(countryId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getCountries();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = countries.slice(indexofFirst, indexOfLast);
  const total = countries.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...countries].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setCountries(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...countries].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setCountries(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewCountryForm === false &&
        countryCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewCountryForm(true)}>
              Dodaj novu državu
            </button>
          </div>
        )}
      {countries.length > 0 &&
        showingCreateNewCountryForm === false &&
        countryCurrentlyBeingUpdated === null &&
        renderCountriesTable()}

      {showingCreateNewCountryForm && (
        <CountryCreateForm onCountryCreated={onCountryCreated} />
      )}

      {countryCurrentlyBeingUpdated !== null && (
        <CountryUpdateForm
          country={countryCurrentlyBeingUpdated}
          onCountryUpdated={onCountryUpdated}
        />
      )}
    </section>
  );

  function renderCountriesTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("countryId")}>
                  ID <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("countryName")}>
                  Naziv <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((country) => (
                <tr key={country.countryId}>
                  <th scope="row">{country.countryId}</th>
                  <td>{country.countryName}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() =>
                            setCountryCurrentlyBeingUpdated(country)
                          }
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteCountry(country.countryId);
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

  function onCountryCreated(createdCountry) {
    setShowingCreateNewCountryForm(false);
    if (createdCountry === null) {
      return;
    }

    window.location.reload();
  }

  function onCountryUpdated(updatedCountry) {
    setCountryCurrentlyBeingUpdated(null);

    if (updatedCountry === null) {
      return;
    }

    let countriesCopy = [...countries];
    const index = countriesCopy.findIndex((countriesCopyCountry) => {
      if (countriesCopyCountry.countryId === updatedCountry.countryId) {
        return true;
      }
    });

    if (index !== -1) {
      countriesCopy[index] = updatedCountry;
    }

    setCountries(countriesCopy);
  }

  function onCountryDeleted(deletedCountryId) {
    let countriesCopy = [...countries];

    const index = countriesCopy.findIndex((countriesCopyCountry) => {
      if (countriesCopyCountry.countryId === deletedCountryId) {
        return true;
      }
    });

    if (index !== -1) {
      countriesCopy.splice(index, 1);
    }

    setCountries(countriesCopy);
  }
}
export default Country;
