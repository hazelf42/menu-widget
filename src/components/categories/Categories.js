import { Button } from "@material-ui/core";
import React, { useState, useRef } from "react";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { filteredDishes } from "../functions";
// import "../widget.css";
// import "./Categories.css";
const CategoriesMenu = ({
  rData,
  currentCategory,
  setCurrentCategory,
  filterBy,
}) => {
  const [catScrollPos, setCatScrollPos] = useState(0);
  const scrollRef = useRef();

  const categories = rData.categories.mapValue.fields;
  return (
    <div className="CategoriesWrapper">
      <button
        className="Invisibutton"
        style={{
          textDecoration: "underline",
        }}
        onClick={() => {
          const newX =
            catScrollPos - window.innerWidth + window.innerWidth * 0.4;

          scrollRef.current.scroll(newX, 0);
          setCatScrollPos(newX > 0 ? newX : 0);
        }}
      >
        <FaArrowCircleLeft />
      </button>
      <div className="CategoriesSection" ref={scrollRef}>
        <div className="Scroll">
          {categories &&
            Object.values(categories).map((f) => {
              return filteredDishes(
                f.mapValue.fields.dishes.arrayValue.values,
                filterBy
              ).length > 0 ? (
                <Button
                  className="Category"
                  key={f.mapValue.fields.id.stringValue}
                  style={{
                    fontWeight:
                      f.mapValue.fields.id.stringValue == currentCategory
                        ? "bold"
                        : "normal",
                  }}
                  onClick={() =>
                    setCurrentCategory(f.mapValue.fields.id.stringValue)
                  }
                >
                  {f.mapValue.fields.name.stringValue}
                </Button>
              ) : (
                <div />
              );
            })}
        </div>
      </div>
      <button
        className="Invisibutton"
        style={{
          textDecoration: "underline",
        }}
        onClick={() => {
          const newX =
            catScrollPos + window.innerWidth - window.innerWidth * 0.4;
          scrollRef.current.scroll(newX, 0);
          setCatScrollPos(newX);
        }}
      >
        <FaArrowCircleRight />
      </button>
    </div>
  );
};
export default CategoriesMenu;
