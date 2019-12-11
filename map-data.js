function normalize(value, min, max) {
  return (value - min) / (max - min);
}

const grid = [
  0,
  196,
  195,
  197,
  200,
  202,
  203,
  204,
  206,
  207,
  151,
  152,
  157,
  156,
  159,
  169,
  168,
  167,
  166,
  165,
  0,
  194,
  193,
  198,
  199,
  201,
  209,
  208,
  205,
  177,
  150,
  153,
  154,
  155,
  158,
  160,
  161,
  162,
  163,
  164,
  104,
  102,
  101,
  103,
  105,
  106,
  107,
  108,
  109,
  110,
  111,
  112,
  113,
  114,
  115,
  116,
  117,
  118,
  119,
  0,
  0,
  252,
  0,
  0,
  253,
  184,
  183,
  182,
  129,
  130,
  131,
  132,
  133,
  134,
  135,
  137,
  188,
  139,
  0,
  0,
  0,
  251,
  0,
  191,
  187,
  185,
  186,
  181,
  121,
  123,
  145,
  144,
  142,
  140,
  136,
  127,
  128,
  0,
  0,
  0,
  0,
  250,
  192,
  190,
  188,
  178,
  179,
  180,
  120,
  122,
  147,
  146,
  143,
  141,
  124,
  125,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  189,
  0,
  0,
  172,
  171,
  173,
  174,
  175,
  176,
  170,
  126,
  0,
  0,
  0,
  0,
  0
];

// Load data file
// TODO make this dynamic with an upload button
fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

const handleData = data => {
  const map = {};
  countMacroCodes(data, map);
  const spatialGrid = createSpatialGrid(map);
  const svg = d3.select('.map').append('svg');

  svg
    .selectAll('rect')
    .data(spatialGrid)
    .enter()
    .append('rect')
    .attr('x', (d, i) => d.column * 50)
    .attr('y', (d, i) => d.row * 50)
    .attr('fill', d => (d.value ? `rgba(16, 115, 197, ${normalize(d.value, 0, 1030)})` : '#fff')) // TODO Create a slider for the 500
    .attr('width', 50)
    .attr('height', 50);

  svg
    .selectAll('.macro')
    .data(spatialGrid)
    .enter()
    .append('text')
    .attr('class', 'macro')
    .text(d => (d.macro ? d.macro : ''))
    .attr('x', (d, i) => d.column * 50 + 15)
    .attr('y', (d, i) => d.row * 50 + 25);

  svg
    .selectAll('.value')
    .data(spatialGrid)
    .enter()
    .append('text')
    .attr('class', 'value')
    .text(d => d.value)
    .attr('x', (d, i) => d.column * 50 + 15)
    .attr('y', (d, i) => d.row * 50 + 40);
};

/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */
function countMacroCodes(data, map) {
  data.forEach(finding => {
    const macro = getContextNumberDetails(finding.CONTEXT).macro;
    if (!map[macro]) {
      map[macro] = 1;
    } else map[macro]++;
  });
  return map;
}

/**
 * @param {str} contextNumber ("T13-124-1-A")
 * @returns {obj} of the individual values of the context code (see below)
    "T13-124-1-A"
    13 = year
    124 = macro
    1 = meso
    A = micro
 */
function getContextNumberDetails(contextNumber) {
  if (!contextNumber) return '';
  if (contextNumber === null) return '';

  const regex = /T(\d{2})?-?(\d{3})?-?([1234])?-?([ABCD1234])/g;
  const contextNumberSearch = regex.exec(contextNumber);

  return {
    contextNumber: contextNumberSearch[0] || null,
    year: contextNumberSearch[1] || null,
    macro: contextNumberSearch[2] || null,
    meso: contextNumberSearch[3] || null,
    micro: contextNumberSearch[4] || null
  };
}

function createSpatialGrid(map) {
  const spatialGrid = []; // {column, row, macro}

  // console.log(grid);

  let row = 0;
  let column = 0;

  grid.forEach((square, i) => {
    if (i % 20 === 0 && i !== 0) {
      column = 0;
      row++;
    }

    const tempObj = {
      macro: square,
      value: map[square],
      column,
      row
    };

    column++;
    spatialGrid.push(tempObj);
  });

  // console.log(spatialGrid);
  return spatialGrid;
}

const showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);

const showValueButton = document.querySelector('#showValue');
showValueButton.addEventListener('click', showValue);

let isShowMacro = document.getElementById('showMacro').checked;
let isShowValue = document.getElementById('showValue').checked;

function showMacro() {
  // document.getElementById('showMacro').checked = true;
  // document.getElementById('showValue').checked = true;

  if (!isShowMacro) document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 1));
  else document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 0));
  isShowMacro = !isShowMacro;
}

function showValue() {
  if (!isShowValue) document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0.4));
  else document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0));
  isShowValue = !isShowValue;
}
