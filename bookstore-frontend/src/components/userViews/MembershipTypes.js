import React, { useState, useEffect } from "react";
import axios from "axios";
import MembershipTypeCard from "./MembershipTypeCard.js";

function MembershipTypes() {
  const url = "https://localhost:7178/api/MembershipType";
  const [membershipTypes, setMembershipTypes] = useState(null);

  useEffect(() => {
    axios
      .get(url)
      .then((response) => {
        setMembershipTypes(response.data);
      })
      .catch((error) => {
        console.log(error);
        alert(error);
      });
  }, [url]);

  if (membershipTypes) {
    return (
      <section className="books">
        <div className="container">
          <div className="row">
            {membershipTypes.map((membershipType) => (
              <MembershipTypeCard
                key={membershipType.membershipTypeId}
                membershipType={membershipType}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }
  return <div></div>;
}
export default MembershipTypes;
