import React, { useState } from "react";
export default function AuthorUpdateForm(props) {
  const initialFormData = Object.freeze({
    authorId: props.author.authorId,
    authorFirstName: props.author.authorFirstName,
    authorLastName: props.author.authorLastName,
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
    const authorToUpdate = {
      authorId: props.author.authorId,
      authorFirstName: formData.authorFirstName,
      authorLastName: formData.authorLastName,
    };

    const url =
      "https://localhost:7178/api/Author" + "/" + props.author.authorId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authorToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onAuthorUpdated(authorToUpdate);
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
                    <h3>Izmena autora</h3>
                    <input
                      value={formData.authorId}
                      name="authorId"
                      type="text"
                      placeholder="Id"
                      onChange={handleChange}
                      disabled
                    />
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
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onAuthorUpdated(null)}>
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
