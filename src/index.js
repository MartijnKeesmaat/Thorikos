import './styles.scss';
import { map } from './map';
import { treemap } from './draw-tree-map';

import { drawBarChart } from './draw-bar-chart';
drawBarChart();

fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));
