import React from "react";
import MembershipCardImg from "../../img/membership-card.png";
import { loadStripe } from "@stripe/stripe-js";

function MembershipTypeCard({ membershipType }) {
  let stripePromise;
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(
        "pk_test_51LGSuABcP8KgxCOukxNBZkXqKs6Y6JU3cRxauWs5qSCqBGHz2TOJ6KBvjICDpNLMUkOWfDkIqtTjPWv2Xwnubit400E0TK4ayf"
      );
    }
    return stripePromise;
  };

  const item = {
    price: membershipType.membershipPriceId,
    quantity: 1,
  };

  const checkuoutOptions = {
    lineItems: [item],
    mode: "payment",
    successUrl: `${window.location.origin}/user-success`,
    cancelUrl: `${window.location.origin}/user-cancel`,
  };

  const redirectToCheckout = async () => {
    localStorage.setItem("membershipTypeId", membershipType.membershipTypeId);
    console.log("redirectToCheckout");
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkuoutOptions);
    console.log("Stripe checkout error", error);
  };

  return (
    <div className="col-lg-3 col-6">
      <div className="inner">
        <article key={membershipType.membershipTypeId}>
          <img src={MembershipCardImg} className="img-fluid" alt="" />
          <h3>{membershipType.membershipName}</h3>
          <p>
            Trajanje u mesecima: <b>{membershipType.duration}</b>
          </p>
          <div className="price">
            <p>RSD {membershipType.membershipPrice}</p>
          </div>
          <div className="btns">
            <button onClick={redirectToCheckout}>Kupi</button>
          </div>
        </article>
      </div>
    </div>
  );
}

export default MembershipTypeCard;
