import React, { useState } from "react";
export default function AuthorCreateForm(props) {
  const initialFormData = Object.freeze({
    authorFirstName: "",
    authorLastName: "",
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
    const authorToCreate = {
      authorFirstName: formData.authorFirstName,
      authorLastName: formData.authorLastName,
    };

    const url = "https://localhost:7178/api/Author";
    const token = localStorage.getItem("token");
    const bearerToken = "Bearer " + token;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: bearerToken,
      },
      body: JSON.stringify(authorToCreate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onAuthorCreated(authorToCreate);
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
                    <h3>Dodavanje novog autora</h3>
                    <input
                      value={formData.authorFirstName}
                      name="authorFirstName"
                      type="text"
                      placeholder="Ime"
                      onChange={handleChange}
                    />
                    <input
                      value={formData.authorLastName}
                      name="authorLastName"
                      type="text"
                      placeholder="Prezime"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Dodaj</button>
                    <br />
                    <button onClick={() => props.onAuthorCreated(null)}>
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
