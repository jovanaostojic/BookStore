import React, { useState, useEffect } from "react";
import MembershipTypeCreateForm from "./createForms/MembershipTypeCreateForm";
import MembershipTypeUpdateForm from "./updateForms/MembershipTypeUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function MembershipType() {
  const [membershipTypes, setMembershipTypes] = useState([]);
  const [
    showingCreateNewMembershipTypeForm,
    setShowingCreateNewMembershipTypeForm,
  ] = useState(false);
  const [
    membershipTypeCurrentlyBeingUpdated,
    setMembershipTypeCurrentlyBeingUpdated,
  ] = useState(null);

  const url = "https://localhost:7178/api/MembershipType";

  function getMembershipTypes() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((membershipTypesFromServer) => {
        setMembershipTypes(membershipTypesFromServer);
        console.log(membershipTypesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteMembershipType(membershipTypeId) {
    const deleteURL = url + "/" + membershipTypeId;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onMembershipTypeDeleted(membershipTypeId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getMembershipTypes();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = membershipTypes.slice(indexofFirst, indexOfLast);
  const total = membershipTypes.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...membershipTypes].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMembershipTypes(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...membershipTypes].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMembershipTypes(sorted);
      setSortOrder("ASC");
    }
  };
  const sortingNumbers = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...membershipTypes].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setMembershipTypes(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...membershipTypes].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setMembershipTypes(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewMembershipTypeForm === false &&
        membershipTypeCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewMembershipTypeForm(true)}>
              Dodaj novu vrstu članarine
            </button>
          </div>
        )}
      {membershipTypes.length > 0 &&
        showingCreateNewMembershipTypeForm === false &&
        membershipTypeCurrentlyBeingUpdated === null &&
        renderMembershipTypesTable()}

      {showingCreateNewMembershipTypeForm && (
        <MembershipTypeCreateForm
          onMembershipTypeCreated={onMembershipTypeCreated}
        />
      )}

      {membershipTypeCurrentlyBeingUpdated !== null && (
        <MembershipTypeUpdateForm
          membershipType={membershipTypeCurrentlyBeingUpdated}
          onMembershipTypeUpdated={onMembershipTypeUpdated}
        />
      )}
    </section>
  );

  function renderMembershipTypesTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("membershipTypeId")}>
                  ID
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("membershipName")}>
                  Naziv
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sortingNumbers("duration")}>
                  Trajanje (u mesecima)
                  <img src={sortIcon} />
                </th>
                <th
                  scope="col"
                  onClick={() => sortingNumbers("membershipPrice")}
                >
                  Cena
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("membershipPriceId")}>
                  Cena ID
                  <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((membershipType) => (
                <tr key={membershipType.membershipTypeId}>
                  <th scope="row">{membershipType.membershipTypeId}</th>
                  <td>{membershipType.membershipName}</td>
                  <td>{membershipType.duration}</td>
                  <td>{membershipType.membershipPrice}</td>
                  <td>{membershipType.membershipPriceId}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() =>
                            setMembershipTypeCurrentlyBeingUpdated(
                              membershipType
                            )
                          }
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteMembershipType(
                                membershipType.membershipTypeId
                              );
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

  function onMembershipTypeCreated(createdMembershipType) {
    setShowingCreateNewMembershipTypeForm(false);
    if (createdMembershipType === null) {
      return;
    }

    window.location.reload();
  }

  function onMembershipTypeUpdated(updatedMembershipType) {
    setMembershipTypeCurrentlyBeingUpdated(null);

    if (updatedMembershipType === null) {
      return;
    }

    let membershipTypesCopy = [...membershipTypes];
    const index = membershipTypesCopy.findIndex(
      (membershipTypesCopyMembershipType) => {
        if (
          membershipTypesCopyMembershipType.membershipTypeId ===
          updatedMembershipType.membershipTypeId
        ) {
          return true;
        }
      }
    );

    if (index !== -1) {
      membershipTypesCopy[index] = updatedMembershipType;
    }

    setMembershipTypes(membershipTypesCopy);
  }

  function onMembershipTypeDeleted(deletedMembershipTypeId) {
    let membershipTypesCopy = [...membershipTypes];

    const index = membershipTypesCopy.findIndex(
      (membershipTypesCopyMembershipType) => {
        if (
          membershipTypesCopyMembershipType.membershipTypeId ===
          deletedMembershipTypeId
        ) {
          return true;
        }
      }
    );

    if (index !== -1) {
      membershipTypesCopy.splice(index, 1);
    }

    setMembershipTypes(membershipTypesCopy);
  }
}
export default MembershipType;
