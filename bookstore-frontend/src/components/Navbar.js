import React, { useEffect, useState } from "react";
import userIcon from "../img/user.png";

function Navbar() {
  const roles = localStorage.getItem("roles");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  useEffect(() => {
    if (roles != null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    if (roles == "Admin") {
      setIsAdminLoggedIn(true);
    } else {
      setIsAdminLoggedIn(false);
    }
  }, []);

  return (
    <header>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-lg-3">
            <h1>
              <a href="/">
                Book<span>Store</span>
              </a>
            </h1>
          </div>
          {isLoggedIn ? (
            isAdminLoggedIn ? (
              <div className="col-lg-5">
                <ul>
                  <li>
                    <a href="/admin-author">Autori</a>
                  </li>
                  <li>
                    <a href="/admin-book">Knjige</a>
                  </li>
                  <li>
                    <a href="/admin-country">Drzave</a>
                  </li>
                  <li>
                    <a href="/admin-genre">Zanrovi</a>
                  </li>
                  <li>
                    <a href="/admin-membership">Clanarine</a>
                  </li>
                  <li>
                    <a href="/admin-membershiptype">Vrste clanarina</a>
                  </li>
                  <li>
                    <a href="/admin-role">Uloge</a>
                  </li>
                  <li>
                    <a href="/admin-user">Korisnici</a>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="col-lg-5">
                <ul>
                  <li>
                    <a href="/user-books">Knjige</a>
                  </li>
                  <li>
                    <a href="/user-membershiptypes">Vrste clanarina</a>
                  </li>
                </ul>
              </div>
            )
          ) : (
            <div className="col-lg-5 d-flex align-items-right justify-content-center"></div>
          )}
          {isLoggedIn ? (
            <div className="col-lg-4 d-flex align-items-center justify-content-center">
              <ul>
                <li className="avatar">
                  <a href="/profil">
                    <img src={userIcon} alt="" />
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div className="col-lg-4 d-flex align-items-right justify-content-center">
              <ul className="login">
                <li>
                  <a href="/login">Login</a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
