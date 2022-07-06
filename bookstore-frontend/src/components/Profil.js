import React, { useState, useEffect } from "react";
import userIcon from "../img/user2.png";
import ExpiryDate from "./userViews/ExpiryDate";

function User() {
  const [user, setUser] = useState([]);
  const userId = localStorage.getItem("userId");

  const url = "https://localhost:7178/api/User/" + userId;

  function getUser() {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((usersFromServer) => {
        setUser(usersFromServer);
        console.log(usersFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }

  useEffect(() => {
    getUser();
  }, []);

  return (
    <div className="container mt-4 mb-4 p-3 d-flex justify-content-center">
      <div className="card p-4">
        <div className="image d-flex flex-column justify-content-center align-items-center">
          <br />
          <img src={userIcon} height="100" width="100" />
          <br />
          <span className="name mt-3">
            {user.firstName + " " + user.lastName}
          </span>
          <span className="idd">@{user.userName}</span>
          <p className="col">
            <b>Datum rođenja:</b> {user.birthDate}
          </p>
          <p className="col">
            <b>Adresa:</b>{" "}
            {user.address + ", " + user.city + " " + user.postalCode}
          </p>
          <p className="col">
            <b>Email:</b> {user.email}
          </p>
          <p className="col">
            <b>Broj telefona:</b> {user.phoneNumber}
          </p>
          <p className="col">
            <b>Datum isteka članarine:</b> <ExpiryDate userId={userId} />
          </p>
          <div className=" d-flex mt-2">
            <button className="btn1" onClick={LogOut}>
              Odjavi se
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  function LogOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("roles");
    localStorage.removeItem("userId");
    window.location.href = "http://localhost:3000";
  }
}
export default User;
