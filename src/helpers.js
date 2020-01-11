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
