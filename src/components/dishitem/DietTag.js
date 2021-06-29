import React from "react";
// import "./DietTag.css";
// import Vegan from "../svgs/veganleaf.svg";
// import Vegetarian from "../svgs/carrot.svg";
// import gf from "../svgs/gf.png";

const DietTag = ({ id, onRequest }) => {
  const dietaryPref = {
    vegan: { name: "Vegan", color: "green" },
    vegetarian: { name: "Vegetarian", color: "orange" },
    gf: { name: "Gluten-Friendly", color: "yellow" },
  };

  const dietary = dietaryPref[id];
  return (
    <div
      className="dietTag"
      style={{
        opacity: onRequest ? 0.6 : 1,
        flexDirection: "row",
        backgroundColor: "#ccc",
      }}
    >
      {/* <img
        src={
          id == "vegan"
            ? Vegan
            : // id == "vegetarian" ?
              Vegetarian
          // : gf
        }
        style={{ height: 18 }}
        alt="id"
      ></img> */}
      <div style={{ width: 5 }} /> {dietary?.name} {onRequest && "on request"}
    </div>
  );
};
export default DietTag;
