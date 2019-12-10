// Load data file
// TODO make this dynamic with an upload button
fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

const handleData = data => {
  const contextNumber = getContextNumberDetails(data[0].CONTEXT);
  console.log(contextNumber);

  const map = {};
  const countedContextCodes = countMacroCodes(data, map);
  console.log(countedContextCodes);
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
  const regex = /T(\d{2})-(\d{3})-([1234])-([ABCD1234])/g;
  const contextNumberSearch = regex.exec(contextNumber);

  return {
    contextNumber: contextNumberSearch[0],
    year: contextNumberSearch[1],
    macro: contextNumberSearch[2],
    meso: contextNumberSearch[3],
    micro: contextNumberSearch[4]
  };
}
