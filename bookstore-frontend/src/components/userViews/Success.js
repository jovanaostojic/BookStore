import React from "react";
function Success() {
  const url = "https://localhost:7178/api/Membership";
  const membershipTypeId = localStorage.getItem("membershipTypeId");

  const membershipToCreate = {
    userId: localStorage.getItem("userId"),
    membershipTypeId: membershipTypeId,
    membershipPaymentStatus: "ODOBRENO",
  };

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(membershipToCreate),
  })
    //.then((response) => response.json())
    .then((responseFromServer) => {
      console.log(responseFromServer);
    })
    .catch((error) => {
      console.log(error);
      //alert(error);
    });
  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="d-flex justify-content-center align-items-center">
        <h3>Plaćanje uspešno!</h3>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p>
          Kliknite <a href="/user-books">ovde</a> da pogledate koje knjige su
          Vam sada dostupne.
        </p>
      </div>
    </div>
  );
}

export default Success;
