import React from "react";
import DietTag from "./DietTag";
import "./dishitem.css";

const DishItem = ({ dish }) => {
  return (
    <div style={{ width: "33%", minWidth: 300 }}>
      <div className="DishItemContainer">
        <div className="DishItemHeader">
          {/* At this point I should probably just have 2 headers one for with image one for without */}
          <div className="DishHeaderText">
            <div className="Row">
              {dish.imageUrl && (
                <React.Fragment>
                  <img
                    src={dish.imageUrl}
                    alt={dish.name}
                    className="DishImage"
                  />
                  <div style={{ width: 10 }} />
                </React.Fragment>
              )}
              <h5 style={{ maxWidth: dish.imageUrl ? 150 : "auto" }}>
                {dish.name}
              </h5>
            </div>
            <div style={{ width: "10px" }} />
            {!dish.imageUrl && <p className="price">{dish.price}</p>}
          </div>
          <div className="DietaryContainer">
            {dish.imageUrl && <p className="price">{dish.price}</p>}
            {!!dish.dietary &&
              Object.entries(dish.dietary).map((d) => {
                if (d[0] == "vegetarian" && d[1] == dish.dietary["vegan"]) {
                  // Do not show vegan AND vegetarian tags.
                  // But showing "vegan on request", "vegetarian" is fine
                  return <div key={d[0]} />;
                }
                if (d[1] == 1) {
                  return <DietTag id={d[0]} onRequest={true} key={d[0]} />;
                } else if (d[1] == 2) {
                  return <DietTag id={d[0]} onRequest={false} key={d[0]} />;
                } else {
                  return <div key={d[0]} />;
                }
              })}
          </div>
        </div>
        <p>{dish.description}</p>
      </div>
      <div className="BottomBorder" />
    </div>
  );
};
export default DishItem;
