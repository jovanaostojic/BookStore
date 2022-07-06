import React, { useState } from "react";
export default function GenreUpdateForm(props) {
  const initialFormData = Object.freeze({
    genreId: props.genre.genreId,
    genreName: props.genre.genreName,
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
    const genreToUpdate = {
      genreId: props.genre.genreId,
      genreName: formData.genreName,
    };

    const url = "https://localhost:7178/api/Genre" + "/" + props.genre.genreId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(genreToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onGenreUpdated(genreToUpdate);
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
                    <h3>Izmena žanra</h3>
                    <input
                      value={formData.genreId}
                      name="genreId"
                      type="text"
                      placeholder="Id"
                      onChange={handleChange}
                      disabled
                    />
                    <input
                      value={formData.genreName}
                      name="genreName"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onGenreUpdated(null)}>
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
