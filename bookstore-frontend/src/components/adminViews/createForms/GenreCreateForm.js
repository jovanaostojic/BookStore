import React, { useState } from "react";
export default function GenreCreateForm(props) {
  const initialFormData = Object.freeze({
    genreName: "",
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
    const genreToCreate = {
      genreName: formData.genreName,
    };

    const url = "https://localhost:7178/api/Genre";

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genreToCreate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onGenreCreated(genreToCreate);
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
                    <h3>Dodavanje novog žanra</h3>
                    <input
                      value={formData.genreName}
                      name="genreName"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Dodaj</button>
                    <br />
                    <button onClick={() => props.onGenreCreated(null)}>
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
