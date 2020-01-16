// Distribute to seperate file
import { grid } from './gridCodes';

export function formatData(data) {
  let map = {};
  map = countMacroCodes(data, map);
  // console.log(createSpatialMesos(map));
  return createSpatialGrid();
}

export function formatMeso(data) {
  let map = {};
  map = countMacroCodes(data, map);
  console.log(createSpatialMesos(map));
  return createSpatialMesos(map);
}

/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */
export function countMacroCodes(data, map) {
  data.map(finding => {
    const macro = getContextNumberDetails(finding.CONTEXT).macro;
    const meso = getContextNumberDetails(finding.CONTEXT).meso;
    const year = getContextNumberDetails(finding.CONTEXT).year;

    // Only show the first year of the macro square: 124
    // if (year !== 15 && macro == 124) return;
    if (year == 12 && macro == 124) return;
    const noMacroInObject = !map[meso];
    if (noMacroInObject) map[meso] = 1;
    else map[meso]++;
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
export function getContextNumberDetails(contextNumber) {
  if (!contextNumber) return '';

  // const regex = /T(\d{2})?-?(\d{3})/g;
  const regex = /T(\d{2})?-?(\d{3})?-?([1234])?/g;
  const contextNumberSearch = regex.exec(contextNumber);
  if (!contextNumberSearch) return '';

  // console.log(contextNumberSearch);

  return {
    contextNumber,
    year: contextNumberSearch[1] || null,
    macro: contextNumberSearch[2] || null,
    meso: `${contextNumberSearch[2]}-${contextNumberSearch[3]}` || null
  };
}

export function createSpatialGrid() {
  const spatialGrid = [];

  let row = 0;
  let column = 0;
  // console.log(map);

  grid.forEach((square, i) => {
    if (i % 20 === 0 && i !== 0) {
      column = 0;
      row++;
    }

    const tempObj = {
      macro: square,
      column,
      row
    };

    spatialGrid.push(tempObj);
    column++;
  });

  return spatialGrid;
}

function createSpatialMesos(map) {
  const newWave = [];

  grid.forEach((square, i) => {
    for (let j = 1; j < 5; j++) {
      const meso = `${square}-${j}`;
      const tempObj = {
        macro: grid[i],
        meso: meso,
        rMeso: j,
        value: map[meso]
      };

      newWave.push(tempObj);
    }
  });

  // console.log(mesoGrid);
  // console.log(grid);
  // console.log(spatialGrid);

  return newWave;
}

const showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);

const showValueButton = document.querySelector('#showValue');
showValueButton.addEventListener('click', showValue);

let isShowMacro = document.getElementById('showMacro').checked;
let isShowValue = document.getElementById('showValue').checked;

function showMacro() {
  if (!isShowMacro) {
    document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 1));
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 100)');
  } else {
    document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 0));
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 0)');
  }
  isShowMacro = !isShowMacro;
}

function showValue() {
  if (!isShowValue) document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0.4));
  else document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0));
  isShowValue = !isShowValue;
}
