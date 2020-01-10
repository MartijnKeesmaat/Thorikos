export function normalize(value, min, max) {
  return (value - min) / (max - min);
}

export function getMap(data) {
  const map = {};

  data.forEach(e => {
    const key = e['SHAPE OBJECT'];
    if (!map[key]) map[key] = 1;
    else map[key]++;
  });
  return map;
}
