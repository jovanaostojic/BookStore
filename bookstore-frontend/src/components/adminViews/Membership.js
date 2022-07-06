import React, { useState, useEffect } from "react";
import MembershipCreateForm from "./createForms/MembershipCreateForm";
import MembershipUpdateForm from "./updateForms/MembershipUpdateForm";
import Pagination from "../Pagination";
import sortIcon from "../../img/sort.png";

function Membership() {
  const [memberships, setMemberships] = useState([]);
  const [showingCreateNewMembershipForm, setShowingCreateNewMembershipForm] =
    useState(false);
  const [membershipCurrentlyBeingUpdated, setMembershipCurrentlyBeingUpdated] =
    useState(null);

  const url = "https://localhost:7178/api/Membership";

  function getMemberships() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((membershipsFromServer) => {
        setMemberships(membershipsFromServer);
        console.log(membershipsFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  function deleteMembership(membershipId) {
    const deleteURL = url + "/" + membershipId;
    fetch(deleteURL, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
        onMembershipDeleted(membershipId);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.reload();
  }

  useEffect(() => {
    getMemberships();
  }, []);

  //Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const indexOfLast = currentPage * perPage;
  const indexofFirst = indexOfLast - perPage;
  const current = memberships.slice(indexofFirst, indexOfLast);
  const total = memberships.length;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Sorting
  const [sortOrder, setSortOrder] = useState("ASC");
  const sorting = (col) => {
    if (sortOrder === "ASC") {
      const sorted = [...memberships].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setMemberships(sorted);
      setSortOrder("DSC");
    }
    if (sortOrder === "DSC") {
      const sorted = [...memberships].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setMemberships(sorted);
      setSortOrder("ASC");
    }
  };

  return (
    <section className="add-new">
      {showingCreateNewMembershipForm === false &&
        membershipCurrentlyBeingUpdated === null && (
          <div>
            <button onClick={() => setShowingCreateNewMembershipForm(true)}>
              Dodaj novu članarinu
            </button>
          </div>
        )}
      {memberships.length > 0 &&
        showingCreateNewMembershipForm === false &&
        membershipCurrentlyBeingUpdated === null &&
        renderMembershipsTable()}

      {showingCreateNewMembershipForm && (
        <MembershipCreateForm onMembershipCreated={onMembershipCreated} />
      )}

      {membershipCurrentlyBeingUpdated !== null && (
        <MembershipUpdateForm
          membership={membershipCurrentlyBeingUpdated}
          onMembershipUpdated={onMembershipUpdated}
        />
      )}
    </section>
  );

  function renderMembershipsTable() {
    return (
      <section className="table">
        <div className="container">
          <table className="table">
            <thead>
              <tr>
                <th scope="col" onClick={() => sorting("membershipId")}>
                  ID
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("purchaseDate")}>
                  Datum (pokušaja) kupovine
                  <img src={sortIcon} />
                </th>
                <th scope="col">Korisnik</th>
                <th scope="col">Vrsta članarine</th>
                <th
                  scope="col"
                  onClick={() => sorting("membershipPaymentStatus")}
                >
                  Status plaćanja
                  <img src={sortIcon} />
                </th>
                <th scope="col" onClick={() => sorting("expiryDate")}>
                  Datum isteka
                  <img src={sortIcon} />
                </th>
                <th scope="col">Akcije</th>
              </tr>
            </thead>
            <tbody>
              {current.map((membership) => (
                <tr key={membership.membershipId}>
                  <th scope="row">{membership.membershipId}</th>
                  <td>{membership.purchaseDate}</td>
                  <td>
                    {membership.user.firstName + " " + membership.user.lastName}
                  </td>
                  <td>{membership.membershipType.membershipName}</td>
                  <td>{membership.membershipPaymentStatus}</td>
                  <td>{membership.expiryDate}</td>
                  <td>
                    <ul>
                      <li className="edit">
                        <button
                          onClick={() =>
                            setMembershipCurrentlyBeingUpdated(membership)
                          }
                        >
                          izmeni
                        </button>
                      </li>
                      <li className="delete">
                        <button
                          onClick={() => {
                            if (window.confirm("Da li ste sigurni?"))
                              deleteMembership(membership.membershipId);
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

  function onMembershipCreated(createdMembership) {
    setShowingCreateNewMembershipForm(false);
    if (createdMembership === null) {
      return;
    }

    // window.location.reload();
  }

  function onMembershipUpdated(updatedMembership) {
    setMembershipCurrentlyBeingUpdated(null);

    if (updatedMembership === null) {
      return;
    }

    let membershipsCopy = [...memberships];
    const index = membershipsCopy.findIndex((membershipsCopyMembership) => {
      if (
        membershipsCopyMembership.membershipId ===
        updatedMembership.membershipId
      ) {
        return true;
      }
    });

    if (index !== -1) {
      membershipsCopy[index] = updatedMembership;
    }

    setMemberships(membershipsCopy);
  }

  function onMembershipDeleted(deletedMembershipId) {
    let membershipsCopy = [...memberships];

    const index = membershipsCopy.findIndex((membershipsCopyMembership) => {
      if (membershipsCopyMembership.membershipId === deletedMembershipId) {
        return true;
      }
    });

    if (index !== -1) {
      membershipsCopy.splice(index, 1);
    }

    setMemberships(membershipsCopy);
  }
}
export default Membership;
