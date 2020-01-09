import './styles.scss';
import { map } from './map';

import { drawBarChart } from './draw-bar-chart';
drawBarChart();

fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

function handleData(data) {
  // console.log(data[0]['SHAPE OBJECT']);

  const mapped = getMap(data);
  // console.log(mapped);

  // console.log(Object.values(mapped).length);

  const obj = {
    name: 'root',
    children: [
      {
        name: 'a',
        children: []
      }
    ]
  };

  Object.values(mapped).forEach((e, i) => {
    obj.children[0].children.push({
      name: Object.keys(mapped)[i],
      value: e
    });
  });

  // deze he
  console.log(obj);

  // name: "root"
  // children: Array(6)
  // 0: { name: "a", children: Array(7) }
  // 1: { name: "b", children: Array(9) }
  // 2: { name: "c", children: Array(10) }
  // 3: { name: "d", children: Array(6) }
  // 4: { name: "e", children: Array(10) }
  // 5: { name: "f", children: Array(9) }
  // length: 6
  // __proto__: Array(0)
  // __proto__: Object
}

function getMap(data) {
  const map = {};

  data.forEach(e => {
    const key = e['SHAPE OBJECT'];
    if (!map[key]) map[key] = 1;
    else map[key]++;
  });
  return map;
}
