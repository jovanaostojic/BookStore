import React, { useState } from "react";
export default function CountryCreateForm(props) {
  const initialFormData = Object.freeze({
    countryName: "",
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
    const countryToCreate = {
      countryName: formData.countryName,
    };

    const url = "https://localhost:7178/api/Country";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(countryToCreate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onCountryCreated(countryToCreate);
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
                    <h3>Dodavanje nove države</h3>
                    <input
                      value={formData.countryName}
                      name="countryName"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Dodaj</button>
                    <br />
                    <button onClick={() => props.onCountryCreated(null)}>
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
