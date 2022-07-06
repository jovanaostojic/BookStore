import React, { useState } from "react";
export default function MembershipTypeUpdateForm(props) {
  const initialFormData = Object.freeze({
    membershipTypeId: props.membershipType.membershipTypeId,
    membershipName: props.membershipType.membershipName,
    duration: props.membershipType.duration,
    membershipPrice: props.membershipType.membershipPrice,
    membershipPriceId: props.membershipType.membershipPriceId,
  });

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const membershipTypeToUpdate = {
      membershipTypeId: props.membershipType.membershipTypeId,
      membershipName: formData.membershipName,
      duration: formData.duration,
      membershipPrice: formData.membershipPrice,
      membershipPriceId: formData.membershipPriceId,
    };

    const url =
      "https://localhost:7178/api/MembershipType" +
      "/" +
      props.membershipType.membershipTypeId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(membershipTypeToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onMembershipTypeUpdated(membershipTypeToUpdate);
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
                    <h3>Izmena vrste članarine</h3>
                    <input
                      value={formData.membershipName}
                      name="membershipName"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.duration}
                      name="duration"
                      type="number"
                      placeholder="Trajanje (u mesecima)"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.membershipPrice}
                      name="membershipPrice"
                      type="number"
                      placeholder="Cena"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.membershipPriceId}
                      name="membershipPriceId"
                      type="text"
                      placeholder="Cena ID"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onMembershipTypeUpdated(null)}>
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
