export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

export function getMap(data, value) {
  const map = {};

  data.forEach(e => {
    const key = e[value];
    if (!map[key]) map[key] = 1;
    else map[key]++;
  });
  return map;
}

export const capitalize = str => str.slice(0, 1).toUpperCase() + str.substring(1);

export function structureData(data, category, detail) {
  const newData = {
    name: 'root',
    children: [
      {
        name: 'ao',
        children: []
      }
    ]
  };

  // if (category) {
  const keys = Object.keys(getMap(data, category, detail));
  const values = Object.values(getMap(data, category, detail));
  if (category) {
    values.forEach((e, i) => {
      newData.children[0].children.push({
        name: keys[i],
        value: values[i],
        category
      });
    });
  } else {
    newData.children[0].children.push({
      name: detail || 'All findings',
      value: data.length
    });
  }

  return newData;
}
