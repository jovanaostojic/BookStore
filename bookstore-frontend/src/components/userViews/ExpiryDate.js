import { useState, useEffect } from "react";
import axios from "axios";
const ExpiryDate = (userId) => {
  const [expiryDate, setExpiryDate] = useState([]);
  const url =
    "https://localhost:7178/api/Membership/expiryDate/" + userId.userId;

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setExpiryDate(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, []);
  return expiryDate;
};

export default ExpiryDate;
