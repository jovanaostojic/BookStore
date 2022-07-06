import React, { useState } from "react";
export default function CountryUpdateForm(props) {
  const initialFormData = Object.freeze({
    countryId: props.country.countryId,
    countryName: props.country.countryName,
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
    const countryToUpdate = {
      countryId: props.country.countryId,
      countryName: formData.countryName,
    };

    const url =
      "https://localhost:7178/api/Country" + "/" + props.country.countryId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(countryToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onCountryUpdated(countryToUpdate);
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
                    <h3>Izmena države</h3>
                    <input
                      value={formData.countryId}
                      name="countryId"
                      type="text"
                      placeholder="Id"
                      onChange={handleChange}
                      disabled
                    />
                    <input
                      value={formData.countryName}
                      name="countryName"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onCountryUpdated(null)}>
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
