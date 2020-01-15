// Distribute to seperate file
import { grid } from './gridCodes';

export function formatData(data) {
  let map = {};
  map = countMacroCodes(data, map);
  return createSpatialGrid(map);
}

/**
 * @param {arr} data (needs to contain an CONTEXT key)
 * @param {obj} map (empty)
 * @returns {obj} a map of the occurances of each macro code
 */
export function countMacroCodes(data, map) {
  data.map(finding => {
    const macro = getContextNumberDetails(finding.CONTEXT).macro;
    const year = getContextNumberDetails(finding.CONTEXT).year;

    // Only show the first year of the macro square: 124
    if (year !== 12 && macro == 124) return;
    const noMacroInObject = !map[macro];
    if (noMacroInObject) map[macro] = 1;
    else map[macro]++;
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

  const regex = /T(\d{2})?-?(\d{3})/g;
  // const regex = /T(\d{2})?-?(\d{3})?-?([1234])?-?([ABCD1234])/g;
  const contextNumberSearch = regex.exec(contextNumber);
  if (!contextNumberSearch) return '';

  return {
    contextNumber: contextNumberSearch[0] || null,
    year: contextNumberSearch[1] || null,
    macro: contextNumberSearch[2] || null,
    meso: contextNumberSearch[3] || null
    // micro: contextNumberSearch[4] || null
  };
}

export function createSpatialGrid(map) {
  const spatialGrid = [];

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

  return spatialGrid;
}

const showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);

const showValueButton = document.querySelector('#showValue');
showValueButton.addEventListener('click', showValue);

let isShowMacro = document.getElementById('showMacro').checked;
let isShowValue = document.getElementById('showValue').checked;

function showMacro() {
  if (!isShowMacro) document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 1));
  else document.querySelectorAll('.macro').forEach(i => (i.style.opacity = 0));
  isShowMacro = !isShowMacro;
}

function showValue() {
  if (!isShowValue) document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0.4));
  else document.querySelectorAll('.value').forEach(i => (i.style.opacity = 0));
  isShowValue = !isShowValue;
}
