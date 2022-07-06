import React, { useState } from "react";

export default function Login() {
  let userId;
  let userName;
  const initialFormData = Object.freeze({
    username: "",
    password: "",
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
    const userToCreate = {
      userName: formData.userName,
      password: formData.password,
    };
    userName = formData.userName;
    localStorage.setItem("userName", userName);
    const url = "https://localhost:7178/SignIn";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userToCreate),
    })
      .then((response) => response.json())
      .then((responseFromServer) => {
        //console.log(responseFromServer);
        //console.log(responseFromServer.token);
        localStorage.setItem("token", responseFromServer.token);
        //console.log(responseFromServer.roles);
        localStorage.setItem("roles", responseFromServer.roles);
        localStorage.setItem("userId", responseFromServer.userId);
        userId = responseFromServer.userId;
        if (
          userId == null ||
          userId == "00000000-0000-0000-0000-000000000000"
        ) {
          alert("Uneti podaci nisu tačni");
        } else {
          window.location.href = "http://localhost:3000/profil";
        }
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  };

  return (
    <form className="login-reg">
      <div className="container">
        <div className="row d-flex justify-content-center align-items-center">
          <div className="col-lg-9">
            <div className="row d-flex justify-content-center align-items-center">
              <div className="col-lg-6">
                <div className="login">
                  <h3>Prijava</h3>
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
                  <button onClick={handleSubmit}>Prijavi se</button>
                  <p>
                    Još uvek nemate nalog? <a href="/register">Registruj se</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
