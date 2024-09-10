import * as React from "react";
const CartIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={18}
    fill="none"
    {...props}
  >
    <path
      fill="#fff"
      fillRule="evenodd"
      d="M7 3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1zM5 3a3 3 0 0 1 3-3h4a3 3 0 0 1 3 3h2a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm9 2h3a1 1 0 0 1 1 1v1H2V6a1 1 0 0 1 1-1h11m4 10V9H2v6a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1"
      clipRule="evenodd"
    />
  </svg>
);
export default CartIcon;
