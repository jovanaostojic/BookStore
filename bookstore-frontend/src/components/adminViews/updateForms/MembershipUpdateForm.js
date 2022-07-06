import React, { useState, useEffect } from "react";
export default function MembershipUpdateForm(props) {
  const initialFormData = Object.freeze({
    membershipId: props.membership.membershipId,
    purchaseDate: props.membership.purchaseDate,
    userId: props.membership.userId,
    membershipTypeId: props.membership.membershipTypeId,
    membershipPaymentStatus: props.membership.membershipPaymentStatus,
    expiryDate: props.membership.expiryDate,
  });

  const [users, setUsers] = useState([]);
  function getUsers() {
    const url = "https://localhost:7178/api/User";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((usersFromServer) => {
        setUsers(usersFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getUsers();
  }, []);

  const [membershipTypes, setMembershipTypes] = useState([]);
  function getMembershipTypes() {
    const url = "https://localhost:7178/api/MembershipType";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((membershipTypesFromServer) => {
        setMembershipTypes(membershipTypesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getMembershipTypes();
  }, []);

  const [formData, setFormData] = useState(initialFormData);
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const membershipToUpdate = {
      membershipId: props.membership.membershipId,
      purchaseDate: formData.purchaseDate,
      userId: formData.userId,
      membershipTypeId: formData.membershipTypeId,
      membershipPaymentStatus: formData.membershipPaymentStatus,
      expiryDate: formData.expiryDate,
    };

    const url =
      "https://localhost:7178/api/Membership" +
      "/" +
      props.membership.membershipId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membershipToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onMembershipUpdated(membershipToUpdate);
  };

  return (
    <div>
      <form className="login-reg">
        <div className="container">
          <div className="row d-flex justify-content-center align-items-center">
            <div className="col-lg-9">
              <div className="row d-flex justify-content-center align-items-center">
                <div className="col-lg-6">
                  <div className="reg">
                    <h3>Izmena članarine</h3>
                    <input
                      value={formData.purchaseDate}
                      name="purchaseDate"
                      type="date"
                      placeholder="Datum kupovine"
                      onChange={handleChange}
                    />
                    <select name="userId" onChange={handleChange}>
                      <option value="">Odaberite korisnika</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.userName}
                        </option>
                      ))}
                    </select>
                    <select name="membershipTypeId" onChange={handleChange}>
                      <option value="">Odaberite članarinu</option>
                      {membershipTypes.map((membershipType) => (
                        <option
                          key={membershipType.membershipTypeId}
                          value={membershipType.membershipTypeId}
                        >
                          {membershipType.membershipName}
                        </option>
                      ))}
                    </select>
                    <input
                      value={formData.membershipPaymentStatus}
                      name="membershipPaymentStatus"
                      type="text"
                      placeholder="Status kupovine"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.expiryDate}
                      name="expiryDate"
                      type="date"
                      placeholder="Datum isteka"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onMembershipUpdated(null)}>
                      Odustani
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
