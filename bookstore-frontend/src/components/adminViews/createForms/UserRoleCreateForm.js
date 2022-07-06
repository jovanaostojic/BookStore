import React, { useState, useEffect } from "react";
export default function UserRoleCreateForm(props) {
  const initialFormData = Object.freeze({
    userName: "",
    roleName: "",
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

  const [roles, setRoles] = useState([]);
  function getRoles() {
    const url = "https://localhost:7178/api/Role";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((rolesFromServer) => {
        setRoles(rolesFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getRoles();
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
    const userRoleToAdd = {
      userName: formData.userName,
      roleName: formData.roleName,
    };

    const url = "https://localhost:7178/UserRole";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRoleToAdd),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onUserRoleAdded(userRoleToAdd);
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
                    <h3>Dodavanje uloge korisniku</h3>
                    <select name="userName" onChange={handleChange}>
                      <option value="">Odaberite korisnika</option>
                      {users.map((user) => (
                        <option key={user.Id} value={user.userName}>
                          {user.userName}
                        </option>
                      ))}
                    </select>
                    <select name="roleName" onChange={handleChange}>
                      <option value="">Odaberite ulogu</option>
                      {roles.map((role) => (
                        <option key={role.Id} value={role.name}>
                          {role.name}
                        </option>
                      ))}
                    </select>
                    <button onClick={handleSubmit}>Dodaj</button>
                    <br />
                    <button onClick={() => props.onUserRoleAdded(null)}>
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
