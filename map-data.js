fetch('data.json')
  .then(response => response.json())
  .then(json => handleData(json));

const handleData = data => {
  // console.log(data);

  /*
    contextNumber deconstructed
    "T13-124-1-A"
    13 = year
    124 = macro
    1 = meso
    A = micro
  */

  const map = {};
  const countedContextCodes = countContextCodes(data, map);

  const contextNumber = getContextNumberDetails(data[0].CONTEXT);
  console.log(countedContextCodes);
};

function countContextCodes(data, map) {
  data.forEach(finding => {
    const macro = getContextNumberDetails(finding.CONTEXT).macro;
    if (!map[macro]) {
      map[macro] = 1;
    } else map[macro]++;
  });
  return map;
}

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
