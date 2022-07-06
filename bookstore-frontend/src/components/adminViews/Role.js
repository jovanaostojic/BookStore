import React, { useState, useEffect } from "react";
import RoleCreateForm from "./createForms/RoleCreateForm";
import RoleUpdateForm from "./updateForms/RoleUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Role() {
  const [roles, setRoles] = useState([]);
  const [showingCreateNewRoleForm, setShowingCreateNewRoleForm] =
    useState(false);
  const [roleCurrentlyBeingUpdated, setRoleCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Role";

  function getRoles() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((rolesFromServer) => {
        setRoles(rolesFromServer);
        console.log(rolesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteRole(id) {
    const deleteURL = url + "/" + id;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onRoleDeleted(id);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getRoles();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = roles.slice(indexofFirst, indexOfLast);
  const total = roles.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...roles].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setRoles(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...roles].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setRoles(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewRoleForm === false &&
        roleCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewRoleForm(true)}>
              Dodaj novu ulogu
            </button>
          </div>
        )}
      {roles.length > 0 &&
        showingCreateNewRoleForm === false &&
        roleCurrentlyBeingUpdated === null &&
        renderRolesTable()}

      {showingCreateNewRoleForm && (
        <RoleCreateForm onRoleCreated={onRoleCreated} />
      )}

      {roleCurrentlyBeingUpdated !== null && (
        <RoleUpdateForm
          role={roleCurrentlyBeingUpdated}
          onRoleUpdated={onRoleUpdated}
        />
      )}
    </section>
  );

  function renderRolesTable() {
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
                <th scope="col" onClick={() => sorting("name")}>
                  Naziv
                  <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((role) => (
                <tr key={role.id}>
                  <th scope="row">{role.id}</th>
                  <td>{role.name}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() => setRoleCurrentlyBeingUpdated(role)}
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteRole(role.id);
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

  function onRoleCreated(createdRole) {
    setShowingCreateNewRoleForm(false);
    if (createdRole === null) {
      return;
    }

    window.location.reload();
  }

  function onRoleUpdated(updatedRole) {
    setRoleCurrentlyBeingUpdated(null);

    if (updatedRole === null) {
      return;
    }

    let rolesCopy = [...roles];
    const index = rolesCopy.findIndex((rolesCopyRole) => {
      if (rolesCopyRole.id === updatedRole.id) {
        return true;
      }
    });

    if (index !== -1) {
      rolesCopy[index] = updatedRole;
    }

    setRoles(rolesCopy);
  }

  function onRoleDeleted(deletedRoleId) {
    let rolesCopy = [...roles];

    const index = rolesCopy.findIndex((rolesCopyRole) => {
      if (rolesCopyRole.id === deletedRoleId) {
        return true;
      }
    });

    if (index !== -1) {
      rolesCopy.splice(index, 1);
    }

    setRoles(rolesCopy);
  }
}
export default Role;
