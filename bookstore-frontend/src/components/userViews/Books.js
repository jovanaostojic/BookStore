import React, { useState, useEffect } from "react";
import axios from "axios";
import BookSearch from "./BookSearch";

function Books() {
  const url = "https://localhost:7178/api/Book";
  const [books, setBooks] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [url]);

  if (books) {
    return <BookSearch details={books} />;
  }
  return <div></div>;
}
export default Books;
