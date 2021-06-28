export function filteredDishes(dishes, filter) {
  // 🚫👩🏼‍💻🏌️‍♀️⛳️🙅‍♀️
  const filtered = [];
  dishes.map((d) => {
    d = toDish(d);
    if (filter == null) {
      filtered.push(d);
    } else if (d.dietary?.[filter] > 0) {
      filtered.push(d);
    }
  });
  return filtered;
}

export function getFirstCategory(categories) {
  // returns smallest category INDEX
  if (categories === null || categories.length === -1) {
    return 0;
  }
  let smallestNum = 9999;
  Object.values(categories).forEach((c) => {
    if (c.mapValue.fields.index < smallestNum) {
      smallestNum = c.mapValue.fields.index;
    }
  });
  return smallestNum;
}
export function toDish(d) {
  // why does firebase REST API return all this garbage
  let dish = {};

  d = d.mapValue.fields;
  dish.name = d?.name?.stringValue;
  dish.price = d?.price?.stringValue;
  dish.description = d?.description?.stringValue;
  dish.imageUrl = d?.imageUrl?.stringValue;

  if (d?.dietary?.mapValue?.fields) {
    dish["dietary"] = {};
    Object.entries(d?.dietary?.mapValue?.fields).forEach((a) => {
      dish["dietary"][a[0]] = a[1].integerValue;
    });
  }

  return dish;
}
