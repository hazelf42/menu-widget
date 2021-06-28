import React from "react";
import "./DietTag.css";
import Vegan from "../svgs/veganleaf.svg";
import Vegetarian from "../svgs/carrot.svg";
import gf from "../svgs/gf.png";

// Should probably inherit from DietTag or share common parent but w/e lol

const DietFilter = ({ id, selected, onPress }) => {
  const dietaryPref = {
    vegan: { name: "Vegan" },
    vegetarian: { name: "Vegetarian" },
    gf: { name: "Gluten-Friendly" },
  };

  const dietary = dietaryPref[id];
  return (
    <div
      className="dietTag"
      style={{
        opacity: selected ? 1 : 0.6,
        flexDirection: "row",
        backgroundColor: "#ccc",
      }}
      onClick={() => {
        console.log("Hi");
        selected ? onPress(null) : onPress(id);
      }}
    >
      <img
        src={id == "vegan" ? Vegan : id == "vegetarian" ? Vegetarian : gf}
        style={{ height: 18 }}
        alt="id"
      ></img>
      <div style={{ width: 5 }} /> {dietary?.name}
    </div>
  );
};
export default DietFilter;
