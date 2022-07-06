import React, { useState, useEffect } from "react";
import UserCreateForm from "./createForms/UserCreateForm";
import UserUpdateForm from "./updateForms/UserUpdateForm";
import UserRoleCreateForm from "./createForms/UserRoleCreateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function User() {
  const [users, setUsers] = useState([]);
  const [showingCreateNewUserForm, setShowingCreateNewUserForm] =
    useState(false);
  const [userCurrentlyBeingUpdated, setUserCurrentlyBeingUpdated] =
    useState(null);
  const [userRolesCurrentlyBeingAdded, setUserRolesCurrentlyBeingAdded] =
    useState(false);

  const url = "https://localhost:7178/api/User";

  function getUsers() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((usersFromServer) => {
        setUsers(usersFromServer);
        console.log(usersFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteUser(id) {
    const deleteURL = url + "/" + id;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onUserDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getUsers();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = users.slice(indexofFirst, indexOfLast);
  const total = users.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...users].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setUsers(sorted);
      setSortOrder("ASC");
    }
  };
  const sortingNumbers = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...users].sort((a, b) => (a[col] > b[col] ? 1 : -1));
      setUsers(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...users].sort((a, b) => (a[col] < b[col] ? 1 : -1));
      setUsers(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewUserForm === false &&
        userCurrentlyBeingUpdated === null &&
        userRolesCurrentlyBeingAdded === false && (
          <div>
            <button onClick={() => setShowingCreateNewUserForm(true)}>
              Dodaj novog korisnika
            </button>
            <br />
            <button onClick={() => setUserRolesCurrentlyBeingAdded(true)}>
              Dodaj novu ulogu korisniku
            </button>
          </div>
        )}
      {users.length > 0 &&
        showingCreateNewUserForm === false &&
        userCurrentlyBeingUpdated === null &&
        userRolesCurrentlyBeingAdded === false &&
        renderUsersTable()}

      {showingCreateNewUserForm && (
        <UserCreateForm onUserCreated={onUserCreated} />
      )}

      {userCurrentlyBeingUpdated !== null && (
        <UserUpdateForm
          user={userCurrentlyBeingUpdated}
          onUserUpdated={onUserUpdated}
        />
      )}

      {userRolesCurrentlyBeingAdded && (
        <UserRoleCreateForm onUserRoleAdded={onUserRoleAdded} />
      )}
    </section>
  );

  function renderUsersTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("id")}>
                  ID
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("firstName")}>
                  Ime
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("lastName")}>
                  Prezime
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("birthDate")}>
                  Datum rođenja <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("address")}>
                  Adresa
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("city")}>
                  Grad
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sortingNumbers("postalCode")}>
                  Poštanski broj
                  <img src={sortIcon} />
                </th>
                <th scope="col">Država</th>
                <th scope="col" onClick={() => sortingNumbers("phoneNumber")}>
                  Broj telefona
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("email")}>
                  Email
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("userName")}>
                  Korisničko ime
                  <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((user) => (
                <tr key={user.id}>
                  <th scope="row">{user.id}</th>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.birthDate}</td>
                  <td>{user.address}</td>
                  <td>{user.city}</td>
                  <td>{user.postalCode}</td>
                  <td>{user.country.countryName}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>{user.userName}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() => setUserCurrentlyBeingUpdated(user)}
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteUser(user.id);
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

  function onUserCreated(createdUser) {
    setShowingCreateNewUserForm(false);
    if (createdUser === null) {
      return;
    }

    window.location.reload();
  }

  function onUserRoleAdded(addedUserRole) {
    setUserRolesCurrentlyBeingAdded(false);
    if (addedUserRole === null) {
      return;
    }
  }

  function onUserUpdated(updatedUser) {
    setUserCurrentlyBeingUpdated(null);

    if (updatedUser === null) {
      return;
    }

    let usersCopy = [...users];
    const index = usersCopy.findIndex((usersCopyUser) => {
      if (usersCopyUser.id === updatedUser.id) {
        return true;
      }
    });

    if (index !== -1) {
      usersCopy[index] = updatedUser;
    }

    setUsers(usersCopy);
  }

  function onUserDeleted(deletedUserId) {
    let usersCopy = [...users];

    const index = usersCopy.findIndex((usersCopyUser) => {
      if (usersCopyUser.id === deletedUserId) {
        return true;
      }
    });

    if (index !== -1) {
      usersCopy.splice(index, 1);
    }

    setUsers(usersCopy);
  }
}
export default User;
