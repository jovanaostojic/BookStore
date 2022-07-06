import React, { useState, useEffect } from "react";
export default function BookUpdateForm(props) {
  const initialFormData = Object.freeze({
    bookId: props.book.bookId,
    title: props.book.title,
    genreId: props.book.genreId,
    authorId: props.book.authorId,
    userId: props.book.user.id,
  });

  const [genres, setGenres] = useState([]);
  function getGenres() {
    const url = "https://localhost:7178/api/Genre";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((genresFromServer) => {
        setGenres(genresFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getGenres();
  }, []);

  const [authors, setAuthors] = useState([]);
  function getAuthors() {
    const url = "https://localhost:7178/api/Author";
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((authorsFromServer) => {
        setAuthors(authorsFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });
  }
  useEffect(() => {
    getAuthors();
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
    const bookToUpdate = {
      bookId: props.book.bookId,
      title: formData.title,
      genreId: formData.genreId,
      authorId: formData.authorId,
      userId: formData.userId,
    };

    const url = "https://localhost:7178/api/Book" + "/" + props.book.bookId;

    fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookToUpdate),
    })
      //.then((response) => response.json())
      .then((responseFromServer) => {
        console.log(responseFromServer);
      })
      .catch((error) => {
        console.log(error);
        //alert(error);
      });

    props.onBookUpdated(bookToUpdate);
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
                    <h3>Izmena knjige</h3>
                    <input
                      value={formData.bookId}
                      name="bookId"
                      type="text"
                      placeholder="Id"
                      onChange={handleChange}
                      disabled
                    />
                    <input
                      value={formData.title}
                      name="title"
                      type="text"
                      placeholder="Naziv"
                      onChange={handleChange}
                    />
                    <select name="genreId" onChange={handleChange}>
                      <option value="">Odaberite zanr</option>
                      {genres.map((genre) => (
                        <option key={genre.genreId} value={genre.genreId}>
                          {genre.genreName}
                        </option>
                      ))}
                    </select>
                    <select name="authorId" onChange={handleChange}>
                      <option value="">Odaberite autora</option>
                      {authors.map((author) => (
                        <option key={author.authorId} value={author.authorId}>
                          {author.authorFirstName + " " + author.authorLastName}
                        </option>
                      ))}
                    </select>
                    <input
                      value={formData.userId}
                      name="userId"
                      type="text"
                      placeholder="Id admina"
                      onChange={handleChange}
                      disabled
                    />
                    <button onClick={handleSubmit}>Izmeni</button>
                    <br />
                    <button onClick={() => props.onBookUpdated(null)}>
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
