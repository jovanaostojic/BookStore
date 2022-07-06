import React from "react";
function Cancel() {
  const url = "https://localhost:7178/api/Membership";

  const membershipToCreate = {
    userId: localStorage.getItem("userId"),
    membershipTypeId: localStorage.getItem("membershipTypeId"),
    membershipPaymentStatus: "ODBIJENO",
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
        <h3>Plaćanje nije izvršeno!</h3>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <p>Pokušajte ponovo.</p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <a href="http://localhost:3000/user-membershiptypes">
          Povratak na prethodnu stranu
        </a>
      </div>
    </div>
  );
}

export default Cancel;
