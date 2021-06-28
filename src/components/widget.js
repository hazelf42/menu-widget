import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import "./widget.scss";
import "./widget.css";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { filteredDishes, getFirstCategory, toDish } from "./functions";
import DishItem from "./dishitem/dishitem";
import DietFilter from "./dishitem/DietFilter";
import CategoriesMenu from "./categories/Categories";

const Widget = ({ restaurantId }) => {
  const [rData, setRData] = useState(null);
  const [currentCategory, setCurrentCategory] = useState(null);
  const [filterBy, setFilterBy] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const notInitialRender = useRef(false);
  let categories = rData?.categories?.mapValue?.fields;

  useEffect(() => {
    if (notInitialRender.current) {
      // skip first render so it doesnt scroll immediately
      const category = document.getElementById(currentCategory);
      // offset based on header and categories
      const yOffset = -50;
      const y =
        category.getBoundingClientRect().top + window.pageYOffset + yOffset;
      //update selected on scroll (but later cuz ehhh)
      window.scrollTo({ top: y, behavior: "smooth" });
    } else if (currentCategory != null) {
      // it'll actually be the second render after the loading screen
      notInitialRender.current = true;
    }
  }, [currentCategory]);

  useEffect(() => {
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/menu-buddy-9c09c/databases/(default)/documents/restaurants/sArCawBFjq8NEdHfOOS8"
      )
      .then((a) => {
        setRData(a.data.fields);
        let c = a.data.fields.categories.mapValue.fields;
        setCurrentCategory(c[Object.keys(c)[0]].mapValue.fields.id.stringValue);
      });
  }, []);

  return (
    <div className="PageWrapper">
      <div className="PageContainer">
        <h1>{rData ? rData.name.stringValue : "Loading..."}</h1>
        <div className="Wrap">
          <TextField
            value={searchTerm}
            label={"Search"}
            variant="filled"
            style={{ width: "30vw" }}
          />
          {/* TODO don't show filters that yield no results */}
          <DietFilter
            selected={filterBy == "vegan"}
            id={"vegan"}
            onPress={setFilterBy}
          />
          <DietFilter
            selected={filterBy == "vegetarian"}
            id={"vegetarian"}
            onPress={setFilterBy}
          />
          <DietFilter
            selected={filterBy == "gf"}
            id={"gf"}
            onPress={setFilterBy}
          />
          <button
            className="Invisibutton"
            style={{
              textDecoration: "underline",
              visibility: filterBy == null ? "hidden" : "visible",
            }}
            onClick={() => setFilterBy(null)}
          >
            Clear
          </button>
        </div>
        {rData && (
          <CategoriesMenu
            rData={rData}
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            filterBy={filterBy}
          />
        )}
        {rData && currentCategory && (
          <div>
            {Object.values(categories).map((c) => {
              const category = c.mapValue.fields;
              const filteredDishArray = filteredDishes(
                category.dishes.arrayValue.values,
                filterBy
              );
              return filteredDishArray.length > 0 ? (
                <div id={category.id.stringValue}>
                  <h2>{category.name.stringValue}</h2>
                  <div
                    className="Wrap"
                    style={{
                      justifyContent:
                        window.innerWidth < 800 ? "center" : "flex-start",
                    }}
                  >
                    {filteredDishArray.map((dish) => {
                      return <DishItem dish={dish} key={dish.name} />;
                    })}
                  </div>
                </div>
              ) : (
                // Should i still show the div even if there's no stuff there?
                <div />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

Widget.propTypes = {
  restaurantId: PropTypes.string,
};

Widget.defaultProps = {
  restaurantId: "0",
};

export default Widget;
