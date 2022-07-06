import React from "react";
import "@stripe/stripe-js";
import HomeBooks from "./components/HomeBooks.js";
import Navbar from "./components/Navbar.js";
import HomePhoto from "./components/HomePhoto.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Author from "./components/adminViews/Author.js";
import Country from "./components/adminViews/Country.js";
import Genre from "./components/adminViews/Genre.js";
import Role from "./components/adminViews/Role.js";
import MembershipType from "./components/adminViews/MembershipType.js";
import User from "./components/adminViews/User.js";
import Book from "./components/adminViews/Book.js";
import Membership from "./components/adminViews/Membership.js";
import Profil from "./components/Profil.js";
import Books from "./components/userViews/Books.js";
import MembershipTypes from "./components/userViews/MembershipTypes.js";
import Success from "./components/userViews/Success.js";
import Cancel from "./components/userViews/Cancel.js";

function App() {
  var component;
  var componentTwo;
  switch (window.location.pathname) {
    case "/":
      component = <HomePhoto />;
      componentTwo = <HomeBooks />;
      break;
    case "/login":
      component = <Login />;
      break;
    case "/register":
      component = <Register />;
      break;

    case "/admin-author":
      component = <Author />;
      break;
    case "/admin-country":
      component = <Country />;
      break;
    case "/admin-genre":
      component = <Genre />;
      break;
    case "/admin-role":
      component = <Role />;
      break;
    case "/admin-membershiptype":
      component = <MembershipType />;
      break;
    case "/admin-user":
      component = <User />;
      break;
    case "/admin-book":
      component = <Book />;
      break;
    case "/admin-membership":
      component = <Membership />;
      break;

    case "/profil":
      component = <Profil />;
      break;

    case "/user-books":
      component = <Books />;
      break;
    case "/user-membershiptypes":
      component = <MembershipTypes />;
      break;
    case "/user-success":
      component = <Success />;
      break;
    case "/user-cancel":
      component = <Cancel />;
      break;

    default:
      break;
  }
  return (
    <>
      <Navbar />
      {component}
      {componentTwo}
    </>
  );
}

export default App;
