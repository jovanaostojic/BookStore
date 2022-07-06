import React, { useState, useEffect } from "react";

export default function Register() {
  const initialFormData = Object.freeze({
    firstName: "",
    lastName: "",
    birthDate: "",
    address: "",
    city: "",
    postalCode: "",
    countryId: "",
    phoneNumber: "",
    email: "",
    userName: "",
    password: "",
  });

  const [countries, setCountries] = useState([]);
  function getCountries() {
    const url = "https://localhost:7178/api/Country";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((countriesFromServer) => {
        setCountries(countriesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getCountries();
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
    const userToCreate = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      birthDate: formData.birthDate,
      address: formData.address,
      city: formData.city,
      postalCode: formData.postalCode,
      countryId: formData.countryId,
      phoneNumber: formData.phoneNumber,
      email: formData.email,
      userName: formData.userName,
      password: formData.password,
    };

    const url = "https://localhost:7178/SignUp";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToCreate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    window.location.href = "http://localhost:3000/login";
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
                    <h3>Dodavanje novog korisnika</h3>
                    <input
                      value={formData.firstName}
                      name="firstName"
                      type="text"
                      placeholder="Ime"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.lastName}
                      name="lastName"
                      type="text"
                      placeholder="Prezime"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.birthDate}
                      name="birthDate"
                      type="date"
                      placeholder="Datum rođenja"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.address}
                      name="address"
                      type="text"
                      placeholder="Adresa"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.city}
                      name="city"
                      type="text"
                      placeholder="Grad"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.postalCode}
                      name="postalCode"
                      type="text"
                      placeholder="Poštanski broj"
                      onChange={handleChange}
                    />
                    <select name="countryId" onChange={handleChange}>
                      <option value="">Odaberite drzavu</option>
                      {countries.map((country) => (
                        <option
                          key={country.countryId}
                          value={country.countryId}
                        >
                          {country.countryName}
                        </option>
                      ))}
                    </select>
                    <input
                      value={formData.phoneNumber}
                      name="phoneNumber"
                      type="text"
                      placeholder="Broj telefona"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.email}
                      name="email"
                      type="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.userName}
                      name="userName"
                      type="text"
                      placeholder="Korisničko ime"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.password}
                      name="password"
                      type="password"
                      placeholder="Lozinka"
                      minlength="8"
                      alphabet="A-Za-z0-9+_%@!$*~-"
                      requiredclasses="[A-Z] [a-z] [0-9] [+_%@!$*~-]"
                      requiredclasscount="3"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Registruj se</button>
                    <br />
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
