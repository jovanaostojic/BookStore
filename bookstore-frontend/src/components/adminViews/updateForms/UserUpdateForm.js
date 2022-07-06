import React, { useState, useEffect } from "react";
export default function UserUpdateForm(props) {
  const initialFormData = Object.freeze({
    id: props.user.id,
    firstName: props.user.firstName,
    lastName: props.user.lastName,
    birthDate: props.user.birthDate,
    address: props.user.address,
    city: props.user.city,
    postalCode: props.user.postalCode,
    countryId: props.user.countryId,
    phoneNumber: props.user.phoneNumber,
    email: props.user.email,
    userName: props.user.userName,
    password: props.user.password,
  });

  const [countries, setCountries] = useState([]);
  const url = "https://localhost:7178/api/Country";
  function getCountries() {
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
    const userToUpdate = {
      id: props.user.id,
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

    const url = "https://localhost:7178/api/User" + "/" + props.user.id;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onUserUpdated(userToUpdate);
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
                    <h3>Izmena korisnika</h3>
                    <input
                      value={formData.id}
                      name="id"
                      type="text"
                      placeholder="Id"
                      onChange={handleChange}
                      disabled
                    />
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
                    <select
                      name="countryId"
                      defaultValue={countries[0]}
                      onChange={handleChange}
                    >
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
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onUserUpdated(null)}>
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
