// Distribute to seperate file
import { grid } from './gridCodes';
import * as htmlToImage from 'html-to-image';
import download from 'downloadjs';

export function formatData(data) {
  let map = {};
  map = countMacroCodes(data, map);
  // console.log(createSpatialMesos(map));
  return createSpatialGrid();
}

export function formatMeso(data) {
  let map = {};
  map = countMacroCodes(data, map);
  // console.log(createSpatialMesos(map));
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
    if (year != 12 && macro == 124) return;
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

  const regex = /T(\d{2})?-?(\d{3})?-?([1234])?/g;
  const contextNumberSearch = regex.exec(contextNumber);
  if (!contextNumberSearch) return '';

  return {
    contextNumber,
    year: contextNumberSearch[1],
    macro: contextNumberSearch[2],
    meso: `${contextNumberSearch[2]}-${contextNumberSearch[3]}`,
    mesoOnly: contextNumberSearch[3]
  };
}

export function createSpatialGrid() {
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

  return newWave;
}

const showMacroButton = document.querySelector('#showMacro');
showMacroButton.addEventListener('click', showMacro);

let isShowMacro = document.getElementById('showMacro').checked;

function showMacro() {
  document.querySelector('#showMacro').classList.toggle('btn-active');

  if (!isShowMacro) {
    document.querySelectorAll('.macro').forEach(i => i.classList.add('showMacro'));
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, .4)');
  } else {
    document.querySelectorAll('.macro').forEach(i => i.classList.remove('showMacro'));
    d3.selectAll('.macroSquare').attr('stroke', 'rgba(190, 190, 190, 0)');
  }
  isShowMacro = !isShowMacro;
}

document.querySelector('.share').addEventListener('click', save);

function save() {
  if (!document.body.className.match('isFlipped')) {
    document.querySelector('body').classList.toggle('isFlipped');
    document.querySelector('#myCard').classList.toggle('flip');
    document.querySelector('.switch input').checked = true;
  }

  const dom = [document.querySelector('header'), document.querySelector('.back'), document.querySelector('.options--map'), document.querySelector('.categorial-buttons')];
  dom.forEach(e => (e.style.display = 'none'));
  document.querySelectorAll('text').forEach(e => (e.style.display = 'none'));

  htmlToImage.toPng(document.querySelector('body')).then(function(dataUrl) {
    download(dataUrl, 'thorikos-map.png');
    dom.forEach(e => (e.style.display = 'flex'));
    document.querySelectorAll('text').forEach(e => (e.style.display = 'block'));
  });
}
